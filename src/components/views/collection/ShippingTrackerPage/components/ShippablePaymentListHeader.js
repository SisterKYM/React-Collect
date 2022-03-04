import React from 'react';
import cx from 'classnames';

import {CollectionPaymentsSortBySelect, SearchForm} from 'elements';
import {SORT_PAYMENTS_BY} from 'redux/modules/payments/constants';

const ShippablePaymentListHeader = ({
  className,
  sortBy,
  searchKeyword,
  onChangeSortBy,
  onSubmitSearch,
}) => (
  <div className={cx('flex justify-between items-center', className)}>
    <CollectionPaymentsSortBySelect
      excludedOptions={[
        SORT_PAYMENTS_BY.note.label,
        SORT_PAYMENTS_BY.status.label,
        SORT_PAYMENTS_BY.method.label,
      ]}
      value={sortBy}
      onChange={onChangeSortBy}
    />
    <SearchForm
      enableReinitialize
      form="ShippablePaymentsSearchForm"
      initialValues={{term: searchKeyword}}
      onSubmit={onSubmitSearch}
    />
  </div>
);

const EnhancedShippablePaymentListHeader = React.memo(
  ShippablePaymentListHeader
);

export default EnhancedShippablePaymentListHeader;
