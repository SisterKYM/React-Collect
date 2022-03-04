import getCheddarUpApiUrl from 'helpers/getCheddarUpApiUrl';

import CategoryResource from './CategoryResource';
import CheddarUpResource from './CheddarUpResource';

class ItemCatalogResource extends CheddarUpResource {
  static urlRoot = getCheddarUpApiUrl('/users/item_catalogs/');

  static detailShape() {
    return {
      ...super.detailShape(),
      schema: {
        catalog: this.asSchema(),
        categories: [CategoryResource.asSchema()],
      },
    };
  }
}

export default ItemCatalogResource;
