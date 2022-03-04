import React from 'react';

import StyledTable from 'elements/StyledTable';

const PaymentFormTableRow = ({
  fieldViewsVisible,
  paymentForm,
  onViewFieldViews,
}) => {
  const handleViewResponses = React.useCallback(() => {
    onViewFieldViews(fieldViewsVisible ? null : paymentForm);
  }, [fieldViewsVisible, onViewFieldViews, paymentForm]);

  return (
    <StyledTable.Row className="f6">
      <StyledTable.Cell className="avenir-roman">
        {paymentForm.tab_form.name}
      </StyledTable.Cell>
      <StyledTable.Cell />
      <StyledTable.Cell />
      <StyledTable.Cell />
      <StyledTable.Cell>
        {paymentForm.item_field_views.length !== 0 && (
          <div className="tint pointer tr" onClick={handleViewResponses}>
            {fieldViewsVisible ? 'Hide' : 'View'}
          </div>
        )}
      </StyledTable.Cell>
    </StyledTable.Row>
  );
};

const EnhancedPaymentFormTableRow = React.memo(PaymentFormTableRow);

export default EnhancedPaymentFormTableRow;
