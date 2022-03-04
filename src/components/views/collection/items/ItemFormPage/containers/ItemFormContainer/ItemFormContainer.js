import {getFormValues, getFormSyncErrors, setSubmitFailed} from 'redux-form';
import {useDispatch, useSelector} from 'react-redux';
import {useFetcher, useInvalidator, useResource} from 'rest-hooks';
import _ from 'lodash';
import React from 'react';

import {BottomBarWithButton, VerificationPrompt} from 'elements';
import {clearAlerts, errorAlert} from 'redux/modules/growl/actions';
import {isNumeric} from 'helpers/numbers';
import {readApiError} from 'helpers/apiResponseHelpers';
import {batchRequestHelper} from 'redux/modules/fields/helpers';
import {zIndex as drawerMenuZIndex} from 'layout/components/DrawerMenu';
import CollectionResource from 'resources/CollectionResource';
import ImagesUtils from 'helpers/ImagesUtils';
import ItemFieldResource from 'resources/ItemFieldResource';
import ItemResource from 'resources/ItemResource';
import S3ImageUploader from 'helpers/S3ImageUploader';
import apiClient from 'helpers/apiClient';

import {
  ITEM_FORM_ADVANCED_SETTINGS_NAME,
  ITEM_FORM_DETAILS_NAME,
  ITEM_FORM_IMAGES_AND_DESCRIPTION_NAME,
  ItemFormAdvancedSettings,
  ItemFormHeader,
  ItemFormImagesAndDescription,
  ItemFormItemFields,
  ItemFormSidebar,
} from '../../components';
import ItemFormDetailsContainer from './ItemFormDetailsContainer';

const DEFAULT_ITEM_FIELD = {
  id: _.uniqueId('local-'),
  name: '',
  required: false,
  field_type: 'text',
  edit: true,
};

const defaultFieldSelector = getFormValues(
  `CollectionObjectFieldForm-${DEFAULT_ITEM_FIELD.id}`
);
const itemFormDetailsSyncErrorsSelector = getFormSyncErrors(
  ITEM_FORM_DETAILS_NAME
);
const itemFormAdvancedSettingsSyncErrorsSelector = getFormSyncErrors(
  ITEM_FORM_ADVANCED_SETTINGS_NAME
);
const itemFormImagesAndDescriptionSyncErrorsSelector = getFormSyncErrors(
  ITEM_FORM_IMAGES_AND_DESCRIPTION_NAME
);

const getOrderedImages = (images) =>
  _.sortBy(
    images.map((image, idx) => ({
      ...image,
      metadata: {
        ...image.metadata,
        thumbnail: {
          ...(image.metadata.thumbnail || {}),
          order: image.metadata.thumbnail
            ? image.metadata.thumbnail.order
            : idx,
        },
      },
    })),
    'metadata.thumbnail.order'
  );

