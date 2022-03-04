import 'react-phone-number-input/style.css';
import PhoneNumberInput from 'react-phone-number-input';
import React from 'react';
import cx from 'classnames';

import {ErrorMessage} from 'elements/Input';
import {inputHeight, inputHeightSmall} from 'theme/constants';

const AVAILABLE_COUNTRIES = [
  'AT',
  'BB',
  'BE',
  'CA',
  'DK',
  'FI',
  'FR',
  'DE',
  'GR',
  'GU',
  'IS',
  'IE',
  'IT',
  'MC',
  'NL',
  'NO',
  'PT',
  'ES',
  'SE',
  'CH',
  'GB',
  'US',
];

const PhoneInput = ({className, style, meta = {}, small, input, ...props}) => {
  const phoneNumberInputRef = React.useRef(null);

  const errMsg = meta.error || meta.warning;
  const showErrMsg = meta.touched && errMsg;

  const handleClickError = React.useCallback(() => {
    phoneNumberInputRef.current.focus();
  }, []);

  return (
    <div
      className={cx(
        'relative f-regular overflow-hidden br2',
        errMsg && showErrMsg ? 'b--brand' : 'b--gray-300',
        className
      )}
    >
      <PhoneNumberInput
        ref={phoneNumberInputRef}
        style={{
          height: small ? inputHeightSmall : inputHeight,
          ...style,
        }}
        countrySelectTabIndex={-1}
        countries={AVAILABLE_COUNTRIES}
        country="US"
        {...input}
        {...props}
      />
      <ErrorMessage
        small={small}
        onClick={handleClickError}
        show={showErrMsg}
        message={errMsg}
      />
      <style jsx global>{`
        .react-phone-number-input__input {
          background-color: transparent;
        }
        .react-phone-number-input__phone {
          margin-top: 7px;
          border: 0px;
          font-family: 'AvenirLTStd-Light';
        }
        .react-phone-number-input__country {
          margin-top: 5px;
          margin-left: 8px;
          font-family: AvenirLTStd-Light;
        }
      `}</style>
    </div>
  );
};

const EnhancedPhoneInput = React.memo(PhoneInput);

export default EnhancedPhoneInput;
