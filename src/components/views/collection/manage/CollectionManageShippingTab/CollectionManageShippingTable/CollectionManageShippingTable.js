import React from 'react';
import {find} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {
  CollectionPaymentsSortBySelect,
  Paginator,
  SearchForm,
  StatefulView,
} from 'elements';
import {
  getShippablePayments,
  updatePayment,
} from 'redux/modules/payments/actions';
import {compose} from 'recompose';
import {
  GET_SHIPPABLE_PAYMENTS,
  PAYMENTS_PER_PAGE,
  SORT_PAYMENTS_BY,
  UPDATE_PAYMENT,
} from 'redux/modules/payments/constants';
import asyncConnect from 'helpers/asyncConnect';
import {ShippablePaymentRow, NoPayments} from './components';

const CollectionManageShippingTable = ({collection, collectionId}) => {
  const dispatch = useDispatch();
  const getPaymentsStatus = useSelector(
    (state) => state.async.statuses[GET_SHIPPABLE_PAYMENTS]
  );
  const sorted = useSelector(
    (state) => state.payments.shippablePayments.sorted
  );
  const pagination = useSelector(
    (state) => state.payments.shippablePayments.pagination
  );
  const search = useSelector(
    (state) => state.payments.shippablePayments.search || ''
  );
  const payments = useSelector(
    (state) => state.payments.shippablePayments.payments || []
  );
  const updatePaymentStatus = useSelector(
    (state) => state?.async?.statuses[UPDATE_PAYMENT] || ''
  );
  const handleAddNote = React.useCallback(
    (data) => {
      dispatch(
        updatePayment({
          note: data.note,
          collection: collectionId,
          payment: data.payment,
        })
      );
    },
    [collectionId, dispatch]
  );
  const handlePageChange = React.useCallback(
    (page) => {
      dispatch(
        getShippablePayments({
          collection: collectionId,
          query: {
            shippable: true,
            direction: sorted.direction || SORT_PAYMENTS_BY.createdAt.direction,
            search,
            sort: sorted.sort || SORT_PAYMENTS_BY.createdAt.label,
            per_page: pagination?.perPage,
            page: page.selected + 1,
          },
        })
      );
    },
    [collectionId, dispatch, pagination, search, sorted.direction, sorted.sort]
  );

  const handleSortByChange = (value) => {
    const sortOption = find(SORT_PAYMENTS_BY, ({label}) => label === value);

    dispatch(
      getShippablePayments({
        collection: collectionId,
        query: {
          shippable: true,
          search: '',
          per_page: pagination?.perPage,
          page: pagination?.page,
          direction: sortOption.direction,
          sort: value,
        },
      })
    );
  };

  const handleSearchSubmit = React.useCallback(
    (values) => {
      if (values.term === search) {
        return;
      }

      dispatch(
        getShippablePayments({
          collection: collectionId,
          query: {
            shippable: true,
            per_page: pagination.perPage,
            search: values.term,
          },
        })
      );
    },
    [collectionId, dispatch, pagination.perPage, search]
  );

  const renderPayment = React.useCallback(
    (payment) =>
      collection ? (
        <ShippablePaymentRow
          key={payment.id}
          onAddNote={handleAddNote}
          updatePaymentStatus={updatePaymentStatus}
          payment={payment}
          packingSlipLinkTo={`/collection/${collection.user_id}/${collection.id}/payment-report/${payment.id}`}
          shippingLabelSummaryLinkTo={`/collection/${collection.user_id}/${collection.id}/manage/shipping/shipping-tracker/print-shipping-label-summary/${payment.id}`}
          printShippingLabelLinkTo={`/collection/${collection.user_id}/${collection.id}/manage/shipping/shipping-tracker/print-shipping-label/${payment.id}`}
        />
      ) : null,
    [collection, handleAddNote, updatePaymentStatus]
  );

  return (
    <div>
      {payments?.length || search ? (
        <>
          <div className="db flex-ns pv3 ph4 justify-between bb b--gray-300">
            <div className="db flex-ns items-start">
              <span
                className="text-14 gray-600 mr4 avenir-roman"
                style={{padding: '5px 0'}}
              >
                Shipments: {payments?.length}
              </span>
              <CollectionPaymentsSortBySelect
                excludedOptions={[
                  SORT_PAYMENTS_BY.note.label,
                  SORT_PAYMENTS_BY.status.label,
                  SORT_PAYMENTS_BY.method.label,
                ]}
                customLabel={{[SORT_PAYMENTS_BY.name.label]: 'Name A-Z'}}
                value={sorted.sort}
                onChange={handleSortByChange}
              />
              <div className="mb3 mb0-ns ml3">
                <SearchForm
                  enableReinitialize
                  form="views/collection/manage/Page-SearchForm"
                  initialValues={{term: search}}
                  iconClassName="gray-400"
                  onSubmit={handleSearchSubmit}
                  noResult={
                    search && search.length !== 0 && payments?.length === 0
                  }
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        getPaymentsStatus === 'success' && (
          <NoPayments collection={collection} />
        )
      )}

      {Boolean(payments.length) && getPaymentsStatus === 'success' && (
        <div className="collection-payment-row-container relative-ns pv2 bb b--gray-300 ph4 flex gray-600 text-12">
          <div className="w-30 mr4">Name and Address</div>
        </div>
      )}
      <StatefulView resultCount={payments.length} status={getPaymentsStatus}>
        {payments.map((payment) => renderPayment(payment))}
      </StatefulView>
      {pagination?.total > PAYMENTS_PER_PAGE && (
        <div className="flex pv3 ph4 justify-end bg-white">
          <Paginator
            page={pagination?.page - 1}
            perPage={pagination?.perPage}
            total={pagination?.total}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

const enhance = compose(
  asyncConnect((props) => {
    const deps = [];
    const state = props.store.getState();

    const stateCollectionId =
      state.collections.collection && state.collections.collection.id;
    const loadCollection =
      !stateCollectionId ||
      String(stateCollectionId) !== String(props.collectionId);

    const {
      shippablePayments: {payments = []},
    } = state.payments;
    const loadPayments =
      loadCollection ||
      payments.length === 0 ||
      String(payments[0].tab_id) !== String(props.collectionId);

    if (loadPayments) {
      deps.push({
        key: GET_SHIPPABLE_PAYMENTS,
        promise: getShippablePayments,
        payload: {
          collection: props.collectionId,
          query: {
            shippable: true,
            page: 1,
            perPage: PAYMENTS_PER_PAGE,
            sort: 'created_at',
            direction: 'desc',
          },
        },
      });
    }

    return deps;
  })
);

export default enhance(CollectionManageShippingTable);
