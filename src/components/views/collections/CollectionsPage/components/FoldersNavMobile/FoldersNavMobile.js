import React, {useState, useCallback} from 'react';
import {useResource, useInvalidator, useFetcher} from 'rest-hooks';
import ReactSortable from 'react-sortablejs';

import config from 'config';
import {Tooltip} from 'elements';
import {dragHandle, sortableOptions} from 'theme/sortable';
import FolderResource from 'resources/FolderResource';
import {ReactComponent as AddFolder} from 'theme/images/AddFolder.svg';
import {ReactComponent as Search} from 'theme/images/Search.svg';

import {
  CreateFolderModal,
  RenameFolderModal,
  DeleteFolderModal,
  SearchModal,
  FolderNavItem,
  ManagedFolders,
} from './components';

const createFolderTooltipStyle = {
  left: -20,
  top: -60,
};

const TippedCreateFolderButton = React.memo(({showCreateFolderModal}) => (
  <Tooltip
    text="New Folder"
    style={createFolderTooltipStyle}
    arrowPosition="25px"
    className="flex"
  >
    <AddFolder className="tint pointer mr3" onClick={showCreateFolderModal} />
  </Tooltip>
));

const searchFolderTooltipStyle = {
  left: -20,
  top: -47,
};

const TippedSearchFolderButton = React.memo(({showSearchModal}) => (
  <Tooltip
    text="Search"
    style={searchFolderTooltipStyle}
    arrowPosition="25px"
    className="flex"
  >
    <Search className="tint pointer" onClick={showSearchModal} />
  </Tooltip>
));

const folderTooltipStyle = {
  top: '-35px',
  left: '60px',
};

const TippedFolderNavItem = React.memo(({selectFolder, active, f}) => (
  <Tooltip
    className="flex"
    contentContainerClassName="collection-list-item-drag-tooltip"
    text="Drag to reorder"
    style={folderTooltipStyle}
  >
    <FolderNavItem
      selectFolder={selectFolder}
      active={active}
      name={f.name}
      folder={f}
    />
  </Tooltip>
));

const handleSortAction = (event) => {
  const handler = event.item.querySelector(`.${dragHandle}`);

  if (handler) {
    handler.style.color = event.type === 'choose' ? config.colors.tint : '';
  }
};

