import {FaQuestionCircle} from 'react-icons/fa';
import {Field} from 'formik';
import PropTypes from 'prop-types';
import React from 'react';

import {Tooltip, FormikInput} from 'elements';

const AccountFormField = ({helpUrl, name, normalize, placeholder}) => (
  <>
    <Field
      component={FormikInput}
      name={name}
      normalize={normalize}
      placeholder={placeholder}
      border
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
        right: 0.5rem;
      }
    `}</style>
  </>
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
