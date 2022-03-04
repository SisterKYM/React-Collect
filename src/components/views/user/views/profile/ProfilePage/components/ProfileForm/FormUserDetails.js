import PropTypes from 'prop-types';
import React from 'react';

import {Button, Input, Select, PhoneInput, Status} from 'elements';
import isFieldNeeded from 'helpers/isFieldNeeded';
import normalizeDate from 'helpers/normalizeDate';

import FormAddressFields from './FormAddressFields';
import ProfileFormField from './ProfileFormField';

const normalizeLast4SSN = (value) => {
  if (!value || Number.isNaN(Number.parseInt(value, 10))) {
    return '';
  }

  return value.length > 4 ? value.slice(0, 4) : value;
};

class FormUserDetails extends React.PureComponent {
  static propTypes = {
    fieldsNeeded: PropTypes.arrayOf(PropTypes.string),
    showDOB: PropTypes.bool.isRequired,
    states: PropTypes.arrayOf(
      PropTypes.shape({
        children: PropTypes.string,
        value: PropTypes.string,
      })
    ),
  };

  renderPhoneInput = (field) => (
    <PhoneInput
      small
      country="US"
      placeholder="Mobile Phone"
      {...field}
      {...field.input}
    />
  );

  render() {
    const {
      fieldsNeeded,
      editDisabled,
      country,
      showDOB,
      phoneNumberVerified,
      startPhoneVerificationStatus,
      onConfirmPhoneNumber,
    } = this.props;
    const showPersonalIdNumber = isFieldNeeded(fieldsNeeded, '.id_number');
    const showSSN = isFieldNeeded(fieldsNeeded, 'ssn_last_4');

    return (
      <div>
        <div className="flex flex-wrap justify-between">
          <div className="w-100 w-50-ns">
            <ProfileFormField
              className="mr2-ns"
              component={Input}
              disabled={editDisabled}
              name="firstName"
              placeholder="First Name"
            />
          </div>
          <div className="w-100 w-50-ns mt3 mt0-ns">
            <ProfileFormField
              className="ml2-ns"
              component={Input}
              disabled={editDisabled}
              name="lastName"
              placeholder="Last Name"
            />
          </div>
        </div>
        <FormAddressFields
          fieldNames={{
            city: 'userCity',
            state: 'userState',
            street: 'userStreet',
            zip: 'userZip',
          }}
          country={country}
          disabled={editDisabled}
        />
        {(showDOB ||
          showSSN ||
          showPersonalIdNumber ||
          !phoneNumberVerified) && (
          <div className="flex mt3 flex-wrap justify-between">
            {showDOB && (
              <div className="w-100 w-50-ns">
                <ProfileFormField
                  className="mr2-ns"
                  component={Input}
                  disabled={editDisabled}
                  name="dateOfBirth"
                  normalize={normalizeDate}
                  placeholder="Date of Birth"
                />
              </div>
            )}
            {showSSN && (
              <div className="w-100 w-50-ns">
                <ProfileFormField
                  className={showDOB ? 'ml2-ns' : ''}
                  component={Input}
                  disabled={editDisabled}
                  name="last4SSN"
                  normalize={normalizeLast4SSN}
                  placeholder="Last 4 of SSN"
                />
              </div>
            )}
            {showPersonalIdNumber && (
              <div className="w-100 mt3">
                <ProfileFormField
                  component={Input}
                  disabled={editDisabled}
                  name="personalIdNumber"
                  placeholder={country === 'CA' ? 'Full SIN' : 'Full SSN'}
                />
              </div>
            )}
            {!process.env.REACT_APP_TWO_FACTOR_DISABLED &&
              !phoneNumberVerified && (
                <>
                  <span className="f-regular mv3">
                    To help keep your account secure, we use two-factor
                    authentication. Please enter a phone number below. We will
                    use this number to send verification codes when necessary:
                  </span>
                  <div className="flex flex-wrap mv2 items-center">
                    <div className="w-100 w-auto-ns f-regular avenir-light">
                      Send messages via:
                    </div>
                    <div className="w-100 w-auto-ns">
                      <ProfileFormField
                        hideErrMsg
                        className="ml2-ns"
                        disabled={startPhoneVerificationStatus === 'pending'}
                        component={Select}
                        name="via"
                        options={[
                          {children: 'Text Message', value: 'sms'},
                          {children: 'Phone Call', value: 'call'},
                        ]}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-between">
                    <div className="w-100 w-80-ns">
                      <ProfileFormField
                        className="mr2-ns"
                        component={this.renderPhoneInput}
                        disabled={startPhoneVerificationStatus === 'pending'}
                        name="phone"
                      />
                    </div>
                    <div className="w-100 w-20-ns">
                      <div className="ml2-ns mt3 mt0-ns">
                        {startPhoneVerificationStatus === 'pending' ? (
                          <div className="form-user-details-button">
                            <Status status={startPhoneVerificationStatus} />
                          </div>
                        ) : (
                          <Button
                            backgroundColorSet
                            className="form-user-details-button flex justify-center items-center tc bg-tint"
                            onClick={onConfirmPhoneNumber}
                          >
                            Confirm
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            <style jsx>{`
              :global(.form-user-details-button) {
                min-width: 120px;
              }
            `}</style>
          </div>
        )}
      </div>
    );
  }
}

export default FormUserDetails;
