import {Field, reduxForm} from 'redux-form';
import React from 'react';

import {Input, RichTextMarkdown} from 'elements';

const WaiverForm = ({browser, onSubmit, handleSubmit}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <div>
      <Field
        border
        tabIndex={1}
        name="name"
        component={Input}
        className="mb3 mb4-ns"
        placeholder="Waiver Name (required)"
      />
      <Field
        tabIndex={2}
        name="description"
        component={RichTextMarkdown}
        editorClassName="rich-text-markdown"
        placeholder="Waiver Text"
        hideControls={browser.lessThan.medium}
      />
      <style jsx>{`
        :global(.rich-text-markdown) {
          min-height: 132px;
        }
        @media (max-width: 30em) {
          :global(.rich-text-markdown) {
            min-height: 100px;
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  </form>
);

const enhance = reduxForm({
  form: 'WaiverForm',
  enableReinitialize: true,
  validate: values => {
    const errors = {};
    if (!values.name) {
      errors.name = '* required';
    }

    return errors;
  },
});

const EnhancedWaiverForm = enhance(WaiverForm);

export default EnhancedWaiverForm;
