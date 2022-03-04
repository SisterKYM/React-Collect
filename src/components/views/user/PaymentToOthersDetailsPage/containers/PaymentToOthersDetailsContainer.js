import {useSelector} from 'react-redux';
import React from 'react';

import {ExpandableSidebarLayout} from 'layout';
import {GET_PAYMENT_TO_OTHERS} from 'redux/modules/session/constants';
import {
  OrderSummary,
  OrderSummaryActionButtons,
  PaymentObjectView,
  StatefulView,
} from 'elements';
import {asyncConnect} from 'helpers';
import {getPaymentToOthers} from 'redux/modules/session/actions';

const PaymentToOthersDetailsContainer = ({
  onViewRefund,
  onViewRefunds,
  onOpenPaymentReport,
  onDismiss,
}) => {
  const payment = useSelector((state) => state.session.paymentToOthers);
  const status = useSelector(
    (state) => state.async.statuses[GET_PAYMENT_TO_OTHERS]
  );
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

  const printFieldViewsPath =
    payment && selectedPaymentObject
      ? `/user/payments/${payment.id}/payment-item/${selectedPaymentObject.id}`
      : '';

  const handleDismissPaymentObjectView = React.useCallback(() => {
    setSelectedPaymentObject(null);
  }, []);

  return (
    <StatefulView status={status} resultCount={payment ? 1 : 0}>
      <ExpandableSidebarLayout
        sidebarVisible={Boolean(selectedPaymentObject)}
        sidebar={
          Boolean(payment) && (
            <PaymentObjectView
              readOnly
              tabMember={payment.tab_member}
              paymentObject={selectedPaymentObject}
              printFieldViewsPath={printFieldViewsPath}
            />
          )
        }
        title={payment ? payment.tab.name : ''}
        heading="Order Summary"
        headerButtons={
          payment && (
            <OrderSummaryActionButtons
              deletePaymentButtonVisible={false}
              onOpenPaymentReport={onOpenPaymentReport}
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
          fieldViewsVisiblePaymentObjectId={
            selectedPaymentObject ? selectedPaymentObject.id : null
          }
          payment={payment}
          onViewFieldViews={setSelectedPaymentObject}
          onViewRefund={onViewRefund}
          onViewRefunds={onViewRefunds}
        />
      </ExpandableSidebarLayout>
    </StatefulView>
  );
};

const enhance = asyncConnect((props) => [
  {
    key: GET_PAYMENT_TO_OTHERS,
    promise: getPaymentToOthers,
    payload: {
      paymentToOtherId: props.paymentId,
    },
  },
]);

const EnhancedPaymentToOthersDetailsContainer = enhance(
  PaymentToOthersDetailsContainer
);

export default EnhancedPaymentToOthersDetailsContainer;
