import {colors} from 'theme/constants';
import {currency} from 'helpers/numbers';
import config from 'config';
import React from 'react';

export const PAYMENT_METHOD_STATUSES = {
  cash: {
    pending: 'Not Received',
    available: 'Received',
  },
  card: {
    pending: 'Pending',
    available: 'Cleared',
    failed: 'Failed',
  },
  echeck: {
    pending: 'Pending',
    available: 'Cleared',
    failed: 'Failed',
  },
  paypal: {
    pending: 'Pending',
    available: 'Cleared',
  },
  refunded: {
    fully: 'Refunded',
    partial: 'Partial Refund',
  },
};

export const DISPUTE_STATUSES = {
  needs_response: (
    <>
      Disputed: <span className="accent">Needs Response</span>
    </>
  ),
  under_review: (
    <>
      Disputed: <span className="accent">Under Review</span>
    </>
  ),
  won: (
    <>
      Disputed: <span className="accent">Won</span>
    </>
  ),
  lost: (
    <>
      Disputed: <span className="accent">Lost</span>
    </>
  ),
};

export const PAYMENT_STATUS_COLORS = {
  pending: config.colors.tint,
  failed: config.colors.brand,
  disputed: config.colors.brand,
  available: colors.black,
};

export const PAYMENT_METHOD_TOOLTIPS = {
  card: {
    pending: ({userView, availableOn}) =>
      `This payment is still being processed and should be available to ${
        userView ? 'the organizer ' : 'withdraw '
      }${
        availableOn
          ? `${availableOn}`
          : 'within 1-2 business days of payment date.'
      }`,
    available: ({userView}) =>
      userView
        ? 'This payment has cleared and is available to the organizer.'
        : 'This payment is now available for withdrawal',
  },
  cash: {
    pending: () => 'This payment has not been marked as received yet.',
    available: () => 'This payment has been marked received.',
  },
  echeck: {
    pending: ({userView, availableOn}) =>
      `This eCheck is still being processed and should be available to ${
        userView ? 'the organizer ' : 'withdraw '
      }${
        availableOn
          ? `${availableOn}`
          : 'within 5 business days of payment date.'
      }`,
    available: ({userView}) =>
      userView
        ? 'This payment has cleared and is available to the organizer.'
        : 'This payment is now available for withdrawal',
    failed: ({userView}) =>
      userView
        ? 'This eCheck failed to clear from your bank account.'
        : "This eCheck failed to clear from the customer's bank account.",
  },
  paypal: {
    available: () =>
      'This payment should is now available in your PayPal account.',
    pending: () =>
      'PayPal is no longer supported. Please contact CheddarUp to withdraw any PayPal funds.',
  },
  refunded: {
    fully: ({payment}) =>
      `${currency(payment.total_refund)} was refunded on this payment.`,
    partial: ({payment}) =>
      `${currency(payment.total_refund)} was refunded on this payment.`,
  },
};
