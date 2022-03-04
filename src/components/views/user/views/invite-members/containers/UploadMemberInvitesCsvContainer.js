import {connect} from 'react-redux';
import React from 'react';

import {ADD_MEMBER_INVITES} from 'redux/modules/memberInvites/constants';
import {
  addMemberInvites,
  cancelAddMemberInvites,
} from 'redux/modules/memberInvites/actions';

import {UploadMemberInvitesCsv} from '../components';

class UploadMemberInvitesCsvContainer extends React.PureComponent {
  handleAddMemberInvites = profiles => {
    if (profiles.length !== 0) {
      this.props.onAddMemberInvites({profiles});
    }
  };

  render() {
    return (
      <UploadMemberInvitesCsv
        processedMemberCount={this.props.processedMemberCount}
        addMemberInvitesStatus={this.props.addMemberInvitesStatus}
        onAddMemberInvites={this.handleAddMemberInvites}
        onCancelAddMemberInvites={this.props.onCancelAddMemberInvites}
      />
    );
  }
}

const enhance = connect(
  state => ({
    processedMemberCount:
      state.async.metadatas && state.async.metadatas[ADD_MEMBER_INVITES]
        ? state.async.metadatas[ADD_MEMBER_INVITES].processedMemberCount
        : 0,
    addMemberInvitesStatus: state.async.statuses[ADD_MEMBER_INVITES],
  }),
  dispatch => ({
    onAddMemberInvites: payload => dispatch(addMemberInvites(payload)),
    onCancelAddMemberInvites: () => dispatch(cancelAddMemberInvites()),
  })
);

const EnhancedUploadMemberInvitesCsvContainer = enhance(
  UploadMemberInvitesCsvContainer
);

export default EnhancedUploadMemberInvitesCsvContainer;
