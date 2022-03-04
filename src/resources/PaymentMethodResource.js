import getCheddarUpApiUrl from 'helpers/getCheddarUpApiUrl';

import CheddarUpResource from './CheddarUpResource';

class PaymentMethodResource extends CheddarUpResource {
  static urlRoot = getCheddarUpApiUrl('/users/payment_methods/');

  static async fetch(method, url, body) {
    if (method !== 'get') {
      return super.fetch(method, url, body);
    }
    const jsonResponse = await super.fetch(method, url, body);
    const combined = [...jsonResponse.cards, ...jsonResponse.banks];

    return combined;
  }

  pk() {
    return this.id;
  }
}

export default PaymentMethodResource;
