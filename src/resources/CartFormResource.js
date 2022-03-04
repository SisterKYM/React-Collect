import getCheddarUpApiUrl from 'helpers/getCheddarUpApiUrl';

import CheddarUpResource from './CheddarUpResource';

class CartFormResource extends CheddarUpResource {
  static getKey() {
    return 'CartResource';
  }

  static url(urlParams) {
    if (urlParams && this.pk(urlParams) !== null) {
      return getCheddarUpApiUrl(
        `/collections/${urlParams.collectionSlug}/carts/${
          urlParams.cartUuid
        }/forms/${this.pk(urlParams)}`
      );
    }

    throw new Error(
      `${this.getKey()} requires collectionSlug and cartUuid to retrieve`
    );
  }

  static listUrl(searchParams) {
    if (searchParams && searchParams.collectionSlug) {
      return getCheddarUpApiUrl(
        `/collections/${searchParams.collectionSlug}/carts/${searchParams.cartUuid}/forms`
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

export default CartFormResource;
