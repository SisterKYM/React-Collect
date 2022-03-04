import {Link, withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import React from 'react';
import cx from 'classnames';

import {width as size} from 'layout/components/PrimarySidebar';
import {height as sizeSmall} from 'layout/components/PrimarySidebarMobile';

const PrimarySidebarNavItem = ({match, label, disabled, imgSrc, to}) => {
  const Component = disabled ? 'span' : Link;
  const active = match && match.url.includes(to);

  return (
    <Component
      className={cx(
        'primary-sidebar-nav-item-container relative flex justify-center items-center white hover-bg-alert',
        active && !disabled ? 'bg-alert' : 'o-50',
        disabled &&
          'not-allowed primary-sidebar-nav-item-container-disabled o-50'
      )}
      to={disabled ? '' : to}
    >
      <div className="flex flex-column items-center f6 avenir-roman white">
        <img className="primary-sidebar-nav-item-icon" src={imgSrc} alt="" />
        <div className="primary-sidebar-nav-item-label mt2 tc nowrap ws-normal-ns overflow-hidden overflow-visible-ns">
          {label}
        </div>
      </div>
      <style jsx>{`
        :global(.primary-sidebar-nav-item-container) {
          width: ${size}px;
          height: ${size}px;
        }
        :global(.primary-sidebar-nav-item-container-disabled:hover) {
          background-color: inherit;
        }
        .primary-sidebar-nav-item-icon {
          height: 32px;
        }
        @media (max-width: 30em) {
          .primary-sidebar-nav-item-icon {
            height: 24px;
          }
          :global(.primary-sidebar-nav-item-container) {
            width: 100px;
            height: ${sizeSmall}px;
          }
          .primary-sidebar-nav-item-label {
            height: 17px;
            max-width: 100px;
          }
        }
      `}</style>
    </Component>
  );
};

const enhance = compose(
  withRouter,
  React.memo
);

const EnhancedPrimarySidebarNavItem = enhance(PrimarySidebarNavItem);

export default EnhancedPrimarySidebarNavItem;
