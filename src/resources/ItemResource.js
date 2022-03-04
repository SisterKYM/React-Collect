import getCheddarUpApiUrl from 'helpers/getCheddarUpApiUrl';

import CollectionSubResource from './CollectionSubResource';

class ItemResource extends CollectionSubResource {
  static getKey() {
    return 'ItemResource';
  }
  static getSubResourcePath() {
    return 'items';
  }

  static createItemFromCatalogItemShape() {
    return {
      ...this.createShape(),
      fetch: async ({collectionId}, body) =>
        this.fetch(
          'post',
          getCheddarUpApiUrl(`/users/tabs/${collectionId}/catalog/add`),
          body
        ),
    };
  }

  static cloneShape() {
    return {
      type: 'read',
      schema: this.listShape().schema,
      getFetchKey: params => this.listShape().getFetchKey(params),
      fetch: async ({collectionId, id}, body) => {
        await this.fetch(
          'post',
          getCheddarUpApiUrl(`/users/tabs/${collectionId}/items/${id}/clone`),
          body
        );

        return this.listShape().fetch({collectionId});
      },
    };
  }

  static sortListShape() {
    return {
      type: 'read',
      schema: this.listShape().schema,
      getFetchKey: params => this.listShape().getFetchKey(params),
      fetch: async ({collectionId}, body) => {
        await this.fetch(
          'patch',
          getCheddarUpApiUrl(`/users/tabs/${collectionId}/sort`),
          {
            type: 'items',
            ...body,
          }
        );

        return this.listShape().fetch({collectionId});
      },
    };
  }

  static alphabetizeListShape() {
    return {
      type: 'read',
      schema: this.listShape().schema,
      getFetchKey: params => this.listShape().getFetchKey(params),
      fetch: async ({collectionId}, body) => {
        await this.fetch(
          'patch',
          getCheddarUpApiUrl(`/users/tabs/${collectionId}/alphabetize`),
          {
            type: 'items',
            ...body,
          }
        );

        return this.listShape().fetch({collectionId});
      },
    };
  }

  static adjustPricesListShape() {
    return {
      type: 'read',
      schema: this.listShape().schema,
      getFetchKey: params => this.listShape().getFetchKey(params),
      fetch: async ({collectionId}, body) => {
        await this.fetch(
          'patch',
          getCheddarUpApiUrl(`/users/tabs/${collectionId}/items/adjust_prices`),
          body
        );

        return this.listShape().fetch({collectionId});
      },
    };
  }

  static undoAdjustPricesListShape() {
    return {
      type: 'read',
      schema: this.listShape().schema,
      getFetchKey: params => this.listShape().getFetchKey(params),
      fetch: async ({collectionId}, body) => {
        await this.fetch(
          'patch',
          getCheddarUpApiUrl(
            `/users/tabs/${collectionId}/items/undo_adjust_prices`
          ),
          body
        );

        return this.listShape().fetch({collectionId});
      },
    };
  }

  static reportShape() {
    return {
      ...this.detailShape(),
      fetch: async ({collectionId, id}) =>
        this.fetch(
          'post',
          getCheddarUpApiUrl(`/users/tabs/${collectionId}/items/${id}/report`)
        ),
    };
  }
}

export default ItemResource;
