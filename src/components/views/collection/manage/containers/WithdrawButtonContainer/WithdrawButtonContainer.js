import {useResource} from 'rest-hooks';
import React from 'react';

import ExternalAccountResource from 'resources/ExternalAccountResource';

import {WithdrawButton} from './components';

const WithdrawButtonContainer = ({className, disabled, ...props}) => {
  const externalAccounts = useResource(ExternalAccountResource.listShape(), {});

  return (
    <WithdrawButton
      className={className}
      disabled={disabled}
      addBank={externalAccounts.length === 0}
      {...props}
    />
  );
};

const EnhancedWithdrawButtonContainer = React.memo(WithdrawButtonContainer);

export default EnhancedWithdrawButtonContainer;
