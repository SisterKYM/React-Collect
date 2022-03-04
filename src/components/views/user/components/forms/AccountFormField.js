import {FaQuestionCircle} from 'react-icons/fa';
import {Field} from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import {Tooltip, Input} from 'elements';

const AccountFormField = ({first, helpUrl, name, normalize, placeholder}) => (
  <div className={cx('relative', !first && 'mt3')}>
    <Field
      component={Input}
      name={name}
      normalize={normalize}
      placeholder={placeholder}
    />
    {Boolean(helpUrl) && (
      <div className="tip absolute top-0 bottom-0 flex items-center f6">
        <Tooltip
          style={{width: 400, left: -190, top: -280}}
          text={<img src={helpUrl} alt="" />}
        >
          <div className="pointer">
            <FaQuestionCircle className="gray-400" size={22} />
          </div>
        </Tooltip>
      </div>
    )}
    <style jsx>{`
      .tip {
        right: -2.5rem;
      }
    `}</style>
  </div>
);

const EnhancedAccountFormField = Object.assign(React.memo(AccountFormField), {
  propTypes: {
    helpUrl: PropTypes.string,
    name: PropTypes.string,
    normalize: PropTypes.func,
    placeholder: PropTypes.string,
  },
});

export default EnhancedAccountFormField;
