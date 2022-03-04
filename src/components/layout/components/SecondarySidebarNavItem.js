import {Link} from 'react-router-dom';
import React from 'react';
import cx from 'classnames';

const SecondarySidebarNavItem = ({
  active,
  disabled,
  className,
  img,
  to,
  icon,
  label,
  subnav,
  darkGreyText = false,
  onClick,
}) => {
  const iconElement = React.useMemo(
    () =>
      icon
        ? React.cloneElement(icon, {
            className: 'secondary-sidebar-nav-item-icon tint',
            size: 28,
            style: {
              marginLeft: -4,
            },
          })
        : null,
    [icon]
  );

  return (
    <div
      className={cx(
        'relative f6 avenir-roman bb b--white',
        disabled && 'secondary-sidebar-nav-item-container-disabled o-40',
        className
      )}
    >
      <Link
        className="db pv2 pl2 nowrap overflow-hidden"
        to={to}
        onClick={onClick}
      >
        <div className="relative flex pv2 ph3 items-center dark-grey">
          {iconElement ? (
            <div className="secondary-sidebar-nav-item-image mr3">
              {iconElement}
            </div>
          ) : (
            <img
              role="presentation"
              alt="Sidebar navigation item"
              {...img}
              className={cx(
                'secondary-sidebar-nav-item-image db mr3',
                img && img.className
              )}
            />
          )}
          <span className={darkGreyText ? 'dark-grey' : null}>{label}</span>
        </div>
      </Link>
      {Boolean(subnav) && <div className="bt b--white">{subnav}</div>}
      {Boolean(active) && (
        <i className="absolute absolute--fill o-60 bg-white" />
      )}
      <style jsx>{`
        .secondary-sidebar-nav-item-container-disabled {
          pointer-events: none;
        }
        .secondary-sidebar-nav-item-image {
          width: 1.5rem;
        }
        :global(.secondary-sidebar-nav-item-icon) {
          width: 1.5rem;
        }
      `}</style>
    </div>
  );
};

const EnhancedSecondarySidebarNavItem = React.memo(SecondarySidebarNavItem);

export default EnhancedSecondarySidebarNavItem;
