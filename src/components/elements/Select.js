import React from 'react';
import {IoMdArrowDropdown} from 'react-icons/io';
import PropTypes from 'prop-types';
import cx from 'classnames';
import shortid from 'shortid';

import {fontSizes} from 'theme/constants';

const arrowName = shortid.generate();

const Select = ({
  className,
  style,
  selectClassName,
  borderRadius,
  borderBrand,
  fontFamilySet,
  small,
  hideErrMsg,
  options,
  input,
  meta = {},
  ...props
}) => {
  const errMsg = meta.error || meta.warning;
  const showErrMsg = meta.touched && errMsg && !hideErrMsg;

  return (
    <div
      className={cx(
        'relative flex items-center pointer ba gray-600',
        borderRadius && 'br2',
        borderBrand || showErrMsg ? 'b--brand' : 'b--gray-300',
        className
      )}
    >
      <select
        {...props}
        {...input}
        className={cx(
          'gray-600',
          small ? 'f6' : 'f-regular',
          small ? 'h2' : 'select-regular-height',
          !fontFamilySet && 'avenir-roman',
          selectClassName
        )}
        style={{
          fontSize: fontSizes[small ? 5 : 4],
          paddingRight: small ? 16 : 25,
          ...style,
        }}
      >
        {options.map((optionProps, key) => (
          <option key={key} {...optionProps} />
        ))}
      </select>
      <div name={arrowName} className="arrow-icon-wrapper absolute flex">
        <IoMdArrowDropdown className="f3" />
      </div>
      {showErrMsg && (
        <div className="absolute right-0 mr4 f7 brand">{errMsg}</div>
      )}
      <style jsx>{`
        select:hover + div + div {
          display: none;
        }
        select::-ms-expand {
          display: none;
        }
        .select-regular-height {
          height: 2.5rem;
        }
        .arrow-icon-wrapper {
          pointer-events: none;
          right: 1rem;
        }
      `}</style>
    </div>
  );
};

const EnhancedSelect = Object.assign(React.memo(Select), {
  propTypes: {
    meta: PropTypes.object,
    options: PropTypes.array.isRequired,
  },
});

export default EnhancedSelect;
