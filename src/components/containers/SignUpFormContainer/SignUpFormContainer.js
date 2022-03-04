import {connect} from 'react-redux';
import React from 'react';
import query from 'query-string';

import {ORG_TYPES} from 'data/orgs';
import {SIGNUP} from 'redux/modules/session/constants';
import {signUp} from 'redux/modules/session/actions';

import {SignUpForm} from './components';

class SignUpFormContainer extends React.PureComponent {
  handleSubmit = values => {
    this.props.onSignUp({
      ...values,
      profile: {
        referrer: {
          url: {
            ...(this.props.includePromo
              ? {promo: 'team_annual_pta_promo'}
              : {}),
            ...query.parse(window.location.search),
          },
          landingPage: 'React PTA',
        },
        bestDescribesYou: ORG_TYPES.schoolPta.value,
      },
    });
  };

  render() {
    return (
      <SignUpForm
        submitButtonWhiteBorder={this.props.submitButtonWhiteBorder}
        signUpStatus={this.props.signUpStatus}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

const enhance = connect(
  state => ({
    signUpStatus: state.async.statuses[SIGNUP],
  }),
  dispatch => ({
    onSignUp: payload => dispatch(signUp(payload)),
  })
);

const EnhancedSignUpFormContainer = enhance(SignUpFormContainer);

export default EnhancedSignUpFormContainer;
