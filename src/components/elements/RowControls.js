import {MdMoreHoriz} from 'react-icons/md';
import React from 'react';
import {Link} from 'react-router-dom';
import cx from 'classnames';

import Dropdown from 'elements/Dropdown';

const RowControls = ({
  bodyClassName,
  className,
  dropdownWidth,
  controls,
  controlsFooter,
}) => {
  const [dropdownVisible, setDropdownVisible] = React.useState(false);

  const handleToggleDropdownVisible = React.useCallback((e) => {
    if (typeof e === 'object' && e.type === 'click') {
      e.stopPropagation();
    }
    setDropdownVisible((prevDropdownVisible) => !prevDropdownVisible);
  }, []);

  return (
    <div className={className} onClick={handleToggleDropdownVisible}>
      <div className="arrow-down-wrapper flex justify-center items-center br2 bg-gray-250 pointer">
        <MdMoreHoriz className="f4 medium-grey" size={25} />
      </div>
      <Dropdown
        border
        borderRadius
        body={
          <>
            <ul className="pa3">
              {controls
                .filter(({hidden}) => !hidden)
                .map(
                  (
                    {icon, tooltip, onClick, to, target, className, component},
                    idx
                  ) => (
                    <li
                      key={idx}
                      className={cx(
                        'flex items-center pointer f6',
                        idx !== 0 && 'mt3'
                      )}
                      onClick={() => {
                        if (onClick) {
                          onClick();
                        }
                      }}
                    >
                      {component ||
                        (to ? (
                          <Link
                            rel="noopener noreferrer"
                            target={target}
                            to={to}
                            className={className}
                          >
                            {Boolean(icon) &&
                              React.createElement(icon, {
                                className: 'f4 moon-gray',
                              })}
                            <span className={cx('ml2', className)}>
                              {tooltip}
                            </span>
                          </Link>
                        ) : (
                          <>
                            {Boolean(icon) &&
                              React.createElement(icon, {
                                className: 'f4 moon-gray',
                              })}
                            <span className={cx('ml2', className)}>
                              {tooltip}
                            </span>
                          </>
                        ))}
                    </li>
                  )
                )}
            </ul>
            {controlsFooter && (
              <div className="flex pa3 items-center bt b--gray-300">
                {controlsFooter}
              </div>
            )}
          </>
        }
        bodyClassName={bodyClassName}
        onDismiss={handleToggleDropdownVisible}
        open={dropdownVisible}
        top={0}
        right={0}
        width={dropdownWidth || 200}
      />
      <style jsx>{`
        .arrow-down-wrapper {
          border-radius: 50%;
          width: 1.875rem;
          height: 1.875rem;
        }
        @media (max-width: 30em) {
          .arrow-down-wrapper {
            width: 1.625rem;
            height: 1.625rem;
          }
        }
      `}</style>
    </div>
  );
};

const EnhancedRowControls = React.memo(RowControls);

export default EnhancedRowControls;
