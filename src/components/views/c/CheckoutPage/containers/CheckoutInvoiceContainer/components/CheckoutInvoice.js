import cx from 'classnames';
import React from 'react';
import config from 'config';

import {Button, Checkbox, Tooltip} from 'elements';
import {currency} from 'helpers/numbers';
import CartHelpers from 'helpers/CartHelpers';
import HelpTooltipIcon from 'theme/images/HelpTooltipIcon.svg';

const TOOLTIP_WIDTH = 250;

const CheckoutInvoiceRow = ({
  className,
  amountBold,
  freeTitleAllowed,
  title,
  amount,
}) => (
  <dl
    className={cx(
      'flex w-100 mv2 items-center avenir-roman',
      amountBold ? 'f5' : 'f6',
      className
    )}
  >
    <dt className="db flex-auto gray-600">{title}:</dt>
    <dd
      className={cx(
        'db tr',
        freeTitleAllowed && amount === 0 ? 'brand' : 'gray-550',
        amountBold && 'avenir-heavy gray-600'
      )}
    >
      {freeTitleAllowed && amount === 0 ? 'Free!' : currency(amount)}
    </dd>
  </dl>
);

const CheckoutInvoice = ({
  className,
  loading,
  payerCanCoverFees,
  onChangePayerCoversFees,
  submitDisabled,
  organizerSubmitDisabled,
  paymentMethod,
  shippingEnabled,
  shippingInfoValue,
  cart,
  discountCodeElement,
  onPay,
}) => {
  const feesAmount = CartHelpers.getFees({cart, paymentMethod});
  const shippingAmount = CartHelpers.getShipping({
    cart,
    shippingMethod: shippingInfoValue.method,
  });
  const selectedECheck = paymentMethod === 'ECHECK';

  const total = cart ? cart.total + feesAmount : 0;

  return (
    <div className={cx('ph3 ph4-ns pv4 bg-white br2-ns shadow-6', className)}>
      {total > 0 && (
        <>
          <div className="pb3 bb b--gray-300">
            <CheckoutInvoiceRow title="Subtotal" amount={cart.items_total} />
            {payerCanCoverFees && (
              <Tooltip
                style={{
                  left: '-15px',
                  top: '-65px',
                  width: `${TOOLTIP_WIDTH}px`,
                }}
                text="This will add a small amount to your total to cover convenience fees for the organizer"
              >
                <Checkbox
                  name="payerChoseToCoverFees"
                  labelClassName="f6 lh-copy avenir-light gray-600"
                  label={
                    <div style={{top: -2, position: 'relative'}}>
                      Cover Fees
                      <img
                        style={{top: 2, position: 'relative'}}
                        className="ml2"
                        src={HelpTooltipIcon}
                        alt="Help"
                      />
                    </div>
                  }
                  checked={cart.payerChoseToCoverFees}
                  onChange={(event) => {
                    onChangePayerCoversFees(event?.target?.checked);
                  }}
                  alignStart
                />
              </Tooltip>
            )}
            {Boolean(cart.totalDiscount) &&
              Object.keys(cart.discounts).map((discountCode) => (
                <CheckoutInvoiceRow
                  key={discountCode}
                  title={`Promo (${discountCode})`}
                  amount={-cart.discounts[discountCode].amount}
                />
              ))}
            {Object.keys(cart.fees || {}).length !== 0 && (
              <CheckoutInvoiceRow title="Fees" amount={feesAmount} />
            )}
            {shippingEnabled && shippingInfoValue.method === 'TO_ME' && (
              <CheckoutInvoiceRow
                freeTitleAllowed
                title="Shipping"
                amount={shippingAmount}
              />
            )}
            {Boolean(cart.totalTaxes) && (
              <CheckoutInvoiceRow title="Tax" amount={cart.totalTaxes} />
            )}
          </div>
          {discountCodeElement && (
            <div className="pv3 bb b--gray-300">{discountCodeElement}</div>
          )}
          <CheckoutInvoiceRow
            amountBold
            className="pv3"
            title="Total"
            amount={total}
          />
        </>
      )}
      <p className="mb3 f6">
        I accept the
        <a
          className={cx('ml1', !selectedECheck && 'mr1')}
          href={config.links.terms}
          rel="noopener noreferrer"
          target="_blank"
        >
          terms of use
        </a>
        {selectedECheck ? ',' : 'and'}
        <a
          className={cx('ml1', selectedECheck && 'mr1')}
          href={config.links.privacyPolicy}
          rel="noopener noreferrer"
          target="_blank"
        >
          privacy policy
        </a>
        {Boolean(selectedECheck) && (
          <>
            and
            <a
              className="ml1"
              href={config.links.achTerms}
              rel="noopener noreferrer"
              target="_blank"
            >
              ACH payment terms
            </a>
          </>
        )}
        .
      </p>
      <Button
        colorSet
        backgroundColorSet
        className={cx(
          'w-100',
          loading ? 'ba b--brand brand bg-white' : 'white bg-brand'
        )}
        status={loading ? 'pending' : undefined}
        disabled={submitDisabled}
        onClick={onPay}
      >
        {total > 0 && paymentMethod !== 'CASH_OR_CHECK' ? 'Pay Now' : 'Submit'}
      </Button>
      {organizerSubmitDisabled && (
        <p className="organizer-hint-title mt3 tc lh-title brand">
          To {total > 0 ? 'make a payment' : 'submit a response'} as the
          collector, log out or use a private browser.
        </p>
      )}
      <style jsx>{`
        .organizer-hint-title {
          font-size: 0.8125rem;
        }
      `}</style>
    </div>
  );
};

const EnhancedCheckoutInvoice = React.memo(CheckoutInvoice);

export default EnhancedCheckoutInvoice;
