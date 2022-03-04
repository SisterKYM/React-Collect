import React from 'react';

import {BasicLayout} from 'layout';

import {ForgotPasswordContainer} from './containers';

const ForgotPasswordPage = ({history}) => {
  const handleClickConfirm = React.useCallback(() => {
    history.push('/login');
  }, [history]);

  return (
    <BasicLayout>
      <div className="content-container">
        <ForgotPasswordContainer
          className="ph4 w-100 w-80-m w-third-l center"
          loginPath="/login"
          onClickConfirm={handleClickConfirm}
        />
      </div>
    </BasicLayout>
  );
};

const EnhancedForgotPasswordPage = React.memo(ForgotPasswordPage);

export default EnhancedForgotPasswordPage;
