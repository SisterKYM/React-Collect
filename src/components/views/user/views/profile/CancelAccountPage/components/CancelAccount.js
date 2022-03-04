import React from 'react';

import {Button, Input, Status} from 'elements';
import {ReactComponent as ExclamationMarkIcon} from 'theme/images/exclamation-mark-icon.svg';
import config from 'config';

class CancelAccount extends React.PureComponent {
  state = {
    recurringWarningVisible: this.props.initialRecurringWarningVisible,
    deleteInputValue: '',
  };

  handleCancelAccount = () => {
    if (this.state.recurringWarningVisible) {
      this.setState({recurringWarningVisible: false});
    } else {
      this.props.onCancelAccount();
    }
  };

  handleChangeDeleteInputValue = ({target: {value}}) => {
    this.setState({deleteInputValue: value});
  };

  render() {
    const cancelAccountLoading = this.props.cancelAccountStatus === 'pending';

    return (
      <>
        <h1 className="flex items-center f-regular brand">
          <ExclamationMarkIcon className="h2" fill={config.colors.brand} />
          <span className="ml2">This cannot be undone</span>
        </h1>
        <p className="mt3">
          {this.state.recurringWarningVisible
            ? `Cancelling your account will stop all future scheduled recurring payments on your ${config.strings.collection}s`
            : `Canceling your account will delete your ${config.strings.collection}s and disable future withdrawals`}
        </p>
        {!this.state.recurringWarningVisible && (
          <>
            <p className="mt3 mb2">
              Type {this.props.deleteKeyword} to confirm
            </p>
            <Input
              border
              borderRadius={false}
              value={this.state.deleteInputValue}
              onChange={this.handleChangeDeleteInputValue}
            />
          </>
        )}
        <div className="flex mt3 justify-start">
          <Button
            small
            backgroundColorSet
            className="mr3 bg-brand"
            disabled={
              cancelAccountLoading ||
              (!this.state.recurringWarningVisible &&
                this.state.deleteInputValue !== this.props.deleteKeyword)
            }
            onClick={this.handleCancelAccount}
          >
            {this.state.recurringWarningVisible
              ? 'Proceed'
              : 'Delete my account'}
          </Button>
          <Button
            small
            backgroundColorSet
            className="gray-400 bg-gray-200"
            disabled={cancelAccountLoading}
            onClick={this.props.onDismiss}
          >
            Keep Account
          </Button>
          {cancelAccountLoading && (
            <div className="pl3 mt2">
              <Status status="pending" />
            </div>
          )}
        </div>
      </>
    );
  }
}

export default CancelAccount;
