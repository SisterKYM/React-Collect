import {Route, Switch} from 'react-router-dom';
import React from 'react';
import posed, {PoseGroup} from 'react-pose';

import BackupSecurityCodePage from './BackupSecurityCodePage';
import CancelAccountPage from './CancelAccountPage';
import EnterBackupSecurityCodePage from './EnterBackupSecurityCodePage';
import ProfileImagePage from './ProfileImagePage';
import ProfilePage from './ProfilePage';
import ResetPhoneProfilePage from './ResetPhonePage';
import SetUserPhonePage from './SetUserPhonePage';

const PoseContainer = posed.div();

const ProfileRouter = ({location}) => (
  <>
    <Route component={ProfilePage} path="/user/profile" />
    <PoseGroup>
      <PoseContainer key={location.pathname}>
        <Switch location={location}>
          <Route component={CancelAccountPage} path="/user/profile/cancel" />
          <Route component={SetUserPhonePage} path="/user/profile/set-phone" />
          <Route
            component={ResetPhoneProfilePage}
            path="/user/profile/reset-phone"
          />
          <Route
            component={BackupSecurityCodePage}
            path="/user/profile/backup-security-code"
          />
          <Route
            component={EnterBackupSecurityCodePage}
            path="/user/profile/enter-backup-security-code"
          />
          <Route component={ProfileImagePage} path="/user/profile/picture" />
        </Switch>
      </PoseContainer>
    </PoseGroup>
  </>
);

const EnhancedProfileRouter = React.memo(ProfileRouter);

export default EnhancedProfileRouter;
