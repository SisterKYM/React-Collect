import {connect} from 'react-redux';
import React from 'react';

import {VerificationPrompt} from 'elements';
import {DELETE_PAYMENT} from 'redux/modules/payments/constants';
import {deletePayment} from 'redux/modules/payments/actions';

const DeletePaymentPage = ({
  history,
  match,
  payment,
  deletePaymentStatus,
  onDeletePayment,
}) => {
  const handleDismiss = React.useCallback(() => {
    history.push(
      `/collection/${match.params.owner}/${match.params.collection}/manage`
    );
  }, [history, match.params]);

  React.useEffect(() => {
    if (!payment) {
      handleDismiss();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment]);

  React.useEffect(() => {
    if (deletePaymentStatus === 'success') {
      handleDismiss();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletePaymentStatus]);

  const handleDeletePayment = React.useCallback(() => {
    onDeletePayment({collection: payment.tab_id, payment});
  }, [onDeletePayment, payment]);

  return (
    <VerificationPrompt
      flexibleHeight
      onDismiss={handleDismiss}
      title="Delete Payment Record"
      description="This will permanently delete payment record along with any associated form information. Are you sure?"
      okButtonLabel="Delete"
      onOkButtonClick={handleDeletePayment}
      okButtonDisabled={deletePaymentStatus === 'pending'}
      cancelButtonLabel="Cancel"
      onCancelButtonClick={handleDismiss}
      cancelButtonDisabled={deletePaymentStatus === 'pending'}
    />
  );
};

const enhance = connect(
  (state) => ({
    payment: state.payments.payment,
    deletePaymentStatus: state.async.statuses[DELETE_PAYMENT],
  }),
  (dispatch) => ({
    onDeletePayment: (payload) => dispatch(deletePayment(payload)),
  })
);

const EnhancedDeletePaymentPage = enhance(DeletePaymentPage);

export default EnhancedDeletePaymentPage;
