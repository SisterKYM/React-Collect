import {Field, reduxForm} from 'redux-form';
import React from 'react';

import {RichTextMarkdown, Textarea, CommonButton, Status} from 'elements';

const displayName = 'views/collection/share/invitations/components/InviteForm';

const InviteForm = ({
  className,
  onSendTest,
  onSubmit,
  status,
  statusMessages,
}) => (
  <form className={className}>
    <Field
      border
      name="message"
      component={RichTextMarkdown}
      editorClassName="rich-text-markdown f-small"
      placeholder="Include a message"
    />
    <Field
      border
      name="emails"
      component={Textarea}
      className="mt3 f-small lh-copy dark-grey"
      rows={4}
      placeholder="Copy and paste a list of emails separated by commas or linebreaks"
    />
    <div className="mt3 flex items-center">
      <CommonButton
        backgroundColorSet
        className="invite-form-button ph4 f-small dark-grey bg-gray-250 mr2"
        disabled={status === 'pending'}
        onClick={onSendTest}
      >
        <span className="avenir-roman">Send Test</span>
      </CommonButton>
      <CommonButton
        backgroundColorSet
        className="invite-form-button ph4 f-small white bg-tint avenir-roman"
        disabled={status === 'pending'}
        onClick={onSubmit}
      >
        <span className="avenir-roman">Send Now</span>
      </CommonButton>
      {status && (
        <Status
          className="ml3 dark-grey"
          status={status}
          messages={statusMessages}
        />
      )}
    </div>
    <style jsx>{`
      :global(.rich-text-markdown) {
        min-height: 9rem;
      }
      :global(.invite-form-button) {
        height: 2.25rem;
      }
    `}</style>
  </form>
);

const enhance = reduxForm({
  form: displayName,
  validate(values) {
    const errors = {};
    if (!values.emails) {
      errors.emails = 'Required';
    }
    if (!values.message) {
      errors.message = 'Required';
    }

    return errors;
  },
});

const EnhancedInviteForm = enhance(InviteForm);

export {displayName};
export default EnhancedInviteForm;
