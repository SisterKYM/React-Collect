import config from 'config';

const FORM_ERRORS = {
  REQUIRED: '* required',
  passwordLength: 'Your password must be at least 6 characters.',
  passwordNumber: 'Your password must contain at least 1 number.',
  country: 'Select a country',
  BAD_EMAIL: 'Your email address is invalid',
};

const validate = (values, props) => {
  const emailFormat = /^[\w!#$%&'*+./=?^`{|}~-]+@[\da-z](?:[\da-z-]{0,61}[\da-z])?(?:\.[\da-z](?:[\da-z-]{0,61}[\da-z])?)*\s*$/i;
  const errors = {};
  if (values) {
    if (!values.first_name) {
      errors.first_name = FORM_ERRORS.REQUIRED;
    }
    if (!values.last_name) {
      errors.last_name = FORM_ERRORS.REQUIRED;
    }
    if (!values.email) {
      errors.email = FORM_ERRORS.REQUIRED;
    }
    if (values.email && !emailFormat.test(values.email)) {
      errors.email = FORM_ERRORS.BAD_EMAIL;
    }
    if (
      config.isCheddarUp &&
      !props.defaultBestDescribesYou &&
      (!values.profile || !values.profile.bestDescribesYou) &&
      !props.defaultBestDescribesYou
    ) {
      errors.profile = {
        bestDescribesYou: FORM_ERRORS.REQUIRED,
      };
    }
    if (!values.password || values.password.length < 6) {
      errors.password = FORM_ERRORS.passwordLength;
    }
    if (values.password && values.password.search(/\d/) === -1) {
      errors.password = FORM_ERRORS.passwordNumber;
    }
    if (props.countrySelectDisplayed && !values.country) {
      errors.country = FORM_ERRORS.country;
    }
  }

  return errors;
};

export default validate;
