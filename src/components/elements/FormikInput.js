import React from 'react';
import _ from 'lodash';

import Input from 'elements/Input';

const FormikInput = ({field, form, ...props}) => (
  <Input
    meta={{
      touched: _.get(form.touched, field.name),
      error: _.get(form.errors, field.name),
    }}
    {...props}
    {...field}
  />
);

const EnhancedFormikInput = React.memo(FormikInput);

export default EnhancedFormikInput;
