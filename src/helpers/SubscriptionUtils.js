import apiClient from 'helpers/apiClient';

const SubscriptionUtils = {
  validatePromoCode: async ({plan, coupon}) =>
    apiClient.post(`users/subscription/validate_promo_code`, {
      plan,
      coupon,
    }),
};

export default SubscriptionUtils;
