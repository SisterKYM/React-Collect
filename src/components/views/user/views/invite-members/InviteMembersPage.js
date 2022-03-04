import {FaPlusSquare} from 'react-icons/fa';
import {connect} from 'react-redux';
import React from 'react';

import {MemberInviteTableContainer} from 'containers';
import {UserBasePage} from 'views/user/components';
import config from 'config';

import {
  AddMemberInviteFormContainer,
  UploadMemberInvitesCsvContainer,
} from './containers';

class InviteMembersPage extends React.PureComponent {
  state = {
    addMemberInviteFormExpanded: false,
  };

  handleClickAddIndividualMember = () => {
    this.setState({addMemberInviteFormExpanded: true});
  };

  handleCloseAddMemberForm = () => {
    this.setState({addMemberInviteFormExpanded: false});
  };

  handleResendToAll = memberInvitesQuery => {
    this.props.history.push({
      pathname: '/user/invite-members/resend-all-confirm',
      state: {
        resendAllPayload: {
          query: memberInvitesQuery,
        },
      },
    });
  };

  render() {
    const {session} = this.props;

    return (
      <UserBasePage
        currentUrl={this.props.location.pathname}
        heading="Invite Members"
      >
        {session.partnerMaster && session.partnerMaster.isOrg && (
          <>
            <h2 className="mt3 f3">Invite New Members</h2>
            <h5 className="mt2 lh-copy">
              When you invite new members to your organization,{' '}
              {config.strings.name} will create a new account for them using the
              <br />
              underwriting information you include and will send them a welcome
              email prompting them to create their password and
              <br />
              get started. You can add new members in bulk via an Excel upload
              or one member at a time.
            </h5>
            <div className="mt3">
              <UploadMemberInvitesCsvContainer
                addMembersStatus={this.props.addMembersStatus}
                onAddMembers={this.handleAddMembers}
              />
            </div>
            <div
              className="flex mt3 items-center pointer"
              onClick={this.handleClickAddIndividualMember}
            >
              Add Individual Member{' '}
              <FaPlusSquare className="ml2" color={config.colors.tint} />
            </div>
            {this.state.addMemberInviteFormExpanded && (
              <AddMemberInviteFormContainer
                className="pa3 mt3 bg-gray-200"
                onClose={this.handleCloseAddMemberForm}
              />
            )}
            <div className="mt5 mb4 bt b--gray-300" />
            <h3 className="mb4">Members You&apos;ve Invited</h3>
            <MemberInviteTableContainer
              onResendToAll={this.handleResendToAll}
            />
          </>
        )}
      </UserBasePage>
    );
  }
}

const enhance = connect(state => ({
  session: state.session,
}));

const EnhancedInviteMembersPage = enhance(InviteMembersPage);

export default EnhancedInviteMembersPage;
