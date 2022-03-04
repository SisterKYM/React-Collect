import {Field, reduxForm} from 'redux-form';
import React from 'react';

import {RichTextMarkdown} from 'elements';

import ItemFormImagesField from './ItemFormImagesField';

const ITEM_FORM_IMAGES_AND_DESCRIPTION_NAME = 'ItemFormImagesAndDescription';

const ItemFormImagesAndDescription = ({
  userIsBasic,
  onDeclineAddImage,
  handleSubmit,
  onSubmit,
}) => (
  <form className="pv4" onSubmit={handleSubmit(onSubmit)}>
    <div className="pb4 bb b--gray-300">
      <div className="mb3 f-regular avenir-roman gray-600">
        Add a description of your item
      </div>
      <Field
        border
        className="item-description-text-area mw6-ns br0"
        name="description"
        placeholder="Description"
        component={RichTextMarkdown}
      />
    </div>
    <div className="pt4 flex flex-column flex-row-ns db-ns items-center item-description-image-area">
      <div className="mb3 f-regular avenir-roman gray-600">Add Image</div>
      <Field
        name="images"
        userIsBasic={userIsBasic}
        component={ItemFormImagesField}
        onDeclineAddImage={onDeclineAddImage}
      />
    </div>
    <style jsx>{`
      :global(.item-description-text-area) {
        min-height: 180px;
        line-height: 1.5rem;
      }
      :global(.item-description-image-area > div:last-child) {
        width: 100%;
      }
    `}</style>
  </form>
);

const enhance = reduxForm({
  form: ITEM_FORM_IMAGES_AND_DESCRIPTION_NAME,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  destroyOnUnmount: false,
});

const EnhancedItemFormImagesAndDescription = enhance(
  ItemFormImagesAndDescription
);

export {ITEM_FORM_IMAGES_AND_DESCRIPTION_NAME};
export default EnhancedItemFormImagesAndDescription;
