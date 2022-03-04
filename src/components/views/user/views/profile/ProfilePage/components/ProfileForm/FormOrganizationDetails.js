import PropTypes from 'prop-types';
import React from 'react';

import {Input} from 'elements';

import AdditionalInfoWarning from './AdditionalInfoWarning';
import FormAddressFields from './FormAddressFields';
import ProfileFormField from './ProfileFormField';
import ProfileFormPart from './ProfileFormPart';

const FormOrganizationDetails = ({
  country,
  showEin,
  onTransferAccount,
  editDisabled,
}) => (
  <div>
    <ProfileFormPart heading="ORGANIZATION DETAILS">
      <div className="mt3">
        <AdditionalInfoWarning
          editDisabled={editDisabled}
          onTransferAccount={onTransferAccount}
          disclaimer="Please enter the organization's legal information."
          justification="Federal regulations require us to collect this information to protect against fraud and to verify the authenticity of the organization. If we are unable to verify your organization, we may need to request more information"
        />
      </div>
      <FormAddressFields
        fieldNames={{
          city: 'orgCity',
          state: 'orgState',
          street: 'orgStreet',
          zip: 'orgZip',
        }}
        country={country}
        disabled={editDisabled}
      />
      {showEin && !editDisabled && (
        <div className="mt3">
          <ProfileFormField
            component={Input}
            name="einTaxID"
            disabled={editDisabled}
            placeholder="EIN/Tax ID"
          />
        </div>
      )}
    </ProfileFormPart>
  </div>
);

FormOrganizationDetails.propTypes = {
  showEin: PropTypes.bool.isRequired,
};

const EnhancedFormOrganizationDetails = React.memo(FormOrganizationDetails);

export default EnhancedFormOrganizationDetails;
