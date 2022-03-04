import cx from 'classnames';
import moment from 'moment';
import React from 'react';

import {InputErrorMessage, TimeInput} from 'elements';
import TimeIcon from 'theme/images/Time.svg';

const FieldViewTimeInput = ({name, errorMessage, value, onChangeValue}) => (
  <>
    <div
      name={name}
      className={cx(
        'flex items-center br2 ba',
        errorMessage ? 'b--brand' : 'b--gray-300'
      )}
    >
      <TimeInput
        hideIcon
        disableDefaultValue
        small
        name={name}
        className="flex-auto"
        placeholder="Time"
        value={(value && moment(value)) || undefined}
        onChange={onChangeValue}
      />
      <img className="db w1 h1 mh2" alt="Time" src={TimeIcon} />
      <style jsx>{`
        :global(.rc-time-picker-panel-input-wrap) {
          border-bottom-width: 0px;
        }
        :global(.rc-time-picker-input) {
          border-bottom-width: 0px;
          background-color: transparent !important;
        }
      `}</style>
    </div>
    {errorMessage && (
      <InputErrorMessage className="mt2">{errorMessage}</InputErrorMessage>
    )}
  </>
);

export default FieldViewTimeInput;
