import React from 'react';

import {CommonButton, Tooltip} from 'elements';
import CollectionManagePaymentsTable from './CollectionManagePaymentsTable';

const CollectionManagePaymentsTab = ({
  collection,
  collectionId,
  location,
  getPaymentsStatus,
  history,
  handleAcceptInPersonPayment,
  handleClickSummary,
  handleClickOrders,
  ...props
}) => (
  <>
    <div className="manage-table bg-white ba b--gray-300 br2 shadow-light">
      <CollectionManagePaymentsTable
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
              Record a payment
            </h1>
            <div className="flex mb2">
              <p className="avenir-light dark-grey text-14">
                Easily record payments on behalf of a payer and keep your
                tracking in sync. Great for recording cash/check or online
                payments.
              </p>
            </div>

            <Tooltip
              arrowPosition={50}
              style={{
                width: 300,
                left: -40,
                bottom: 42,
              }}
              text="Use this to record cash/check or online payments."
            >
              <CommonButton
                onClick={handleAcceptInPersonPayment}
                className="text-14 pv2 ph3 bg-tint white mt3"
              >
                Record a Payment
              </CommonButton>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="side-element bg-white ba b--gray-300 br2 shadow-light mt3">
        <div className="flex-column justify-between flex flex-column h-100">
          <div>
            <h1 className="mb2 f7 ttu medium-grey avenir-roman">
              Payment Reports
            </h1>
            <div className="flex mb2">
              <p className="avenir-light dark-grey text-14">
                Download a summary spreadsheet with all payment and item-related
                details about your collection. Or download an Orders pdf for a
                printable summary of all payments.
              </p>
            </div>
            <CommonButton
              className="text-14 pv2 ph3 bg-gray-250 gray-600 w-100 mt3"
              onClick={handleClickSummary}
            >
              Export Collection Summary (xlsx)
            </CommonButton>
            <CommonButton
              className="text-14 pv2 ph3 bg-gray-250 gray-600 w-100 mt2"
              onClick={handleClickOrders}
            >
              Print Orders (pdf)
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
  </>
);

export default React.memo(CollectionManagePaymentsTab);
