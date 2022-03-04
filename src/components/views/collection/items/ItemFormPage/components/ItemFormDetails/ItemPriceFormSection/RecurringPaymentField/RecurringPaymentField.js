import PropTypes from 'prop-types';
import React from 'react';

import {RecurringOptionsAnnotation} from 'elements';

import RecurringOptionsField from './RecurringOptionsField';

class RecurringPaymentField extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  handleChangeAmountInfo = ({amount, amount_type: amountType}) => {
    this.props.amount.input.onChange(amount);
    this.props.amount_type.input.onChange(amountType);
  };

  render() {
    const {
      options: {
        recurring: {
          options: {
            input: {value: recurringValue},
          },
        },
      },
    } = this.props;

    return (
      <div className={this.props.className}>
        <RecurringOptionsField
          value={recurringValue}
          amountInfo={{
            amount: this.props.amount.input.value,
            amount_type: this.props.amount_type.input.value,
          }}
          onChange={this.props.options.recurring.options.input.onChange}
          onChangeAmountInfo={this.handleChangeAmountInfo}
        />
        <RecurringOptionsAnnotation
          className="mt3"
          recurringOptions={recurringValue}
        />
      </div>
    );
  }
}

export default RecurringPaymentField;
