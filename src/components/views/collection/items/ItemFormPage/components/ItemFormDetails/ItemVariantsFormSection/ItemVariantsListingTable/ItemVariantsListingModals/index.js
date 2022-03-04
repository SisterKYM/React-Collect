import ItemVariantsListingDeleteModal from './ItemVariantsListingDeleteModal';
import ItemVariantsListingMarkAsSoldModal from './ItemVariantsListingMarkAsSoldModal';
import ItemVariantsListingPriceModal from './ItemVariantsListingPriceModal';
import ItemVariantsListingQuantityModal from './ItemVariantsListingQuantityModal';
import ItemVariantsListingSelectImageModal from './ItemVariantsListingSelectImageModal';
import ItemVariantsListingSkuModal from './ItemVariantsListingSkuModal';

const ItemVariantsListingModals = {
  Delete: ItemVariantsListingDeleteModal,
  Image: ItemVariantsListingSelectImageModal,
  MarkAsSold: ItemVariantsListingMarkAsSoldModal,
  Price: ItemVariantsListingPriceModal,
  Quantity: ItemVariantsListingQuantityModal,
  Sku: ItemVariantsListingSkuModal,
};

export default ItemVariantsListingModals;
