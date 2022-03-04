import provinces from 'provinces';
import React from 'react';

import {Select, TextInput} from 'elements';

const enhancedProvinces = [
  ...provinces,
  ...['AA', 'AP', 'AE'].map((stateName) => ({
    country: 'US',
    name: stateName,
    short: stateName,
  })),
];

const CheckoutShipToMeForm = ({value, onChangeValue}) => {
  const handleChangeCountry = (event) => {
    onChangeValue({
      ...value,
      country: event.target.value,
    });
  };
  const handleChangeCity = (event) => {
    onChangeValue({
      ...value,
      city: event.target.value,
    });
  };
  const handleChangeName = (event) => {
    onChangeValue({
      ...value,
      name: event.target.value,
    });
  };
  const handleChangeAddress = (event) => {
    onChangeValue({
      ...value,
      address: event.target.value,
    });
  };
  const handleChangeState = (event) => {
    onChangeValue({
      ...value,
      state: event.target.value,
    });
  };
  const handleChangeZip = (event) => {
    onChangeValue({
      ...value,
      zip: event.target.value,
    });
  };

  return (
    <div>
      <h4 className="mb2 f6 gray-600">Ship to:</h4>
      <Select
        className="ba br2"
        options={[
          {children: 'United States', value: 'US'},
          {children: 'Canada', value: 'CA'},
        ]}
        value={value.country}
        onChange={handleChangeCountry}
      />
      <TextInput
        className="mt2"
        placeholder="Name"
        value={value.name}
        onChange={handleChangeName}
      />
      <TextInput
        className="mt2"
        placeholder="Address"
        value={value.address}
        onChange={handleChangeAddress}
      />
      <div className="cf mt2">
        <TextInput
          className="fl w-40 pr2"
          placeholder="City"
          value={value.city}
          onChange={handleChangeCity}
        />
        <Select
          className="fl w-30 ph2 ba br2"
          options={enhancedProvinces
            .filter((s) => s.country === value.country)
            .map((st) => ({
              children: st.short,
              value: st.short,
            }))}
          value={value.state}
          onChange={handleChangeState}
        />
        <TextInput
          className="fl w-30 pl2"
          placeholder={value.country === 'US' ? 'Zip' : 'Postal Code'}
          type="zip"
          value={value.zip}
          onChange={handleChangeZip}
        />
      </div>
    </div>
  );
};

const EnhancedCheckoutShipToMeForm = React.memo(CheckoutShipToMeForm);

export default EnhancedCheckoutShipToMeForm;
