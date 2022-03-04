import _ from 'lodash';

import {currency} from 'helpers/numbers';
import DateHelpers from 'helpers/DateHelpers';

const instructionsInvalid = (str) => {
  if (!str) {
    return str;
  }
  const replaceVowels = str
    .replace('3', 'e')
    .replace('4', 'a')
    .replace('0', 'o')
    .toLowerCase();
  const cleaned = replaceVowels.replace(/[^A-Za-z]/g, '');
  const banned = [
    'venmo',
    'cashapp',
    'paypal',
    'zelle',
    'vnmo',
    'vinmo',
    'venm',
    'vemo',
  ];
  const anyBanned = banned.filter((i) => cleaned.includes(i)).length > 0;
  return anyBanned;
};

const censorInstructions = (str, loggedIn) => {
  if (!instructionsInvalid(str)) {
    return str;
  }
  if (loggedIn) {
    return 'Your instructions contain restricted language and will not appear at checkout. This field is closely monitored and if a workaround is entered, your collection may be at risk of being shut down, with payments auto refunded.';
  }

  return '';
};

const getItemRecurringPeriod = (item) => {
  const repeatIntervalParsed = DateHelpers.parseDuration(
    item.options.recurring.options.repeatInterval
  );
  const repeatCount =
    repeatIntervalParsed.asMonths || repeatIntervalParsed.asWeeks;
  const num = repeatCount === 1 ? '' : ` ${repeatCount}`;
  const unit = repeatIntervalParsed.asWeeks ? 'week' : 'month';

  return `${num} ${unit}${repeatCount === 1 ? '' : 's'}`;
};

const CartHelpers = {
  censorInstructions,
  instructionsInvalid,
  getFees: ({cart, paymentMethod}) => {
    if (!cart || !cart.fees) {
      return 0;
    }

    switch (paymentMethod) {
      case 'CREDIT_CARD':
        return cart.fees.card;
      case 'ECHECK':
        return cart.fees.echeck;
      case 'CASH_OR_CHECK':
        return cart.fees.cash;
      default:
        return 0;
    }
  },
  getShipping: ({cart, shippingMethod}) => {
    if (!cart) {
      return 0;
    }

    switch (shippingMethod) {
      case 'LOCAL_PICKUP':
        return cart.shipping.localPickup;
      case 'TO_ME':
        return cart.shipping.toMe;
      default:
        return 0;
    }
  },
  getCartItemPrice: (cartItem) => {
    if (
      cartItem.tab_item.options.recurring &&
      cartItem.tab_item.options.recurring.enabled
    ) {
      return `${currency(cartItem.tab_item.amount)} / ${getItemRecurringPeriod(
        cartItem.tab_item
      )}`;
    }

    return currency(cartItem.amount);
  },
  getItemViewPrice: ({itemView, listing}) => {
    if (listing) {
      return currency(listing.amount);
    }

    if (itemView.options.recurring && itemView.options.recurring.enabled) {
      return `${currency(itemView.amount)} / ${getItemRecurringPeriod(
        itemView
      )}`;
    }

    return itemView.amount_type === 'fixed' ? currency(itemView.amount) : null;
  },
  getMissingItemViewIds: ({itemViews, cart}) => {
    const requiredCartItemViewIds = (cart ? cart.items : [])
      .filter(({tab_item}) => tab_item.required)
      .map(({tab_item}) => tab_item.id);

    return itemViews
      .filter(
        ({id, required, available_quantity}) =>
          available_quantity !== 0 &&
          required &&
          !requiredCartItemViewIds.includes(id)
      )
      .map(({id}) => id);
  },
  getPayErrorBody: (err) => {
    let body;
    if (err.param === 'exp_month' || err.param === 'exp_year') {
      body = 'Please double check the expiration date on your credit card';
    } else if (err.type === 'card_error' || err.param === 'bank_account') {
      body = err.message;
    } else if (err.response && err.response.data) {
      const responseBody = err.response.data;
      const apiError = responseBody.error;
      const emailError = responseBody.errors && responseBody.errors.email;
      if (apiError === 'exceeded_available_quantity') {
        const details = responseBody.details;
        const {available} = details;
        let quantityError = 'it is sold out';
        if (available > 0) {
          quantityError = `there ${
            available === 1 ? 'is' : 'are'
          } only ${available} available for sale`;
        }
        body = `Sorry, you requested ${details.requested} of ${details.tab_item_name}, but ${quantityError}.`;
      } else if (apiError === 'items_sold_out') {
        body = 'items_sold_out';
      } else if (apiError === 'invalid_email') {
        body = 'You must enter a valid email address';
      } else if (emailError) {
        body = emailError;
      } else {
        body = responseBody.error;
      }
    } else if (err.response) {
      body =
        'An unexpected error occurred, please reload the page and attempt your payment again.';
    }

    body = body || 'Please make sure your payment information is correct.';

    if (
      body.includes('param is missing or the value is empty: source') ||
      body.includes('param is missing or the value is empty: method')
    ) {
      body = 'Please make sure you select a valid payment method.';
    }

    return body;
  },
  isRequiredFormFieldViewMissing: ({formViews, cart}) => {
    const requiredFieldViewIds = _.flatMap(
      formViews,
      (formView) => formView.fields
    )
      .filter(({required}) => required)
      .map(({id}) => id);
    const requiredCartFieldViewIds = _.flatMap(
      (cart && cart.forms) || [],
      ({cart_field_views}) =>
        cart_field_views
          .filter(({required}) => required)
          .map(({item_field_id}) => item_field_id)
    );

    return requiredFieldViewIds.some(
      (requiredFieldViewId) =>
        !requiredCartFieldViewIds.includes(requiredFieldViewId)
    );
  },
};

export default CartHelpers;
