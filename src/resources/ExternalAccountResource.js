import getCheddarUpApiUrl from 'helpers/getCheddarUpApiUrl';

import CheddarUpResource from './CheddarUpResource';

class ExternalAccountResource extends CheddarUpResource {
  static urlRoot = getCheddarUpApiUrl('/users/external_accounts/');

  static detailShape() {
    return {
      ...super.detailShape(),
      schema: {banks: this.asSchema()},
    };
  }

  static listShape() {
    return {
      ...super.listShape(),
      schema: {banks: [this.asSchema()]},
    };
  }
}

export default ExternalAccountResource;
