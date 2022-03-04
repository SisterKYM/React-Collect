import {Field, reduxForm} from 'redux-form';
import React from 'react';

import SelectImageList from './SelectImageList';

const SelectImageForm = ({handleSubmit, onSubmit, onDelete, images}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Field
      component={SelectImageList}
      name="image"
      images={images}
      onDelete={onDelete}
    />
  </form>
);

const enhance = reduxForm({
  form: 'SelectImageForm',
});

const EnhancedSelectImageForm = enhance(SelectImageForm);

export default EnhancedSelectImageForm;
