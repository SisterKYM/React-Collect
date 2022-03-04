import {Field} from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';

import {Input} from 'elements';

const UrlSlugInput = ({domain, name}) => (
  <div className="flex justify-center">
    <div className="flex flex-auto justify-center items-center tc bg-light-aqua br2 br--left">
      https://
    </div>
    <div className="flex-auto tc">
      <Field className="tc" name={name} component={Input} />
    </div>
    <div className="flex flex-auto justify-center items-center tc bg-light-aqua br2 br--right">
      {`.${domain}`}
    </div>
  </div>
);

const EnhancedUrlSlugInput = Object.assign(React.memo(UrlSlugInput), {
  propTypes: {
    domain: PropTypes.string,
    name: PropTypes.string.isRequired,
  },
});

export default EnhancedUrlSlugInput;
