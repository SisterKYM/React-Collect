import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {CommonDropdownSelect} from 'elements';

const dropdownStyle = {
  border: '1px solid #DEDEDE',
};

const PaymentMethods = ({paymentMethods}) => {
  const [title, setTitle] = useState(
    `${paymentMethods[0].brand} ending with ${paymentMethods[0].last4}`
  );

  return (
    <div className="mb3-5">
      <p className="text-14 mb2">Payment Method</p>
      <div className="mb3">
        <CommonDropdownSelect
          className="ba br2 text-16"
          titleClassName="avenir-light"
          style={dropdownStyle}
          title={title}
          options={[
            ...paymentMethods.map((m) => ({
              title: `${m.brand} ending with ${m.last4}`,
              value: String(m.id),
              onClick: () => {
                setTitle(`${m.brand} ending with ${m.last4}`);
              },
            })),
            {
              title: <Link to="payment_methods">Add new payment method</Link>,
            },
          ]}
        />
      </div>
    </div>
  );
};

const EnhancedPaymentMethods = React.memo(PaymentMethods);

export default EnhancedPaymentMethods;