const ItemFormContainer = ({
  locationState,
  collectionId,
  itemId,
  onUpgradePlan,
  onDeclineAddImage,
  onDismiss,
}) => {
  const [collection, item, itemFields, items] = useResource(
    [CollectionResource.invalidIfStaleDetailShape(), {id: collectionId}],
    [ItemResource.detailShape(), itemId ? {collectionId, id: itemId} : null],
    [ItemFieldResource.listShape(), itemId ? {collectionId, itemId} : null],
    [ItemResource.listShape(), {collectionId}]
  );
  const invalidateItemList = useInvalidator(ItemResource.listShape());
  const invalidateItemFieldList = useInvalidator(ItemFieldResource.listShape());
  const createItem = useFetcher(ItemResource.createShape());
  const updateItem = useFetcher(ItemResource.partialUpdateShape());

  const dispatch = useDispatch();

  const userIsBasic = !collection?.is_pro;
  const availableQuantityOneByDefault = useSelector(
    (state) =>
      state.session &&
      state.session.user &&
      state.session.user.availableQuantityOneByDefault
  );
  const defaultField = useSelector((state) => defaultFieldSelector(state));

  const values = useSelector((state) => ({
    ...(state.form[ITEM_FORM_DETAILS_NAME]?.values || {}),
    ...(state.form[ITEM_FORM_ADVANCED_SETTINGS_NAME]?.values || {}),
    ...(state.form[ITEM_FORM_IMAGES_AND_DESCRIPTION_NAME]?.values || {}),
  }));
  const errors = useSelector((state) => ({
    ...itemFormDetailsSyncErrorsSelector(state),
    ...itemFormAdvancedSettingsSyncErrorsSelector(state),
    ...itemFormImagesAndDescriptionSyncErrorsSelector(state),
  }));

  const [saveItemLoading, setSaveItemLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [images, setImages] = React.useState([]);
  const [imagesAreLoading, setImagesAreLoading] = React.useState(false);
  const [fields, setFields] = React.useState(
    itemFields || [DEFAULT_ITEM_FIELD]
  );
  const [sidebarItemKey, setSidebarItemKey] = React.useState('ITEM_DETAILS');
  const [
    saveWithUnsavedQuestionsConfirmVisible,
    setSaveWithUnsavedQuestionsConfirmVisible,
  ] = React.useState(false);

  const saveButtonDisabled = imagesAreLoading || saveItemLoading;

  const updateItemImages = React.useCallback(async (imagesArg) => {
    setImagesAreLoading(true);
    const orderedImages = getOrderedImages(imagesArg);
    const fetchImagesResponses = await Promise.all(
      orderedImages.map((image) =>
        image ? fetch(ImagesUtils.getImageUrl(image)) : undefined
      )
    );
    const imageBlobs = await Promise.all(
      fetchImagesResponses.map((res) => (res ? res.blob() : undefined))
    );
    setImages(
      imageBlobs.map((blob, idx) => {
        if (!blob) {
          return null;
        }

        const itemImage = orderedImages[idx];
        const file = new Blob([blob], {
          type: itemImage.metadata.contentType,
          lastModified: new Date(itemImage.updated_at),
        });
        file.preview = URL.createObjectURL(file);

        return {
          id: itemImage.id,
          thumbnailCrop:
            Object.keys(itemImage.metadata.thumbnail.cropDetails || {})
              .length === 0
              ? null
              : itemImage.metadata.thumbnail.cropDetails,
          image: file,
        };
      })
    );
    setImagesAreLoading(false);
  }, []);

  React.useEffect(() => {
    if (item && item.images) {
      updateItemImages(item.images);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  React.useEffect(() => {
    if (
      !itemId &&
      !collection.is_pro &&
      items.length >= (collection.itemLimit || 15)
    ) {
      onUpgradePlan();
    }
  }, [collection.is_pro, collection.itemLimit, itemId, items]); // eslint-disable-line react-hooks/exhaustive-deps

  const getPayload = React.useCallback(
    (values, uploadedListingsImageIdsMap = {}) => {
      const availableQuantityEnabled =
        typeof values.available_quantity_enabled === 'undefined'
          ? item
            ? !_.isNil(item.available_quantity)
            : false
          : values.available_quantity_enabled;
      const availableQuantity =
        typeof values.available_quantity === 'undefined'
          ? !item &&
            availableQuantityOneByDefault &&
            values.amount_type === 'fixed'
            ? 1
            : item
            ? item.available_quantity
            : null
          : values.available_quantity;

      const variantsValue = _.get(values, 'options.variants');
      const amountType =
        values.options.variants && values.options.variants.enabled
          ? 'fixed'
          : values.amount_type;

      return {
        ...values,
        tab_id: collectionId,
        amount: amountType === 'open' ? null : values.amount || 0,
        amount_type: amountType,
        allow_quantity: values.amount_type !== 'open' && values.allow_quantity,
        available_quantity: availableQuantityEnabled ? availableQuantity : null,
        options: {
          ...values.options,
          variants: {
            enabled: false,
            ...(item ? item.options.variants || {} : {}),
            ...values.options.variants,
            options: ((variantsValue && variantsValue.options) || []).filter(
              ({key, values}) => key.length !== 0 && values.length !== 0
            ),
            listings: ((variantsValue && variantsValue.listings) || []).map(
              ({localImage, amount, retailPrice, ...listing}) => ({
                ...listing,
                imageId:
                  uploadedListingsImageIdsMap[listing.uuid] || listing.imageId,
                amount: Number.parseFloat(amount),
                retailPrice: retailPrice
                  ? Number.parseFloat(retailPrice)
                  : undefined,
              })
            ),
          },
          recurring:
            values.options &&
            values.options.recurring &&
            values.options.recurring.enabled
              ? values.options.recurring
              : {enabled: false},
        },
      };
    },
    [collectionId, availableQuantityOneByDefault, item]
  );

  const handleSave = React.useCallback(async () => {
    setSaveWithUnsavedQuestionsConfirmVisible(false);
    setSaveItemLoading(true);
    setErrorMessage(null);

    const valuesListingsImages = _.get(values, 'options.variants.listings', [])
      .map((listing) =>
        listing.localImage
          ? {
              listingUuid: listing.uuid,
              ...listing.localImage,
            }
          : null
      )
      .filter(Boolean);
    let uploadedListingImages = [];

    try {
      if (itemId) {
        let uploadedImages = [];
        const imagesToUpload = (values.images || [])
          .map((valueImage, idx) =>
            valueImage
              ? {
                  ...valueImage,
                  order: idx,
                }
              : null
          )
          .filter(Boolean);
        if (values.images) {
          const imagesToDelete = _.differenceBy(
            item.images || [],
            values.images,
            'id'
          ).concat(values.images.filter((i) => i.image?.reupload));
          const deleteImagePromises = imagesToDelete.map((image) =>
            S3ImageUploader.deleteCollectionItemImage({
              id: image.id,
              collectionId,
              itemId,
            })
          );
          const uploadImagePromises = imagesToUpload.map((image) =>
            S3ImageUploader.uploadCollectionItemImage({
              itemId,
              imageId: image.image?.reupload ? null : image.id,
              tabId: collectionId,
              image: image.image,
              thumbnail: {
                order: image.order,
                cropDetails: image.thumbnailCrop || {},
              },
            })
          );
          await Promise.all(deleteImagePromises);
          uploadedImages = await Promise.all(uploadImagePromises);
        }

        if (valuesListingsImages.length !== 0) {
          const existingImagesCount = (values.images || item.images || [])
            .length;
          const uploadImagePromises = valuesListingsImages.map((image, idx) =>
            S3ImageUploader.uploadCollectionItemImage({
              itemId,
              imageId: image.id,
              tabId: collectionId,
              image: image.image,
              thumbnail: {
                order: existingImagesCount + idx,
                cropDetails: image.thumbnailCrop || {},
              },
            })
          );

          uploadedListingImages = await Promise.all(uploadImagePromises);
        }

        const updatedListingImageIdsMap = _.fromPairs(
          imagesToUpload
            .map((image, idx) => {
              const listing = (
                (item.options.variants && item.options.variants.listings) ||
                []
              ).find(({imageId}) => imageId === image.id);
              const updatedImageId = uploadedImages[idx].id;

              return listing ? [listing.uuid, updatedImageId] : null;
            })
            .filter(Boolean)
        );
        const uploadedListingsImageIdsMap = _.fromPairs(
          valuesListingsImages.map(({listingUuid}, idx) => [
            listingUuid,
            uploadedListingImages[idx].id,
          ])
        );
        let payload = getPayload(values, {
          ...uploadedListingsImageIdsMap,
          ...updatedListingImageIdsMap,
        });
        if (
          payload.available_quantity !== undefined &&
          !isNumeric(payload.available_quantity)
        ) {
          payload = {
            ...payload,
            available_quantity: null,
          };
        }

        if (fields && fields.length !== 0) {
          const newFields = fields.filter(
            (field) => String(field.id).startsWith('local') && !field.delete
          );
          const deletedFields = fields.filter(
            (field) => !String(field.id).startsWith('local') && field.delete
          );
          const updatedFields = fields.filter(
            (field) => !String(field.id).startsWith('local') && !field.delete
          );
          const promises = [];
          if (newFields.length !== 0) {
            promises.push(
              apiClient.patch(
                'batch',
                batchRequestHelper(
                  newFields,
                  'post',
                  `api/users/tabs/${collectionId}/items/${itemId}/fields`
                )
              )
            );
          }
          if (updatedFields.length !== 0) {
            promises.push(
              apiClient.patch(
                'batch',
                batchRequestHelper(
                  updatedFields,
                  'patch',
                  (field) =>
                    `api/users/tabs/${collectionId}/items/${itemId}/fields/${field.id}`
                )
              )
            );
          }
          if (deletedFields.length !== 0) {
            promises.push(
              apiClient.patch(
                'batch',
                batchRequestHelper(
                  deletedFields,
                  'delete',
                  (field) =>
                    `api/users/tabs/${collectionId}/items/${itemId}/fields/${field.id}`
                )
              )
            );
          }
          if (promises.length > 0) {
            await Promise.all(promises);
          }
        }
        await updateItem({id: itemId, collectionId}, payload);
      } else {
        const payload = getPayload(values);
        const createdItem = await createItem({collectionId}, payload);

        if (fields && fields.length !== 0) {
          const newFields = fields
            .filter(
              (field) =>
                String(field.id).startsWith('local') &&
                !field.delete &&
                !field.edit
            )
            .map(({id, ...field}, idx) => ({...field, position: idx}));
          if (newFields.length > 0) {
            await apiClient.patch(
              'batch',
              batchRequestHelper(
                newFields,
                'post',
                `api/users/tabs/${collectionId}/items/${createdItem.id}/fields`
              )
            );
          }
        }
        if (values.images) {
          const uploadImagesPromises = values.images
            .map((valueImage, idx) =>
              valueImage
                ? {
                    ...valueImage,
                    order: idx,
                  }
                : null
            )
            .filter(Boolean)
            .map((image, idx) =>
              S3ImageUploader.uploadCollectionItemImage({
                image: image.image,
                imageId: image.id,
                tabId: collectionId,
                itemId: createdItem.id,
                thumbnail: {
                  order: idx,
                  cropDetails: image.thumbnailCrop || {},
                },
              })
            );

          await Promise.all(uploadImagesPromises);
        }

        if (valuesListingsImages.length !== 0) {
          const existingImagesCount = (values.images || []).length;

          const uploadImagesPromises = valuesListingsImages.map((image, idx) =>
            S3ImageUploader.uploadCollectionItemImage({
              image: image.image,
              imageId: image.id,
              tabId: collectionId,
              itemId: createdItem.id,
              thumbnail: {
                order: existingImagesCount + idx,
                cropDetails: image.thumbnailCrop || {},
              },
            })
          );

          const uploadedListingsImages = await Promise.all(
            uploadImagesPromises
          );
          const uploadedListingsImageIdsMap = _.fromPairs(
            valuesListingsImages.map(({listingUuid}, idx) => [
              listingUuid,
              uploadedListingsImages[idx].id,
            ])
          );
          const updateItemPayload = getPayload(
            values,
            uploadedListingsImageIdsMap
          );

          await updateItem(
            {
              id: createdItem.id,
              collectionId,
            },
            updateItemPayload
          );
        }

        invalidateItemList({collectionId});
      }

      invalidateItemFieldList({collectionId, itemId});

      onDismiss();
    } catch (err) {
      const nextErrorMessage = readApiError(err, {
        recurring_contracts_active: () =>
          `This item has active recurring payers and cannot be updated. If you wish to make changes, please clone the item and hide this version.`,
      });

      if (nextErrorMessage) {
        dispatch(clearAlerts());
        dispatch(errorAlert({body: nextErrorMessage}));
      }

      setErrorMessage(nextErrorMessage);
    } finally {
      setSaveItemLoading(false);
    }
  }, [
    item,
    fields,
    collectionId,
    getPayload,
    itemId,
    values,
    onDismiss,
    updateItem,
    createItem,
    invalidateItemList,
    invalidateItemFieldList,
    dispatch,
  ]);

  const handleClickSave = React.useCallback(async () => {
    const editingFields = fields.filter(
      ({id, edit}) => id !== DEFAULT_ITEM_FIELD.id && edit
    );

    if (Object.keys(errors).length !== 0) {
      dispatch(clearAlerts());

      if (errors.name) {
        setSidebarItemKey('ITEM_DETAILS');
        dispatch(
          errorAlert({
            title: 'Please add name',
            body: 'Item Name required',
          })
        );
      } else if (errors.amount) {
        setSidebarItemKey('ITEM_DETAILS');
        dispatch(
          errorAlert({
            title: 'Please add amount',
            body: 'Amount is required',
          })
        );
      } else if (errors.available_quantity) {
        setSidebarItemKey('ADVANCED_SETTINGS');
        dispatch(
          errorAlert({
            title: 'Please add total quantity available',
            body: 'Must enter total quantity available',
          })
        );
      } else if (
        errors.variants ||
        (errors.options &&
          errors.options.variants &&
          errors.options.variants.options)
      ) {
        dispatch(
          errorAlert({
            title: 'Please add variant option',
            body: 'Must add option name and value',
          })
        );
      } else {
        dispatch(
          setSubmitFailed(ITEM_FORM_DETAILS_NAME, ...Object.keys(errors))
        );
      }
    } else if (
      editingFields.length !== 0 ||
      (defaultField && defaultField.name.length !== 0)
    ) {
      setSaveWithUnsavedQuestionsConfirmVisible(true);
      setSidebarItemKey('ITEM_QUESTIONS');
    } else {
      handleSave();
    }
  }, [defaultField, dispatch, errors, fields, handleSave]);

  const availableQuantityOne =
    values.amount_type === 'fixed' && availableQuantityOneByDefault;

  const detailsInitialValues = React.useMemo(() => {
    const defaultVariantsOptions = [{key: '', values: []}];

    const valuesSource = item ||
      locationState.formValues || {
        amount_type: 'fixed',
        name: (() => (values.name ? values.name : null))(),
        amount: (() => (values.amount ? values.amount : null))(),
        options: {
          variants: {
            options: defaultVariantsOptions,
          },
        },
      };

    return {
      ..._.pick(valuesSource, ['name', 'parent_id', 'amount_type', 'amount']),
      options: {
        subcategoryId: _.get(valuesSource, 'options.subcategoryId'),
        recurring: _.get(valuesSource, 'options.recurring'),
        variants: {
          ..._.get(valuesSource, 'options.variants'),
          options: _.get(
            valuesSource,
            'options.variants.options',
            defaultVariantsOptions
          ),
        },
      },
    };
  }, [item, values, locationState]);

  const handleSaveWithUnsavedQuestionsDismiss = React.useCallback(() => {
    setSaveWithUnsavedQuestionsConfirmVisible(false);
  }, []);

  return (
    <div className="absolute absolute--fill flex flex-column">
      <div className="item-form-content-container w-100 flex-auto overflow-y-scroll">
        <ItemFormHeader editItem={Boolean(item)} onClickCross={onDismiss} />
        <div className="relative flex min-h-100 h-auto">
          <ItemFormSidebar
            className="flex-shrink-0"
            selectedItemKey={sidebarItemKey}
            hiddenItemKeys={
              values.options?.variants?.enabled ? ['ADVANCED_SETTINGS'] : []
            }
            onSelectItem={setSidebarItemKey}
          />
          <div className="relative flex-auto mw7 ph3 ph4-ns mt4 mt0-ns">
            {sidebarItemKey === 'ITEM_DETAILS' && (
              <ItemFormDetailsContainer
                initialValues={detailsInitialValues}
                collectionId={collectionId}
                isTeamUser={collection.is_team || false}
                isProUser={collection.is_pro || false}
                items={items}
                item={item}
                onSubmit={_.noop}
              />
            )}
            {sidebarItemKey === 'ADVANCED_SETTINGS' && (
              <ItemFormAdvancedSettings
                initialValues={_.pick(
                  {
                    ...item,
                    available_quantity_enabled: item
                      ? !_.isNil(item.available_quantity)
                      : availableQuantityOne,
                    available_quantity: item
                      ? !_.isNil(item.available_quantity)
                        ? item.available_quantity
                        : null
                      : availableQuantityOne
                      ? 1
                      : null,
                  },
                  [
                    'allow_quantity',
                    'available_quantity',
                    'available_quantity_enabled',
                    'options.makeAvailableQuantityPublic',
                    'required',
                  ]
                )}
                availableQuantityEnabled={values.available_quantity_enabled}
                amountType={values.amount_type}
                onSubmit={_.noop}
              />
            )}
            {sidebarItemKey === 'IMAGES_AND_DESCRIPTION' && (
              <ItemFormImagesAndDescription
                initialValues={{
                  description: item ? item.description : '',
                  images,
                  ...locationState.imagesAndDescriptionFormValues,
                }}
                userIsBasic={userIsBasic}
                onSubmit={_.noop}
                onDeclineAddImage={onDeclineAddImage}
              />
            )}
            {sidebarItemKey === 'ITEM_QUESTIONS' && (
              <ItemFormItemFields
                itemId={itemId}
                fields={fields}
                onChangeFields={setFields}
              />
            )}
          </div>
        </div>
      </div>
      <div className="save-item-button-wrapper">
        <BottomBarWithButton
          className="bt b--gray-300"
          buttonTitle="Save Item"
          errorMessage={errorMessage}
          disabled={saveButtonDisabled}
          loading={saveItemLoading}
          onButtonClick={handleClickSave}
        />
      </div>
      {saveWithUnsavedQuestionsConfirmVisible && (
        <VerificationPrompt
          flexibleHeight
          onDismiss={handleSaveWithUnsavedQuestionsDismiss}
          title="You haven't saved all of your questions"
          description="Are you sure you want to continue? Unsaved questions will be lost."
          okButtonLabel="Continue"
          onOkButtonClick={handleSave}
          cancelButtonLabel="Cancel"
          onCancelButtonClick={handleSaveWithUnsavedQuestionsDismiss}
        />
      )}
      <style jsx>{`
        :global(.flex-shrink-0) {
          flex-shrink: 0;
        }
        .item-form-content-container {
          -webkit-overflow-scrolling: touch;
        }
        .save-item-button-wrapper {
          z-index: ${drawerMenuZIndex};
        }
      `}</style>
    </div>
  );
};

const EnhancedItemFormContainer = React.memo(ItemFormContainer);

export default EnhancedItemFormContainer;
