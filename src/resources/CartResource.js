import getCheddarUpApiUrl from 'helpers/getCheddarUpApiUrl';

import CheddarUpResource from './CheddarUpResource';

class CartResource extends CheddarUpResource {
  static getKey() {
    return 'CartResource';
  }

  static payShape() {
    return {
      ...this.partialUpdateShape(),
      getFetchKey: params => `${this.url(params)}/pay`,
      fetch: async (urlParams, body) =>
        this.fetch('post', `${this.url(urlParams)}/pay`, body),
    };
  }

  static applyDiscountShape() {
    return {
      ...this.partialUpdateShape(),
      getFetchKey: params =>
        `${this.url(params)}/discounts/${params.discountCode}`,
      fetch: async urlParams =>
        this.fetch(
          'put',
          `${this.url(urlParams)}/discounts/${urlParams.discountCode}`
        ),
    };
  }

  static resetDiscountShape() {
    return {
      ...this.partialUpdateShape(),
      getFetchKey: params =>
        `${this.url(params)}/discounts/${params.discountCode}`,
      fetch: async urlParams =>
        this.fetch(
          'delete',
          `${this.url(urlParams)}/discounts/${urlParams.discountCode}`
        ),
    };
  }

  static url(urlParams) {
    if (urlParams && this.pk(urlParams) !== null) {
      return getCheddarUpApiUrl(
        `/collections/${urlParams.collectionSlug}/carts/${this.pk(urlParams)}`
      );
    }

    throw new Error(`${this.getKey()} requires collectionSlug to retrieve`);
  }

  static listUrl(searchParams) {
    if (searchParams && searchParams.collectionSlug) {
      return getCheddarUpApiUrl(
        `/collections/${searchParams.collectionSlug}/carts`
      );
    }

    throw new Error(`${this.getKey()} requires collectionSlug to retrieve`);
  }

  pk() {
    return this.uuid;
  }
}

export default CartResource;
