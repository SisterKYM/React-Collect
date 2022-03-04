import {connect} from 'react-redux';
import React from 'react';

import {UPDATE_PAYMENT} from 'redux/modules/payments/constants';
import {updatePayment} from 'redux/modules/payments/actions';

import {PaymentNote} from '../../components';

const PaymentNoteContainer = ({
  payment,
  updatePaymentStatus,
  onUpdatePayment,
}) => {
  const handleSubmitNote = data => {
    onUpdatePayment({
      collection: payment.tab_id,
      payment: payment.id,
      note: data.note,
    });
  };

  return (
    <PaymentNote
      updatePaymentStatus={updatePaymentStatus}
      note={payment.note}
      onSubmitNote={handleSubmitNote}
    />
  );
};

const enhance = connect(
  state => ({
    updatePaymentStatus: state.async.statuses[UPDATE_PAYMENT],
  }),
  dispatch => ({
    onUpdatePayment: payload => dispatch(updatePayment(payload)),
  })
);

const EnhancedPaymentNoteContainer = enhance(PaymentNoteContainer);

export default EnhancedPaymentNoteContainer;
