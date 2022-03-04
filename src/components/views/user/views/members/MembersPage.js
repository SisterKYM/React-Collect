import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';

import {MemberTableContainer} from 'containers';
import {UserBasePage} from 'views/user/components';

const MembersPage = ({location, session}) => (
  <UserBasePage currentUrl={location.pathname} heading="Member Listing">
    {session.partnerMaster && session.partnerMaster.isOrg && (
      <>
        <h5 className="mv3 lh-copy">
          Below are the members currently in your organization. You can view
          this data online or download an export, which has
          <br />
          additional information about each member account. To add new members,
          go to &quot;
          <Link to="/user/invite-members">Invite Members</Link>
          &quot;.
        </h5>
        <MemberTableContainer />
      </>
    )}
  </UserBasePage>
);

const enhance = connect(state => ({
  session: state.session,
}));

const EnhancedMembersPage = enhance(MembersPage);

export default EnhancedMembersPage;
