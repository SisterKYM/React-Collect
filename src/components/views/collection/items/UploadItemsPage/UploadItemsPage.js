import {compose} from 'recompose';
import {connect} from 'react-redux';
import {useDropzone} from 'react-dropzone';
import React from 'react';
import apiClient from 'helpers/apiClient';
import _ from 'lodash';

import {Button, Modal, ModalCloseButton, ProgressBar, Status} from 'elements';
import {GET_COLLECTION} from 'redux/modules/collections/constants';
import {
  GET_ITEMS,
  UPLOAD_ITEMS,
  UPLOAD_IMAGES,
} from 'redux/modules/items/constants';
import {asyncConnect, collectionsPathHelper} from 'helpers';
import {getCollection} from 'redux/modules/collections/actions';
import {getItems, uploadItems, uploadImages} from 'redux/modules/items/actions';

const UploadItemsPage = ({
  history,
  collection,
  itemUploadStatus,
  imageUploadStatus,
  items,
  uploadProgress,
  itemsUpload,
  imagesUpload,
  onUploadItems,
  onUploadImages,
}) => {
  const handleDismiss = React.useCallback(() => {
    history.push(collectionsPathHelper(collection, 'items'));
  }, [collection, history]);

  const handleExcelDrop = React.useCallback(
    nextItems => {
      onUploadItems({
        items: nextItems,
        collection: _.get(collection, 'id'),
      });
    },
    [collection, onUploadItems]
  );

  const handleImageDrop = React.useCallback(
    images => {
      onUploadImages({
        images,
        items,
        collection: _.get(collection, 'id'),
      });
    },
    [collection, items, onUploadImages]
  );

  const {
    getRootProps: getExcelRootProps,
    getInputProps: getExcelInputProps,
  } = useDropzone({
    multiple: false,
    onDrop: handleExcelDrop,
  });

  const {
    getRootProps: getImageRootProps,
    getInputProps: getImageInputProps,
  } = useDropzone({
    multiple: true,
    accept: 'image/*',
    onDrop: handleImageDrop,
  });

  return (
    <Modal
      footer={
        <div className="flex pa3 justify-end bg-white bt b--gray-300">
          <div className="flex items-center">
            {itemUploadStatus !== 'pending' && imageUploadStatus !== 'pending' && (
              <Button
                backgroundColorSet
                className="bg-brand"
                onClick={handleDismiss}
              >
                Done
              </Button>
            )}
          </div>
        </div>
      }
      onDismiss={handleDismiss}
    >
      <ModalCloseButton onClick={handleDismiss} />
      <div className="pt3 ph3 ph4-ns pb5">
        <h2 className="mt3 mt4-ns mb3">Upload Your Inventory</h2>
        <p className="mb2">
          Add your items. Then, drag images <b>with matching names</b> to
          associate them.
        </p>
        <p className="mb3 mb4-ns">
          <a
            href="#"
            onClick={() => {
              apiClient.fetchAndSave({
                url: `users/tabs/${_.get(
                  collection,
                  'id'
                )}/uploads/template.csv`,
                fileName: `${collection?.name}-template.csv`,
              });
            }}
          >
            Click Here
          </a>{' '}
          to download a CSV template for the items.
        </p>
        {(() => {
          if (itemUploadStatus === 'pending') {
            return <Status status="pending" />;
          }

          if (imageUploadStatus === 'pending') {
            return <ProgressBar percent={uploadProgress} />;
          }

          return (
            <>
              <div className="flex ph3 items-center tc">
                <div className="flex flex-column flex-wrap w-50 items-center">
                  <div
                    {...getExcelRootProps({
                      className: 'pa4 ba b--dashed pointer',
                    })}
                  >
                    <input {...getExcelInputProps()} />
                    <div>Drop your CSV here</div>
                    {Boolean(itemsUpload) && (
                      <>
                        <div>{itemsUpload.created} items created</div>
                        <div>{itemsUpload.updated} items updated</div>
                      </>
                    )}
                  </div>
                </div>
                {Boolean(items) && items.length !== 0 && (
                  <div className="flex flex-column flex-wrap w-50 items-center">
                    <div
                      {...getImageRootProps({
                        className: 'pa4 ba b--dashed pointer',
                      })}
                    >
                      <input {...getImageInputProps()} />
                      <div>Drag your item images</div>
                      {Boolean(imagesUpload) && (
                        <>
                          <div>{imagesUpload.uploaded} images uploaded</div>
                          <div>
                            {imagesUpload.updated} items matched and updated
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {Boolean(imagesUpload) && (
                <div className="mt5">
                  <h4>These images had no matched items:</h4>
                  <div>
                    {imagesUpload.nonMatches.map((nonMatch, key) => (
                      <div key={key}>{nonMatch}</div>
                    ))}
                  </div>
                </div>
              )}
            </>
          );
        })()}
      </div>
    </Modal>
  );
};

const enhance = compose(
  asyncConnect(props => {
    const state = props.store.getState();
    const promises = [];
    const collection = Number(props.match.params.collection);

    if (collection !== _.get(state.collections, 'collection.id')) {
      promises.push({
        key: GET_COLLECTION,
        promise: getCollection,
        payload: {collection},
      });
    }
    if (state.items.items.length === 0) {
      promises.push({
        key: GET_ITEMS,
        promise: getItems,
        payload: {collection},
      });
    }

    return promises;
  }),
  connect(
    state => ({
      collection: state.collections.collection,
      items: state.items.items,
      itemsUpload: state.items.itemsUpload,
      imagesUpload: state.items.imagesUpload,
      uploadProgress: state.items.uploadProgress,
      itemUploadStatus: state.async.statuses[UPLOAD_ITEMS],
      imageUploadStatus: state.async.statuses[UPLOAD_IMAGES],
    }),
    dispatch => ({
      onUploadItems: payload => dispatch(uploadItems(payload)),
      onUploadImages: payload => dispatch(uploadImages(payload)),
    })
  )
);

const EnhancedUploadItemsPage = enhance(UploadItemsPage);

export default EnhancedUploadItemsPage;
