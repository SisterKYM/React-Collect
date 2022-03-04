import {every} from 'lodash';

import validations from './memberFieldsValidations';

const isMemberValid = ({
  first_name,
  last_name,
  dob,
  address,
  email,
  currency,
  type,
  business_tax_id,
}) =>
  every([first_name, last_name], validations.isEmpty) &&
  validations.isEmail(email) &&
  validations.isCurrency(currency) &&
  validations.isAccountType(type) &&
  (!business_tax_id || validations.isBusinessTaxId(business_tax_id)) &&
  (!dob || validations.isDob(dob)) &&
  (!address ||
    (((Boolean(address.country) && address.country.length === 0) ||
      validations.isCountry(address.country)) &&
      ((Boolean(address.state) && address.state.length === 0) ||
        (address.country === 'Canada'
          ? validations.isCanadianProvince(address.state)
          : validations.isUSState(address.state))) &&
      ((Boolean(address.postal_code) && address.postal_code.length === 0) ||
        (address.country === 'Canada'
          ? validations.isCanadianPostalCode(address.postal_code)
          : validations.isUSPostalCode(address.postal_code)))));

export default isMemberValid;
