import {Field, reduxForm} from 'redux-form';
import CopyToClipboard from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';
import React from 'react';

import {Button, Input, Status, UrlSlugInput} from 'elements';

class HomepageShareForm extends React.PureComponent {
  static propTypes = {
    domain: PropTypes.string,
    onSubmit: PropTypes.func,
    status: PropTypes.string,
  };

  state = {
    editing: false,
  };

  handleEditLink = () => {
    this.setState((prevState) => ({
      editing: !prevState.editing,
    }));

    this.props.change('slug', this.props.initialValues.slug);
  };

  handleSubmit = (values, dispatch, form) => {
    if (this.props.onSubmit) {
      this.props.onSubmit(values, dispatch, form);
    }

    this.setState({editing: false});
  };

  render() {
    const {domain, status} = this.props;
    const {editing} = this.state;

    return (
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <div className="flex items-center">
          <div className="w-two-thirds">
            {editing ? (
              <UrlSlugInput domain={domain} name="slug" />
            ) : (
              <Field
                border
                disabled
                borderRadius={0}
                component={Input}
                name="link"
              />
            )}
          </div>
          <div className="ml2">
            {editing ? (
              <Button
                disabled={
                  (this.props.dirty && this.props.invalid) ||
                  status === 'pending'
                }
                type="submit"
              >
                Save
              </Button>
            ) : (
              <CopyToClipboard text={this.props.initialValues.link}>
                <Button type="button">Copy</Button>
              </CopyToClipboard>
            )}
          </div>
          {status === 'pending' && (
            <div className="ml2">
              <Status
                messages={{
                  pending: 'Saving...',
                }}
                status={status}
              />
            </div>
          )}
        </div>
        <p className="mt2 f6">
          <span className="tint pointer" onClick={this.handleEditLink}>
            {`${editing ? 'Back to Link' : 'Edit Link'}`}
          </span>
        </p>
      </form>
    );
  }
}

const enhance = reduxForm({
  form: 'HomepageShareForm',
  validate: (values = {}) => {
    const errors = {};

    if (!values.slug) {
      errors.slug = '*required';
    }

    return errors;
  },
});

const EnhancedHomepageShareForm = enhance(HomepageShareForm);

export default EnhancedHomepageShareForm;
