import getCheddarUpApiUrl from 'helpers/getCheddarUpApiUrl';
import CheddarUpResource from './CheddarUpResource';

class UserPaymentResource extends CheddarUpResource {
  static urlRoot = getCheddarUpApiUrl('/users/payments');

  static getKey() {
    return 'UserPaymentResource';
  }

  static resendShape() {
    return {
      ...this.partialUpdateShape(),
      schema: {
        success: Boolean,
      },
      getFetchKey: (params) =>
        `users/payments/${params.paymentId}/resend_receipt`,
      fetch: (urlParams, body) =>
        this.fetch(
          'post',
          `users/payments/${urlParams.paymentId}/resend_receipt`,
          body
        ),
    };
  }
}

export default UserPaymentResource;
