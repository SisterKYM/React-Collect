import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import shortid from 'shortid';

const ARROW_SIZE = 6;
const backgroundColor = '#373737E6';

const Tooltip = ({
  className,
  contentContainerClassName,
  style,
  arrowPosition,
  text,
  children,
}) => {
  const tooltipClassName = React.useMemo(() => shortid.generate(), []);

  return (
    <div className="relative">
      <div className={cx('children-wrapper', className)}>{children}</div>
      <div
        className={cx('absolute', tooltipClassName, contentContainerClassName)}
        style={style}
      >
        <div className="tooltip-tip dn pv3 ph3-5 text-14 br2">
          {text}
          <div
            className="tooltip-arrow absolute"
            style={{
              left: arrowPosition || '50%',
            }}
          />
        </div>
      </div>
      <style jsx>{`
        .children-wrapper:hover + .${tooltipClassName} > div {
          display: block;
        }
        .tooltip-tip {
          background-color: ${backgroundColor};
        }
        .tooltip-arrow {
          width: 0px;
          height: 0px;
          bottom: -${ARROW_SIZE}px;
          margin-left: -${ARROW_SIZE}px;
          border-left: ${ARROW_SIZE}px solid transparent;
          border-right: ${ARROW_SIZE}px solid transparent;
          border-top: ${ARROW_SIZE}px solid ${backgroundColor};
        }
      `}</style>
    </div>
  );
};

const EnhancedTooltip = Object.assign(React.memo(Tooltip), {
  propTypes: {
    arrowPosition: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.object,
    children: PropTypes.node.isRequired,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  },
});

export default EnhancedTooltip;
