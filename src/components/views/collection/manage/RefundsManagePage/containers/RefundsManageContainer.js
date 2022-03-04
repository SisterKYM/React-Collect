import {compose} from 'recompose';
import {connect} from 'react-redux';
import React from 'react';

import {
  CREATE_PAYMENT_REFUND,
  GET_PAYMENT,
  GET_REFUNDABLE_DATA,
} from 'redux/modules/payments/constants';
import {ExpandableSidebarLayout} from 'layout';
import {GET_COLLECTION} from 'redux/modules/collections/constants';
import {StatefulView, RefundOverview} from 'elements';
import {
  createPaymentRefund,
  getPayment,
  getRefundableData,
  resendRefundConfirmationEmail,
} from 'redux/modules/payments/actions';
import {currency} from 'helpers/numbers';
import {getCollection} from 'redux/modules/collections/actions';
import asyncConnect from 'helpers/asyncConnect';
import config from 'config';
import reduceLoadStatus from 'helpers/reduceLoadStatus';

import {RefundsManage} from '../components';

const CENTS_IN_USD = 100;

const RefundsManageContainer = ({
  loadStatus,
  collectionId,
  paymentId,
  selectedPaymentItemId,
  collection,
  payment,
  refundableData,
  onClickCollectionSummary,
  onDismiss,
  onCreatePaymentRefund,
  onResendRefundConfirmationEmail,
}) => {
  const [selectedRefund, setSelectedRefund] = React.useState(null);
  const totalRefundable = React.useMemo(() => {
    if (!refundableData || !collection) {
      return 0;
    }
    const withdrawalBalanceAvailable =
      (collection.withdrawal_balance_available +
        refundableData.accountFeesRefundable / 100) *
      CENTS_IN_USD;
    const totalWithAbsorbedFees =
      refundableData.totalRefundable + refundableData.accountFeesRefundable;

    return withdrawalBalanceAvailable > totalWithAbsorbedFees
      ? totalWithAbsorbedFees
      : withdrawalBalanceAvailable;
  }, [collection, refundableData]);

  React.useEffect(() => {
    if (payment && payment.payment_method === 'cash') {
      onDismiss();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment]);

  React.useEffect(() => {
    if (selectedPaymentItemId && payment) {
      const nextSelectedRefund = payment.refunds.find((refund) => {
        const refundPaymentItemIds = refund.detail.items.map(
          ({payment_item_id}) => payment_item_id
        );

        return refundPaymentItemIds.includes(selectedPaymentItemId);
      });

      setSelectedRefund(nextSelectedRefund);
    }
  }, [payment, selectedPaymentItemId]);

  const handleViewRefund = React.useCallback((refund) => {
    setSelectedRefund((prevSelectedRefund) =>
      prevSelectedRefund && prevSelectedRefund.id === refund.id ? null : refund
    );
  }, []);
  const handleDismissRefundView = React.useCallback(() => {
    setSelectedRefund(null);
  }, [setSelectedRefund]);
  const handleClickCollectionSummary = React.useCallback(() => {
    onClickCollectionSummary(collection);
  }, [collection, onClickCollectionSummary]);
  const handleRefund = React.useCallback(
    (values) => {
      onCreatePaymentRefund({
        ...values,
        collectionId,
        paymentId,
      });
    },
    [collectionId, paymentId, onCreatePaymentRefund]
  );
  const handleResendRefundConfirmation = React.useCallback(() => {
    onResendRefundConfirmationEmail({
      collectionId,
      paymentId,
      refundId: selectedRefund.id,
    });
  }, [
    collectionId,
    paymentId,
    selectedRefund,
    onResendRefundConfirmationEmail,
  ]);

  return (
    <StatefulView status={loadStatus} resultCount={payment ? 1 : 0}>
      {collection && refundableData && (
        <ExpandableSidebarLayout
          sidebarVisible={Boolean(selectedRefund)}
          sidebar={
            payment && (
              <RefundOverview
                tabMember={payment.tab_member}
                refund={selectedRefund}
                onResendRefundConfirmation={handleResendRefundConfirmation}
              />
            )
          }
          heading="Refunds"
          headingSubtitle={
            <div className="mt2 lh-copy">
              <p className="text-16">
                Available: {currency(totalRefundable, {cents: true})}
              </p>
              <p
                className="text-14 avenir-light ttc tint pointer"
                onClick={handleClickCollectionSummary}
              >
                {config.strings.collection} Summary
              </p>
            </div>
          }
          sidebarTitle="Refund Issued"
          onClickClose={onDismiss}
          onClickCloseSidebar={handleDismissRefundView}
        >
          <RefundsManage
            selectedRefundId={selectedRefund ? selectedRefund.id : null}
            totalRefundable={totalRefundable}
            payment={payment}
            refundableData={refundableData}
            onViewRefund={handleViewRefund}
            onRefund={handleRefund}
          />
        </ExpandableSidebarLayout>
      )}
    </StatefulView>
  );
};

const enhance = compose(
  asyncConnect((props) => {
    const state = props.store.getState();

    return !state.collections.collection ||
      props.collectionId !== state.collections.collection.id
      ? [
          {
            key: GET_COLLECTION,
            promise: getCollection,
            payload: {
              collection: props.collectionId,
            },
          },
          {
            key: GET_PAYMENT,
            promise: getPayment,
            payload: {
              collection: props.collectionId,
              payment: props.paymentId,
            },
          },
          {
            key: GET_REFUNDABLE_DATA,
            promise: getRefundableData,
            payload: {
              collectionId: props.collectionId,
              paymentId: props.paymentId,
            },
          },
        ]
      : [];
  }),
  connect(
    (state) => ({
      loadStatus: reduceLoadStatus([
        state.async.statuses[GET_PAYMENT],
        state.async.statuses[GET_COLLECTION],
        state.async.statuses[GET_REFUNDABLE_DATA],
        state.async.statuses[CREATE_PAYMENT_REFUND] === 'pending'
          ? 'pending'
          : 'success',
      ]),
      collection: state.collections.collection,
      payment: state.payments.payment,
      refundableData: state.payments.refundableData,
    }),
    (dispatch) => ({
      onCreatePaymentRefund: (payload) =>
        dispatch(createPaymentRefund(payload)),
      onResendRefundConfirmationEmail: (payload) =>
        dispatch(resendRefundConfirmationEmail(payload)),
    })
  )
);

const EnhancedRefundsManageContainer = enhance(RefundsManageContainer);

export default EnhancedRefundsManageContainer;
