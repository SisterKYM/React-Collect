import * as React from 'react';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import cx from 'classnames';
import MaskedInput from 'react-text-mask';

import InputErrorMessage from 'elements/InputErrorMessage';
import InputLabel from 'elements/InputLabel';

const TextInput = (
  {
    name,
    className,
    inputClassName,
    type = 'text',
    mask: customMask,
    errorMessage = '',
    disabled,
    required,
    small,
    label,
    value,
    children,
    ...inputProps
  },
  ref
) => {
  const mask = React.useMemo(() => {
    if (customMask) {
      return customMask;
    }

    if (type === 'amount') {
      return createNumberMask({
        prefix: '$',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: ',',
        allowDecimal: true,
        decimalSymbol: '.',
        decimalLimit: 3,
        allowNegative: false,
        allowLeadingZeroes: false,
      });
    }
    if (type === 'percentage') {
      return createNumberMask({
        prefix: '',
        includeThousandsSeparator: false,
        thousandsSeparatorSymbol: '',
        allowDecimal: true,
        decimalSymbol: '.',
        decimalLimit: 2,
        allowNegative: false,
        allowLeadingZeroes: false,
      });
    }
    if (type === 'number') {
      return createNumberMask({
        prefix: '',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: ',',
        allowDecimal: false,
        allowNegative: true,
        allowLeadingZeroes: false,
      });
    }
    if (type === 'zip') {
      return value => {
        if (value.match(/[A-Za-z]/)) {
          return [/[A-Za-z]/, /\d/, /[A-Za-z]/, ' ', /\d/, /[A-Za-z]/, /\d/];
        }
        if (value.length > 5) {
          return [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        }

        return [/\d/, /\d/, /\d/, /\d/, /\d/];
      };
    }
    if (type === 'date') {
      return [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
    }

    return false;
  }, [customMask, type]);

  const pipe = React.useMemo(() => {
    if (type === 'date') {
      return createAutoCorrectedDatePipe();
    }

    return undefined;
  }, [type]);

  return (
    <div ref={ref} className={className}>
      <InputLabel required={required} htmlFor={name} label={label}>
        <MaskedInput
          mask={mask}
          pipe={pipe}
          keepCharPositions={type === 'date'}
          guide={false}
          name={name}
          disabled={disabled}
          type={
            type === 'password' || type === 'email' || type === 'number'
              ? type
              : 'text'
          }
          {...inputProps}
          render={(ref, {defaultValue, ...props}) => (
            <>
              <input
                className={cx(
                  'input-reset border-box db ph2 pv0 w-100 f5 f-regular-ns ba gray-600 br2',
                  small ? 'h2' : 'regular-input-height',
                  disabled && 'o-50',
                  errorMessage.length !== 0 ? 'b--brand' : 'b--gray-300',
                  inputClassName
                )}
                ref={ref}
                value={value}
                inputMode={type === 'amount' ? 'decimal' : undefined}
                {...props}
              />
              <style jsx>{`
                input {
                  line-height: normal;
                  cursor: ${disabled ? 'not-allowed' : 'auto'};
                }
                input::placeholder {
                  font-family: 'AvenirLTStd-Light', sans-serif;
                }
                .regular-input-height {
                  height: 2.5rem;
                }
                input[type='number']::-webkit-inner-spin-button,
                input[type='number']::-webkit-outer-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }
              `}</style>
            </>
          )}
        />
        {children}
      </InputLabel>
      {errorMessage.length !== 0 && (
        <InputErrorMessage className="mt2">{errorMessage}</InputErrorMessage>
      )}
    </div>
  );
};

const EnhancedTextInput = React.forwardRef(TextInput);

export default EnhancedTextInput;
