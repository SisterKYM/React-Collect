import React from 'react';

const CheckoutAuthHeading = ({
  heading,
  actionTitleHint,
  actionTitle,
  onClickActionTitle,
}) => (
  <div className="flex flex-wrap items-start avenir-roman">
    <h4 className="flex-auto w-100 w-auto-ns f-regular gray-550">{heading}</h4>
    <div className="action-title w-100 w-auto-ns pt2 pt0-ns">
      {actionTitleHint && (
        <>
          <span className="gray-600">{actionTitleHint}</span>{' '}
        </>
      )}
      <span className="wdim tint pointer" onClick={onClickActionTitle}>
        {actionTitle}
      </span>
    </div>
    <style jsx>{`
      .action-title {
        font-size: 0.8125rem;
      }
    `}</style>
  </div>
);

const EnhancedCheckoutAuthHeading = React.memo(CheckoutAuthHeading);

export default EnhancedCheckoutAuthHeading;
