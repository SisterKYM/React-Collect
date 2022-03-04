import {Link} from 'react-router-dom';
import React from 'react';

import {CommonButton} from 'elements';

const MoreInformationCta = () => (
  <div className="withdraw-content-container bg-light-tint br2 gray-600">
    <h2 className="avenir-roman">More information, please.</h2>
    <div className="flex mt2 mb3 justify-center">
      <div className="mw7 description">
        Looks like we need some more information before we can enable
        withdrawals.
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

const EnhancedMoreInformationCta = React.memo(MoreInformationCta);

export default EnhancedMoreInformationCta;
