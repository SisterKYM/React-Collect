import {compose} from 'recompose';
import cx from 'classnames';
import posed from 'react-pose';
import React from 'react';

import {Z_INDEX as curtainZindex} from 'elements/Curtain';

const AnimatedContainer = posed.div({
  visible: {
    applyAtStart: {display: 'block'},
    opacity: 1,
    scaleX: 1,
    scaleY: 1,
    transition: {
      duration: 150,
    },
  },
  hidden: {
    applyAtEnd: {display: 'none'},
    opacity: 0,
    scaleX: 0,
    scaleY: 0,
    transition: {
      scaleX: {
        delay: 200,
      },
      scaleY: {
        delay: 200,
      },
      opacity: {
        duration: 200,
      },
    },
  },
});

const DropdownBody = (
  {
    className,
    border,
    borderRadius,
    borderColorSet = false,
    top,
    right,
    bottom,
    left,
    open,
    width = 300,
    height,
    onBlur,
    children,
  },
  ref
) => (
  <>
    <AnimatedContainer
      ref={ref}
      className={cx(
        'dropdown-body absolute overflow-hidden bg-white shadow-4 gray-600',
        borderRadius && 'br2',
        border && 'ba',
        !borderColorSet && 'b--gray-300',
        className
      )}
      pose={open ? 'visible' : 'hidden'}
      style={{
        width,
        height,
        left,
        right,
        top,
        bottom,
      }}
      onBlur={onBlur}
    >
      {children}
    </AnimatedContainer>
    <style jsx>{`
      :global(.dropdown-body) {
        z-index: ${curtainZindex + 2};
        max-height: 50vh;
        overflow: auto;
      }
    `}</style>
  </>
);

const EnhancedDropdownBody = compose(
  React.memo,
  React.forwardRef
)(DropdownBody);

export default EnhancedDropdownBody;
