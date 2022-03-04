import React from 'react';

import {Button, CommonButton} from 'elements';
import Tooltip from 'elements/Tooltip';
import {ReactComponent as TrashIcon} from 'theme/images/trash.svg';

const trashButtonStyle = {
  height: '30px',
  width: '30px',
  padding: 0,
};

const OrderSummaryActionButtons = ({
  deletePaymentButtonVisible,
  resendPaymentReceiptButton,
  onOpenPaymentReport,
  onDeletePayment,
}) => (
  <div className="flex items-center">
    {deletePaymentButtonVisible && (
      <Tooltip
        contentContainerClassName="order-summary-action-buttons-tooltip"
        text="Delete record"
      >
        <Button
          small
          colorSet
          backgroundColorSet
          className="mh2 avenir-medium gray-500 bg-gray-300 flex justify-center items-center"
          onClick={onDeletePayment}
          style={trashButtonStyle}
        >
          <TrashIcon className="w1 f3 gray-400" />
        </Button>
        <style jsx>{`
          :global(.order-summary-action-buttons-tooltip) {
            left: -10%;
            top: -60px;
          }
        `}</style>
      </Tooltip>
    )}
    <CommonButton
      className="pt-12 dn db-ns mr2 bg-tint white"
      onClick={onOpenPaymentReport}
    >
      Print
    </CommonButton>
    {resendPaymentReceiptButton}
  </div>
);

const EnhancedOrderSummaryActionButtons = React.memo(OrderSummaryActionButtons);

export default EnhancedOrderSummaryActionButtons;
