import React from 'react';

import {CommonButton} from 'elements';
import {Link} from 'react-router-dom';
import CollectionManageFormsTable from './CollectionManageFormsTable';

const CollectionManageFormsTab = ({
  collection,
  collectionId,
  location,
  history,
  forms,
  getFormsStatus,
  handleAcceptInPersonPayment,
  reportFormPath,
  ...props
}) => (
  <div>
    <div className="manage-table bg-white ba b--gray-300 br2 shadow-light">
      <CollectionManageFormsTable
        collection={collection}
        collectionId={collectionId}
        location={location}
        history={history}
        forms={forms}
        getFormsStatus={getFormsStatus}
        {...props}
      />
    </div>
    <div className="side-group">
      <div className="side-element bg-white ba b--gray-300 br2 shadow-light">
        <div className="flex-column justify-between flex flex-column h-100">
          <div>
            <h1 className="mb2 f7 ttu medium-grey avenir-roman">
              Add a response
            </h1>
            <div className="flex mb2">
              <p className="avenir-light dark-grey text-14">
                Easily record responses on behalf of a respondent and keep your
                tracking in sync.
              </p>
            </div>

            <CommonButton
              onClick={handleAcceptInPersonPayment}
              className="text-14 pv2 ph3 bg-tint white mt3"
            >
              Add a Response
            </CommonButton>
          </div>
        </div>
      </div>

      <div className="side-element bg-white ba b--gray-300 br2 shadow-light mt3">
        <div className="flex-column justify-between flex flex-column h-100">
          <div>
            <h1 className="mb2 f7 ttu medium-grey avenir-roman">
              Form reports
            </h1>
            <div className="flex">
              <p className="avenir-light dark-grey text-14">
                Download the Form Summary pdf for a printable summary of all
                form responses on your collection.
              </p>
            </div>
            <Link to={reportFormPath} target="_blank" className="inline-block">
              <CommonButton
                onClick={null}
                className="text-14 pv2 ph3 bg-gray-250 gray-600 w-100 mt3"
              >
                Print Forms (pdf)
              </CommonButton>
            </Link>
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

export default React.memo(CollectionManageFormsTab);
