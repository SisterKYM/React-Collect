import React from 'react';
import _ from 'lodash';
import cx from 'classnames';

import {Input} from 'elements';
import config from 'config';

import RecurringOptionsFieldDropdown from './RecurringOptionsFieldDropdown';

const RecurringOptionsInput = ({
  reversed,
  hideTextInput,
  textInputPlaceholder,
  typeOptions,
  value,
  onChange,
}) => {
  const [dropdownVisible, setDropdownVisible] = React.useState(false);

  const handleClickDropdownLabel = React.useCallback(() => {
    setDropdownVisible(true);
  }, []);

  const handleDismissDropdown = React.useCallback(() => {
    setDropdownVisible(false);
  }, []);

  const handleSelectType = React.useCallback(
    type => {
      setDropdownVisible(false);

      onChange({
        ...value,
        type,
      });
    },
    [onChange, value]
  );

  const handleChangeInput = React.useCallback(
    ({target: {value: nextText}}) => {
      onChange({
        ...value,
        text: nextText,
      });
    },
    [onChange, value]
  );

  return (
    <div className={cx('flex items-center', reversed && 'flex-row-reverse')}>
      <RecurringOptionsFieldDropdown
        className={cx('w-60', reversed && 'bl b--gray-300')}
        open={dropdownVisible}
        options={typeOptions}
        value={value.type}
        onSelectOption={handleSelectType}
        onClickLabel={handleClickDropdownLabel}
        onDismiss={handleDismissDropdown}
      />
      {!hideTextInput && (
        <div className={cx('w-40 ph3 pv2', !reversed && 'bl b--gray-300')}>
          <Input
            autoFocus
            small
            style={{
              height: 16,
              padding: 0,
              color: config.colors.tint,
            }}
            borderRadius={false}
            placeholder={textInputPlaceholder}
            value={_.isNil(value.text) ? '' : value.text}
            onBlur={handleChangeInput}
            onChange={handleChangeInput}
          />
        </div>
      )}
    </div>
  );
};

export default RecurringOptionsInput;
