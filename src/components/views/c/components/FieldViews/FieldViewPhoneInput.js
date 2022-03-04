import cx from 'classnames';
import React from 'react';

import {InputErrorMessage, PhoneInput} from 'elements';

const FieldViewPhoneInput = ({name, errorMessage, value, onChangeValue}) => (
  <>
    <div className={cx('br2 ba', errorMessage ? 'b--brand' : 'b--gray-300')}>
      <PhoneInput
        name={name}
        inputClassName="phone-input-input gray-600"
        country="US"
        placeholder="____-____-____"
        value={value}
        onChange={onChangeValue}
      />
      <style jsx>{`
        :global(.phone-input-input) {
          padding-left: 0.5rem !important;
          padding-right: 0.5rem !important;
          order: -1;
          margin-right: -2.625rem;
          font-size: 1rem !important;
        }
        :global(.phone-input-input::-ms-clear) {
          width: 0px;
          height: 0px;
        }
      `}</style>
    </div>
    {errorMessage && (
      <InputErrorMessage className="mt2">{errorMessage}</InputErrorMessage>
    )}
  </>
);

export default FieldViewPhoneInput;
