import React, {useCallback, useState} from 'react';

import {ProfileForm, PasswordReset} from './components';

const ProfilePage = () => {
  const [resetPasswordVisible, setResetPasswordVisible] = useState(false);

  const hideResetPassword = useCallback(() => {
    setResetPasswordVisible(false);
  }, []);

  const showResetPassword = useCallback(() => {
    setResetPasswordVisible(true);
  }, []);

  return (
    <>
      <h1 className="avenir-roman dark-grey mb2 tc text-32">Profile</h1>
      <div className="text-18 line-24 dark-grey mb3 tc">
        Your display name and profile picture will appear at the bottom of your
        collection pages.
      </div>
      <ProfileForm
        showResetPassword={showResetPassword}
        disable={resetPasswordVisible}
      />
      {resetPasswordVisible && (
        <PasswordReset hideResetPassword={hideResetPassword} />
      )}
    </>
  );
};

const EnhancedProfilePage = React.memo(ProfilePage);

export default EnhancedProfilePage;
