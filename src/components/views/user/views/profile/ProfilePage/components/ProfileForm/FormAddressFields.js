import PropTypes from 'prop-types';
import React from 'react';
import provinces from 'provinces';

import {Input, Select} from 'elements';

import ProfileFormField from './ProfileFormField';

const FormAddressFields = ({fieldNames, country, disabled}) => (
  <div>
    <ProfileFormField
      className="mt3"
      component={Input}
      disabled={disabled}
      name={fieldNames.street}
      placeholder="Street Address"
    />
    <div className="flex flex-wrap mt3 justify-between">
      <div className="w-100 w-50-ns">
        <ProfileFormField
          className="mr2-ns"
          component={Input}
          disabled={disabled}
          name={fieldNames.city}
          placeholder="City"
        />
      </div>
      <div className="w-100 w-25-ns">
        <div className="mt3 mt0-ns mh2-ns">
          <ProfileFormField
            className="avenir-light"
            fontFamilySet
            borderRadius
            component={Select}
            disabled={disabled}
            name={fieldNames.state}
            options={[
              {children: country === 'US' ? 'State' : 'Province', value: ''},
              ...provinces
                .filter(p => p.country === country)
                .map(s => ({
                  children: s.short,
                  value: s.short,
                })),
            ]}
          />
        </div>
      </div>
      <div className="w-100 w-25-ns mt3 mt0-ns">
        <ProfileFormField
          className="ml2-ns"
          component={Input}
          disabled={disabled}
          name={fieldNames.zip}
          placeholder={country === 'US' ? 'Zip' : 'Postal Code'}
        />
      </div>
    </div>
  </div>
);

const EnhancedFormAddressFields = Object.assign(React.memo(FormAddressFields), {
  propTypes: {
    fieldNames: PropTypes.shape({
      city: PropTypes.string,
      state: PropTypes.string,
      street: PropTypes.string,
      zip: PropTypes.string,
    }),
    states: PropTypes.arrayOf(
      PropTypes.shape({
        children: PropTypes.string,
        value: PropTypes.string,
      })
    ),
  },
});

export default EnhancedFormAddressFields;
