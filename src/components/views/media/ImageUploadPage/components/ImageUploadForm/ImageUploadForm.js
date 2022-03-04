import {Field, reduxForm} from 'redux-form';
import React from 'react';

import {FileInput} from 'elements';

import UploadPhotoPanel from './UploadPhotoPanel';

const IMAGE_MAX_SIZE = 1024 * 1024 * 10;
const ACCEPTED_MIME_TYPES = [
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/bmp',
  'image/webp',
];

const ImageUploadForm = ({onDropRejected}) => (
  <form>
    <Field
      name="image"
      accept={ACCEPTED_MIME_TYPES}
      maxSize={IMAGE_MAX_SIZE}
      component={FileInput}
      onDropRejected={onDropRejected}
    >
      <div className="flex justify-center">
        <UploadPhotoPanel />
      </div>
    </Field>
  </form>
);

const enhance = reduxForm({
  form: 'ImageUploadForm',
  onChange: (_values, _dispatch, props) => {
    props.submit();
  },
});

const EnhancedImageUploadForm = enhance(ImageUploadForm);

export default EnhancedImageUploadForm;
