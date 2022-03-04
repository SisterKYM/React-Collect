const PaymentMethodInfoHelpers = {
  getPaymentMethod: ({sources, stripeId} = {}) => {
    if (!sources || !stripeId) {
      return null;
    }
    if (stripeId.indexOf('ba_') === 0 || stripeId.indexOf('bank_') === 0) {
      return (sources.banks || []).find(item => item.id === stripeId) || null;
    }
    if (stripeId.indexOf('card_') === 0) {
      return (sources.cards || []).find(item => item.id === stripeId) || null;
    }

    return null;
  },
  getPaymentMethodType: ({paymentMethod, stripeId} = {}) => {
    if (!paymentMethod && !stripeId) {
      return null;
    }
    if (paymentMethod && paymentMethod.nickname) {
      return paymentMethod.nickname;
    }
    if (stripeId && stripeId.indexOf('card_') === 0) {
      return paymentMethod ? paymentMethod.brand : 'Credit Card';
    }
    if (stripeId && stripeId.indexOf('ba_') === 0) {
      return paymentMethod ? paymentMethod.bank_name : 'Bank Account';
    }

    return 'Unknown';
  },
};

export default PaymentMethodInfoHelpers;
