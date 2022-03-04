import React from 'react';
import cx from 'classnames';

import Checkbox from 'elements/Checkbox';

const SelectGroupedOption = ({checked, option, onSelect}) => {
  const handleChange = React.useCallback(
    event => {
      onSelect(option, event.target.checked);
    },
    [onSelect, option]
  );

  return (
    <li className={cx('ph3 pv2', option.categoryHeader && 'bg-gray-250')}>
      <Checkbox
        checkedOnValue
        input={{value: checked}}
        label={option.label}
        onChange={handleChange}
      />
    </li>
  );
};

const EnhancedSelectGroupedOption = React.memo(SelectGroupedOption);

export default EnhancedSelectGroupedOption;
