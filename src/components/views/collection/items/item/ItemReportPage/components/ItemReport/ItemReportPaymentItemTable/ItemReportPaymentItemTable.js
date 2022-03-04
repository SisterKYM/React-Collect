import React from 'react';
import _ from 'lodash';

import {StyledTable} from 'elements';

import ItemReportPaymentItemTableRow from './ItemReportPaymentItemTableRow';

const ItemReportPaymentItemTable = ({
  paymentItems,
  fieldViewsVisiblePaymentItemId,
  onViewFieldViews,
}) => {
  const fieldViewsCellVisible =
    _.sum(paymentItems.map(({item_field_views}) => item_field_views.length)) !==
    0;

  const renderRow = React.useCallback(
    paymentItem => {
      const handleViewFieldViews = () => {
        onViewFieldViews(paymentItem.id);
      };

      return (
        <ItemReportPaymentItemTableRow
          key={paymentItem.id}
          fieldViewsCellVisible={fieldViewsCellVisible}
          fieldViewsVisible={paymentItem.id === fieldViewsVisiblePaymentItemId}
          paymentItem={paymentItem}
          onViewFieldViews={handleViewFieldViews}
        />
      );
    },
    [fieldViewsCellVisible, fieldViewsVisiblePaymentItemId, onViewFieldViews]
  );

  return (
    <StyledTable.Table>
      <StyledTable.Head primary>
        <StyledTable.Row head>
          <StyledTable.HeadCell className="text-12">
            Payers
          </StyledTable.HeadCell>
          <StyledTable.HeadCell className="text-12">Date</StyledTable.HeadCell>
          <StyledTable.HeadCell className="text-12">Qty</StyledTable.HeadCell>
          <StyledTable.HeadCell className="text-12">
            Payment
          </StyledTable.HeadCell>
          <StyledTable.HeadCell className="text-12 tr">
            Method
          </StyledTable.HeadCell>
          {fieldViewsCellVisible && (
            <StyledTable.HeadCell className="dn-p text-12 tr">
              Responses
            </StyledTable.HeadCell>
          )}
        </StyledTable.Row>
      </StyledTable.Head>
      <tbody>{paymentItems.map(x => renderRow(x))}</tbody>
    </StyledTable.Table>
  );
};

const EnhancedItemReportPaymentItemTable = React.memo(
  ItemReportPaymentItemTable
);

export default EnhancedItemReportPaymentItemTable;
