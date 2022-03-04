import {connect} from 'react-redux';
import React from 'react';

import {CollectionItemsSortBySelect, Paginator, SearchForm} from 'elements';
import {getItems} from 'redux/modules/items/actions';
import useMedia from 'hooks/useMedia';

import {CollectionItemListContainer} from './containers';

const ITEMS_PER_PAGE = 25;

const CollectionManageItems = ({
  search,
  sorted,
  collection,
  collectionId,
  pagination,
  history,
  items,
  getItems,
  getItemsStatus,
}) => {
  const media = useMedia();

  const handlePageChange = (page) => {
    getItems({
      collection: collectionId,
      query: {
        direction: sorted.direction || 'asc',
        search,
        sort: sorted.sort || 'id',
        perPage: pagination.perPage,
        page: page.selected + 1,
      },
    });
  };

  const handleSearchSubmit = (values) => {
    if (values.term === search) {
      return;
    }

    getItems({
      collection: collectionId,
      query: {
        perPage: pagination.perPage,
        search: values.term,
        sort: sorted.sort,
      },
    });
  };

  const handleSort = (sort) => {
    getItems({
      collection: collectionId,
      query: {
        direction: 'asc',
        perPage: pagination.perPage,
        search,
        sort,
      },
    });
  };

  return (
    <div>
      <div className="db flex-ns pv3 ph4 justify-between bb b--gray-300">
        <div className="db flex-ns items-start">
          <span className="f6 gray-600 mr4-ns avenir-roman mt1">
            Items: {items.length}
          </span>
          {media.notSmall && (
            <CollectionItemsSortBySelect
              value={sorted.sort}
              handleSort={handleSort}
            />
          )}
          <SearchForm
            enableReinitialize
            form="views/collection/manage/Page-SearchForm"
            className="w5 w-auto-ns mt3 mt0-ns mb3 mb0-ns ml3-ns"
            iconClassName="gray-400"
            initialValues={{term: search}}
            onSubmit={handleSearchSubmit}
            noResult={search && search.length !== 0 && items.length === 0}
          />
        </div>
      </div>
      {items.length > 0 ? (
        <div className="collection-payment-row-container relative-ns pv2 bb b--gray-300 pl4 flex gray-600 text-12">
          <div className="w-10 tl mr5">Item</div>
          <div className="w-25 tr ml4">Price</div>

          <div className="w-20 tr pr2">
            {items.some((item) => item.available_quantity) && 'Qty Remaining'}
          </div>
          <div className="w-20 tr pr2">Collected</div>
        </div>
      ) : (
        ''
      )}
      <CollectionItemListContainer
        items={items}
        collection={collection}
        getItemsStatus={getItemsStatus}
        collectionId={collectionId}
        history={history}
      />
      {pagination?.total > ITEMS_PER_PAGE && (
        <div className="flex pv3 ph4 justify-end bg-white">
          <Paginator
            page={pagination.page - 1}
            perPage={pagination.perPage}
            total={pagination.total}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

const enhance = connect(
  () => ({}),
  (dispatch) => ({
    getItems: (payload) => dispatch(getItems(payload)),
  })
);
export default enhance(CollectionManageItems);
