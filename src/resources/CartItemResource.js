import CartResource from 'resources/CartResource';
import getCheddarUpApiUrl from 'helpers/getCheddarUpApiUrl';

import CheddarUpResource from './CheddarUpResource';

class CartItemResource extends CheddarUpResource {
  static getKey() {
    return 'CartResource';
  }

  static schema = {
    ...CartResource.asSchema(),
  };

  static deleteShape() {
    return {
      type: 'mutate',
      schema: this.detailShape().schema,
      getFetchKey: params => this.detailShape().getFetchKey(params),
      fetch: async urlParams => this.fetch('delete', this.url(urlParams)),
    };
  }

  static url(urlParams) {
    if (urlParams && this.pk(urlParams) !== null) {
      return getCheddarUpApiUrl(
        `/collections/${urlParams.collectionSlug}/carts/${
          urlParams.cartUuid
        }/items/${this.pk(urlParams)}`
      );
    }

    throw new Error(
      `${this.getKey()} requires collectionSlug and cartUuid to retrieve`
    );
  }

  static listUrl(searchParams) {
    if (searchParams && searchParams.collectionSlug) {
      return getCheddarUpApiUrl(
        `/collections/${searchParams.collectionSlug}/carts/${searchParams.cartUuid}/items`
      );
    }

    throw new Error(
      `${this.getKey()} requires collectionSlug and cartUuid to retrieve`
    );
  }

  pk() {
    return this.uuid;
  }
}

export default CartItemResource;
