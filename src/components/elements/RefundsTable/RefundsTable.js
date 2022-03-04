import React from 'react';
import StyledTable from 'elements/StyledTable';
import RefundsTableRow from './RefundsTableRow';

const RefundsTable = ({className, refunds, selectedRefundId, onViewRefund}) => {
  const renderRefundsTableRow = React.useCallback(
    refund => {
      const handleViewRefund = () => {
        onViewRefund(refund);
      };

      return (
        <RefundsTableRow
          key={refund.id}
          selected={selectedRefundId === refund.id}
          refund={refund}
          onView={handleViewRefund}
        />
      );
    },
    [onViewRefund, selectedRefundId]
  );

  return (
    <StyledTable.Table className={className}>
      <StyledTable.Head>
        <StyledTable.Row head>
          <StyledTable.HeadCell className="f7">
            Refund Issued
          </StyledTable.HeadCell>
          <StyledTable.HeadCell>
            <p className="w-50 tr f7">Amount</p>
          </StyledTable.HeadCell>
          <StyledTable.HeadCell>
            <div className="flex justify-end f7 tr">Details</div>
          </StyledTable.HeadCell>
        </StyledTable.Row>
      </StyledTable.Head>
      <tbody>{refunds.map(x => renderRefundsTableRow(x))}</tbody>
    </StyledTable.Table>
  );
};

const EnhancedRefundsTable = React.memo(RefundsTable);

export default EnhancedRefundsTable;
