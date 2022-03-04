import {compose, setDisplayName} from 'recompose';
import {connect} from 'react-redux';
import {get} from 'lodash';
import React from 'react';

import {Button, Modal, ModalCloseButton, Status} from 'elements';
import {RESEND_EMAIL_ALL_MEMBER_INVITES} from 'redux/modules/memberInvites/constants';
import {resendEmailAllMemberInvites} from 'redux/modules/memberInvites/actions';

class Page extends React.PureComponent {
  componentDidUpdate(prevProps) {
    if (
      prevProps.resendAllStatus === 'pending' &&
      this.props.resendAllStatus === 'success'
    ) {
      this.props.history.push('/user/invite-members');
    }
  }

  handleDismiss = () => {
    this.props.history.push('/user/invite-members');
  };

  handleResend = () => {
    this.props.onResendAll(get(this.props, 'location.state.resendAllPayload'));
  };

  render() {
    const {resendAllStatus} = this.props;

    return (
      <Modal flexibleHeight size="SMALL" onDismiss={this.handleDismiss}>
        <ModalCloseButton onClick={this.handleDismiss} />
        <div className="pa4">
          <h1 className="f3 brand">
            Are you sure you want to resend to all emails?
          </h1>
          <p className="mt2">It cannot be undone.</p>
          <div className="flex mt3 tc">
            <Button
              small
              backgroundColorSet
              className="bg-brand"
              disabled={resendAllStatus === 'pending'}
              onClick={this.handleResend}
            >
              Confirm
            </Button>
            <Button
              small
              colorSet
              backgroundColorSet
              className="ml2 gray-600 bg-gray-300"
              disabled={resendAllStatus === 'pending'}
              onClick={this.handleDismiss}
            >
              Cancel
            </Button>
            <div className="ml2">
              {resendAllStatus === 'pending' && (
                <Status status={resendAllStatus} />
              )}
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const enhance = compose(
  setDisplayName('user/members/views/resend-all-confirm/Page'),
  connect(
    state => ({
      resendAllStatus: state.async.statuses[RESEND_EMAIL_ALL_MEMBER_INVITES],
    }),
    dispatch => ({
      onResendAll: payload => dispatch(resendEmailAllMemberInvites(payload)),
    })
  )
);

const EnhancedPage = enhance(Page);

export default EnhancedPage;
