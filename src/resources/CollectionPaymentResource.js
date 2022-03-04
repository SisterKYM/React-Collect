import CollectionSubResource from './CollectionSubResource';

class CollectionPaymentResource extends CollectionSubResource {
  static getKey() {
    return 'CollectionPaymentResource';
  }
  static getSubResourcePath() {
    return 'payments';
  }

  static listShape() {
    return {
      ...super.listShape(),
      schema: {
        data: [this.asSchema()],
      },
    };
  }
}

export default CollectionPaymentResource;
