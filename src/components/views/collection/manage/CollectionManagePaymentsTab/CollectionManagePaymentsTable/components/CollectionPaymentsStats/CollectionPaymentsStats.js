import React from 'react';

import {currency} from 'helpers/numbers';

import CollectionPaymentsStatsMethod from './CollectionPaymentsStatsMethod';

const CollectionPaymentsStats = ({
  collection,
  payments,
  justTitle,
  justStats,
}) => (
  <>
    {justTitle && (
      <>
        <h1 className="mb2 f7 ttu medium-grey avenir-roman">Total Collected</h1>
        <p className="mb2 avenir-light dark-grey" style={{fontSize: '30px'}}>
          {currency(collection.payments_total)}
        </p>
      </>
    )}
    {justStats && payments.length !== 0 && (
      <>
        <div
          className="flex-desktop mv2 mv0-ns"
          style={{lineHeight: '18px', flex: 1}}
        >
          <div className="flex-ipad-responsive">
            <CollectionPaymentsStatsMethod
              title="Online"
              value={
                collection.online_confirmed_total +
                collection.online_pending_total
              }
              cleared={collection.online_confirmed_total}
              pending={collection.online_pending_total}
            />
          </div>
        </div>
        <div
          className="flex-desktop mv2 mv0-ns"
          style={{lineHeight: '18px', flex: 1}}
        >
          <div className="flex-ipad-responsive">
            <CollectionPaymentsStatsMethod
              cash
              title="Cash or Check"
              value={collection.offline_total}
              cleared={collection.offline_confirmed_total}
              pending={collection.offline_pending_total}
            />
          </div>
        </div>
        <style jsx>{`
          @media (max-width: 1024px) and (min-width: 30em) {
            .flex-ipad-responsive {
              width: 100%;
              margin-top: 0.5rem;
              margin-bottom: 0.5rem;
            }
          }
          @media (min-width: 1025px) {
            .flex-desktop {
              display: flex;
              justify-content: center;
            }
          }
        `}</style>
      </>
    )}
  </>
);

const EnhancedCollectionPaymentsStats = React.memo(CollectionPaymentsStats);

export default EnhancedCollectionPaymentsStats;
