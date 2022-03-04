import React from 'react';

import CheckoutAuthHeading from './CheckoutAuthHeading';

const CheckoutAuthLoggedIn = ({email, onLogout}) => (
  <div>
    <CheckoutAuthHeading
      heading="Welcome Back!"
      actionTitle="Log out"
      onClickActionTitle={onLogout}
    />
    <div className="email mt2 avenir-roman gray-600">{email}</div>
    <style jsx>{`
      .email {
        font-size: 0.8125rem;
      }
    `}</style>
  </div>
);

const EnhancedCheckoutAuthLoggedIn = React.memo(CheckoutAuthLoggedIn);

export default EnhancedCheckoutAuthLoggedIn;
