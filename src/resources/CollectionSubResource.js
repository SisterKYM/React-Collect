import getCheddarUpApiUrl from 'helpers/getCheddarUpApiUrl';

import CheddarUpResource from './CheddarUpResource';

class CollectionSubResource extends CheddarUpResource {
  static getSubResourcePath() {
    throw new Error(
      'getSubResourcePath is abstract function. It must be overriden by subcalsses'
    );
  }

  static url(urlParams) {
    if (urlParams && this.pk(urlParams) !== null) {
      return getCheddarUpApiUrl(
        `/users/tabs/${urlParams.collectionId}/${this.getSubResourcePath(
          urlParams
        )}/${this.pk(urlParams)}`
      );
    }

    throw new Error(`${this.getKey()} requires collectionId to retrieve`);
  }

  static listUrl(searchParams) {
    if (searchParams && searchParams.collectionId) {
      return getCheddarUpApiUrl(
        `/users/tabs/${searchParams.collectionId}/${this.getSubResourcePath(
          searchParams
        )}/`
      );
    }

    throw new Error(`${this.getKey()} requires collectionId to retrieve`);
  }
}

export default CollectionSubResource;
