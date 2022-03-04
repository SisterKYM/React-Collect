import React from 'react';
import {MdClose} from 'react-icons/md';

import {Modal} from 'elements';

import {CollectionListHeaderMobile, CollectionListMobile} from '.';

const CollectionsListModal = ({
  onDismiss,
  folderCollections,
  checkedCollectionIds,
  setCheckedCollectionIds,
  moveOptions,
  sortOptions,
  sortOption,
  setCreateFolderModalVisible,
  selectedManagedCollectionFolder,
  accountToCreateCollections,
  selectedFolder,
  handleToggleCloseCollectionModal,
  handleToggleDeleteCollectionModal,
  handleCollectionToggle,
  defaultFolderName,
}) => (
  <Modal className="dark-grey" size="MEDIUM" onDismiss={onDismiss}>
    <div className="collections-list-modal-close">
      <MdClose className="pointer gray-600" size={24} onClick={onDismiss} />
    </div>
    <div className="flex-fill vertical-flex">
      <CollectionListHeaderMobile
        onDismiss={onDismiss}
        collections={folderCollections}
        checkedCollectionIds={checkedCollectionIds}
        setCheckedCollectionIds={setCheckedCollectionIds}
        moveOptions={moveOptions}
        sortOptions={sortOptions}
        sortOption={sortOption}
        setCreateFolderModalVisible={setCreateFolderModalVisible}
        selectedManagedCollectionFolder={selectedManagedCollectionFolder}
        accountToCreateCollections={accountToCreateCollections}
        selectedFolder={selectedFolder}
        defaultFolderName={defaultFolderName}
      />
      <div className="flex-fill collections-body-mobile">
        <CollectionListMobile
          collections={folderCollections}
          toggleCloseModal={handleToggleCloseCollectionModal}
          toggleDeleteModal={handleToggleDeleteCollectionModal}
          checkedCollectionIds={checkedCollectionIds}
          handleCollectionToggle={handleCollectionToggle}
          accountToCreateCollections={accountToCreateCollections}
        />
        {!folderCollections.length && accountToCreateCollections.canCreate && (
          <div className="no-collections avenir-light">
            <span className="tint">Create a collection</span>
            <span className="gray-600"> or watch our quick </span>
            <span className="tint">tutorial.</span>
          </div>
        )}
      </div>
    </div>
    <style jsx>{`
      .collections-body-mobile {
        padding: 1.5rem;
      }
      .collections-list-modal-close {
        position: absolute;
        right: 20px;
        top: 20px;
      }
    `}</style>
  </Modal>
);

export default React.memo(CollectionsListModal);
