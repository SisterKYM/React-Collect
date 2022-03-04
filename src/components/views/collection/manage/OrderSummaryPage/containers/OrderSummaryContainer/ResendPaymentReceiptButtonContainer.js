import {connect} from 'react-redux';
import React from 'react';

import {CommonButton} from 'elements';
import {SEND_RECEIPT} from 'redux/modules/payments/constants';
import {sendReceipt} from 'redux/modules/payments/actions';

const ResendPaymentReceiptButtonContainer = ({
  payment,
  sendReceiptStatus,
  onSendReceipt,
}) => {
  const handleResendReceipt = React.useCallback(() => {
    onSendReceipt({
      payment: payment.id,
      collection: payment.tab_id,
      email: payment.tab_member.email,
    });
  }, [onSendReceipt, payment.id, payment.tab_id, payment.tab_member.email]);

  return (
    <CommonButton
      className="avenir-medium gray-600 bg-gray-250 pt-12"
      status={sendReceiptStatus}
      onClick={handleResendReceipt}
    >
      Resend Receipt
    </CommonButton>
  );
};

const enhance = connect(
  state => ({
    sendReceiptStatus: state.async.statuses[SEND_RECEIPT],
  }),
  dispatch => ({
    onSendReceipt: payload => dispatch(sendReceipt(payload)),
  })
);

const EnhancedResendPaymentReceiptButtonContainer = enhance(
  ResendPaymentReceiptButtonContainer
);

export default EnhancedResendPaymentReceiptButtonContainer;
