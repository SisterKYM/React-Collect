import getCheddarUpApiUrl from 'helpers/getCheddarUpApiUrl';

import CollectionSubResource from './CollectionSubResource';

class CategoryResource extends CollectionSubResource {
  static getKey() {
    return 'CategoryResource';
  }
  static getSubResourcePath() {
    return 'categories';
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
            type: 'categories',
            ...body,
          }
        );

        return this.listShape().fetch({collectionId});
      },
    };
  }
}

export default CategoryResource;
