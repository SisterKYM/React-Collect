import {connect} from 'react-redux';
import React from 'react';

import {WithdrawButton} from './components';

const WithdrawButtonContainer = ({className, userLoggedIn, balance}) =>
  userLoggedIn && (
    <>
      <WithdrawButton className={className} balance={balance} />
    </>
  );

const enhance = connect(state => ({
  userLoggedIn: Boolean(state.session) && Boolean(state.session.user),
  balance: state.session ? state.session.balance : 0,
}));

const EnhancedWithdrawButtonContainer = enhance(WithdrawButtonContainer);

export default EnhancedWithdrawButtonContainer;
