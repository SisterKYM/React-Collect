import cx from 'classnames';
import React from 'react';

import {ReactComponent as GridIcon} from 'theme/images/grid-icon.svg';
import {ReactComponent as ListIcon} from 'theme/images/list-icon.svg';
import {colors} from 'theme/constants';

const MODES = ['GRID', 'LIST'];

const getIconComponentForMode = mode => {
  switch (mode) {
    case 'LIST':
      return ListIcon;
    default:
      return GridIcon;
  }
};

const PayerPageDisplayModeSwitch = ({mode: selectedMode, onChangeMode}) => (
  <div>
    {MODES.map((mode, idx) => {
      const handleClick = () => {
        onChangeMode(mode);
      };

      const IconComponent = getIconComponentForMode(mode);

      return (
        <IconComponent
          key={mode}
          className={cx(
            'display-mode-switch-icon grow dib pointer',
            selectedMode === mode
              ? 'display-mode-switch-icon-active'
              : 'display-mode-switch-icon-inactive',
            idx !== 0 && 'ml3'
          )}
          onClick={handleClick}
        />
      );
    })}
    <style jsx>{`
      :global(.display-mode-switch-icon) {
        width: 1.25rem;
        height: 1.25rem;
      }
      :global(.display-mode-switch-icon-active) {
        fill: ${colors.gray600};
      }
      :global(.display-mode-switch-icon-inactive) {
        fill: ${colors.darkGray};
      }
    `}</style>
  </div>
);

const EnhancedPayerPageDisplayModeSwitch = React.memo(
  PayerPageDisplayModeSwitch
);

export default EnhancedPayerPageDisplayModeSwitch;
