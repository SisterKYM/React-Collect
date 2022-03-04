import React from 'react';
import moment from 'moment';

import {currency} from 'helpers/numbers';
import StyledTable from 'elements/StyledTable';

const RefundsTableRow = ({refund, selected, onView}) => (
  <StyledTable.Row>
    <StyledTable.Cell>
      <p className="avenir-roman f6">
        {moment(refund.created_at).format('MM/DD/YY')}
      </p>
    </StyledTable.Cell>
    <StyledTable.Cell>
      <p className="w-50 tr f6">{currency(refund.amount)}</p>
    </StyledTable.Cell>
    <StyledTable.Cell>
      <div className="flex justify-end tint pointer f6 tr" onClick={onView}>
        {selected ? 'hide' : 'view'}
      </div>
    </StyledTable.Cell>
  </StyledTable.Row>
);

const EnhancedRefundsTableRow = React.memo(RefundsTableRow);

export default EnhancedRefundsTableRow;
