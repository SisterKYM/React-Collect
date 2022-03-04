import {includes} from 'lodash';
import moment from 'moment';
import provinces from 'provinces';

const EMAIL_REGEX = /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\d-AZa-z-]+\.)+[A-Za-z]{2,}))$/;
const US_POSTAL_CODE_REGEX = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
const CANADA_POSTAL_CODE_REGEX = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
const BUSINESS_TAX_ID_REGEX = /^\d\d?-\d{7}$/;
const VALID_COUNTRIES = ['United States', 'Canada'];

const getProvincesOfCountryWithCode = (countryIsoCode) =>
  provinces
    .filter((province) => province.country === countryIsoCode)
    .map((province) => province.short);

const memberFieldsValidations = {
  isEmpty: (candidate) => Boolean(candidate) && candidate.length !== 0,
  isEmail: (candidate) => EMAIL_REGEX.test(candidate),
  isCurrency: (candidate) =>
    candidate && includes(['USD', 'CAD'], candidate && candidate.toUpperCase()),
  isAccountType: (candidate) =>
    includes(['individual', 'company'], candidate && candidate.toLowerCase()),
  isBusinessTaxId: (candidate) => BUSINESS_TAX_ID_REGEX.test(candidate),
  isUSState: (candidate) => {
    const usStates = getProvincesOfCountryWithCode('US');

    return includes(usStates, candidate);
  },
  isCanadianProvince: (candidate) => {
    const canadaProvinces = getProvincesOfCountryWithCode('CA');

    return includes(canadaProvinces, candidate);
  },
  isCountry: (candidate) => includes(VALID_COUNTRIES, candidate),
  isUSPostalCode: (candidate) => US_POSTAL_CODE_REGEX.test(candidate),
  isCanadianPostalCode: (candidate) => CANADA_POSTAL_CODE_REGEX.test(candidate),
  isDob: (candidate) => {
    if (!candidate) {
      return false;
    }

    const dobParts = candidate.split('/');
    const month = dobParts[0];
    const day = dobParts[1];
    const year = dobParts[2];

    return (
      Boolean(month) &&
      Boolean(day) &&
      Boolean(year) &&
      moment({day, month, year}).isValid()
    );
  },
};

export default memberFieldsValidations;
