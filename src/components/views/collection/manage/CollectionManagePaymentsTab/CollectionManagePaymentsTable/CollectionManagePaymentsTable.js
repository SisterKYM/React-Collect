import React from 'react';
import {Link} from 'react-router-dom';
import {find} from 'lodash';

import {
  CommonButton,
  CollectionPaymentsSortBySelect,
  Paginator,
  SearchForm,
} from 'elements';
import {getPayments} from 'redux/modules/payments/actions';
import {connect} from 'react-redux';
import {
  PAYMENTS_PER_PAGE,
  SORT_PAYMENTS_BY,
} from 'redux/modules/payments/constants';

import {CollectionPaymentListContainer} from './containers';

const CollectionManagePaymentsTable = ({
  payments,
  search,
  sorted,
  collection,
  collectionId,
  location,
  pagination,
  getPaymentsStatus,
  getPayments,
  history,
}) => {
  const handlePageChange = (page) => {
    getPayments({
      collection: collectionId,
      query: {
        direction: sorted.direction || SORT_PAYMENTS_BY.createdAt.direction,
        search,
        sort: sorted.sort || SORT_PAYMENTS_BY.createdAt.label,
        per_page: pagination.perPage,
        page: page.selected + 1,
      },
    });
  };
  const handleClickRefunds = (payment) => {
    history.push(
      `/collection/${collection.user_id}/${collection.id}/manage/payments/${payment.id}/refunds`
    );
  };
  const handleClickShippingSummary = (payment) => {
    history.push(
      `/collection/${collection.user_id}/${collection.id}/manage/payments/print-shipping-label-summary/${payment.id}`
    );
  };
  const handleClickPrintShippingLabel = (payment) => {
    history.push(
      `/collection/${collection.user_id}/${collection.id}/manage/payments/print-shipping-label/${payment.id}`
    );
  };
  const handleClickPrintOrder = (payment) => {
    const openedWindow = window.open(
      `/collection/${collection.user_id}/${collection.id}/payment-report/${payment.id}`,
      '_blank'
    );
    openedWindow.focus();
  };
  const handleClickPaymentSummary = (payment) => {
    history.push(
      `/collection/${collection.user_id}/${collection.id}/manage/payments/payment/${payment.id}`
    );
  };
  const handleSortByChange = (value) => {
    const sortOption = find(SORT_PAYMENTS_BY, ({label}) => label === value);

    getPayments({
      collection: collectionId,
      query: {
        search: '',
        per_page: pagination.perPage,
        page: pagination.page,
        direction: sortOption.direction,
        sort: value,
      },
    });
  };

  const handleSearchSubmit = (values) => {
    if (values.term === search) {
      return;
    }

    getPayments({
      collection: collectionId,
      query: {
        per_page: pagination.perPage,
        search: values.term,
      },
    });
  };

  return (
    <>
      <div className="db flex-ns pv3 ph3 ph4-ns justify-between bb b--gray-300">
        <div className="db flex-ns items-start">
          <span className="self-center f6 gray-600 mt1 mr4 avenir-roman">
            Payments: {payments.length}
          </span>
          <div className="mt3 mt0-ns flex">
            <CollectionPaymentsSortBySelect
              className="mr2 mr3-ns"
              excludedOptions={[SORT_PAYMENTS_BY.labelCreatedAt.label]}
              value={sorted.sort}
              onChange={handleSortByChange}
            />
            <SearchForm
              enableReinitialize
              className="ml0 ml3-ns"
              iconClassName="gray-400"
              form="views/collection/manage/Page-SearchForm"
              initialValues={{term: search}}
              onSubmit={handleSearchSubmit}
              noResult={search && search.length !== 0 && payments.length === 0}
            />
          </div>
        </div>
        <Link
          to={`${location.pathname.replace('/payments', '')}/payments/message`}
        >
          <CommonButton className="mt3 mt0-ns dark-grey bg-gray-250 pt-12 text-capitalize">
            Message payers
          </CommonButton>
        </Link>
      </div>
      <div className="collection-payment-row-container relative-ns pv2 bb b--gray-300 ph3 flex gray-600 text-12">
        <div className="w-30 mr4">Payer</div>
        <div className="w-10 ml2 mr5">Amount</div>
        <div className="w-20">Status</div>
      </div>
      <CollectionPaymentListContainer
        noResult={(!search || search.length === 0) && payments.length === 0}
        payments={payments}
        collection={collection}
        getPaymentsStatus={getPaymentsStatus}
        onClickPaymentSummary={handleClickPaymentSummary}
        onClickRefunds={handleClickRefunds}
        onClickPrintOrder={handleClickPrintOrder}
        onClickPrintShippingLabel={handleClickPrintShippingLabel}
        onClickShippingSummary={handleClickShippingSummary}
      />
      {pagination.total > PAYMENTS_PER_PAGE && (
        <div className="flex pv3 ph4 justify-end bg-white">
          <Paginator
            page={pagination.page - 1}
            perPage={pagination.perPage}
            total={pagination.total}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};
const enhance = connect(
  () => ({}),
  (dispatch) => ({
    getPayments: (payload) => dispatch(getPayments(payload)),
  })
);
export default enhance(CollectionManagePaymentsTable);
