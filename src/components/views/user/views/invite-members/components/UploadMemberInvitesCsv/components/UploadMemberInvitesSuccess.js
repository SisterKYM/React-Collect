import React from 'react';

const UploadMemberInvitesSuccess = ({memberCount}) => (
  <h2 className="mb5 f-regular avenir-roman">
    Congrats! You&apos;ve successfully created {memberCount} new accounts, which
    you&apos;ll see in the table below.
  </h2>
);

const EnhancedUploadMemberInvitesSuccess = React.memo(
  UploadMemberInvitesSuccess
);

export default EnhancedUploadMemberInvitesSuccess;
