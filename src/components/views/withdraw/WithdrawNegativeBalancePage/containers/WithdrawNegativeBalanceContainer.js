import {Link} from 'react-router-dom';
import {useSuspenseQuery} from 'react-fetching-library';
import React from 'react';
import cx from 'classnames';

import {Button} from 'elements';
import {createGetCollectionsQuery} from 'queryCreators';
import {currency} from 'helpers/numbers';
import getDisputedCollection from 'helpers/getDisputedCollection';

const useDisputedCollection = () => {
  const getCollectionsQueryAction = React.useMemo(
    createGetCollectionsQuery,
    []
  );
  const {payload: collections = []} = useSuspenseQuery(
    getCollectionsQueryAction
  );

  return getDisputedCollection(collections);
};

const WithdrawNegativeBalanceContainer = ({className}) => {
  const disputedCollection = useDisputedCollection();

  return (
    <div className={cx(className, 'flex flex-column items-center')}>
      <p className="measure lh-copy">
        Due to a disputed payment on your collection, {disputedCollection.name},
        you&apos;re currently unable to withdraw{' '}
        {currency(Math.abs(disputedCollection.withdrawal_balance_available))}.
        You can fund this collection to correct this negative balance.
      </p>
      <Link
        to={`/collection/${disputedCollection.user_id}/${disputedCollection.id}/manage/i/collection/${disputedCollection.user_id}/${disputedCollection.id}/summary`}
      >
        <Button backgroundColorSet className="mt4 bg-brand">
          Go to Collection
        </Button>
      </Link>
    </div>
  );
};

const EnhancedWithdrawNegativeBalanceContainer = React.memo(
  WithdrawNegativeBalanceContainer
);

export default EnhancedWithdrawNegativeBalanceContainer;
