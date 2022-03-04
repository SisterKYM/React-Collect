import {Link} from 'react-router-dom';
import React from 'react';

import {CommonButton} from 'elements';

const SetupTwoFactorCta = () => (
  <div className="withdraw-content-container bg-light-tint br2 gray-600">
    <h2 className="avenir-roman">Time to set up two-factor authentication</h2>
    <div className="flex mt2 mb3 justify-center">
      <div className="mw7 description">
        Two-factor authentication helps ensure you&apos;re the only person who
        can access your account. Once you verify your phone number, you&apos;ll
        be able to withdraw.
      </div>
    </div>
    <Link to="/user">
      <CommonButton className="pt-14 bg-brand white">
        Go to Account Settings
      </CommonButton>
    </Link>
    <style jsx>{`
      h2 {
        font-size: 18px;
        line-height: 32px;
      }
      .withdraw-content-container {
        display: inline-block;
        padding: 30px 25px;
      }
      .description {
        font-size: 14px;
        line-height: 21px;
      }
    `}</style>
  </div>
);

const EnhancedSetupTwoFactorCta = React.memo(SetupTwoFactorCta);

export default EnhancedSetupTwoFactorCta;
