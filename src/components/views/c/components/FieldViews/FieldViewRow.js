import cx from 'classnames';
import React from 'react';

import {InputLabel} from 'elements';

const FieldViewRow = ({className, fieldView, children}) => (
  <InputLabel
    className={cx('db', className)}
    required={fieldView.required}
    htmlFor={fieldView.id}
    label={fieldView.name}
  >
    {fieldView.metadata &&
      fieldView.metadata.description &&
      fieldView.metadata.description.enabled && (
        <div
          className="pb2 f6 avenir-light-oblique gray-600"
          style={{lineHeight: '20px'}}
        >
          {fieldView.metadata.description.value || ''}
        </div>
      )}
    {children}
  </InputLabel>
);

export default FieldViewRow;
