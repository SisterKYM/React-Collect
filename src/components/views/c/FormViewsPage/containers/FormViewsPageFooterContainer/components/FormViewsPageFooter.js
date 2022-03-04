import cx from 'classnames';
import React from 'react';

import {Touchable} from 'elements';

import {BackLink} from '../../../../components';

const FormViewsPageFooter = ({
  submitting,
  shippingIsNextStep,
  collectionHasFormsOnly,
  onReturnToCart,
  onProceedToPayment,
}) => (
  <footer
    className={cx(
      'flex',
      collectionHasFormsOnly
        ? 'justify-end w-100 ph4 pv3 bg-white shadow-6'
        : 'flex-row-reverse flex-row-ns items-center justify-between ph3 ph0-ns pv4 pv0-ns mt4 bg-white bg-transparent-ns'
    )}
  >
    {!collectionHasFormsOnly && (
      <div className="dn db-ns">
        <BackLink onClick={onReturnToCart}>Return to cart</BackLink>
      </div>
    )}
    <Touchable
      className="continue-button w-100 w5-ns h-auto-ns f5 white bg-brand bg-tint-ns"
      loading={submitting}
      onClick={onProceedToPayment}
    >
      Continue
      {collectionHasFormsOnly
        ? ''
        : ` to ${shippingIsNextStep ? 'Shipping' : 'Payment'}`}
    </Touchable>
    <style jsx>{`
      :global(.continue-button) {
        height: 2.5rem;
      }
    `}</style>
  </footer>
);

const EnhancedFormViewsPageFooter = React.memo(FormViewsPageFooter);

export default EnhancedFormViewsPageFooter;
