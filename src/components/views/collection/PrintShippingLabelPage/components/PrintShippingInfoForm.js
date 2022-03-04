import {Field} from 'formik';
import {IoMdHelpCircle} from 'react-icons/io';
import React from 'react';
import cx from 'classnames';

import {Checkbox, FormikInput, Select, Tooltip} from 'elements';
import PrintShippingHelpers from 'helpers/PrintShippingHelpers';

const PrintShippingInfoForm = ({
  className,
  signatureAmount,
  values,
  errors,
}) => {
  const weightFieldWidth = {
    width: 100,
  };
  const selectedServiceType =
    PrintShippingHelpers.SERVICE_TYPES.find(
      ({value}) => value === values.shipment.serviceType
    ) || PrintShippingHelpers.SERVICE_TYPES[0];
  const {
    weight: maxWeight,
    unit: maxWeightUnit,
  } = PrintShippingHelpers.getParcelMaxWeightForService(
    values.shipment.serviceType
  );
  const {
    lbs: weightLbsVisible,
    oz: weightOzVisible,
  } = PrintShippingHelpers.getNeedsParcelWeight({
    packageType: values.shipment.packageType,
    service: values.shipment.serviceType,
  });

  return (
    <div className={cx('pa3 f6 avenir-roman gray-600 bg-white', className)}>
      <div className="mb4 f-regular">Shipping Information</div>
      <div className="flex flex-wrap justify-between">
        <div className="w-100 w-40-ns mb3 mb0-ns">
          <div className="mb3">
            <div className="mb2">USPS Service Type</div>
            <Field name="shipment.serviceType">
              {({field}) => (
                <Select
                  className="ba"
                  options={PrintShippingHelpers.SERVICE_TYPES.map(
                    ({packageTypes, ...option}) => option
                  )}
                  {...field}
                />
              )}
            </Field>
          </div>
          <div className="mb3">
            <div className="mb2">Package Type</div>
            <Field name="shipment.packageType">
              {({field}) => (
                <Select
                  className="ba"
                  options={selectedServiceType.packageTypes}
                  {...field}
                />
              )}
            </Field>
          </div>
          <div>
            <div className="mb2">Package Weight</div>
            {!(
              values.shipment.serviceType === 'Express' &&
              (values.shipment.packageType === 'Parcel' ||
                values.shipment.packageType === 'LargeParcel')
            ) && (
              <div className="mb2 gray-500">
                Up to {maxWeight} {maxWeightUnit}{' '}
                {(values.shipment.serviceType === 'First' &&
                  (values.shipment.packageType === 'Parcel' ||
                    values.shipment.packageType === 'LargeParcel')) ||
                (values.shipment.serviceType === 'Priority' &&
                  values.shipment.packageType === 'Parcel')
                  ? `and 108" girth`
                  : 'or less'}
              </div>
            )}
            <div className="flex items-center">
              {weightLbsVisible && (
                <div className="flex items-center">
                  <Field name="shipment.packageWeightLbs">
                    {({field, form}) => (
                      <FormikInput
                        border
                        small
                        style={weightFieldWidth}
                        borderRadius={false}
                        type="number"
                        placeholder="0"
                        field={field}
                        form={form}
                        errors={errors}
                      />
                    )}
                  </Field>
                  <div className="ml2">lbs.</div>
                </div>
              )}
              {weightOzVisible && (
                <div
                  className={cx('flex items-center', weightLbsVisible && 'ml2')}
                >
                  <Field name="shipment.packageWeightOz">
                    {({field, form}) => (
                      <FormikInput
                        border
                        small
                        style={weightFieldWidth}
                        borderRadius={false}
                        type="number"
                        placeholder="0"
                        field={field}
                        form={form}
                        errors={errors}
                      />
                    )}
                  </Field>
                  <div className="ml2">oz.</div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-100 w-40-ns">
          <div>
            <div className="mb2">Optional</div>
            <Field name="shipment.tracking">
              {({field}) => (
                <Checkbox
                  className="mb2"
                  label="USPS Tracking (Included)"
                  checked={field.value}
                  {...field}
                />
              )}
            </Field>
            <div className="flex items-center">
              <Field name="shipment.signatureConfirmation">
                {({field}) => (
                  <Checkbox
                    className="mr2"
                    label={`Signature Confirmation (${
                      signatureAmount === 0
                        ? 'Included'
                        : `$${signatureAmount} USD`
                    })`}
                    checked={field.value}
                    {...field}
                  />
                )}
              </Field>
              <Tooltip
                style={{
                  width: 220,
                  left: -80,
                  bottom: 36,
                }}
                arrowPosition="40%"
                text="Provides the date and time of delivery or attempted delivery and the name of the person who signed for the item. You can request a printed copy of the signature electronically or by email. After delivery, you’ll be able to determine the date and time of delivery using USPS Tracking®."
              >
                <IoMdHelpCircle color="lightGray" size={20} />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EnhancedPrintShippingInfoForm = React.memo(PrintShippingInfoForm);

export default EnhancedPrintShippingInfoForm;
