import {useSelector} from 'react-redux';
import Fuse from 'fuse.js';
import React from 'react';

import {GET_PAYMENTS_TO_OTHERS} from 'redux/modules/session/constants';
import {SearchForm, StatefulView} from 'elements';
import {UserBasePage} from 'views/user/components';
import {asyncConnect} from 'helpers';
import {getPaymentsToOthers} from 'redux/modules/session/actions';

import {PaymentToOtherListItem} from './components';

const renderItem = (payment) => (
  <PaymentToOtherListItem key={payment.id} payment={payment} />
);

const PaymentsToOthersPage = ({location}) => {
  const paymentsToOthers = useSelector(
    (state) => state.session.paymentsToOthers || []
  );
  const status = useSelector(
    (state) => state.async.statuses[GET_PAYMENTS_TO_OTHERS]
  );
  const [searchKeyword, setSearchKeyword] = React.useState('');

  const searchFormInitialValues = React.useMemo(
    () => ({
      term: searchKeyword,
    }),
    [searchKeyword]
  );

  const filteredPaymentsToOthers = React.useMemo(() => {
    if (searchKeyword.length !== 0) {
      const fuse = new Fuse(paymentsToOthers, {
        keys: ['tab.name', 'tab.user.name'],
      });

      return fuse.search(searchKeyword);
    }

    return paymentsToOthers;
  }, [paymentsToOthers, searchKeyword]);

  const handleSearchSubmit = React.useCallback(({term}) => {
    setSearchKeyword(term || '');
  }, []);

  const renderEmptyStateView = React.useCallback(
    () => (
      <div className="flex pt4 justify-center items-center">
        {searchKeyword.length !== 0
          ? 'You have not made any payments matching your search.'
          : 'You have not made any payments to others.'}
      </div>
    ),
    [searchKeyword.length]
  );

  return (
    <UserBasePage
      className="dn-p bg-gray-100"
      currentUrl={location.pathname}
      heading="Payments to Others"
    >
      <div className="pa3 shadow-6 br2 bg-white">
        <div className="db flex-ns pb2 pb3-ns justify-between bb b--gray-300">
          <div className="db flex-ns items-center">
            <div className="mb3 mb0-ns mr3">
              <SearchForm
                enableReinitialize
                form="PaymentToOthersSearchForm"
                initialValues={searchFormInitialValues}
                onSubmit={handleSearchSubmit}
              />
            </div>
          </div>
        </div>
        <StatefulView
          resultCount={filteredPaymentsToOthers.length}
          status={status}
          renderEmptyStateView={renderEmptyStateView}
        >
          <ul>{filteredPaymentsToOthers.map((x) => renderItem(x))}</ul>
        </StatefulView>
      </div>
    </UserBasePage>
  );
};

const enhance = asyncConnect(() => [
  {
    key: GET_PAYMENTS_TO_OTHERS,
    promise: getPaymentsToOthers,
  },
]);

const EnhancedPaymentsToOthersPage = enhance(PaymentsToOthersPage);

export default EnhancedPaymentsToOthersPage;
