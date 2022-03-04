import {all, call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {chunk, difference, filter, orderBy, uniq, get, toPairs} from 'lodash';
import {compareTwoStrings} from 'string-similarity';

import * as async from 'redux/modules/async/helpers';
import {normalizeGetFieldsResponse} from 'redux/modules/fields/helpers';
import {getCategories} from 'redux/modules/categories/actions';
import {normalizeItems} from 'redux/modules/items/helpers';
import S3ImageUploader from 'helpers/S3ImageUploader';
import apiClient from 'helpers/apiClient';

import * as cx from './constants';

const getItemsPath = action => {
  const collection = get(action, 'payload.collection');
  const query = get(action, 'payload.query') || {};
  if (query) {
    const baseUrl = `users/tabs/${collection}/items/search`;
    const queryString = toPairs(query)
      .map(q => q.join('='))
      .join('&');

    return `${baseUrl}?${queryString}`;
  }
  return `users/tabs/${collection}/items`;
};

const getItems = async.request({
  type: cx.GET_ITEMS,
  path: getItemsPath,
  method: apiClient.get,
  success: res => ({
    ...normalizeItems(res.data.data, {
      search: res.data.search,
      sorted: {
        sort: res.data.sort,
      },
      pagination: res.data.pagination,
    }),
  }),
});

const getItem = async.request({
  type: cx.GET_ITEM,
  cacheKey: ({type, payload}) =>
    `${type}-${payload.collection}-${payload.item}`,
  path: action =>
    `users/tabs/${action.payload.collection}/items/${action.payload.item}`,
  method: apiClient.get,
  success: ({data: item}) => ({
    item,
    fields: normalizeGetFieldsResponse(item.fields),
  }),
});

function* uploadItems(action) {
  try {
    yield async.report.pending(cx.UPLOAD_ITEMS);
    const {items, collection} = action.payload;
    const formData = new window.FormData();
    formData.append('items', items[0]);
    const {
      data: {created, updated},
    } = yield call(
      apiClient.post,
      `users/tabs/${collection}/uploads/items`,
      formData
    );
    const {data: itemResponse} = yield call(
      apiClient.get,
      `users/tabs/${collection}/items`
    );
    yield put(getCategories({collection}));

    yield put({
      type: async.success(cx.UPLOAD_ITEMS),
      payload: {
        ...normalizeItems(itemResponse),
        itemsUpload: {
          created,
          updated,
        },
      },
    });

    yield async.report.success(cx.UPLOAD_ITEMS);
  } catch (err) {
    yield async.report.failure(cx.UPLOAD_ITEMS);
    yield async.report.error(cx.UPLOAD_ITEMS, err);
  }
}

const cleanItemName = name =>
  name
    .toLowerCase()
    .replace(/[([{]+.*?[)\]}]+/g, '')
    .replace(/\W/g, '')
    .trim();

const findMatchingItem = (existingItems, image) => {
  const imageName = image.name.split('.')[0];
  const cleanedImageName = cleanItemName(imageName);
  const exactMatchBySku = existingItems.find(item => {
    const sku = item.options && item.options.sku;

    return (
      sku === imageName ||
      sku === cleanedImageName ||
      sku === cleanItemName(imageName.split('_')[0])
    );
  });
  if (exactMatchBySku) {
    return exactMatchBySku;
  }
  const scores = orderBy(
    existingItems
      .map(item => ({
        item,
        score: compareTwoStrings(cleanItemName(item.name), cleanedImageName),
      }))
      .filter(result => result.score > 0.7),
    ['score'],
    ['desc']
  );

  return scores[0] && scores[0].item;
};

function* uploadImages(action) {
  try {
    yield async.report.pending(cx.UPLOAD_IMAGES);
    const {images, items: existingItems, collection} = action.payload;
    const matches = filter(
      images.map(image => {
        try {
          const item = findMatchingItem(existingItems, image);
          if (item) {
            return {item, image};
          }

          return null;
        } catch (err) {
          return null;
        }
      }),
      'item'
    );
    const nonMatches = difference(
      images,
      matches.map(i => i.image)
    ).map(i => i.name);
    const batches = chunk(matches, 3).map(
      batch =>
        // eslint-disable-next-line func-names
        function*() {
          const uploadImagesPromises = batch.map(({item, image}, idx) =>
            S3ImageUploader.uploadCollectionItemImage({
              image,
              tabId: collection,
              itemId: item.id,
              thumbnail: {
                order: idx,
                cropDetails: {},
              },
            })
          );
          yield all(uploadImagesPromises);

          return batch.length;
        }
    );
    let progress = 0;

    for (const batch of batches) {
      progress += yield call(batch);

      yield put({
        type: async.progress(cx.UPLOAD_IMAGES),
        payload: {
          uploadProgress: (progress / matches.length) * 100,
        },
      });
    }

    const {data: items} = yield call(
      apiClient.get,
      `users/tabs/${collection}/items`
    );
    yield put(getCategories({collection}));
    yield put({
      type: async.success(cx.UPLOAD_IMAGES),
      payload: {
        imagesUpload: {
          uploaded: images.length,
          nonMatches,
          updated: uniq(matches.map(i => i.item && i.item.id)).length,
        },
        ...normalizeItems(items),
      },
    });

    yield async.report.success(cx.UPLOAD_IMAGES);
  } catch (err) {
    yield async.report.failure(cx.UPLOAD_IMAGES);
    yield async.report.error(cx.UPLOAD_IMAGES, err);
  }
}

export default function* rootSaga() {
  yield takeLatest(cx.GET_ITEMS, getItems);
  yield takeLatest(cx.GET_ITEM, getItem);
  yield takeEvery(cx.UPLOAD_ITEMS, uploadItems);
  yield takeEvery(cx.UPLOAD_IMAGES, uploadImages);
}
