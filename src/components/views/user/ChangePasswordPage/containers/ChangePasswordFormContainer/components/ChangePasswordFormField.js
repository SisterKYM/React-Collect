import {Field} from 'redux-form';
import React from 'react';

import {Input} from 'elements';

const ChangePasswordFormField = ({name, placeholder}) => (
  <Field
    border
    className="mt3"
    component={Input}
    name={name}
    placeholder={placeholder}
    type="password"
  />
);

const EnhancedChangePasswordFormField = React.memo(ChangePasswordFormField);

export default EnhancedChangePasswordFormField;
