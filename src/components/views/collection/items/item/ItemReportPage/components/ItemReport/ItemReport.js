import React from 'react';

import ItemReportAmountStats from './ItemReportAmountStats';
import ItemReportPaymentItemTable from './ItemReportPaymentItemTable';
import ItemReportQuantityStats from './ItemReportQuantityStats';

const ItemReport = ({
  collection,
  item,
  fieldViewsVisiblePaymentItemId,
  onViewFieldViews,
}) => (
  <>
    <div className="flex flex-wrap ph2 lh-copy">
      <div className="w-100 avenir-roman text-14 line-20">
        Collection: {collection.name}
      </div>
      <div className="w-100 avenir-light text-14 line-20 mb4">
        Item: {item.name}
      </div>
      <div className="stats-wrapper w-100 flex-auto-ns">
        <ItemReportAmountStats className="stats w-100 w5-ns" item={item} />
      </div>
      <div className="stats-wrapper w-100 flex-auto-ns">
        <ItemReportQuantityStats className="stats w-100 w5-ns" item={item} />
      </div>
    </div>
    {item.payment_items && item.payment_items.length !== 0 && (
      <div className="overflow-x-scroll mb3">
        <ItemReportPaymentItemTable
          fieldViewsVisiblePaymentItemId={fieldViewsVisiblePaymentItemId}
          paymentItems={item.payment_items}
          onViewFieldViews={onViewFieldViews}
        />
      </div>
    )}
    <style jsx>{`
      @media print {
        .stats-wrapper {
          flex: 1 1 auto;
          min-width: 0;
          min-height: 0;
        }
        :global(.stats) {
          width: 16rem;
        }
      }
    `}</style>
  </>
);

const EnhancedItemReport = React.memo(ItemReport);

export default EnhancedItemReport;
