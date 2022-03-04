import React from 'react';

import {Paginator} from 'elements';
import {connect} from 'react-redux';

import {getMembers} from 'redux/modules/members/actions';

import {CollectionMemberListContainer} from './containers';
import {NoVisitors} from './components';

const ITEMS_PER_PAGE = 25;

const CollectionManageVisitorsTable = ({
  collection,
  collectionId,
  pagination,
  history,
  members,
  getMembers,
  getMembersStatus,
}) => {
  const handlePageChange = () => {
    getMembers({collection: collectionId});
  };

  return (
    <div>
      {members?.length > 0 ? (
        <>
          <div className="db flex-ns pv3 ph4 justify-between bb b--gray-300">
            <div className="db flex-ns items-start">
              <span className="text-14 gray-600 mr4 avenir-roman mt1">
                Visitors: {members?.length}
              </span>
            </div>
          </div>
          <div className="collection-payment-row-container relative-ns pv2 bb b--gray-300 pl4 flex gray-600 text-12 pr3">
            <div className="w-10 tl mr5">Visitor</div>
            <div className="w-20 tr ml4">First Visit</div>
            <div className="w-20 tr pr3">Last Visit</div>
            <div className="w-20 tr pr2"># of Visits</div>
            <div className="w-10 pl4 ml5">Payment</div>
          </div>
          <CollectionMemberListContainer
            items={members || []}
            collection={collection}
            getMembersStatus={getMembersStatus}
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
        </>
      ) : (
        <NoVisitors />
      )}
    </div>
  );
};

const enhance = connect(null, (dispatch) => ({
  getMembers: (payload) => dispatch(getMembers(payload)),
}));
export default enhance(CollectionManageVisitorsTable);
