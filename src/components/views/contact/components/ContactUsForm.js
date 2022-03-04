import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import {Button, Input, RichTextMarkdown, Status} from 'elements';
import {formErrors} from 'theme/constants';

const ContactUsForm = ({browser, status, reset, handleSubmit, onSubmit}) => {
  const isPending = status === 'pending';
  const marginTopCx = 'mt2 mt3-ns';

  React.useEffect(() => {
    if (status === 'success') {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-ns">
        <div className="w-50-ns">
          <Field
            border
            borderRadius={0}
            className="mr2-ns"
            component={Input}
            name="firstName"
            placeholder="First Name"
          />
        </div>
        <div className="w-50-ns mt2 mt0-ns">
          <Field
            border
            borderRadius={0}
            className="ml2-ns"
            component={Input}
            name="lastName"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div className={marginTopCx}>
        <Field
          border
          borderRadius={0}
          component={Input}
          name="email"
          placeholder="Email (please use email on account if applicable)"
        />
      </div>
      <div className={marginTopCx}>
        <Field
          border
          borderRadius={0}
          component={Input}
          name="phone"
          placeholder="Phone"
        />
      </div>
      <div className={marginTopCx}>
        <Field
          border
          component={RichTextMarkdown}
          editorClassName="contact-us-form-rte"
          name="message"
          placeholder="Message"
          style={{
            borderRadius: 0,
          }}
        />
      </div>
      <div className={cx(marginTopCx, 'flex items-center')}>
        <Button
          className="mw4"
          small={browser.lessThan.extraSmall}
          disabled={isPending}
        >
          Submit
        </Button>
        {isPending && (
          <div className="ml2">
            <Status status="pending" />
          </div>
        )}
      </div>
      <style jsx>{`
        :global(.contact-us-form-rte) {
          min-height: 105px;
        }
      `}</style>
    </form>
  );
};

const enhance = reduxForm({
  form: 'ContactUsForm',
  validate: (values) => {
    const errs = {};
    if (!values) {
      return errs;
    }
    if (!values.firstName) {
      errs.firstName = formErrors.REQUIRED;
    }
    if (!values.lastName) {
      errs.lastName = formErrors.REQUIRED;
    }
    if (!values.email) {
      errs.email = formErrors.REQUIRED;
    }
    if (!values.phone) {
      errs.phone = formErrors.REQUIRED;
    }
    if (!values.message) {
      errs.message = formErrors.REQUIRED;
    }

    return errs;
  },
});

const EnhancedContactUsForm = Object.assign(enhance(ContactUsForm), {
  propTypes: {
    browser: PropTypes.shape({
      greaterThan: PropTypes.object,
    }),
    onSubmit: PropTypes.func,
    status: PropTypes.string,
  },
});

export default EnhancedContactUsForm;
