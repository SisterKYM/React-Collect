import getCheddarUpApiUrl from 'helpers/getCheddarUpApiUrl';

import CheddarUpResource from './CheddarUpResource';

class CollectionResource extends CheddarUpResource {
  static urlRoot = getCheddarUpApiUrl('/users/tabs/');

  static invalidIfStaleDetailShape() {
    return {
      ...this.detailShape(),
      invalidIfStale: true,
    };
  }

  static bulkCloseShape() {
    return {
      ...this.listShape(),
      getFetchKey: () => '/users/tabs/close',
      fetch: (body) => this.fetch('post', '/users/tabs/close', body),
    };
  }

  static bulkDeleteShape() {
    return {
      ...this.listShape(),
      getFetchKey: () => '/users/tabs/delete',
      fetch: (body) => this.fetch('post', '/users/tabs/delete', body),
    };
  }

  static replicateShape() {
    return {
      ...this.createShape(),
      options: {
        ...this.getFetchOptions(),
        optimisticUpdate: (params, body) => body,
      },
      getFetchKey: (urlParams) => `/users/tabs/${this.pk(urlParams)}/replicate`,
      fetch: (urlParams) =>
        this.fetch('patch', `/users/tabs/${this.pk(urlParams)}/replicate`),
    };
  }

  static closeShape() {
    return {
      ...this.partialUpdateShape(),
      getFetchKey: (urlParams) => `/users/tabs/${this.pk(urlParams)}/close`,
      fetch: (urlParams) =>
        this.fetch('patch', `/users/tabs/${this.pk(urlParams)}/close`),
    };
  }

  static partialUpdateShape() {
    return {
      ...super.partialUpdateShape(),
      options: {
        ...this.getFetchOptions(),
        optimisticUpdate: (params, body) => ({
          id: params.id,
          ...body,
        }),
      },
    };
  }

  static deleteShape() {
    return {
      ...super.deleteShape(),
      options: {
        ...this.getFetchOptions(),
        optimisticUpdate: (params, body) => body,
      },
    };
  }

  theme = null;
}

export default CollectionResource;
