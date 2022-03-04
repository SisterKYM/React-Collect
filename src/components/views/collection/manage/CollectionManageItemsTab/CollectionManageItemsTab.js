import React from 'react';

import {CommonButton} from 'elements';
import CollectionManageItemsTable from './CollectionManageItemsTable';

const CollectionManageItemsTab = ({
  collection,
  collectionId,
  location,
  getPaymentsStatus,
  history,
  handleClickItems,
  ...props
}) => (
  <div>
    <div className="manage-table bg-white ba b--gray-300 br2 shadow-light">
      <CollectionManageItemsTable
        collection={collection}
        collectionId={collectionId}
        location={location}
        history={history}
        getPaymentsStatus={getPaymentsStatus}
        {...props}
      />
    </div>
    <div className="side-group">
      <div className="side-element bg-white ba b--gray-300 br2 shadow-light">
        <div className="flex-column justify-between flex flex-column h-100">
          <div>
            <h1 className="mb2 f7 ttu medium-grey avenir-roman">
              Item reports
            </h1>
            <div className="flex mb2">
              <p className="avenir-light dark-grey text-14">
                Download an item summary spreadsheet that details all
                item-related payments and information on your collection.
              </p>
            </div>

            <CommonButton
              onClick={handleClickItems}
              className="text-14 pv2 ph3 bg-gray-250 gray-600 mt3"
            >
              Export Item Summary (xlsx)
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
    <style jsx>{`
      .manage-table {
        display: inline-block;
        width: calc(100% - 21.25rem);
        margin-right: 1.25rem;
        margin-bottom: 1.25rem;
        min-width: 40rem;
        height: fit-content;
      }
      .side-group {
        display: inline-block;
        max-width: 100%;
        width: 20rem;
        float: right;
      }
      @media (max-width: 1060px) {
        .side-group {
          float: left;
        }
      }
      .side-element {
        display: inline-block;
        max-width: 100%;
        width: 20rem;
        min-height: 10.625rem;
        padding: 1.6875rem;
      }
      @media (max-width: 30em) {
        .manage-table {
          margin-right: auto;
        }
        .side-group {
          width: 100%;
        }
        .side-element {
          width: 100%;
          min-height: auto;
        }
      }
    `}</style>
  </div>
);

export default React.memo(CollectionManageItemsTab);
