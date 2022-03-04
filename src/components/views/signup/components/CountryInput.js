import React from 'react';

import FlagButton from './FlagButton';

const CountryInput = ({input, meta, disabled}) => {
  const handleClickFlag = React.useCallback(
    country => {
      if (!disabled) {
        input.onChange(country);
      }
    },
    [disabled, input]
  );

  return (
    <div className="country-input-container relative">
      <div className="flex justify-center">
        <div className="pr2">
          <FlagButton
            disabled={disabled}
            country="United States"
            active={!disabled && input.value === 'United States'}
            onClick={handleClickFlag}
          />
        </div>
        <div className="pl2">
          <FlagButton
            country="Canada"
            disabled={disabled}
            active={!disabled && input.value === 'Canada'}
            onClick={handleClickFlag}
          />
        </div>
      </div>
      {Boolean((meta.error || meta.warning) && meta.touched) && (
        <p className="error-message absolute left-0 right-0 bottom-0 tc f7 brand">
          {meta.error}
        </p>
      )}
      <style jsx>{`
        .country-input-container {
          padding-bottom: 1.25rem;
        }
        .error-message {
          height: 1rem;
        }
      `}</style>
    </div>
  );
};

const EnhancedCountryInput = React.memo(CountryInput);

export default EnhancedCountryInput;
