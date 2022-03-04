import {connect} from 'react-redux';
import {get, mapKeys} from 'lodash';
import React from 'react';

import {UPDATE_PAYMENT_SOURCE} from 'redux/modules/recurringPayments/constants';
import {
  cancelRecurringPayment,
  retryFailedInvoice,
  updatePaymentSource,
} from 'redux/modules/recurringPayments/actions';

import {RecurringPaymentContractListItem} from '../../components';

class RecurringPaymentContractListItemContainer extends React.PureComponent {
  handleUpdatePaymentSource = sourceId => {
    this.props.onUpdatePaymentSource({
      id: this.props.recurringPaymentContract.id,
      stripe_source: sourceId,
    });
  };

  handleCancelFuturePayments = () => {
    this.props.onCancelRecurringPayment(this.props.recurringPaymentContract);
  };

  handleRetryFailedInvoice = invoiceId => {
    this.props.onRetryFailedInvoice({invoiceId});
  };

  render() {
    return (
      <RecurringPaymentContractListItem
        className={this.props.className}
        recurringPaymentContract={this.props.recurringPaymentContract}
        paymentMethods={this.props.paymentMethods}
        updatePaymentStatus={this.props.updatePaymentStatus}
        onCancelFuturePayments={this.handleCancelFuturePayments}
        onRetryFailedInvoice={this.handleRetryFailedInvoice}
        onUpdatePaymentSource={this.handleUpdatePaymentSource}
      />
    );
  }
}

const enhance = connect(
  state => ({
    paymentMethods: state.recurringPayments.recurringPayments
      ? {
          banks: state.recurringPayments.recurringPayments.banks,
          cards: state.recurringPayments.recurringPayments.cards,
        }
      : {banks: [], cards: []},
    updatePaymentStatus: {
      meta: mapKeys(
        get(state.async.metadatas, UPDATE_PAYMENT_SOURCE, {}),
        (value, key) => {
          if (key === 'id') {
            return 'contractId';
          }
          if (key === 'stripe_source') {
            return 'sourceId';
          }

          return undefined;
        }
      ),
      value: state.async.statuses[UPDATE_PAYMENT_SOURCE],
    },
  }),
  dispatch => ({
    onUpdatePaymentSource: payload => dispatch(updatePaymentSource(payload)),
    onCancelRecurringPayment: payload =>
      dispatch(cancelRecurringPayment(payload)),
    onRetryFailedInvoice: payload => dispatch(retryFailedInvoice(payload)),
  })
);

const EnhancedRecurringPaymentContractListItemContainer = enhance(
  RecurringPaymentContractListItemContainer
);

export default EnhancedRecurringPaymentContractListItemContainer;
