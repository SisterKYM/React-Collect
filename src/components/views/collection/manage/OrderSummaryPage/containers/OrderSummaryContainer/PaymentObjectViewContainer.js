import {Form, Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import _ from 'lodash';

import {
  CREATE_ITEM_FIELD_VALUE,
  UPDATE_ITEM_FIELD_VALUE,
} from 'redux/modules/fields/constants';
import {GET_FORM} from 'redux/modules/forms/constants';
import {GET_ITEM} from 'redux/modules/items/constants';
import {PaymentObjectView} from 'elements';
import {asyncConnect} from 'helpers';
import {
  createItemFieldValue,
  updateItemFieldValue,
} from 'redux/modules/fields/actions';
import {getForm} from 'redux/modules/forms/actions';
import {getItem} from 'redux/modules/items/actions';
import {setStatus} from 'redux/modules/async/actions';

const PaymentObjectViewContainer = ({
  collectionId,
  paymentId,
  tabMember,
  paymentObject,
  printFieldViewsPath,
}) => {
  const dispatch = useDispatch();
  const fields = useSelector((state) =>
    paymentObject.tab_item
      ? (state.items.item && state.items.item.fields) || []
      : (state.forms.form && state.forms.fields) || []
  );
  const createItemFieldValueStatus = useSelector(
    (state) => state.async.statuses[CREATE_ITEM_FIELD_VALUE]
  );
  const updateItemFieldValueStatus = useSelector(
    (state) => state.async.statuses[UPDATE_ITEM_FIELD_VALUE]
  );

  React.useEffect(() => {
    if (paymentObject.tab_item) {
      dispatch(setStatus(GET_ITEM, undefined));
    } else {
      dispatch(setStatus(GET_FORM, undefined));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentObject]);

  const initialValues = React.useMemo(
    () =>
      _.fromPairs(
        paymentObject.item_field_views.map((fieldView) => [
          fieldView.id,
          fieldView.value,
        ])
      ),
    [paymentObject]
  );

  const handleSubmit = React.useCallback(
    (values) => {
      Object.keys(values).forEach((fieldViewId) => {
        if (initialValues[fieldViewId] === values[fieldViewId]) {
          return;
        }

        const fieldView = paymentObject.item_field_views.find(
          ({id}) => String(id) === fieldViewId
        );

        const commonPayload = {
          collectionId,
          paymentId,
          id: fieldViewId,
          objectId: paymentObject.tab_item
            ? paymentObject.tab_item.id
            : paymentObject.tab_form.id,
          objectType: paymentObject.tab_item ? 'item' : 'form',
          value: values[fieldViewId],
        };

        if (!fieldView) {
          dispatch(
            createItemFieldValue({
              ...commonPayload,
              paymentItemId: paymentObject.id,
            })
          );
        } else {
          dispatch(
            updateItemFieldValue({
              ...commonPayload,
              itemFieldValueId: fieldView.id,
            })
          );
        }
      });
    },
    [initialValues, paymentObject, collectionId, paymentId, dispatch]
  );

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({dirty, handleReset}) => (
        <Form>
          <PaymentObjectView
            loading={
              createItemFieldValueStatus === 'pending' ||
              updateItemFieldValueStatus === 'pending'
            }
            dirty={dirty}
            tabMember={tabMember}
            paymentObject={paymentObject}
            fields={fields}
            printFieldViewsPath={printFieldViewsPath}
            onCancel={handleReset}
          />
        </Form>
      )}
    </Formik>
  );
};

const enhance = asyncConnect((props) => [
  props.paymentObject.tab_item
    ? {
        key: GET_ITEM,
        promise: getItem,
        payload: {
          collection: props.collectionId,
          item: props.paymentObject.tab_item.id,
        },
      }
    : {
        key: GET_FORM,
        promise: getForm,
        payload: {
          collection: props.collectionId,
          form: props.paymentObject.tab_form.id,
        },
      },
]);

const EnhancedPaymentObjectViewContainer = enhance(PaymentObjectViewContainer);

export default EnhancedPaymentObjectViewContainer;
