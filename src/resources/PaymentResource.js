import getCheddarUpApiUrl from 'helpers/getCheddarUpApiUrl';
import CollectionSubResource from './CollectionSubResource';

class PaymentResource extends CollectionSubResource {
  static getKey() {
    return 'PaymentResource';
  }
  static getSubResourcePath() {
    return 'payments';
  }
  static listShape() {
    return {
      ...super.listShape(),
      schema: {
        data: [this.asSchema()],
        pagination: {},
        search: '',
        sort: '',
      },
    };
  }
  static disputedListShape() {
    return {
      ...super.listShape(),
      schema: {
        data: [this.asSchema()],
        pagination: {},
        search: '',
        sort: '',
      },
      getFetchKey: params => this.listShape().getFetchKey(params),
      fetch: async ({collectionId}, body) => {
        await this.fetch(
          'get',
          getCheddarUpApiUrl(
            `/users/tabs/${collectionId}/payments?status=disputed`
          ),
          {
            status: 'disputed',
            ...body,
          }
        );

        return this.listShape().fetch({collectionId});
      },
    };
  }
}

export default PaymentResource;
