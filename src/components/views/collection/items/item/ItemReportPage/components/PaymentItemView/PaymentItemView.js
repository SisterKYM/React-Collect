import React from 'react';

import PaymentItemFieldViewFields from './PaymentItemFieldViewFields';

const PaymentItemView = ({item, paymentItemId}) => {
  const paymentItem = item.payment_items.find(({id}) => id === paymentItemId);

  return (
    <>
      <div className="pb3 mb3 f6 lh-copy avenir-roman bb b--gray-300 gray-600">
        <p>{paymentItem.payment.tab_member.name}</p>
      </div>
      {Boolean(item.description) && (
        <div className="pb3 mb3 f6 lh-copy avenir-light bb b--gray-300 gray-600">
          {paymentItem.description}
        </div>
      )}
      <PaymentItemFieldViewFields
        className="pb3"
        fieldViews={paymentItem.item_field_views}
      />
    </>
  );
};

const EnhancedPaymentItemView = React.memo(PaymentItemView);

export default EnhancedPaymentItemView;
