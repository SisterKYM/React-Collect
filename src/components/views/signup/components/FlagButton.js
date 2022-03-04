import React from 'react';
import cx from 'classnames';

import CAFlagIcon from 'theme/images/CAFlag.svg';
import USFlagIcon from 'theme/images/USFlag.svg';
import config from 'config';

const size = 50;

const FlagButton = ({active, disabled, onClick, country}) => (
  <div
    className={cx(
      'relative overflow-hidden ba br-100 pointer',
      active ? 'bw1 b--tint shadow-4' : 'b--gray-300',
      disabled ? 'not-allowed' : 'flag-button-container-enabled'
    )}
    onClick={() => onClick && onClick(country)}
  >
    <div
      className={cx(
        'haze absolute',
        active && 'bg-transparent',
        !disabled && 'haze-enabled'
      )}
    />
    <div className={cx('flag', active && 'flag-active')} />
    <style jsx>{`
      .flag-button-container-enabled:hover {
        border-color: ${config.colors.tint};
        box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
      }
      .flag {
        height: ${size}px;
        width: ${size}px;
        background-image: url(${country === 'Canada'
          ? CAFlagIcon
          : USFlagIcon});
      }
      .flag-active {
        height: ${size - 5}px;
        width: ${size - 5}px;
      }
      .haze {
        height: ${size}px;
        width: ${size}px;
        background-color: #ffffff33;
      }
      .haze-enabled:hover {
        background-color: transparent;
      }
    `}</style>
  </div>
);

const EnhancedFlagButton = React.memo(FlagButton);

export default EnhancedFlagButton;
