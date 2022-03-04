import {useFetcher, useInvalidator, useResource} from 'rest-hooks';
import React, {useCallback, useState} from 'react';
import ReactSortable from 'react-sortablejs';

import {dragHandle, sortableOptions} from 'theme/sortable';
import {ReactComponent as AddFolder} from 'theme/images/AddFolder.svg';
import {ReactComponent as Search} from 'theme/images/Search.svg';
import {Tooltip} from 'elements';
import config from 'config';
import FolderResource from 'resources/FolderResource';

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
const searchFolderTooltipStyle = {
  left: -20,
  top: -47,
};
const folderTooltipStyle = {
  top: '-35px',
  left: '60px',
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
const TippedFolderNavItem = React.memo(
  ({
    selectFolder,
    active,
    f,
    showRenameFolderModal,
    showDeleteFolderModal,
    managedCollections,
  }) => (
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
        onRenameClick={showRenameFolderModal}
        onDeleteClick={showDeleteFolderModal}
        managedCollections={managedCollections}
      />
    </Tooltip>
  )
);

const handleSortAction = (event) => {
  const handler = event.item.querySelector(`.${dragHandle}`);
  if (handler) {
    handler.style.color = event.type === 'choose' ? config.colors.tint : '';
  }
};

const FoldersNav = ({
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
}) => {
  const folders = useResource(FolderResource.listShape(), {});
  const invalidateFolderList = useInvalidator(FolderResource.listShape());

  const selectFolder = useCallback(
    (f) => {
      if (f === null) {
        onFolderChange(f);
      } else if (f.id) {
        onFolderChange(folders.find((folder) => f.id === folder.id));
      }
    },
    [onFolderChange, folders]
  );

  const hideCreateFolderModal = useCallback(
    (refetch) => {
      if (refetch) {
        invalidateFolderList({});
      }

      setCreateFolderModalVisible(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setCreateFolderModalVisible]
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
  const showRenameFolderModal = useCallback(() => {
    setRenameFolderModalVisible(true);
  }, []);

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

  const showDeleteFolderModal = useCallback(() => {
    setDeleteFolderModalVisible(true);
  }, []);

  const sortFolders = useFetcher(FolderResource.sortShape());
  const handleChangeFoldersOrder = useCallback(
    async (newOrder) => {
      const order = newOrder.map((idx) => Number(idx));
      await sortFolders({order});
      invalidateFolderList({});
    },
    [invalidateFolderList, sortFolders]
  );

  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const hideSearchModal = useCallback(() => {
    setSearchModalVisible(false);
  }, []);
  const showSearchModal = useCallback(() => {
    setSearchModalVisible(true);
  }, []);

  const onDidDeleteFolder = useCallback(() => {
    onFolderChange(null);
  }, [onFolderChange]);

  return (
    <>
      <div className="folders-nav flex flex-column">
        <div className="folders">
          <div className="folders-header flex flex-row">
            <div className="flex-auto avenir-roman gray-600 f6">MY FOLDERS</div>
            <TippedCreateFolderButton
              showCreateFolderModal={showCreateFolderModal}
            />
            <TippedSearchFolderButton showSearchModal={showSearchModal} />
          </div>
          <FolderNavItem
            defaultFolder
            selectFolder={selectFolder}
            active={selectedFolder === null}
            name={defaultFolderName}
            folder={null}
            onRenameClick={showRenameFolderModal}
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
                  showRenameFolderModal={showRenameFolderModal}
                  showDeleteFolderModal={showDeleteFolderModal}
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
          <div className="folders flex-fill">
            <ManagedFolders
              selectedManagedCollectionFolder={selectedManagedCollectionFolder}
              onManagedCollectionFolderChange={onManagedCollectionFolderChange}
              managerRoles={managerRoles}
              managedCollectionsFoldersGrouped={
                managedCollectionsFoldersGrouped
              }
            />
          </div>
        ) : null}
      </div>
      <style jsx>{`
        .folders-nav {
          border-right: 1px solid #dedede;
        }
        .folders {
          padding: 1rem;
          width: 17rem;
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

export default React.memo(FoldersNav);
