import {MdClose} from 'react-icons/md';
import React from 'react';
import cx from 'classnames';

import {colors} from 'theme/constants';

const iconSize = 15;
const circleSize = iconSize + 10;

const GrowlAlert = ({body, icon, title, color, onDismiss}) => {
  const iconElement = React.useMemo(
    () =>
      icon
        ? React.createElement(icon, {
            size: iconSize,
            color: colors.white,
          })
        : null,
    [icon]
  );

  return (
    <div className="growl-alert w5-ns relative br2-ns shadow-4">
      <div
        className="pa3 br2-ns bg-tint flex justify-start items-center"
        style={{color: colors[color] || '#ffffff'}}
      >
        {iconElement && (
          <div className="ml3 mr4">
            <div className="icon-wrapper flex items-center justify-center br-100 bg-brand">
              {iconElement}
            </div>
          </div>
        )}
        <div className="">
          <div className="flex items-center text-16 avenir-roman">
            <h4>{title}</h4>
          </div>
          {body ? (
            <div className={cx('mt2 text-14 avenir-light')}>{body}</div>
          ) : (
            ''
          )}
        </div>
        <div
          onClick={onDismiss}
          className={cx('pa2 absolute top-0 right-0 pointer')}
        >
          <MdClose color={color} size={iconSize} />
        </div>
      </div>
      <style jsx>{`
        .icon-wrapper {
          width: ${circleSize}px;
          height: ${circleSize}px;
        }
        .body-wrapper {
          margin-left: ${icon ? circleSize : 0}px;
        }
        .growl-alert {
          width: 452px;
        }
      `}</style>
    </div>
  );
};

const EnhancedGrowlAlert = React.memo(GrowlAlert);

export default EnhancedGrowlAlert;
