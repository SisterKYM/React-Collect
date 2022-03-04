import * as Yup from 'yup';
import {Field} from 'formik';
import React from 'react';
import cx from 'classnames';
import provinces from 'provinces';

import {FormikInput, Select, Status} from 'elements';

const AddressValidationSchema = Yup.object().shape({
  country: Yup.string()
    .matches(/US|CA/, 'Must be either US or CA')
    .required('Required'),
  name: Yup.string().required('Required'),
  street1: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  zip: Yup.string().required('Required'),
});

const PrintShippingLabelShipAddressForm = ({
  className,
  namePrefix,
  loading,
  title,
  countries,
  values: allValues,
  isSubmitting,
  onCheck,
}) => {
  const values = allValues[namePrefix];

  return (
    <div className={cx('pa3 f6 avenir-roman gray-600 bg-white', className)}>
      <div className="mb3">{title}</div>
      <div className="mb3">
        <div className="mb2">Country</div>
        <Field name={`${namePrefix}.country`}>
          {({field}) => (
            <Select className="ba" options={countries} {...field} />
          )}
        </Field>
      </div>
      <div className="mb3">
        <div className="mb2">Customer&apos;s full name</div>
        <Field name={`${namePrefix}.name`}>
          {({field, form}) => (
            <FormikInput
              border
              borderRadius={false}
              placeholder="First and last name"
              field={field}
              form={form}
            />
          )}
        </Field>
      </div>
      <div className="mb3">
        <div className="mb2">Address number and street</div>
        <Field name={`${namePrefix}.street1`}>
          {({field, form}) => (
            <FormikInput
              border
              borderRadius={false}
              placeholder="Address"
              form={form}
              field={field}
            />
          )}
        </Field>
      </div>
      <div className="mb3">
        <div className="mb2">City</div>
        <Field name={`${namePrefix}.city`}>
          {({field, form}) => (
            <FormikInput
              border
              borderRadius={false}
              placeholder="City"
              form={form}
              field={field}
            />
          )}
        </Field>
      </div>
      <div className="flex mb3 items-center">
        <div className="flex-auto mr2">
          <div className="mb2">
            {values.country === 'CA' ? 'Province' : 'State'}
          </div>
          <Field name={`${namePrefix}.state`}>
            {({field}) => (
              <Select
                className="ba"
                options={[
                  {
                    children: values.country === 'CA' ? 'Province' : 'State',
                    value: '',
                  },
                  ...provinces
                    .filter(({country}) => country === (values.country || 'US'))
                    .map(({name, short}) => ({
                      children: name,
                      value: short,
                    })),
                ]}
                {...field}
              />
            )}
          </Field>
        </div>
        <div className="flex-auto">
          <div className="mb2">
            {values.country === 'CA' ? 'Postal code' : 'Zip code'}
          </div>
          <Field name={`${namePrefix}.zip`}>
            {({field, form}) => (
              <FormikInput
                border
                borderRadius={false}
                placeholder={
                  values.country === 'CA' ? 'Postal code' : 'Zip code'
                }
                field={field}
                form={form}
              />
            )}
          </Field>
        </div>
      </div>
      <div className="flex items-center">
        {isSubmitting || loading ? (
          <Status status="pending" />
        ) : (
          <button
            className="ph0 f6 avenir-roman tint"
            disabled={isSubmitting}
            onClick={onCheck}
          >
            Perform address check
          </button>
        )}
      </div>
    </div>
  );
};

const EnhancedPrintShippingLabelShipAddressForm = Object.assign(
  React.memo(PrintShippingLabelShipAddressForm),
  {
    validationSchema: AddressValidationSchema,
  }
);

export default EnhancedPrintShippingLabelShipAddressForm;
