import React, {useMemo} from 'react';
import {useResource} from 'rest-hooks';
import Fuse from 'fuse.js';

import UserPaymentResource from 'resources/UserPaymentResource';
import {PaymentListItem} from './components';

const PaymentsList = ({sortOption, sortDirection, input}) => {
  const userPayments = useResource(UserPaymentResource.listShape(), {});

  const sortedUserPayments = useMemo(
    () =>
      userPayments
        .sort((a, b) => {
          if (typeof a[sortOption.value] === 'undefined') {
            if (typeof b[sortOption.value] === 'undefined') {
              return 0;
            }

            return sortDirection === 'asc' ? -1 : 1;
          }

          if (typeof b[sortOption.value] === 'undefined') {
            return sortDirection === 'asc' ? 1 : -1;
          }

          return a[sortOption.value] > b[sortOption.value]
            ? sortDirection === 'asc'
              ? 1
              : -1
            : a[sortOption.value] < b[sortOption.value]
            ? sortDirection === 'asc'
              ? -1
              : 1
            : 0;
        })
        .slice(),
    [userPayments, sortOption.value, sortDirection]
  );

  const filteredPayments = React.useMemo(() => {
    if (input.length !== 0) {
      const fuse = new Fuse(sortedUserPayments, {
        useExtendedSearch: true,
        keys: ['tab.name', 'tab.user.name'],
      });

      return fuse.search(`'${input}`).map((result) => result.item);
    }

    return sortedUserPayments;
  }, [sortedUserPayments, input]);

  return (
    <div>
      {filteredPayments.length > 0 ? (
        filteredPayments.map((payment) => (
          <PaymentListItem
            key={payment.id}
            payment={payment}
            payments={userPayments}
            sortOption={sortOption}
            sortDirection={sortDirection}
          />
        ))
      ) : (
        <div className="avenir-light text-18 no-payments">
          You have not made any payments.
        </div>
      )}
      <style>{`
        .no-payments {
          padding: 1.5rem 1.5rem 24rem;
        }
      `}</style>
    </div>
  );
};

const EnhancedPaymentsList = React.memo(PaymentsList);

export default EnhancedPaymentsList;
