import {connect} from 'react-redux';
import React from 'react';

import {CANCEL_ACCOUNT} from 'redux/modules/session/constants';
import {cancelAccount} from 'redux/modules/session/actions';

import {CancelAccount} from '../components';

const KEYWORD_TO_DELETE = 'DELETE';

class CancelAccountContainer extends React.PureComponent {
  handleCancelAccount = () => {
    this.props.onCancelAccount();
  };

  render() {
    return (
      <CancelAccount
        initialRecurringWarningVisible={this.props.hasRecurringItems}
        deleteKeyword={KEYWORD_TO_DELETE}
        cancelAccountLoading={this.props.cancelAccountLoading}
        onCancelAccount={this.handleCancelAccount}
        onDismiss={this.props.onDismiss}
      />
    );
  }
}

const enhance = connect(
  state => ({
    cancelAccountStatus: state.async.statuses[CANCEL_ACCOUNT],
    hasRecurringItems:
      Boolean(state.session.user) &&
      state.session.user.has_recurring_items.length !== 0,
  }),
  dispatch => ({
    onCancelAccount: () => dispatch(cancelAccount()),
  })
);

const EnhancedCancelAccountContainer = enhance(CancelAccountContainer);

export default EnhancedCancelAccountContainer;
