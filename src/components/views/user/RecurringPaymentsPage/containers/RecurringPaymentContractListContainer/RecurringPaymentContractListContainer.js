import {connect} from 'react-redux';
import React from 'react';

import RecurringPaymentContractListItemContainer from './RecurringPaymentContractListItemContainer';

class RecurringPaymentContractListContainer extends React.PureComponent {
  renderRecurringPaymentContract = (recurringPaymentContract, idx) => (
    <RecurringPaymentContractListItemContainer
      key={recurringPaymentContract.id}
      className={idx !== 0 ? 'bt b--gray-300' : ''}
      recurringPaymentContract={recurringPaymentContract}
    />
  );

  render() {
    return this.props.recurringPaymentContracts.map(
      this.renderRecurringPaymentContract
    );
  }
}

const enhance = connect(state => ({
  recurringPaymentContracts: state.recurringPayments.recurringPayments
    ? state.recurringPayments.recurringPayments.contracts
    : [],
}));

const EnhancedRecurringPaymentContractListContainer = enhance(
  RecurringPaymentContractListContainer
);

export default EnhancedRecurringPaymentContractListContainer;
