import React from 'react';
import {Field} from 'redux-form';

import {CommonButton, Input} from 'elements';
import {MdClose} from 'react-icons/md';

const CheckoutDiscountCode = ({
  loading,
  applied,
  value,
  onApply,
  onReset,
  onChangeValue,
}) => {
  const [open, setOpen] = React.useState(Boolean(value?.code));
  const handleChange = (event) => {
    onChangeValue({
      ...value,
      code: event.target.value,
    });
  };

  return (
    <>
      <div style={{display: 'inline-block'}}>
        <span
          className="avenir-roman flex items-center medium-grey text-12 pv2 pointer"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {open ? (
            <MdClose style={{marginBottom: '2px'}} />
          ) : (
            <span style={{width: '12px'}}>+</span>
          )}{' '}
          <span className="ml2">Promo Code</span>
        </span>
      </div>
      {open && (
        <div className="flex items-center pb3">
          <Field
            className="flex-auto ba b--gray-300"
            name="coupon"
            disabled={loading}
            placeholder="Promo code?"
            value={value.code}
            onChange={handleChange}
            style={{height: '38px'}}
            component={Input}
          />
          <CommonButton
            className="pt-16 bg-tint white ml2"
            style={{width: '100px', height: '40px'}}
            onClick={value.code || !applied ? onApply : onReset}
            status={loading && 'pending'}
          >
            {value.code || !applied ? 'Apply' : 'Reset'}
          </CommonButton>
        </div>
      )}
    </>
  );
};

const EnhancedCheckoutDiscountCode = React.memo(CheckoutDiscountCode);

export default EnhancedCheckoutDiscountCode;
