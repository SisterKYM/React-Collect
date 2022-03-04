import {Link} from 'react-router-dom';
import React from 'react';

import {CommonButton} from 'elements';

const BankAccountCta = () => (
  <div className="withdraw-content-container bg-light-tint br2 gray-600">
    <h2 className="avenir-roman">Where should we deposit your money?</h2>
    <div className="flex justify-center mt2 mb3">
      <div className="mw7 description">
        Please add your banking information so we know where to deposit the
        money you&apos;ve collected.
      </div>
    </div>
    <Link to="/user/withdrawal-settings" target="_blank">
      <CommonButton className="pt-14 bg-brand white">
        Add a Bank Account
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

const EnhancedBankAccountCta = React.memo(BankAccountCta);

export default EnhancedBankAccountCta;
