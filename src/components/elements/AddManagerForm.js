import {IoMdClose} from 'react-icons/io';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';

import {Button, Input, Status} from 'elements';

const VALIDATE_MESSAGES = {
  REQUIRED: 'Required',
  INCORRECT: 'Incorrect',
};

const AddManagerForm = ({
  errMsg,
  handleSubmit,
  onRemoveForm,
  onSubmit,
  status,
}) => (
  <form className="relative" onSubmit={handleSubmit(onSubmit)}>
    <IoMdClose
      className="absolute top-0 right-0 pointer"
      onClick={onRemoveForm}
    />
    <div className="mr4">
      <div className="flex flex-wrap">
        <div className="w-100 w-33-ns">
          <div className="mr2-ns">
            <Field
              component={Input}
              name="firstName"
              placeholder="First Name"
              small
            />
          </div>
        </div>
        <div className="w-100 w-33-ns mt3 mt0-ns">
          <div className="ml2-ns">
            <Field
              component={Input}
              name="lastName"
              placeholder="Last Name"
              small
            />
          </div>
        </div>
        <div className="w-100 w-33-ns mt3 mt0-ns">
          <div className="ml2-ns">
            <Field
              component={Input}
              name="email"
              placeholder="Email Address"
              small
            />
          </div>
        </div>
      </div>
      <div className="flex mt3">
        <Button
          small
          disabled={status === 'pending'}
          type="submit"
          style={{width: 132}}
        >
          Send Invite
        </Button>
        {status !== 'success' && (
          <div className="pt2 ml2">
            <Status
              status={status}
              messages={{pending: 'Sending...', failure: errMsg}}
            />
          </div>
        )}
      </div>
    </div>
  </form>
);

const enhance = reduxForm({
  validate: (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = VALIDATE_MESSAGES.REQUIRED;
    } else {
      const re = /^(([^\s"(),.:;<>@[\]]+(\.[^\s"(),.:;<>@[\]]+)*)|(".+"))@(([^\s"(),.:;<>@[\]]+\.)+[^\s"(),.:;<>@[\]]{2,})$/i;
      if (!re.test(values.email.toLowerCase())) {
        errors.email = VALIDATE_MESSAGES.INCORRECT;
      }
    }
    if (!values.firstName) {
      errors.firstName = VALIDATE_MESSAGES.REQUIRED;
    }
    if (!values.lastName) {
      errors.lastName = VALIDATE_MESSAGES.REQUIRED;
    }

    return errors;
  },
});

const EnhancedAddManagerForm = Object.assign(enhance(AddManagerForm), {
  propTypes: {
    form: PropTypes.string.isRequired,
    id: PropTypes.number,
    onRemoveForm: PropTypes.func,
  },
});

export default EnhancedAddManagerForm;
