import getCheddarUpApiUrl from 'helpers/getCheddarUpApiUrl';

import CheddarUpResource from './CheddarUpResource';

class PublicCollectionResource extends CheddarUpResource {
  static urlRoot = getCheddarUpApiUrl('/collections/');

  static contactShape() {
    return {
      ...this.createShape(),
      getFetchKey: params => `${this.url(params)}/contact`,
      fetch: async (urlParams, body) => {
        await this.fetch('post', `${this.url(urlParams)}/contact`, body);

        return this.fetch('get', this.url(urlParams));
      },
    };
  }

  pk() {
    return this.slug;
  }
}

export default PublicCollectionResource;
