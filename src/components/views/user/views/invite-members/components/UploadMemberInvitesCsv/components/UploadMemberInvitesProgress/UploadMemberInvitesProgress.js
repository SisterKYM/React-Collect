import React from 'react';

import {ADD_MEMBER_INVITE_MAX_PROFILE_COUNT} from 'redux/modules/memberInvites/constants';

import ProgressBar from './ProgressBar';

const UploadMemberInvitesProgress = ({memberCount, processedMemberCount}) => {
  const processingMemberCount = Math.min(
    processedMemberCount + ADD_MEMBER_INVITE_MAX_PROFILE_COUNT,
    memberCount
  );

  return (
    <div>
      <h2 className="mv3 f-regular avenir-roman">
        We&apos;re creating your new accounts in batches of{' '}
        {ADD_MEMBER_INVITE_MAX_PROFILE_COUNT}. Please do not click off of this
        screen during this process. We appreciate your patience!
      </h2>
      <ProgressBar progress={(processingMemberCount / memberCount) * 100} />
      <div className="mt3 f6 avenir-roman">
        Processing {processingMemberCount} / {memberCount} accounts
      </div>
    </div>
  );
};

const EnhancedUploadMemberInvitesProgress = React.memo(
  UploadMemberInvitesProgress
);

export default EnhancedUploadMemberInvitesProgress;
