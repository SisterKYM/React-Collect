import React from 'react';
import cx from 'classnames';
import moment from 'moment';

import TimeIcon from 'theme/images/Time.svg';
import TimeInput from 'elements/TimeInput';

const CollectionObjectFieldTimeInput = ({
  className,
  small,
  disabled,
  input,
  value,
  onChange,
}) => {
  const realValue = input ? input.value : value;

  return (
    <div
      className={cx(
        'flex items-center ba br2 b--gray-300',
        (disabled || (!input && !onChange)) && 'container-disabled not-allowed',
        disabled ? 'bg-light-gray' : 'bg-white',
        className
      )}
    >
      <TimeInput
        hideIcon
        disableDefaultValue
        className="flex-auto"
        small={small}
        placeholder="Time"
        input={{
          value: realValue ? moment(realValue) : undefined,
          onChange: input ? input.onChange : onChange,
        }}
      />
      <img className="db mr3" alt="Time" src={TimeIcon} />
      <style jsx>{`
        .container-disabled {
          pointer-events: none;
        }
        img {
          width: 16px;
          height: 16px;
        }
        :global(.rc-time-picker-panel-input-wrap) {
          border-bottom-width: 0px;
        }
        :global(.rc-time-picker-input) {
          border-bottom-width: 0px;
          background-color: transparent !important;
        }
      `}</style>
    </div>
  );
};

const EnhancedCollectionObjectFieldTimeInput = React.memo(
  CollectionObjectFieldTimeInput
);

export default EnhancedCollectionObjectFieldTimeInput;
