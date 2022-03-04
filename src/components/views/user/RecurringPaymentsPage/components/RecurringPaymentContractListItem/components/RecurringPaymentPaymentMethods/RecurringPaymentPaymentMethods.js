import {IoMdArrowDropdown, IoMdArrowDropup} from 'react-icons/io';
import React from 'react';

import {Dropdown} from 'elements';
import {colors} from 'theme/constants';
import PaymentMethodInfoHelpers from 'helpers/PaymentMethodInfoHelpers';

import PaymentMethods from './PaymentMethods';
import RecurringDetails from '../RecurringDetails';

const formatPaymentMethodText = (paymentMethod, stripeId) => {
  const method = PaymentMethodInfoHelpers.getPaymentMethodType({
    paymentMethod,
    stripeId,
  });

  return paymentMethod ? `${method} **${paymentMethod.last4}` : method;
};

class RecurringPaymentPaymentMethods extends React.PureComponent {
  state = {
    editing: false,
  };

  handleEdit = () => {
    this.setState(prevState => ({editing: !prevState.editing}));
  };

  handleCancel = () => {
    this.setState({editing: false});
  };

  render() {
    const Arrow = this.state.editing ? IoMdArrowDropup : IoMdArrowDropdown;

    return (
      <RecurringDetails
        title="Payment Method"
        text={formatPaymentMethodText(
          this.props.paymentMethod,
          this.props.paymentMethod && this.props.paymentMethod.id
        )}
        renderEditComponent={this.renderPaymentMethods}
      >
        <Dropdown
          className="dib ml2"
          open={this.state.editing}
          body={
            <PaymentMethods
              recurringPaymentContractId={this.props.recurringPaymentContractId}
              paymentMethod={this.props.paymentMethod}
              paymentMethods={this.props.paymentMethods}
              updatePaymentStatus={this.props.updatePaymentStatus}
              onUpdatePaymentSource={this.props.onUpdatePaymentSource}
            />
          }
          onDismiss={this.handleCancel}
        >
          <span className="tint pointer" onClick={this.handleEdit}>
            Edit
            <Arrow color={colors.darkerGray} size={17} />
          </span>
        </Dropdown>
      </RecurringDetails>
    );
  }
}

export default RecurringPaymentPaymentMethods;
