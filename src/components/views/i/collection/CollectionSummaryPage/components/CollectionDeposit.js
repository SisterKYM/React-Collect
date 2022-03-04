import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import moment from 'moment';

import {currency} from 'helpers/numbers';

const CollectionDeposit = ({collectionDeposit}) => (
  <div className="f7">
    <div className="mw6 flex">
      <div className="w-50 w-40-ns">
        {moment(collectionDeposit.created_at).format('MM/DD/YYYY')}
        {collectionDeposit?.bank_account?.last4 &&
          ` – Debit to ${_.padStart(
            collectionDeposit?.bank_account?.last4 || '',
            9,
            '*'
          )}`}
      </div>
      <div className="w-25 w-20-ns">
        {currency(collectionDeposit.amount_cents / 100)}
      </div>
      {collectionDeposit.descriptor && (
        <div className="dn db-ns w-20">{collectionDeposit.descriptor}</div>
      )}
      {collectionDeposit.status && collectionDeposit.status !== 'available' && (
        <div
          className={cx(
            'dn db-ns w-20',
            collectionDeposit.status === 'failed' ? 'brand' : 'tint'
          )}
        >
          ({collectionDeposit.status})
        </div>
      )}
    </div>
  </div>
);

const EnhancedCollectionDeposit = React.memo(CollectionDeposit);

export default EnhancedCollectionDeposit;
