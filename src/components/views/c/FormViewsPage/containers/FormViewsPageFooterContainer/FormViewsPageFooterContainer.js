import {useFetcher} from 'rest-hooks';
import {scroller} from 'react-scroll';
import _ from 'lodash';
import React from 'react';
import shortid from 'shortid';
import {useDispatch} from 'react-redux';

import {errorAlert} from 'redux/modules/growl/actions';
import CartFormResource from 'resources/CartFormResource';
import S3ImageUploader from 'helpers/S3ImageUploader';
import useMedia from 'hooks/useMedia';

import {FormViewsPageFooter} from './components';

const isBase64Encoded = (data) => {
  try {
    window.atob(data.replace(/^data:image\/(png|jpg);base64,/, ''));

    return true;
  } catch (err) {
    return false;
  }
};

const FormViewsPageFooterContainer = ({
  collectionSlug,
  cartUuid,
  shippingEnabled,
  collectionHasFormsOnly,
  formViews,
  fieldViewsValue,
  onChangeErrorMessages,
  onReturnToCart,
  onProceedToPayment,
}) => {
  const createCartForm = useFetcher(CartFormResource.createShape());

  const [loading, setLoading] = React.useState(false);
  const {notSmall} = useMedia();

  const addFormsToCart = React.useCallback(async () => {
    try {
      setLoading(true);

      const createCartFormPromises = formViews.map(async (formView) => {
        const formViewFieldViewIds = formView.fields
          .map(({id}) => id)
          .map(String);

        const filteredFieldViewsValue = _.pickBy(
          fieldViewsValue,
          (_value, fieldViewId) => formViewFieldViewIds.includes(fieldViewId)
        );

        const formViewFieldViewsValuePromises = _.map(
          filteredFieldViewsValue,
          async (value, fieldViewId) => {
            const formViewField = formView.fields.find(
              ({id}) => String(id) === fieldViewId
            );

            if (
              (formViewField.field_type === 'signature' ||
                formViewField.field_type === 'image') &&
              isBase64Encoded(value)
            ) {
              const url = await S3ImageUploader.uploadSignatureBase64(
                {
                  dataUri: value,
                  contentType: 'image/png',
                  objectName: `${shortid.generate()}-signature-${cartUuid}-${fieldViewId}.png`,
                },
                {
                  collectionSlug,
                  cartUuid,
                }
              );

              return [fieldViewId, url];
            }

            return [fieldViewId, value];
          }
        );
        const formViewFieldViewsValuePromisesResolved = await Promise.all(
          formViewFieldViewsValuePromises
        );
        const formViewFieldViewsValue = _.fromPairs(
          formViewFieldViewsValuePromisesResolved
        );

        const cartFieldValues = _.map(
          formViewFieldViewsValue,
          (value, fieldViewId) => ({
            item_field_id: Number(fieldViewId),
            value,
          })
        ).filter(({value}) => Boolean(value));

        return cartFieldValues.length === 0
          ? null
          : createCartForm(
              {collectionSlug, cartUuid},
              {
                form_id: formView.id,
                cart_field_values: cartFieldValues,
              }
            );
      });

      await Promise.all(createCartFormPromises);
    } finally {
      setLoading(false);
    }
  }, [formViews, fieldViewsValue, collectionSlug, cartUuid, createCartForm]);

  const dispatch = useDispatch();

  const handleProceedToPayment = async () => {
    const requiredFieldViewIds = _.flatMap(
      formViews,
      (formView) => formView.fields
    )
      .filter(({required}) => required)
      .map(({id}) => id);

    const missingRequiredFieldViewIds = Object.keys(
      _.pickBy(
        fieldViewsValue,
        (value, fieldViewId) =>
          requiredFieldViewIds.includes(Number(fieldViewId)) && !value
      )
    );

    if (missingRequiredFieldViewIds.length !== 0) {
      onChangeErrorMessages(
        _.fromPairs(
          missingRequiredFieldViewIds.map((id) => [
            id,
            'This field is required',
          ])
        )
      );
      scroller.scrollTo(`field-${missingRequiredFieldViewIds[0]}`, {
        smooth: true,
        duration: 300,
        offset: -240,
      });

      dispatch(
        errorAlert({
          title: 'Missing Required Fields',
          body: 'Please complete all required fields.',
        })
      );

      return;
    }

    await addFormsToCart();

    onProceedToPayment();
  };

  return (
    <FormViewsPageFooter
      submitting={loading}
      shippingIsNextStep={!notSmall && shippingEnabled}
      collectionHasFormsOnly={collectionHasFormsOnly}
      onReturnToCart={onReturnToCart}
      onProceedToPayment={handleProceedToPayment}
    />
  );
};

export default FormViewsPageFooterContainer;
