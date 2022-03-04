import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from 'react-stripe-elements';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import cx from 'classnames';

import {colors, fontFamily, inputHeight} from 'theme/constants';
import Input from 'elements/Input';
import useMedia from 'hooks/useMedia';

const TYPES = {
  CVC: 'cvc',
  EXPIRY: 'expiry',
  ZIP: 'zip',
};

const CardElement = ({
  className,
  elementClassName,
  style,
  noPadding,
  border,
  placeholder,
  type,
  height,
  ...props
}) => {
  const {notSmall} = useMedia();

  const CardElement = React.useMemo(() => {
    switch (type) {
      case TYPES.CVC:
        return CardCvcElement;
      case TYPES.EXPIRY:
        return CardExpiryElement;
      case TYPES.ZIP:
        return Input;
      default:
        return CardNumberElement;
    }
  }, [type]);

  return (
    <div
      className={cx(
        'flex items-center bg-white',
        type !== TYPES.ZIP && border && 'ba b--gray-300 br2',
        !noPadding && 'ph2',
        className
      )}
      style={{height: height || inputHeight}}
    >
      <div className="w-100 mt1">
        <CardElement
          {...props}
          className={elementClassName}
          style={{
            ...(style || {}),
            ...(type === TYPES.ZIP
              ? {
                  fontFamily,
                  color: colors.black,
                  height: height || inputHeight,
                  ...(style ? style.base : {}),
                }
              : {
                  base: {
                    height: inputHeight,
                    fontFamily,
                    fontSize: notSmall ? '16px' : '16px',
                    color: colors.black,
                    '::placeholder': {
                      color: colors.darkGray,
                      fontFamily,
                    },
                    ...(style ? style.base : {}),
                  },
                  invalid: {
                    '::placeholder': {
                      color: '#f36d36',
                    },
                  },
                }),
          }}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

const EnhancedCardElement = Object.assign(React.memo(CardElement), {
  propTypes: {
    border: PropTypes.bool,
    className: PropTypes.string,
    onReady: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(_.values(TYPES)),
  },
});

export default EnhancedCardElement;
