import {connect} from 'react-redux';
import React from 'react';

import {FORGOT_PASSWORD} from 'redux/modules/session/constants';
import {forgotPassword} from 'redux/modules/session/actions';

import {ForgotPassword} from '../components';

class ForgotPasswordContainer extends React.PureComponent {
  handleSubmit = values => {
    this.props.onForgotPassword(values);
  };

  render() {
    return (
      <ForgotPassword
        className={this.props.className}
        loginPath={this.props.loginPath}
        forgotPasswordStatus={this.props.forgotPasswordStatus}
        onSubmit={this.handleSubmit}
        onClickConfirm={this.props.onClickConfirm}
      />
    );
  }
}

const enhance = connect(
  state => ({
    forgotPasswordStatus: state.async.statuses[FORGOT_PASSWORD],
  }),
  dispatch => ({
    onForgotPassword: payload => dispatch(forgotPassword(payload)),
  })
);

const EnhancedForgotPasswordContainer = enhance(ForgotPasswordContainer);

export default EnhancedForgotPasswordContainer;
