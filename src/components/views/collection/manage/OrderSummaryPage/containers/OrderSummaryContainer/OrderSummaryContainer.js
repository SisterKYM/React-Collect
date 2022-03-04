import {useDispatch, useSelector} from 'react-redux';
import React from 'react';

import {ExpandableSidebarLayout} from 'layout';
import {GET_COLLECTION} from 'redux/modules/collections/constants';
import {GET_PAYMENT} from 'redux/modules/payments/constants';
import {OrderSummary, OrderSummaryActionButtons, StatefulView} from 'elements';
import {getCollection} from 'redux/modules/collections/actions';
import {getPayment, updatePayment} from 'redux/modules/payments/actions';
import asyncConnect from 'helpers/asyncConnect';
import reduceLoadStatus from 'helpers/reduceLoadStatus';

import PaymentNoteContainer from './PaymentNoteContainer';
import PaymentObjectViewContainer from './PaymentObjectViewContainer';
import ResendPaymentReceiptButtonContainer from './ResendPaymentReceiptButtonContainer';

const OrderSummaryContainer = ({
  collectionId,
  paymentId,
  onOpenPaymentReport,
  onPrintShippingLabel,
  onViewRefund,
  onViewRefunds,
  printFieldViewsPathForPaymentObject,
  onDeletePayment,
  onDismiss,
}) => {
  const dispatch = useDispatch();
  const loadStatus = useSelector((state) =>
    reduceLoadStatus([
      state.async.statuses[GET_PAYMENT],
      state.async.statuses[GET_COLLECTION],
    ])
  );
  const collectionName = useSelector(
    (state) =>
      (state.collections.collection && state.collections.collection.name) || ''
  );
  const payment = useSelector((state) => state.payments.payment);
  const [selectedPaymentObject, setSelectedPaymentObject] = React.useState(
    null
  );

  React.useEffect(() => {
    if (payment) {
      setSelectedPaymentObject((prevSelectedPaymentObject) =>
        prevSelectedPaymentObject
          ? payment.payment_items.find(
              (paymentItem) => paymentItem.id === prevSelectedPaymentObject.id
            )
          : prevSelectedPaymentObject
      );
    }
  }, [payment]);

  const handleReceiveCashOrCheckPayment = React.useCallback(() => {
    dispatch(
      updatePayment({
        collection: collectionId,
        payment: paymentId,
        status: payment.status === 'available' ? 'pending' : 'approved',
      })
    );
  }, [dispatch, collectionId, paymentId, payment]);

  const handleDismissPaymentObjectView = React.useCallback(() => {
    setSelectedPaymentObject(null);
  }, []);

  return (
    <StatefulView
      status={!payment ? loadStatus : 'success'}
      resultCount={payment ? 1 : 0}
    >
      <ExpandableSidebarLayout
        sidebarVisible={Boolean(selectedPaymentObject)}
        sidebar={
          Boolean(payment) && (
            <PaymentObjectViewContainer
              collectionId={collectionId}
              paymentId={paymentId}
              tabMember={payment.tab_member}
              paymentObject={selectedPaymentObject}
              printFieldViewsPath={
                selectedPaymentObject &&
                printFieldViewsPathForPaymentObject(selectedPaymentObject)
              }
            />
          )
        }
        heading="Order Summary"
        headerButtons={
          payment && (
            <OrderSummaryActionButtons
              deletePaymentButtonVisible={payment.can_delete}
              resendPaymentReceiptButton={
                <ResendPaymentReceiptButtonContainer payment={payment} />
              }
              onOpenPaymentReport={onOpenPaymentReport}
              onDeletePayment={onDeletePayment}
            />
          )
        }
        sidebarTitle={
          (selectedPaymentObject &&
            (selectedPaymentObject.tab_item
              ? selectedPaymentObject.tab_item.name
              : selectedPaymentObject.tab_form.name)) ||
          ''
        }
        onClickClose={onDismiss}
        onClickCloseSidebar={handleDismissPaymentObjectView}
      >
        <OrderSummary
          collectionName={collectionName}
          fieldViewsVisiblePaymentObjectId={
            selectedPaymentObject ? selectedPaymentObject.id : null
          }
          payment={payment}
          paymentNote={<PaymentNoteContainer payment={payment} />}
          onPrintShippingLabel={onPrintShippingLabel}
          onViewFieldViews={setSelectedPaymentObject}
          onViewRefund={onViewRefund}
          onViewRefunds={onViewRefunds}
          onReceiveCashOrCheckPayment={handleReceiveCashOrCheckPayment}
        />
      </ExpandableSidebarLayout>
    </StatefulView>
  );
};

const enhance = asyncConnect((props) => {
  const state = props.store.getState();

  return [
    !state.collections.collection ||
    props.collectionId !== state.collections.collection.id
      ? {
          key: GET_COLLECTION,
          promise: getCollection,
          payload: {
            collection: props.collectionId,
          },
        }
      : null,
    {
      key: GET_PAYMENT,
      promise: getPayment,
      payload: {
        collection: props.collectionId,
        payment: props.paymentId,
      },
    },
  ].filter(Boolean);
});

const EnhancedOrderSummaryContainer = enhance(OrderSummaryContainer);

export default EnhancedOrderSummaryContainer;
