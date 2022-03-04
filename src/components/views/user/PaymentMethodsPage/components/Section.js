import PropTypes from 'prop-types';
import React from 'react';

const PaymentMethodsSection = ({
  className,
  actionClb,
  actionText,
  children,
  form,
  heading,
  showForm,
}) => (
  <div className={className}>
    <p>{heading}</p>
    <div className="mt2 mb3">{children}</div>
    {showForm ? (
      form
    ) : (
      <p className="f6">
        <span className="fw7 tint pointer" onClick={actionClb}>
          {actionText}
        </span>
      </p>
    )}
  </div>
);

const EnhancedPaymentMethodsSection = Object.assign(
  React.memo(PaymentMethodsSection),
  {
    propTypes: {
      actionClb: PropTypes.func,
      actionText: PropTypes.string,
      form: PropTypes.element,
      heading: PropTypes.string,
      showForm: PropTypes.bool,
    },
  }
);

export default EnhancedPaymentMethodsSection;
