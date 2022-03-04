import getCheddarUpApiUrl from 'helpers/getCheddarUpApiUrl';
import CheddarUpResource from './CheddarUpResource';

class SubscriptionInvoiceResource extends CheddarUpResource {
  static urlRoot = getCheddarUpApiUrl('/users/subscription/invoices');

  static getKey() {
    return 'SubscriptionInvoiceResource';
  }

  static listShape() {
    return {
      ...super.listShape(),
      schema: {
        billing_history: [],
        payment_method: '',
        plan: {},
      },
    };
  }
}

export default SubscriptionInvoiceResource;
