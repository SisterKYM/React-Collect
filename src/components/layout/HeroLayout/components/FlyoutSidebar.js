import React from 'react';
import cx from 'classnames';
import posed from 'react-pose';

const AnimatedOverlay = posed.div({
  enter: {
    opacity: 0.4,
    transition: {
      duration: 200,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 200,
    },
  },
});
const AnimatedFlyout = posed.div({
  enter: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      duration: 200,
    },
  },
  exit: {
    x: '100%',
    transition: {
      duration: 150,
    },
  },
});

const FlyoutSidebar = ({className, onDismiss, children}) => (
  <>
    <AnimatedOverlay
      className="flyout-sidebar-overlay fixed absolute--fill bg-dark-gray"
      onClick={onDismiss}
    />
    <AnimatedFlyout
      className={cx(
        'flyout-sidebar-flyout fixed top-0 right-0 vh-100 bg-white',
        className
      )}
    >
      {children}
    </AnimatedFlyout>
    <style jsx>{`
      :global(.flyout-sidebar-overlay) {
        z-index: 102;
      }
      :global(.flyout-sidebar-flyout) {
        z-index: 103;
        width: 100%;
      }
      @media (min-width: 30em) {
        :global(.flyout-sidebar-flyout) {
          width: 40%;
        }
      }
    `}</style>
    <style global jsx>{`
      body {
        overflow: hidden;
      }
    `}</style>
  </>
);

const EnhancedFlyoutSidebar = React.memo(FlyoutSidebar);

export default EnhancedFlyoutSidebar;
