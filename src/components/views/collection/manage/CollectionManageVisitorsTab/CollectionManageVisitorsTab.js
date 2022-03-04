import React from 'react';

import {CommonButton} from 'elements';
import CollectionManageVisitorsTable from './CollectionManageVisitorsTable';

const CollectionManageVisitorsTab = ({
  collection,
  collectionId,
  location,
  getVisitorsStatus,
  history,
  handleClickVisitorSummary,
  ...props
}) => (
  <div>
    <div className="manage-table bg-white ba b--gray-300 br2 shadow-light">
      <CollectionManageVisitorsTable
        collection={collection}
        collectionId={collectionId}
        location={location}
        history={history}
        getMembersStatus={getVisitorsStatus}
        {...props}
      />
    </div>
    <div className="side-group">
      <div className="side-element bg-white ba b--gray-300 br2 shadow-light">
        <div className="flex-column justify-between flex flex-column h-100">
          <div>
            <h1 className="mb2 f7 ttu medium-grey avenir-roman">
              VISITOR REPORTS
            </h1>
            <div className="flex mb2">
              <p className="avenir-light dark-grey text-14">
                Download your visitor report in a spreadsheet for easy sorting
                or importing to a personal address book.
              </p>
            </div>

            <a
              className="dn-p"
              onClick={handleClickVisitorSummary}
              rel="noopener noreferrer"
              target="_blank"
            >
              <CommonButton className="text-14 pv2 ph3 bg-gray-250 gray-600 mt3">
                Export Visitor Summary (xlsx)
              </CommonButton>
            </a>
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

export default React.memo(CollectionManageVisitorsTab);
