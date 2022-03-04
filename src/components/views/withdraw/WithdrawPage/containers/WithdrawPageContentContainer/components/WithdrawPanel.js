import {Link, useLocation} from 'react-router-dom';
import React from 'react';
import cx from 'classnames';

import {collectionsPathHelper} from 'helpers';
import {currency} from 'helpers/numbers';
import config from 'config';

const WithdrawPanel = ({
  className,
  collection,
  totalWithdrawableAmount,
  children,
}) => {
  const location = useLocation();

  const collectionSummaryUrl = `${location.pathname}/i${collectionsPathHelper(
    collection,
    'summary'
  )}`;
  const amountAvailable = Math.min(
    Math.max(totalWithdrawableAmount, 0),
    collection.withdrawal_balance_available
  );

  return (
    <div className={cx('pa3 pa4-ns br2 bg-light-aqua', className)}>
      <div className="flex mb2 flex-column flex-row-ns justify-between">
        <h3
          className="gray-700 avenir-roman"
          style={{fontSize: '18px', lineHeight: '32px'}}
        >
          {collection.name}
        </h3>
        <Link className="dn-ns ttc f6 avenir-roman" to={collectionSummaryUrl}>
          {config.strings.collection} Summary
        </Link>
      </div>
      <div
        className="mb2 avenir-light gray-600 flex"
        style={{fontSize: '14px', lineHeight: '21px'}}
      >
        <span>
          {currency(amountAvailable)}
          &nbsp;
        </span>
        <span className="f6">Available</span>
      </div>
      <div className="db dn-ns ttc mb3">
        <Link size={5} to={collectionSummaryUrl}>
          {config.strings.collection} Summary
        </Link>
      </div>
      {children}
    </div>
  );
};
const EnhancedWithdrawPanel = React.memo(WithdrawPanel);

export default EnhancedWithdrawPanel;
