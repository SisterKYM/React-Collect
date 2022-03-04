import getCheddarUpApiUrl from 'helpers/getCheddarUpApiUrl';

import CheddarUpResource from './CheddarUpResource';

class FolderResource extends CheddarUpResource {
  static urlRoot = getCheddarUpApiUrl('/users/folders');

  static getKey() {
    return 'FolderResource';
  }

  static sortShape() {
    return {
      ...this.listShape(),
      getFetchKey: () => '/users/folders/sort',
      fetch: (body) => this.fetch('patch', '/users/folders/sort', body),
    };
  }

  static moveShape() {
    return {
      ...this.listShape(),
      getFetchKey: () => '/users/tabs/move',
      fetch: (body) => this.fetch('post', '/users/tabs/move', body),
    };
  }
}

export default FolderResource;
