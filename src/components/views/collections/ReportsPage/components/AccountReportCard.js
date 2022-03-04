import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import {CommonButton} from 'elements';

const AccountReportCard = ({downloadAccountWideReport}) => {
  const isTeamUser = useSelector((state) => state.session?.isTeamUser || false);

  return (
    <div className="card pa3-5 mb3-5">
      <div className="card-title text-14 avenir-roman gray-350">
        ACCOUNT-WIDE REPORT
      </div>
      <div className="mt2-5">
        <span className="card-description text-14 avenir-light dark-grey">
          Generate and download a spreadsheet report with aggregated data across
          your entire Cheddar Up account, including an account-wide withdrawal
          snapshot, as well as specific payment information on all your
          collections.
        </span>
      </div>
      {isTeamUser ? (
        <div className="mt3">
          <CommonButton
            className="bg-tint white pt-14"
            onClick={downloadAccountWideReport}
          >
            Download a Report
          </CommonButton>
        </div>
      ) : (
        <div className="mt3">
          <Link to="reports/i/plans">
            <CommonButton className="bg-brand white pt-14">
              Upgrade to Team
            </CommonButton>
          </Link>
        </div>
      )}
    </div>
  );
};

const EnhancedAccountReportCard = React.memo(AccountReportCard);

export default EnhancedAccountReportCard;
