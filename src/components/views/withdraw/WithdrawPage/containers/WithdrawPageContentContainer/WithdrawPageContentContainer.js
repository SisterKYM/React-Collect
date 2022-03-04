import {useSelector} from 'react-redux';
import React from 'react';
import _ from 'lodash';

import {
  BankAccountCta,
  MoreInformationCta,
  PendingCollectionsOnlyCta,
  SetupTwoFactorCta,
  WithdrawPanel,
} from './components';
import {
  useBankAccounts,
  useCollections,
  useCollectionsTotalWithdrawableAmount,
} from '../../hooks';
import CreateCollectionCtaContainer from './CreateCollectionCtaContainer';
import WithdrawFormContainer from './WithdrawFormContainer';

const usePendingCollections = () => {
  const collections = useCollections();

  return React.useMemo(
    () => collections.filter(collection => collection.online_pending_total > 0),
    [collections]
  );
};

const useCollectionsWithBalance = () => {
  const collections = useCollections();

  return React.useMemo(
    () =>
      collections.filter(
        collection =>
          collection.withdrawal_balance_available > 0 &&
          _.get(collection, 'access.owner', false)
      ),
    [collections]
  );
};

const WithdrawPageContentContainer = () => {
  const bankAccounts = useBankAccounts();
  const collectionsWithBalance = useCollectionsWithBalance();
  const pendingCollections = usePendingCollections();
  const totalWithdrawableAmount = useCollectionsTotalWithdrawableAmount();

  const phoneVerified = useSelector(
    state =>
      !state.session.phoneJustReset &&
      (_.get(state.session.user, 'profile.phone.verified') ||
        state.session.phoneJustVerified)
  );
  const payoutsEnabled = useSelector(state => state.session.payoutsEnabled);

  if (bankAccounts.length === 0) {
    return <BankAccountCta />;
  }

  if (collectionsWithBalance.length === 0 && pendingCollections.length === 0) {
    return <CreateCollectionCtaContainer />;
  }

  if (!payoutsEnabled) {
    return <MoreInformationCta />;
  }

  if (!phoneVerified) {
    return <SetupTwoFactorCta />;
  }

  if (collectionsWithBalance.length === 0 && pendingCollections.length !== 0) {
    return (
      <PendingCollectionsOnlyCta
        total={_.sumBy(pendingCollections, 'online_pending_total')}
      />
    );
  }

  return collectionsWithBalance.map(collection => (
    <WithdrawPanel
      key={collection.id}
      className="mb3 bg-lighter-gray"
      collection={collection}
      totalWithdrawableAmount={totalWithdrawableAmount}
    >
      <WithdrawFormContainer collection={collection} />
    </WithdrawPanel>
  ));
};

const EnhancedWithdrawPageContentContainer = React.memo(
  WithdrawPageContentContainer
);

export default EnhancedWithdrawPageContentContainer;
