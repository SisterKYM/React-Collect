import {Link} from 'react-router-dom';
import React from 'react';
import cx from 'classnames';

import {Status} from 'elements';

const getPaymentMethodType = paymentMethod => {
  let type = '';

  if (paymentMethod.id.indexOf('card_') === 0) {
    type = 'Credit card';
  } else if (paymentMethod.id.indexOf('ba_') === 0) {
    type = 'Bank account';
  }

  return type;
};

class PaymentMethods extends React.PureComponent {
  renderPaymentMethod = paymentMethod => {
    const {updatePaymentStatus} = this.props;
    const status =
      paymentMethod.id === updatePaymentStatus.meta.sourceId &&
      this.props.recurringPaymentContractId ===
        updatePaymentStatus.meta.contractId
        ? updatePaymentStatus.value
        : '';
    const pending = status === 'pending';
    const paymentMethodType = getPaymentMethodType(paymentMethod);
    const selected =
      this.props.paymentMethod &&
      this.props.paymentMethod.id === paymentMethod.id;

    const handleClick = () => {
      if (!pending && !selected) {
        this.props.onUpdatePaymentSource(paymentMethod.id);
      }
    };

    return (
      <li
        key={paymentMethod.id}
        className={cx(
          'relative ph3 pv2 bb b--gray-300',
          pending && 'gray-400',
          !pending && !selected && 'pointer'
        )}
        onClick={handleClick}
      >
        {paymentMethodType} ending in {paymentMethod.last4}
        {pending && (
          <div className="absolute top-0 right-0 bottom-0 flex pr2 items-center">
            <Status status={status} />
          </div>
        )}
      </li>
    );
  };

  render() {
    return (
      <ul className="ba b--gray-300">
        {[
          ...this.props.paymentMethods.banks,
          ...this.props.paymentMethods.cards,
        ].map(this.renderPaymentMethod)}
        <li>
          <Link className="db ph3 pv2 gray-600" to="/user/payment-methods">
            Add new payment method
          </Link>
        </li>
      </ul>
    );
  }
}

export default PaymentMethods;
