import cx from 'classnames';
import React from 'react';

import {Status} from 'elements';

const getClassNameForSize = size => {
  switch (size) {
    case 'SMALL':
      return 'ph3 pv2 f8';
    case 'MEDIUM':
      return 'medium pv2 f6';
    case 'LARGE':
      return 'large f5';
    case 'EXTRA_LARGE':
      return 'extra-large ph4 f-regular';
    default:
      return '';
  }
};

const Touchable = ({
  className,
  size = 'CUSTOM',
  type = 'button',
  disabled = false,
  loading = false,
  children,
  onClick,
}) => {
  const computedClassName = getClassNameForSize(size);
  const computedDisabled = disabled || loading;

  return (
    <button
      className={cx(
        'input-reset tc br2',
        computedDisabled ? 'o-50 not-allowed' : 'dim',
        computedClassName,
        className
      )}
      type={type}
      disabled={computedDisabled}
      onClick={onClick}
    >
      {loading ? (
        <div className="flex justify-center items-center">
          <Status status="pending" />
        </div>
      ) : (
        children
      )}
      <style jsx>{`
        .medium {
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        .large {
          height: 2.5rem;
          padding-left: 1.75rem;
          padding-right: 1.75rem;
        }
        .extra-large {
          height: 2.8125rem;
        }
      `}</style>
    </button>
  );
};

const EnhancedTouchable = React.memo(Touchable);

export default EnhancedTouchable;
