import {Field, FieldArray, reduxForm} from 'redux-form';
import React from 'react';

import {Input, InputLabel, RichTextMarkdown} from 'elements';
import useToggle from 'hooks/useToggle';

import SubcategoryFieldArrayInput from './SubcategoryFieldArrayInput';

const CategoryForm = ({
  className,
  subcategoriesEnabled,
  initialValues,
  onSubmit,
  handleSubmit,
}) => {
  const [descriptionVisible, toggleDescriptionVisible] = useToggle(
    initialValues.description.length !== 0
  );

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <InputLabel label="Category Name:" htmlFor="name">
        <Field
          name="name"
          className="mb2 f5 ba br2"
          component={Input}
          placeholder="Name your category"
          onChange={(event, next) => {
            if (next.length > 45) {
              event.preventDefault();
            }
          }}
        />
      </InputLabel>
      {descriptionVisible ? (
        <div className="mb4 mt3">
          <Field
            border
            borderRadius={false}
            name="description"
            editorClassName="rich-text-markdown-editor"
            component={RichTextMarkdown}
            boxShadow={false}
            placeholder="Description"
          />
        </div>
      ) : (
        <div className="mt3 f6">
          <span
            className="tint pointer"
            onClick={toggleDescriptionVisible.switch}
          >
            Add a description
          </span>
        </div>
      )}
      {subcategoriesEnabled && (
        <div className="mt5">
          <h2 className="f4">Add Sub-Category</h2>
          <FieldArray
            name="options.subcategories"
            className="mt3"
            component={SubcategoryFieldArrayInput}
          />
        </div>
      )}
      <style jsx>{`
        :global(.rich-text-markdown-editor) {
          min-height: 6.5rem;
        }
      `}</style>
    </form>
  );
};

const enhance = reduxForm({
  form: 'CategoryForm',
  validate: values => {
    const errors = {};
    if (!values.name) {
      errors.name = '* required';
    }

    return errors;
  },
});

const EnhancedCategoryForm = enhance(CategoryForm);

export default EnhancedCategoryForm;
