import React from 'react';
import CollectionListItem from './CollectionListItem';

const CollectionListMobile = ({
  collections,
  toggleCloseModal,
  toggleDeleteModal,
  checkedCollectionIds,
  handleCollectionToggle,
  accountToCreateCollections,
}) =>
  collections.map((collection) => (
    <CollectionListItem
      key={collection.id}
      collection={collection}
      toggleCloseModal={toggleCloseModal}
      toggleDeleteModal={toggleDeleteModal}
      handleCollectionToggle={handleCollectionToggle}
      checked={checkedCollectionIds.includes(collection.id)}
      accountToCreateCollections={accountToCreateCollections}
    />
  ));

export default React.memo(CollectionListMobile);
