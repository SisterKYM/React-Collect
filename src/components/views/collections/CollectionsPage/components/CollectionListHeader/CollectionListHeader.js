import React, {useCallback, useState} from 'react';
import {useInvalidator} from 'rest-hooks';

import {Checkbox} from 'elements';
import CollectionResource from 'resources/CollectionResource';
import {ReactComponent as Folder} from 'theme/images/Folder.svg';

import {
  CloseBulkCollectionModal,
  DeleteBulkCollectionModal,
  DropdownSelect,
} from './components';

import {CreateCollectionButton} from '..';

const dropdownProps = {
  width: 175,
};
const dropdownStyle = {
  marginTop: 'auto',
};

const CollectionListHeader = ({
  collections,
  checkedCollectionIds,
  setCheckedCollectionIds,
  moveOptions,
  sortOptions,
  sortOption,
  selectedManagedCollectionFolder,
  accountToCreateCollections,
  selectedFolder,
  defaultFolderName,
}) => {
  const invalidateCollectionList = useInvalidator(
    CollectionResource.listShape()
  );

  const toggleSelectAllCheckboxChecked = useCallback(() => {
    setCheckedCollectionIds((prevCheckedCollectionIds) =>
      prevCheckedCollectionIds.length === collections.length
        ? []
        : collections.map((collection) => collection.id)
    );
  }, [collections, setCheckedCollectionIds]);

  // delete bulk collection modal
  const [
    bulkCollectionDeleteModalVisible,
    setBulkCollectionDeleteModalVisible,
  ] = useState(false);
  const hideBulkCollectionDeleteModal = useCallback(() => {
    setBulkCollectionDeleteModalVisible(false);
  }, []);
  const handleToggleDeleteBulkCollectionModal = useCallback(() => {
    if (checkedCollectionIds.length === 0) {
      hideBulkCollectionDeleteModal();
    } else {
      setBulkCollectionDeleteModalVisible(true);
    }
  }, [hideBulkCollectionDeleteModal, checkedCollectionIds.length]);

  // close bulk collection modal
  const [
    bulkCollectionCloseModalVisible,
    setBulkCollectionCloseModalVisible,
  ] = useState(false);
  const hideBulkCollectionCloseModal = useCallback(() => {
    setBulkCollectionCloseModalVisible(false);
  }, []);
  const handleToggleCloseBulkCollectionModal = useCallback(() => {
    if (checkedCollectionIds.length === 0) {
      hideBulkCollectionCloseModal();
    } else {
      setBulkCollectionCloseModalVisible(true);
    }
  }, [hideBulkCollectionCloseModal, checkedCollectionIds.length]);

  return (
    <>
      <div className="collections-header">
        <div className="collections-header__create pa3-5 items-center justify-between">
          <div>
            <div className="text-18 avenir-roman dark-grey horizontal-flex">
              <Folder className="dark-grey mr2" />
              <span className="mt1">
                {selectedManagedCollectionFolder?.name ||
                  selectedFolder?.name ||
                  defaultFolderName}
              </span>
            </div>
            {selectedManagedCollectionFolder && (
              <div className="text-12 avenir-roman dark-grey mt2 uppercase">
                Manager
              </div>
            )}
          </div>
          {accountToCreateCollections &&
            accountToCreateCollections.canCreate && (
              <CreateCollectionButton
                classname="db mt3"
                selectedFolder={
                  selectedFolder || selectedManagedCollectionFolder
                }
              />
            )}
        </div>
      </div>
      {Boolean(collections.length) && (
        <div className="collections-header__sort horizontal-flex items-center justify-between ph3-5 pv2">
          <div className="horizontal-flex">
            <Checkbox
              checked={checkedCollectionIds.length === collections.length}
              className="mr3"
              label={checkedCollectionIds.length > 0 ? '' : 'Select All'}
              labelClassName="b--thick-gray"
              onChange={toggleSelectAllCheckboxChecked}
              small
            />
            {Boolean(checkedCollectionIds.length) && (
              <>
                <div>
                  <DropdownSelect
                    className="dn db-ns bg-white ba b--gray-300"
                    backgroundColor="white"
                    title="Move to Folder"
                    options={moveOptions}
                    width={150}
                    dropdownProps={dropdownProps}
                    style={dropdownStyle}
                  />
                </div>

                {!selectedManagedCollectionFolder && (
                  <div>
                    <button
                      className="button text-12 avenir-roman dark-grey ml3 bg-gray-250"
                      onClick={handleToggleDeleteBulkCollectionModal}
                    >
                      Delete
                    </button>
                  </div>
                )}

                <div>
                  <button
                    className="button text-12 avenir-roman dark-grey ml3 bg-gray-250"
                    onClick={handleToggleCloseBulkCollectionModal}
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
          {!checkedCollectionIds.length && (
            <div>
              <DropdownSelect
                className="dn db-ns mr3 bg-white ba b--gray-300"
                backgroundColor="white"
                title={sortOption.title}
                options={sortOptions}
                width={150}
                dropdownProps={dropdownProps}
                style={dropdownStyle}
              />
            </div>
          )}
        </div>
      )}
      {bulkCollectionDeleteModalVisible && (
        <DeleteBulkCollectionModal
          collectionIds={checkedCollectionIds}
          onDidDeleteBulkCollections={() => {
            setCheckedCollectionIds([]);
            hideBulkCollectionDeleteModal();
            invalidateCollectionList({});
          }}
          onCancel={hideBulkCollectionDeleteModal}
          onDismiss={hideBulkCollectionDeleteModal}
        />
      )}

      {bulkCollectionCloseModalVisible && (
        <CloseBulkCollectionModal
          collectionIds={checkedCollectionIds}
          onDidCloseBulkCollections={() => {
            setCheckedCollectionIds([]);
            hideBulkCollectionCloseModal();
          }}
          onCancel={hideBulkCollectionCloseModal}
          onDismiss={hideBulkCollectionCloseModal}
        />
      )}
      <style jsx>{`
        .collections-header__create,
        .collections-header__sort {
          border-bottom: 1px solid #eaedf3;
        }
        .button {
          height: 30px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .uppercase {
          text-transform: uppercase;
        }
      `}</style>
    </>
  );
};

const areEqual = (prevProp, nextProp) =>
  prevProp.collections === nextProp.collections &&
  prevProp.checkedCollectionIds === nextProp.checkedCollectionIds &&
  prevProp.sortOptions === nextProp.sortOptions &&
  prevProp.sortOption === nextProp.sortOption &&
  (!nextProp.checkedCollectionIds.length ||
    prevProp.moveOptions === nextProp.moveOptions); // &&
// prevProp.selectedManagedCollectionFolder === nextProp.selectedManagedCollectionFolder

export default React.memo(CollectionListHeader, areEqual);
