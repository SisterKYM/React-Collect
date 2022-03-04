import {Link} from 'react-router-dom';
import React from 'react';

import {CommonButton} from 'elements';

const WithdrawButton = ({className, addBank, disabled, ...props}) => (
  <div className={className}>
    {!addBank && disabled ? (
      <CommonButton disabled className="medium-grey pt-14" {...props}>
        Withdraw
      </CommonButton>
    ) : (
      <Link to={addBank ? '/user/withdrawal-settings' : '/withdraw'}>
        <CommonButton className="bg-brand white pt-14 w-100" {...props}>
          {addBank ? 'Add Bank to Withdraw' : 'Withdraw'}
        </CommonButton>
      </Link>
    )}
  </div>
);

const EnhancedWithdrawButton = React.memo(WithdrawButton);

export default EnhancedWithdrawButton;
