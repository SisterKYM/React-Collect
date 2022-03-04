import getCheddarUpApiUrl from 'helpers/getCheddarUpApiUrl';

import CheddarUpResource from './CheddarUpResource';

class HeaderResource extends CheddarUpResource {
  static urlRoot = getCheddarUpApiUrl('/users/headers');
}

export default HeaderResource;
