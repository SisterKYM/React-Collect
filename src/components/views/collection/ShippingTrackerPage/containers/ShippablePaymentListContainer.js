import {compose} from 'recompose';
import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import _ from 'lodash';

import {GET_COLLECTION} from 'redux/modules/collections/constants';
import {
  GET_SHIPPABLE_PAYMENTS,
  PAYMENTS_PER_PAGE,
  SORT_PAYMENTS_BY,
} from 'redux/modules/payments/constants';
import {StatefulView} from 'elements';
import {getCollection} from 'redux/modules/collections/actions';
import {getShippablePayments} from 'redux/modules/payments/actions';
import asyncConnect from 'helpers/asyncConnect';

import {ShippablePaymentListHeader, ShippablePaymentRow} from '../components';

const ShippablePaymentListContainer = ({collectionId}) => {
  const dispatch = useDispatch();

  const getPaymentsStatus = useSelector(
    state => state.async.statuses[GET_SHIPPABLE_PAYMENTS]
  );
  const sorted = useSelector(state => state.payments.sorted);
  const pagination = useSelector(state => state.payments.pagination);
  const search = useSelector(state => state.payments.search || '');
  const collection = useSelector(state => state.collections.collection);
  const payments = useSelector(
    state => state.payments.shippablePayments.payments || []
  );

  const handleChangeSortBy = React.useCallback(
    value => {
      const sortOption = _.find(SORT_PAYMENTS_BY, ({label}) => label === value);

      dispatch(
        getShippablePayments({
          collection: collectionId,
          query: {
            shippable: true,
            search: '',
            per_page: pagination.perPage,
            page: pagination.page,
            direction: sortOption.direction,
            sort: value,
          },
        })
      );
    },
    [collectionId, dispatch, pagination]
  );

  const handleSubmitSearch = React.useCallback(
    values => {
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
    [collectionId, dispatch, pagination, search]
  );

  const renderPayment = React.useCallback(
    payment =>
      collection ? (
        <ShippablePaymentRow
          key={payment.id}
          payment={payment}
          packingSlipLinkTo={`/collection/${collection.user_id}/${collection.id}/payment-report/${payment.id}`}
          shippingLabelSummaryLinkTo={`/collection/${collection.user_id}/${collection.id}/manage/shpping/shipping-tracker/print-shipping-label-summary/${payment.id}`}
          printShippingLabelLinkTo={`/collection/${collection.user_id}/${collection.id}/manage/shpping/shipping-tracker/print-shipping-label/${payment.id}`}
        />
      ) : null,
    [collection]
  );

  return (
    <div className="pa3 br2 shadow-6 bg-white">
      <ShippablePaymentListHeader
        className="pb3 bb b--gray-300"
        sortBy={sorted.sort}
        searchKeyword={search}
        onChangeSortBy={handleChangeSortBy}
        onSubmitSearch={handleSubmitSearch}
      />
      <StatefulView resultCount={payments.length} status={getPaymentsStatus}>
        {payments.map(payment => renderPayment(payment))}
      </StatefulView>
    </div>
  );
};

const enhance = compose(
  asyncConnect(props => {
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

    if (loadCollection) {
      deps.push({
        key: GET_COLLECTION,
        promise: getCollection,
        payload: {
          collection: props.collectionId,
        },
      });
    }

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
  }),
  React.memo
);

const EnhancedShippablePaymentListContainer = enhance(
  ShippablePaymentListContainer
);

export default EnhancedShippablePaymentListContainer;
