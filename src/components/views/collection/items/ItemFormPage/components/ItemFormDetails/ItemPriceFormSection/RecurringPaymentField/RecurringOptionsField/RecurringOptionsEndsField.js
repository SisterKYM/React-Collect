import React from 'react';

import RecurringOptionsInput from './RecurringOptionsInput';

const DEFAULT_PAYMENT_COUNT = 12;

const RecurringOptionsEndsField = ({value, onChange}) => {
  const handleChangeType = React.useCallback(
    (value) => {
      const paymentCountSelected =
        value.type === 'payment_count' && value.type !== 'payment_count';

      const paymentCount = paymentCountSelected
        ? DEFAULT_PAYMENT_COUNT
        : Number.parseInt(value.text || 0, 10);

      onChange({
        type: value.type,
        payment_count:
          value.type === 'payment_count' ? paymentCount : undefined,
      });
    },
    [onChange]
  );

  return (
    <RecurringOptionsInput
      hideTextInput={value.type !== 'payment_count'}
      typeOptions={[
        {
          label: 'never',
          value: 'never',
        },
        {
          label: 'after this many payments',
          value: 'payment_count',
        },
      ]}
      value={{
        type: value.type,
        text: value.payment_count,
      }}
      onChange={handleChangeType}
    />
  );
};

const EnhancedRecurringOptionsEndsField = React.memo(RecurringOptionsEndsField);

export default EnhancedRecurringOptionsEndsField;
