import React from 'react';
import cx from 'classnames';

import {Input} from 'elements';
import {normalizeAmount} from 'helpers';

const ItemAmountField = ({className, input, meta}) => (
  <>
    <Input
      small
      border
      borderRadius
      className={cx('item-amount-field-input mw-100', className)}
      placeholder="$0"
      name="exact-amount-value"
      meta={meta}
      value={input.value}
      onChange={({target: {value}}) => {
        const amount = normalizeAmount(value);
        input.onChange(amount);
      }}
    />
    <style jsx>{`
      .item-amount-field-input {
        width: 8.75rem;
        font-size: 0.875rem;
      }
    `}</style>
  </>
);

export default ItemAmountField;
