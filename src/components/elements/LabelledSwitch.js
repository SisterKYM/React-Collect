import React from 'react';
import Switch from 'react-switch';

import {colors} from 'theme/constants';
import config from 'config';

const LabelledSwitch = ({id, label, value, input = {}, small, onChange}) => (
  <label className="flex items-center" htmlFor={id}>
    <Switch
      id={id}
      width={small ? 32 : 48}
      height={small ? 18 : 24}
      handleDiameter={small ? 16 : 20}
      onColor={config.colors.tint}
      offColor={colors.gray}
      uncheckedIcon={false}
      checkedIcon={false}
      boxShadow="0px 0.3px 0.61px rgba(0, 0, 0, 0.3)"
      activeBoxShadow="0px 0px 0px"
      checked={value || input.value || false}
      onChange={onChange || input.onChange}
    />
    <span className="ml2">{label}</span>
  </label>
);

const EnhancedLabelledSwitch = React.memo(LabelledSwitch);

export default EnhancedLabelledSwitch;
