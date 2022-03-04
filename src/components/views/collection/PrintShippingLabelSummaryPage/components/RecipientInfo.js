import React from 'react';
import cx from 'classnames';

const RecipientInfo = ({className, address, onViewOrderSummary}) => (
  <div className={cx('pa3 avenir-roman gray-600 bg-white', className)}>
    <div className="mb3 f-regular">Recipient Information</div>
    <div className="f7 lh-copy">
      {address.name}
      <br />
      {address.street1}
      <br />
      {address.city}, {address.state} {address.zip}
      <br />
      {address.country === 'US' ? 'UNITED STATES' : 'CANADA'}
      <br />
      {address.phone && (
        <>
          Phone: {address.phone}
          <br />
        </>
      )}
      <a href={`mailto:${address.email}`}>{address.email}</a>
      <div className="mt3 tint pointer" onClick={onViewOrderSummary}>
        View Order Summary
      </div>
    </div>
  </div>
);

const EnhancedRecipientInfo = React.memo(RecipientInfo);

export default EnhancedRecipientInfo;
