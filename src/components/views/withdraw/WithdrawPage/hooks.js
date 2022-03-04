import React from 'react';
import _ from 'lodash';

import {WithdrawPageContext} from './WithdrawPage';

const useBankAccounts = () => {
  const {getExternalAccountsQuery} = React.useContext(WithdrawPageContext);
  const {payload: getExternalAccountsRes} = getExternalAccountsQuery;

  return React.useMemo(
    () => (getExternalAccountsRes ? getExternalAccountsRes.banks : []),
    [getExternalAccountsRes]
  );
};

const useCollections = () => {
  const {getCollectionsQuery} = React.useContext(WithdrawPageContext);

  return getCollectionsQuery.payload || [];
};

const useCollectionsTotalWithdrawableAmount = () => {
  const collections = useCollections();

  return _.sum(
    collections.map(
      ({withdrawal_balance_available}) => withdrawal_balance_available
    )
  );
};

export {useBankAccounts, useCollections, useCollectionsTotalWithdrawableAmount};
