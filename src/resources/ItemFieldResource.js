import CollectionSubResource from './CollectionSubResource';

class ItemFieldResource extends CollectionSubResource {
  static getKey() {
    return 'ItemImageResource';
  }
  static getSubResourcePath({itemId}) {
    return `items/${itemId}/fields`;
  }
}

export default ItemFieldResource;
