import cx from 'classnames';
import React from 'react';

import {MarkdownParagraph} from 'elements';

import {FieldViews} from '../../components';

const FormView = ({
  className,
  errorMessages,
  formView,
  fieldViewsValue,
  onChangeErrorMessages,
  onChangeFieldViewsValue,
}) => (
  <section className={cx('pa3 pa4-ns shadow-6 bg-white', className)}>
    <div className="pb3 bb b--gray-300">
      <h5 className="mt0 mb3 f4 merriweather gray-600 form-name">
        {formView.name}
      </h5>
      {formView.description && (
        <MarkdownParagraph
          id="form-view-markdown"
          className="gray-600"
          markdown={formView.description}
        />
      )}
    </div>
    {formView.fields.length !== 0 && (
      <FieldViews
        contentContainerClassName="pt3"
        errorMessages={errorMessages}
        fieldViews={formView.fields}
        value={fieldViewsValue}
        onChangeErrorMessages={onChangeErrorMessages}
        onChangeValue={onChangeFieldViewsValue}
      />
    )}
    <style jsx>{`
      :global(#form-view-markdown) {
        line-height: 1.5rem;
      }
      .form-name {
        line-height: 26px;
      }
    `}</style>
  </section>
);

export default FormView;