const FoldersNavMobile = ({
  defaultFolderName,
  changeDefaultFolderName,
  onFolderChange,
  selectedFolder,
  createFolderModalVisible,
  setCreateFolderModalVisible,
  selectedManagedCollectionFolder,
  onManagedCollectionFolderChange,
  managerRoles,
  managedCollectionsFoldersGrouped,
  onFolderCreated,
  showCollectionsListModal,
}) => {
  const folders = useResource(FolderResource.listShape(), {});

  const invalidateFolderList = useInvalidator(FolderResource.listShape());

  const selectFolder = useCallback(
    (f) => {
      if (f === null) {
        onFolderChange(f);
      } else {
        if (f.id) {
          onFolderChange(folders.find((folder) => f.id === folder.id));
        }
      }
      showCollectionsListModal();
    },
    [onFolderChange, folders, showCollectionsListModal]
  );

  const hideCreateFolderModal = useCallback(
    (refetch) => {
      if (refetch) {
        invalidateFolderList({});
      }
      setCreateFolderModalVisible(false);
    },
    [invalidateFolderList, setCreateFolderModalVisible]
  );
  const showCreateFolderModal = useCallback(() => {
    setCreateFolderModalVisible(true);
  }, [setCreateFolderModalVisible]);

  const [renameFolderModalVisible, setRenameFolderModalVisible] = useState(
    false
  );
  const hideRenameFolderModal = useCallback(
    (refetch, newDefaultFolderName) => {
      if (refetch) {
        invalidateFolderList({});
      }
      if (newDefaultFolderName) {
        changeDefaultFolderName(newDefaultFolderName);
      }
      setRenameFolderModalVisible(false);
    },
    [changeDefaultFolderName, invalidateFolderList]
  );

  const [deleteFolderModalVisible, setDeleteFolderModalVisible] = useState(
    false
  );
  const hideDeleteFolderModal = useCallback(
    (refetch) => {
      if (refetch) {
        invalidateFolderList({});
      }
      setDeleteFolderModalVisible(false);
    },
    [invalidateFolderList]
  );

  const sortFolders = useFetcher(FolderResource.sortShape());
  const handleChangeFoldersOrder = useCallback(
    async (newOrder) => {
      const order = newOrder.map((x) => Number(x));
      await sortFolders({order});

      invalidateFolderList({});
    },
    [sortFolders, invalidateFolderList]
  );

  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const hideSearchModal = useCallback(() => {
    setSearchModalVisible(false);
  }, [setSearchModalVisible]);
  const showSearchModal = useCallback(() => {
    setSearchModalVisible(true);
  }, [setSearchModalVisible]);

  const onDidDeleteFolder = useCallback(() => {
    onFolderChange(null);
  }, [onFolderChange]);

  return (
    <>
      <div className="folders-nav-mobile vertical-flex mb3">
        <div className="folders-mobile bg-white pv3 ph4">
          <div className="folders-header horizontal-flex">
            <div className="flex-fill avenir-roman gray-600 text-14">
              MY FOLDERS
            </div>
            <TippedCreateFolderButton
              showCreateFolderModal={showCreateFolderModal}
            />
            <TippedSearchFolderButton showSearchModal={showSearchModal} />
          </div>
          <FolderNavItem
            selectFolder={selectFolder}
            active={selectedFolder === null}
            name={defaultFolderName}
            defaultFolder
            folder={null}
          />
          <ReactSortable
            options={{
              ...sortableOptions,
              onChoose: handleSortAction,
              onEnd: handleSortAction,
            }}
            onChange={handleChangeFoldersOrder}
          >
            {folders.map((f) => (
              <div key={f.id} className={dragHandle} data-id={f.id}>
                <TippedFolderNavItem
                  selectFolder={selectFolder}
                  active={selectedFolder && selectedFolder.id === f.id}
                  f={f}
                />
              </div>
            ))}
          </ReactSortable>
          {createFolderModalVisible && (
            <CreateFolderModal
              onDismiss={hideCreateFolderModal}
              onFolderCreated={onFolderCreated}
            />
          )}
          {renameFolderModalVisible && (
            <RenameFolderModal
              folder={selectedFolder}
              defaultFolderName={defaultFolderName}
              onDismiss={hideRenameFolderModal}
            />
          )}
          {deleteFolderModalVisible && (
            <DeleteFolderModal
              folder={selectedFolder}
              defaultFolderName={defaultFolderName}
              onDismiss={hideDeleteFolderModal}
              onDidDeleteFolder={onDidDeleteFolder}
            />
          )}
          {searchModalVisible && (
            <SearchModal
              onFolderChange={selectFolder}
              onDismiss={hideSearchModal}
            />
          )}
        </div>
        {managerRoles.length > 0 ? (
          <div className="folders flex-fill bg-white">
            <ManagedFolders
              selectedManagedCollectionFolder={selectedManagedCollectionFolder}
              onManagedCollectionFolderChange={onManagedCollectionFolderChange}
              managerRoles={managerRoles}
              managedCollectionsFoldersGrouped={
                managedCollectionsFoldersGrouped
              }
              showCollectionsListModal={showCollectionsListModal}
            />
          </div>
        ) : null}
      </div>
      <style jsx>{`
        .folders-nav-mobile {
          border-bottom: 1px solid #dedede;
        }
        .folders-mobile {
          width: 100%;
          border-top: 1px solid #eaedf3;
          border-bottom: 1px soild #eaedf3;
        }
        .folders:not(:first-child) {
          border-top: 1px solid #dedede;
        }
        .folders-header {
          padding: 0.625rem 0.125rem;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </>
  );
};

export default React.memo(FoldersNavMobile);
