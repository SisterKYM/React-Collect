import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';

import {Button, Input, Select} from 'elements';
import {ORG_TYPES} from 'data/orgs';
import {validate} from 'views/signup/components/lib';
import config from 'config';

import CountryInput from './CountryInput';

const SignUpForm = ({
  defaultBestDescribesYou,
  invalid,
  disabled,
  onSubmit,
  handleSubmit,
  countrySelectDisplayed,
  submitButtonColor,
}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <div className="flex flex-wrap mb3">
      <div className="w-100 w-50-ns pr2-ns mb3 mb0-ns">
        <Field
          border
          name="first_name"
          component={Input}
          disabled={disabled}
          placeholder="First Name"
        />
      </div>
      <div className="w-100 w-50-ns pl2-ns">
        <Field
          border
          name="last_name"
          component={Input}
          disabled={disabled}
          placeholder="Last Name"
        />
      </div>
    </div>
    <Field
      border
      className="mb3"
      name="email"
      component={Input}
      disabled={disabled}
      placeholder="Email"
    />
    <Field
      border
      className="mb3"
      type="password"
      name="password"
      component={Input}
      disabled={disabled}
      placeholder="Password"
    />
    {config.isCheddarUp && !defaultBestDescribesYou && (
      <Field
        className="ba br2"
        name="profile.bestDescribesYou"
        component={Select}
        disabled={disabled}
        options={[
          {children: 'What best describes you?', value: ''},
          ...Object.values(ORG_TYPES).map(ot => ({
            children: ot.label,
            value: ot.value,
          })),
        ]}
      />
    )}
    <div className="flex flex-column items-center">
      {countrySelectDisplayed && (
        <div className="mt4">
          <p className="mb2">Choose your currency</p>
          <Field name="country" disabled={disabled} component={CountryInput} />
        </div>
      )}
      <div className="w-100 w-two-thirds-m w-50-l mt4">
        <Button
          backgroundColorSet
          className="sign-up-form-submit-button w-100"
          disabled={invalid || disabled}
        >
          Get Started
        </Button>
      </div>
    </div>
    <style jsx>{`
      :global(.sign-up-form-submit-button) {
        background-color: ${submitButtonColor || config.colors.tint} !important;
      }
    `}</style>
  </form>
);

const enhance = reduxForm({
  form: 'views/login/Form',
  validate,
});

const EnhancedSignUpForm = Object.assign(enhance(SignUpForm), {
  propTypes: {
    onSubmit: PropTypes.func,
    user: PropTypes.object,
    countrySelectDisplayed: PropTypes.bool,
  },
});

export default EnhancedSignUpForm;
