import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FaCheck} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {useFetcher} from 'rest-hooks';

import config from 'config';
import {VerificationPrompt, Status} from 'elements';
import collectionsPathHelper from 'helpers/collectionsPathHelper';
import {currency} from 'helpers/numbers';
import UserResource from 'resources/UserResource';

const WithdrawFundsPage = ({onDismiss, history}) => {
  const checkSubscriptions = useFetcher(UserResource.checkSubscriptionsShape());
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const {results} = await checkSubscriptions(
        {},
        {
          plan: 'free',
        }
      );
      setResults(results);
    };
    fetch();
  }, [checkSubscriptions]);

  const collectionItems = useMemo(
    () =>
      results
        .find((result) => result.error === 'tabs_have_balances')
        ?.tabs?.map((collection) => {
          const balance = currency(
            Number(collection.online_pending_total) +
              Number(collection.withdrawal_balance_available)
          );

          return {
            id: collection.id,
            name: `${collection.name} (${balance})`,
            url: collectionsPathHelper(collection),
          };
        }) || [],
    [results]
  );

  const goToDetailsPage = useCallback(() => {
    history.push('/withdraw');
  }, [history]);

  return (
    <VerificationPrompt
      flexibleHeight
      onDismiss={onDismiss}
      title="Withdraw funds to delete your account"
      description={`The following ${config.strings.collection}s have funds remaining. Once the funds are withdrawn, you will be able to delete your account.`}
      okButtonLabel="Withdraw Funds"
      onOkButtonClick={goToDetailsPage}
      cancelButtonLabel="Cancel"
      onCancelButtonClick={onDismiss}
    >
      {collectionItems.length > 0 ? (
        <ul className="mb3">
          {collectionItems.map((collectionItem) => (
            <li key={collectionItem.id} className="mb1">
              <FaCheck size={14} className="mr2" color="#287991" />
              <Link
                className="text-16 avenir-light gray-600"
                to={collectionItem.url}
              >
                {collectionItem.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex justify-center items-center">
          <Status status="pending" />
        </div>
      )}
    </VerificationPrompt>
  );
};

const EnhancedWithdrawFundsPage = React.memo(WithdrawFundsPage);

export default EnhancedWithdrawFundsPage;
