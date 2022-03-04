import {FaChevronRight} from 'react-icons/fa';
import React from 'react';
import cx from 'classnames';
import posed, {PoseGroup} from 'react-pose';

import {colors} from 'theme/constants';
import {Z_INDEX as curtainZIndex} from 'elements/Curtain';

const AnimatedSidebar = posed.div({
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
    x: '-100%',
    transition: {
      duration: 150,
    },
  },
});

const SecondarySidebarMobile = ({
  className,
  contentContainerClassName,
  burgerClassName,
  burgerIconColor,
  children,
}) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div className={cx('container', className)}>
      <div
        className={cx(
          'absolute top-0 left-0 pa2 bg-tint br2 br--right br--bottom shadow-4',
          burgerClassName
        )}
        onClick={() => {
          setVisible((prevVisible) => !prevVisible);
        }}
      >
        <FaChevronRight color={burgerIconColor || colors.lightAqua} />
      </div>
      <div
        onClick={() => {
          setVisible(false);
        }}
      >
        {visible && <div className="fixed absolute--fill" />}
        <PoseGroup>
          {visible && (
            <AnimatedSidebar
              key="animated-sidebar"
              className={cx(
                'container absolute shadow-4',
                contentContainerClassName
              )}
              withParent={false}
            >
              {children}
            </AnimatedSidebar>
          )}
        </PoseGroup>
      </div>
      <style global jsx>{`
        .container {
          z-index: ${curtainZIndex + 1};
        }
        body {
          overflow: ${visible ? 'hidden' : ''};
        }
      `}</style>
    </div>
  );
};

const EnhancedSecondarySidebarMobile = React.memo(SecondarySidebarMobile);

export default EnhancedSecondarySidebarMobile;
