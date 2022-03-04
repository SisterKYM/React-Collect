import React from 'react';

import {UserBasePage} from 'views/user/components';

import {ChangePasswordFormContainer} from './containers';

const ChangePasswordPage = ({location}) => (
  <UserBasePage currentUrl={location.pathname} heading="Change Password">
    <ChangePasswordFormContainer className="mt3" />
  </UserBasePage>
);

const EnhancedChangePasswordPage = React.memo(ChangePasswordPage);

export default EnhancedChangePasswordPage;
