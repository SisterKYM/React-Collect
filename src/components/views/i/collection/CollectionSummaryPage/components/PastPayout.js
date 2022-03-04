import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import moment from 'moment';

import {currency} from 'helpers/numbers';

const withdrawalStatus = (withdrawal) => {
  if (withdrawal.status === 'failed' || withdrawal.status === 'pending') {
    return withdrawal.status;
  }
  if (withdrawal.stripe_status === 'pending') {
    return 'in transit';
  }
  if (
    withdrawal.stripe_status === 'paid' ||
    withdrawal.stripe_status === 'confirmed'
  ) {
    return 'paid';
  }
  return withdrawal.status;
};

const PastPayout = ({withdrawal}) => (
  <div className="f7">
    <div className="mw6 flex">
      <div className="w-25 w-20-ns">
        {moment(withdrawal.created_at).format('MM/DD/YYYY')}
      </div>
      <div className="w-25 w-20-ns">
        {_.padStart(withdrawal.stripe_bank_account_id || '', 9, '*')}
      </div>
      <div className="w-25 w-20-ns">{currency(withdrawal.amount)}</div>

      <div
        className={cx(
          'dn db-ns w-20',
          withdrawalStatus(withdrawal) === 'failed' ? 'brand' : 'tint'
        )}
      >
        ({withdrawalStatus(withdrawal)})
      </div>

      {withdrawal.statement_descriptor && (
        <div className="dn db-ns w-20">{withdrawal.statement_descriptor}</div>
      )}
    </div>
  </div>
);

const EnhancedPastPayout = React.memo(PastPayout);

export default EnhancedPastPayout;
