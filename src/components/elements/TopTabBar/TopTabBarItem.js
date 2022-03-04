import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import cx from 'classnames';

import config from 'config';

const TopTabBarItem = ({forceDesktopStyling, active, label, disabled, to}) => {
  const Component = disabled ? 'span' : Link;

  return (
    <Component
      className={cx(
        'tab-nav-item-container relative flex justify-center items-center h-100 dark-grey',
        active && !disabled ? 'tab-nav-item-active' : '',
        disabled && 'not-allowed tab-nav-item-container-disabled'
      )}
      to={disabled ? '' : to}
    >
      <div
        className={cx(
          'flex items-center avenir-light h-100',
          !forceDesktopStyling && 'w5 w-auto-ns ph3 ph0-ns'
        )}
      >
        <div
          className={cx(
            'tab-nav-item-label',
            forceDesktopStyling
              ? 'tc overflow-visible'
              : 'tl tc-ns nowrap ws-normal-ns overflow-hidden overflow-visible-ns'
          )}
        >
          {label}
        </div>
      </div>
      <style jsx>{`
        :global(.tab-nav-item-container-disabled:hover) {
          background-color: inherit;
        }
        .tab-nav-item-label {
          font-size: 1.125rem;
        }
        @media (max-width: ${forceDesktopStyling ? '0em' : '30em'}) {
          :global(.tab-nav-item-container) {
            height: 50px;
          }
          .tab-nav-item-label {
            height: 1.25rem;
          }
          :global(.tab-nav-item-active) {
            background-color: ${config.colors.secondarySidebarNavItem};
          }
        }

        @media (min-width: ${forceDesktopStyling ? '0em' : '30em'}) {
          :global(.tab-nav-item-container) {
            margin: 0 2.5rem;
          }
          :global(.tab-nav-item-active) {
            border-top: 5px solid transparent;
            border-bottom: 5px solid ${config.colors.brand};
          }
        }
      `}</style>
    </Component>
  );
};

const enhance = compose(withRouter, React.memo);

const EnhancedTopTabBarItem = enhance(TopTabBarItem);

export default EnhancedTopTabBarItem;
