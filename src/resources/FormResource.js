import getCheddarUpApiUrl from 'helpers/getCheddarUpApiUrl';

import CollectionSubResource from './CollectionSubResource';

class FormResource extends CollectionSubResource {
  static getKey() {
    return 'FormResource';
  }
  static getSubResourcePath() {
    return 'forms';
  }
  static listUrl({collectionId}) {
    if (collectionId) {
      return getCheddarUpApiUrl(`/users/tabs/${collectionId}/forms/search`);
    }

    throw new Error(`${this.getKey()} requires collectionId to retrieve`);
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
}

export default FormResource;
