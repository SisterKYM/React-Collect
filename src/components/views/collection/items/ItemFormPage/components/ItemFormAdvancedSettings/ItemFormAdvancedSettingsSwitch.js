import React from 'react';

import {SwitchBox} from 'elements';

const ItemFormAdvancedSettingsSwitch = ({
  className,
  label,
  description,
  input,
}) => (
  <div className={className}>
    <SwitchBox reversed className="mb3" label={label} input={input} />
    <div className="w5 f6 gray-600">{description}</div>
  </div>
);

const EnhancedItemFormAdvancedSettingsSwitch = React.memo(
  ItemFormAdvancedSettingsSwitch
);

export default EnhancedItemFormAdvancedSettingsSwitch;
