import React from 'react';

import StyledTable from 'elements/StyledTable';

import PaymentFormTableRow from './PaymentFormTableRow';

const PaymentFormTable = ({
  className,
  fieldViewsVisiblePaymentFormId,
  paymentForms,
  onViewFieldViews,
}) => (
  <StyledTable.Table className={className}>
    <StyledTable.Head>
      <StyledTable.Row head>
        <StyledTable.HeadCell className="f7">Form(s)</StyledTable.HeadCell>
        <StyledTable.HeadCell />
        <StyledTable.HeadCell />
        <StyledTable.HeadCell />
        <StyledTable.HeadCell className="f7 tr">Responses</StyledTable.HeadCell>
      </StyledTable.Row>
    </StyledTable.Head>
    <tbody>
      {paymentForms.map((paymentForm) => (
        <PaymentFormTableRow
          key={paymentForm.id}
          fieldViewsVisible={paymentForm.id === fieldViewsVisiblePaymentFormId}
          paymentForm={paymentForm}
          onViewFieldViews={onViewFieldViews}
        />
      ))}
    </tbody>
  </StyledTable.Table>
);

const EnhancedPaymentFormTable = React.memo(PaymentFormTable);

export default EnhancedPaymentFormTable;
