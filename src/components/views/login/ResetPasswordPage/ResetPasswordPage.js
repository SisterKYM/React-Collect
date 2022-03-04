import React from 'react';
import queryString from 'query-string';

import {BasicLayout} from 'layout';
import {RESET_PASSWORD} from 'redux/modules/session/constants';

import {ResetPasswordContainer} from './containers';

const ResetPasswordPage = ({location, history}) => {
  const queryParams = React.useMemo(() => queryString.parse(location.search), [
    location.search,
  ]);

  React.useEffect(() => {
    if (!queryParams.code || !queryParams.email) {
      history.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  const handleVerifyTwoFactor = React.useCallback(
    (payload) => {
      history.push({
        pathname: `${location.pathname}/phone/verify`,
        search: location.search,
        state: {
          verifyActionType: RESET_PASSWORD,
          payload,
        },
      });
    },
    [history, location.pathname, location.search]
  );

  return (
    <BasicLayout>
      <ResetPasswordContainer
        className="w-100 w-50-m w-third-l ph2 center"
        code={queryParams.code}
        email={queryParams.email}
        view={queryParams.view}
        onVerifyTwoFactor={handleVerifyTwoFactor}
      />
    </BasicLayout>
  );
};

const EnhancedResetPasswordPage = React.memo(ResetPasswordPage);

export default EnhancedResetPasswordPage;
