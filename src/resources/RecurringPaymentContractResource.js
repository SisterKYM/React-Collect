import getCheddarUpApiUrl from 'helpers/getCheddarUpApiUrl';
import CheddarUpResource from './CheddarUpResource';

class RecurringPaymentContractResource extends CheddarUpResource {
  static urlRoot = getCheddarUpApiUrl('/users/recurring_payment_contracts');

  static getKey() {
    return 'RecurringPaymentContractResource';
  }

  static listShape() {
    return {
      ...super.listShape(),
      schema: {
        banks: [this.asSchema()],
        cards: [this.asSchema()],
        contracts: [this.asSchema()],
      },
    };
  }

  static cancelShape() {
    return {
      ...super.updateShape(),
      getFetchKey: (params) =>
        `/users/recurring_payment_contracts/${params.id}`,
      fetch: (params) =>
        this.fetch(
          'delete',
          `/users/recurring_payment_contracts/${params.id}`,
          {}
        ),
    };
  }

  static updateCardShape() {
    return {
      ...super.updateShape(),
      getFetchKey: (params) =>
        `/users/recurring_payment_contracts/${params.id}`,
      fetch: (params, body) =>
        this.fetch('patch', `/users/recurring_payment_contracts/${params.id}`, {
          stripe_source: body.value,
        }),
    };
  }
}

export default RecurringPaymentContractResource;
