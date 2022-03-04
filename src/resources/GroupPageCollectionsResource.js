import getCheddarUpApiUrl from 'helpers/getCheddarUpApiUrl';
import CheddarUpResource from './CheddarUpResource';

class GroupPageCollectionsResource extends CheddarUpResource {
  static getKey() {
    return 'GroupPageCollectionsResource';
  }

  static listShape() {
    return {
      ...super.listShape(),
      schema: {
        collections: [this.asSchema()],
      },
      getFetchKey: (params) =>
        getCheddarUpApiUrl(`/collections/${params.me}/home`),
      fetch: (params) =>
        this.fetch(
          'get',
          getCheddarUpApiUrl(`/collections/${params.me}/home`),
          {}
        ),
    };
  }

  static shareShape() {
    return {
      ...super.listShape(),
      getFetchKey: () => `/users/tabs/modify`,
      fetch: (params) =>
        this.fetch('post', `/users/tabs/modify`, {
          collection_ids: params.collectionIds,
          options: {
            groupPage: {
              shared: true,
            },
          },
        }),
    };
  }

  static unShareShape() {
    return {
      ...super.listShape(),
      getFetchKey: () => `/users/tabs/modify`,
      fetch: (params) =>
        this.fetch('post', `/users/tabs/modify`, {
          collection_ids: params.collectionIds,
          options: {
            groupPage: {
              shared: false,
            },
          },
        }),
    };
  }
}

export default GroupPageCollectionsResource;
