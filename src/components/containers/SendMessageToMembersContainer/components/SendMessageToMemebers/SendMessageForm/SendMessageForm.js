import {Field, formValueSelector, reduxForm} from 'redux-form';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {Input, RichTextMarkdown} from 'elements';
import {formErrors} from 'theme/constants';

import MembersList from './MembersList';

const SendMessageForm = ({
  form,
  change,
  members,
  onChange,
  onSubmit,
  handleSubmit,
}) => {
  const selector = React.useMemo(() => formValueSelector(form), [form]);

  const membersWithChecked = useSelector(state =>
    members.map(m => ({
      ...m,
      checked: Boolean(selector(state, `sendTo_${m.id}`)),
    }))
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb3">
        <MembersList
          change={change}
          members={membersWithChecked}
          onChange={onChange}
        />
      </div>
      <div className="mb3">
        <Field
          border
          borderRadius
          component={Input}
          name="subject"
          placeholder="Subject*"
        />
      </div>
      <div className="mb3">
        <Field
          border
          component={RichTextMarkdown}
          editorClassName="rich-text-markdown size-16"
          name="message"
          placeholder="Message*"
          styleWrap={{
            display: 'block',
          }}
        />
      </div>
      <style jsx>{`
        :global(.rich-text-markdown) {
          min-height: 6.5625rem;
        }
      `}</style>
    </form>
  );
};

const enhance = reduxForm({
  validate: (values = {}) => {
    const errors = {};
    if (!values.subject) {
      errors.subject = formErrors.REQUIRED;
    }
    if (!values.message) {
      errors.message = formErrors.REQUIRED;
    }

    return errors;
  },
});

const EnhancedSendMessageForm = Object.assign(enhance(SendMessageForm), {
  propTypes: {
    members: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string,
        id: PropTypes.number,
        payments: PropTypes.arrayOf(PropTypes.object),
      })
    ),
    onSubmit: PropTypes.func,
  },
});

export default EnhancedSendMessageForm;
