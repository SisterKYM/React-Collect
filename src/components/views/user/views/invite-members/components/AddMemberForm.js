import {FaTimesCircle} from 'react-icons/fa';
import {Field, reduxForm} from 'redux-form';
import React from 'react';
import cx from 'classnames';
import provinces from 'provinces';

import {Button, Input, Select, Status} from 'elements';

import {memberFieldsValidations} from '../lib';

const FORM_NAME = 'AddMemberForm';
const REQUIRED_MESSAGE = '* required';

const AddMemberForm = ({
  className,
  lessThanMedium,
  country,
  addMemberInvitesStatus,
  handleSubmit,
  onSubmit,
  onClose,
}) => {
  const fieldCellClassName = lessThanMedium ? 'w-100' : 'w-50';
  const leadingFieldClassName = !lessThanMedium && 'mr2';
  const trailingFieldClassName = lessThanMedium ? 'mt3' : 'ml2';

  return (
    <form
      className={cx('relative', className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FaTimesCircle
        className="absolute top-0 right-0 ma3 pointer"
        onClick={onClose}
      />
      <div className="mr5">
        <div className="flex flex-wrap">
          <div className={fieldCellClassName}>
            <Field
              className={leadingFieldClassName}
              component={Input}
              name="first_name"
              placeholder="First Name"
            />
          </div>
          <div className={fieldCellClassName}>
            <Field
              className={trailingFieldClassName}
              component={Input}
              name="last_name"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="flex flex-wrap mt3">
          <div className={fieldCellClassName}>
            <Field
              className={leadingFieldClassName}
              component={Input}
              name="email"
              placeholder="Email Address"
            />
          </div>
          <div className={fieldCellClassName}>
            <Field
              className={trailingFieldClassName}
              component={Select}
              name="currency"
              placeholder="Currency"
              options={[
                {
                  children: 'US Dollar',
                  value: 'USD',
                },
                {
                  children: 'Canadian Dollar',
                  value: 'CAD',
                },
              ]}
            />
          </div>
        </div>
        <div className="flex flex-wrap mt3">
          <div className={fieldCellClassName}>
            <Field
              className={leadingFieldClassName}
              component={Input}
              name="business_tax_id"
              placeholder="Tax ID (optional)"
            />
          </div>
          <div className={fieldCellClassName}>
            <Field
              className={trailingFieldClassName}
              component={Input}
              name="business_name"
              placeholder="Organization Name (optional)"
            />
          </div>
        </div>
        <Field
          className="mt3"
          component={Select}
          name="type"
          placeholder="Type"
          options={[
            {
              children: 'Individual',
              value: 'individual',
            },
            {
              children: 'Company',
              value: 'company',
            },
          ]}
        />
        <div className="flex flex-wrap mt3">
          <div className={fieldCellClassName}>
            <Field
              className={leadingFieldClassName}
              component={Input}
              name="address.line1"
              placeholder="Street Address"
            />
          </div>
          <div className={fieldCellClassName}>
            <Field
              className={trailingFieldClassName}
              component={Input}
              name="address.city"
              placeholder="City"
            />
          </div>
        </div>
        <div className="flex flex-wrap mt3">
          <div className={fieldCellClassName}>
            <Field
              className={leadingFieldClassName}
              component={Select}
              options={[
                {
                  children: country === 'CA' ? 'Province' : 'State',
                  value: '',
                },
                ...provinces
                  .filter(province => province.country === country)
                  .map(province => ({
                    children: province.name,
                    value: province.short,
                  })),
              ]}
              name="address.state"
              placeholder="State"
            />
          </div>
          <div className={fieldCellClassName}>
            <Field
              className={trailingFieldClassName}
              component={Input}
              name="address.postal_code"
              placeholder="Zip Code"
            />
          </div>
        </div>
        <Field
          className="mt3"
          component={Select}
          name="address.country"
          options={[
            {
              children: 'Country',
              value: '',
            },
            {
              children: 'United States',
              value: 'United States',
            },
            {
              children: 'Canada',
              value: 'Canada',
            },
          ]}
        />
        <div className="flex flex-wrap mt3">
          <div className={fieldCellClassName}>
            <Field
              className={leadingFieldClassName}
              component={Input}
              name="bankAccount.accountNumber"
              placeholder="Bank Account Number"
            />
          </div>
          <div className={fieldCellClassName}>
            <Field
              className={trailingFieldClassName}
              component={Input}
              name="bankAccount.routingNumber"
              placeholder="Bank Routing"
            />
          </div>
        </div>
        <div className="flex mt3">
          <Button
            small
            className="ph3 pv2"
            disabled={addMemberInvitesStatus === 'pending'}
            type="Submit"
          >
            Send Welcome Email
          </Button>
          {addMemberInvitesStatus === 'pending' && (
            <div className="pt2 ml2">
              <Status
                status={addMemberInvitesStatus}
                messages={{pending: 'Sending...'}}
              />
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

const enhance = reduxForm({
  form: FORM_NAME,
  initialValues: {
    type: 'individual',
    currency: 'USD',
  },
  validate: values => {
    const errors = {};

    if (
      !values.first_name ||
      !memberFieldsValidations.isEmpty(values.first_name)
    ) {
      errors.first_name = REQUIRED_MESSAGE;
    }
    if (
      !values.last_name ||
      !memberFieldsValidations.isEmpty(values.last_name)
    ) {
      errors.last_name = REQUIRED_MESSAGE;
    }
    if (!values.email || !memberFieldsValidations.isEmail(values.email)) {
      errors.email = '* invalid format';
    }
    if (!values.currency || !memberFieldsValidations.isEmpty(values.currency)) {
      errors.currency = REQUIRED_MESSAGE;
    }
    if (Boolean(values.address) && values.address.postal_code) {
      const countryUsSelected = values.address.country === 'United States';

      if (
        (countryUsSelected &&
          !memberFieldsValidations.isUSPostalCode(
            values.address.postal_code
          )) ||
        (countryUsSelected &&
          !memberFieldsValidations.isCanadianPostalCode(
            values.address.postal_code
          ))
      ) {
        errors.postal_code = '* invalid format';
      }
    }

    return errors;
  },
});

const EnhancedAddMemberForm = Object.assign(enhance(AddMemberForm), {
  formName: FORM_NAME,
});

export default EnhancedAddMemberForm;
