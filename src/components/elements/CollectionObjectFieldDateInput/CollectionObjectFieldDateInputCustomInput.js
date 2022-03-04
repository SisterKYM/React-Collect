import {compose} from 'recompose';
import React from 'react';
import cx from 'classnames';

import {Input} from 'elements';
import DateIcon from 'theme/images/Date.svg';

const CollectionObjectFieldDateInputCustomInput = (
  {className, small, disabled, inactive, onClick, ...props},
  ref
) => (
  <div
    ref={ref}
    className={cx(
      'flex items-center bt bl br br2 b--gray-300',
      (disabled || inactive) && 'container-disabled not-allowed',
      disabled ? 'bg-light-gray' : 'bg-white',
      className
    )}
    onClick={onClick}
  >
    <Input
      className="flex-auto"
      style={{
        ...(disabled ? {backgroundColor: '#eeeeee'} : {}),
        fontSize: small ? '16px' : '18px',
      }}
      readOnly={inactive}
      disabled={inactive}
      border={false}
      borderRadius={false}
      {...props}
    />
    <div className="flex self-stretch items-center pr3 bb b--gray-300">
      <img alt="Date" src={DateIcon} />
    </div>
    <style jsx>{`
      .container-disabled {
        pointer-events: none;
      }
      img {
        width: 1rem;
        height: 1rem;
      }
    `}</style>
  </div>
);

const enhance = compose(React.memo, React.forwardRef);

const EnhancedCollectionObjectFieldDateInputCustomInput = enhance(
  CollectionObjectFieldDateInputCustomInput
);

export default EnhancedCollectionObjectFieldDateInputCustomInput;
