import React from 'react';

import BigCheckbox from './BigCheckbox';

const DEFAULT_SIZE = 16;

const SmallRoundCheckbox = ({
  className,
  labelClassName,
  labelFontSizeSet,
  labelColorSet,
  label,
  input,
  square,
  meta,
  type,
  id,
  checked,
}) => (
  <BigCheckbox
    className={className}
    labelClassName={labelClassName}
    labelFontSizeSet={labelFontSizeSet}
    labelColorSet={labelColorSet}
    label={label}
    input={input}
    square={square}
    meta={meta}
    type={type}
    id={id}
    checked={checked}
    size={16}
  />
);

const EnhancedSmallRoundCheckbox = Object.assign(
  React.memo(SmallRoundCheckbox),
  {
    size: DEFAULT_SIZE,
  }
);

export default EnhancedSmallRoundCheckbox;
