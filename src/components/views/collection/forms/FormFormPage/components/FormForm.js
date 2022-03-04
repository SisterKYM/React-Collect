import {Field, reduxForm} from 'redux-form';
import React from 'react';

import {Input, RichTextMarkdown} from 'elements';

const FORM_NAME = 'FormForm';

class FormForm extends React.PureComponent {
  state = {
    descriptionFieldVisible: this.props.initialValues
      ? Boolean(this.props.initialValues.description)
      : false,
  };

  handleAddDescription = () => {
    this.setState({descriptionFieldVisible: true});
  };

  render() {
    return (
      <div className="ph3 ph4-ns" style={{paddingTop: '45px'}}>
        <h2 className="f3 avenir-roman dark-grey mb3">Add Form</h2>
        <form
          className="bb b--gray-300"
          onSubmit={this.props.handleSubmit(this.props.onSubmit)}
        >
          <Field
            border
            placeholder="Form Name: (required)"
            name="name"
            component={Input}
          />
          <div className="mt3 mb3 mb4-ns">
            {this.state.descriptionFieldVisible ? (
              <Field
                name="description"
                component={RichTextMarkdown}
                editorClassName="rich-text-markdown"
                placeholder="Add a description"
                hideControls={this.props.descriptionInputControlsHidden}
              />
            ) : (
              <div
                className="tint pointer text-14"
                onClick={this.handleAddDescription}
              >
                Add a description
              </div>
            )}
          </div>
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
        </form>
      </div>
    );
  }
}

const enhance = reduxForm({
  form: FORM_NAME,
  enableReinitialize: true,
  validate: (values) => ({
    name: !values.name ? 'Name is required' : undefined,
  }),
});

const EnhancedFormForm = Object.assign(enhance(FormForm), {
  formName: FORM_NAME,
});

export default EnhancedFormForm;
