import React from 'react';

import {Status, TextInput} from 'elements';

const CheckoutDiscountCode = ({
  loading,
  applied,
  value,
  onApply,
  onReset,
  onChangeValue,
}) => {
  const handleChange = React.useCallback(
    event => {
      onChangeValue({
        ...value,
        code: event.target.value,
      });
    },
    [value, onChangeValue]
  );

  return (
    <div className="ba b--gray-300 br2 flex items-center">
      <TextInput
        className="flex-auto"
        inputClassName="discount-code-input"
        disabled={loading}
        placeholder="Have a promo code?"
        value={value.code}
        onChange={handleChange}
      />
      <div className="ph3">
        {loading ? (
          <Status status="pending" />
        ) : (
          <span
            className="f5 avenir-light tint dim pointer"
            onClick={value.code || !applied ? onApply : onReset}
          >
            {value.code || !applied ? 'Apply' : 'Reset'}
          </span>
        )}
      </div>
      <style jsx>{`
        :global(.discount-code-input) {
          border: none;
        }
      `}</style>
    </div>
  );
};

const EnhancedCheckoutDiscountCode = React.memo(CheckoutDiscountCode);

export default EnhancedCheckoutDiscountCode;
