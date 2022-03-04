import React from 'react';

import {normalizeAmount} from 'helpers';

import RecurringOptionsInput from './RecurringOptionsInput';

class RecurringOptionsAmountInfoField extends React.PureComponent {
  handleChange = value => {
    const fixedAmountTypeSelected =
      value.type === 'fixed' && this.props.value.amount_type !== 'fixed';

    const amount = fixedAmountTypeSelected
      ? ''
      : normalizeAmount(value.text || '0');

    this.props.onChange({
      amount_type: value.type,
      amount: value.type === 'fixed' ? amount : undefined,
    });
  };

  render() {
    return (
      <RecurringOptionsInput
        hideTextInput={this.props.value.amount_type !== 'fixed'}
        typeOptions={[
          {
            label: 'Exact amount',
            value: 'fixed',
          },
          {
            label: 'Any amount',
            value: 'open',
          },
        ]}
        textInputPlaceholder="$0"
        value={{
          type: this.props.value.amount_type,
          text: this.props.value.amount,
        }}
        onChange={this.handleChange}
      />
    );
  }
}

export default RecurringOptionsAmountInfoField;
