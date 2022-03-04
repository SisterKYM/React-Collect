import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';

import {CommonButton, Status, Textarea} from 'elements';

const PaymentNoteButtonDropdownForm = ({
  className,
  allowDelete,
  status,
  onCancel,
  onSubmit,
  handleSubmit,
}) => {
  const pending = status === 'pending';

  const handleClickDelete = React.useCallback(() => {
    if (onSubmit) {
      onSubmit({note: ''});
    }
  }, [onSubmit]);

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <div className="mb2">
        <Field
          border
          className="payment-note-button-dropdown-form-text-area f6 line-20 gray-600"
          name="note"
          placeholder="Internal Note"
          component={Textarea}
        />
      </div>
      <div className="flex justify-between items-center f6">
        <div className="flex items-center">
          <CommonButton
            className="pt-14 bg-tint white pointer"
            disabled={pending}
            type="submit"
          >
            Save
          </CommonButton>
          <div className="pl2">
            <CommonButton
              className="pt-14 bg-gray-250 pointer gray-600"
              onClick={onCancel}
            >
              Cancel
            </CommonButton>
          </div>
          {pending && (
            <Status messages={{pending: 'Saving...'}} status="pending" />
          )}
        </div>
        {allowDelete && !pending && (
          <p
            className={pending ? 'gray-400' : 'tint pointer'}
            onClick={pending ? undefined : handleClickDelete}
          >
            Delete
          </p>
        )}
      </div>
      <style jsx>{`
        :global(.payment-note-button-dropdown-form-text-area) {
          resize: vertical;
        }
      `}</style>
    </form>
  );
};

const enhance = reduxForm();

const EnhancedPaymentNoteButtonDropdownForm = Object.assign(
  enhance(PaymentNoteButtonDropdownForm),
  {
    propTypes: {
      allowDelete: PropTypes.bool,
      form: PropTypes.string.isRequired,
      onCancel: PropTypes.func,
      onSubmit: PropTypes.func,
      status: PropTypes.string,
    },
  }
);

export default EnhancedPaymentNoteButtonDropdownForm;
