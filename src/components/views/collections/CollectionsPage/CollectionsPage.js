import {capitalize, groupBy} from 'lodash';
import {Link} from 'react-router-dom';
import {useFetcher, useInvalidator, useResource} from 'rest-hooks';
import {useSelector, useDispatch} from 'react-redux';
import React, {useCallback, useEffect, useState, useMemo} from 'react';

import {CloseCollectionModal} from 'elements';
import {CollectionsLayout, CollectionsMobileLayout} from 'layout';
import CollectionResource from 'resources/CollectionResource';
import config from 'config';
import FolderResource from 'resources/FolderResource';
import useMedia from 'hooks/useMedia';
import {change} from 'redux/modules/folder/actions';

import {
  CollectionListHeader,
  CollectionListItem,
  CollectionsListModal,
  DeleteCollectionModal,
  FoldersNav,
  FoldersNavMobile,
  GetStarted,
  PartnerBenefits,
  Withdraw,
} from './components';

const isIOS = () =>
  [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod',
  ].includes(navigator.platform) ||
  // iPad on iOS 13 detection
  (navigator.userAgent.includes('Mac') && 'ontouchend' in document);

const startTour = () => {
  window.HelpHero.startTour('pZrGzAiHUJN');
};

const sortCollections = (collections, sortOption, sortDirection) =>
  collections
    .sort((a, b) => {
      if (typeof a[sortOption.value] === 'undefined') {
        if (typeof b[sortOption.value] === 'undefined') {
          return 0;
        }

        return sortDirection === 'asc' ? -1 : 1;
      }

      if (typeof b[sortOption.value] === 'undefined') {
        return sortDirection === 'asc' ? 1 : -1;
      }

      return a[sortOption.value] > b[sortOption.value]
        ? sortDirection === 'asc'
          ? 1
          : -1
        : a[sortOption.value] < b[sortOption.value]
        ? sortDirection === 'asc'
          ? -1
          : 1
        : 0;
    })
    .slice();

const CollectionsPage = () => {
  const media = useMedia();

  const collections = useResource(CollectionResource.listShape(), {});
  const invalidateCollections = useInvalidator(CollectionResource.listShape());

  const session = useSelector((state) => state.session);
  const initialFolder = useSelector((state) => state.folder);
  const dispatch = useDispatch();

  const [sortDirection, setSortDirection] = useState('desc');
  const [sortOption, setSortOption] = useState({});
  const updateSortOption = useCallback((newSortOption) => {
    setSortOption((prevSortOption) => {
      if (newSortOption.value === prevSortOption.value) {
        // toggle direction
        setSortDirection((prevSortDirection) =>
          prevSortDirection === 'asc' ? 'desc' : 'asc'
        );

        return prevSortOption;
      }

      setSortDirection(newSortOption.direction);

      return newSortOption;
    });
  }, []);

  const sortOptions = useMemo(
    () => [
      {
        title: 'Updated Date',
        value: 'updated_at',
        direction: 'desc',
        onClick() {
          updateSortOption(this);
        },
      },
      {
        title: 'A-Z',
        value: 'name',
        direction: 'asc',
        onClick() {
          updateSortOption(this);
        },
      },
      {
        title: 'Amount Collected',
        value: 'payments_total',
        direction: 'desc',
        onClick() {
          updateSortOption(this);
        },
      },
      {
        title: 'Status',
        value: 'status',
        direction: 'asc',
        onClick() {
          updateSortOption(this);
        },
      },
    ],
    [updateSortOption]
  );

  useEffect(() => {
    updateSortOption(sortOptions[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [checkedCollectionIds, setCheckedCollectionIds] = useState([]);

  const handleCollectionToggle = useCallback((toggledCollection) => {
    setCheckedCollectionIds((prevCheckedCollectionIds) =>
      prevCheckedCollectionIds.includes(toggledCollection.id)
        ? prevCheckedCollectionIds.filter(
            (collectionId) => collectionId !== toggledCollection.id
          )
        : [...prevCheckedCollectionIds, toggledCollection.id]
    );
  }, []);

  const [selectedFolder, setSelectedFolder] = useState(null);
  const [
    selectedManagedCollectionFolder,
    setSelectedManagedCollectionFolder,
  ] = useState(null);
  const onFolderChange = useCallback(
    (f) => {
      setCheckedCollectionIds([]);
      dispatch(
        change({
          organizerFolder: f,
        })
      );
      setSelectedFolder(f);

      if (f !== undefined) {
        dispatch(
          change({
            managedCollectionFolder: null,
          })
        );
        setSelectedManagedCollectionFolder(undefined);
      }
    },
    [dispatch]
  );
  const onManagedCollectionFolderChange = useCallback(
    (f) => {
      dispatch(
        change({
          managedCollectionFolder: f,
        })
      );
      setSelectedManagedCollectionFolder(f);
      onFolderChange();
    },
    [dispatch, onFolderChange]
  );

  const managerRoles = useMemo(() => session?.managerRoles || [], [session]);

  const managedCollections = useMemo(
    () =>
      collections.filter(
        (collection) => !collection.access || !collection.access.owner
      ),
    [collections]
  );

  const sessionUserId = session?.user.id;
  const selectedFolderIsUndefined = selectedFolder === undefined;
  const selectedManagedCollectionFolderUserId =
    selectedManagedCollectionFolder?.user_id;
  const accountToCreateCollections = useMemo(() => {
    if (selectedFolderIsUndefined && selectedManagedCollectionFolderUserId) {
      return managerRoles.find(
        (role) => role.id === selectedManagedCollectionFolderUserId
      );
    }

    return {
      id: sessionUserId,
      canCreate: true,
    };
  }, [
    sessionUserId,
    selectedFolderIsUndefined,
    selectedManagedCollectionFolderUserId,
    managerRoles,
  ]);

  // close collection modal
  const [
    collectionCloseModalVisible,
    setCollectionCloseModalVisible,
  ] = useState(false);
  const [collectionToClose, setCollectionToClose] = useState({});
  const hideCollectionCloseModal = useCallback(() => {
    setCollectionCloseModalVisible(false);
  }, []);
  const handleToggleCloseCollectionModal = useCallback(
    (collection) => {
      setCollectionToClose(collection);
      if (typeof collection.id === 'undefined') {
        hideCollectionCloseModal();
      } else {
        setCollectionCloseModalVisible(true);
      }
    },
    [hideCollectionCloseModal]
  );

  // delete collection modal
  const [
    collectionDeleteModalVisible,
    setCollectionDeleteModalVisible,
  ] = useState(false);
  const [collectionToDelete, setCollectionToDelete] = useState(null);
  const hideCollectionDeleteModal = useCallback(() => {
    setCollectionDeleteModalVisible(false);
  }, []);
  const handleToggleDeleteCollectionModal = useCallback(
    (collection) => {
      setCollectionToDelete(collection);
      if (collection === null) {
        hideCollectionDeleteModal();
      } else {
        setCollectionDeleteModalVisible(true);
      }
    },
    [hideCollectionDeleteModal]
  );

  const onDidCloseCollection = useCallback(() => {
    setCollectionToClose({});
    hideCollectionCloseModal();
  }, [hideCollectionCloseModal]);

  const onDidDeleteCollection = useCallback(() => {
    setCollectionToDelete(null);
    hideCollectionDeleteModal();
  }, [hideCollectionDeleteModal]);

  const folderCollections = useMemo(() => {
    const sortedCollections = (() => {
      if (selectedFolder === null || selectedFolder) {
        const ownedCollections = collections.filter(
          (collection) => collection.access && collection.access.owner
        );

        return sortCollections(ownedCollections, sortOption, sortDirection);
      }

      if (selectedManagedCollectionFolder) {
        const managerCollections = managedCollections.filter(
          (i) => i.user_id === selectedManagedCollectionFolder.user_id
        );
        return sortCollections(managerCollections, sortOption, sortDirection);
      }

      return [];
    })();

    if (selectedFolder) {
      return sortedCollections.filter(
        (collection) =>
          collection.folder && collection.folder.id === selectedFolder.id
      );
    }
    if (selectedManagedCollectionFolder) {
      if (selectedManagedCollectionFolder.id === 0) {
        return sortedCollections.filter((collection) => !collection.folder);
      }

      return sortedCollections.filter(
        (collection) =>
          collection.folder &&
          collection.folder.id === selectedManagedCollectionFolder.id
      );
    }

    return sortedCollections.filter((collection) => !collection.folder);
  }, [
    collections,
    managedCollections,
    selectedFolder,
    selectedManagedCollectionFolder,
    sortDirection,
    sortOption,
  ]);

  const [defaultFolderName, setDefaultFolderName] = useState(
    session?.user?.profile?.uiClientFlags?.customDefaultFolderName ||
      `${capitalize(config.strings.collection)}s`
  );

  const [createFolderModalVisible, setCreateFolderModalVisible] = useState(
    false
  );

  const folders = useResource(FolderResource.listShape(), {});
  useEffect(() => {
    if (initialFolder.organizerFolder) {
      setSelectedFolder(
        folders.find((f) => f.id === initialFolder.organizerFolder.id)
      );
    }
  }, [folders]);

  const moveFolder = useFetcher(FolderResource.moveShape());

  const [folderIdToMove, setFolderIdToMove] = useState(null);
  const [moveCollectionsCommand, setMoveCollectionsCommand] = useState(false);

  const handleMoveCollections = useCallback(
    (folderIdToMove, checkedCollectionIds) => {
      if (checkedCollectionIds.length === 0) {
        return;
      }

      moveFolder({
        collection_ids: checkedCollectionIds,
        folder_id: folderIdToMove,
      })
        .then(() => {
          setCheckedCollectionIds([]);
          invalidateCollections({});
        })
        .catch(() => {
          // show error
        });
    },
    [moveFolder, invalidateCollections]
  );

  useEffect(() => {
    if (moveCollectionsCommand) {
      handleMoveCollections(folderIdToMove, checkedCollectionIds);
      setMoveCollectionsCommand(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveCollectionsCommand]);

  const managedCollectionsGrouped = useMemo(
    () =>
      groupBy(managedCollections, ({organizer}) =>
        organizer ? organizer.id : 'none'
      ),
    [managedCollections]
  );

  const managedCollectionsFoldersGrouped = useMemo(
    () =>
      managerRoles.reduce((foldersGrouped, organizer) => {
        foldersGrouped[organizer.id] = [
          {
            id: 0,
            name:
              organizer.profile?.uiClientFlags?.customDefaultFolderName ||
              'Collections',
            user_id: organizer.id,
            position: 0,
          },
        ];
        if (Array.isArray(managedCollectionsGrouped[organizer.id])) {
          foldersGrouped[organizer.id] = managedCollectionsGrouped[
            organizer.id
          ].reduce((folders, managedCollectionGroupedByOrganizer) => {
            if (
              managedCollectionGroupedByOrganizer.folder &&
              !folders.some(
                (folder) =>
                  folder.id === managedCollectionGroupedByOrganizer.folder.id
              )
            ) {
              return [...folders, managedCollectionGroupedByOrganizer.folder];
            }

            return folders;
          }, foldersGrouped[organizer.id]);
        }

        return foldersGrouped;
      }, {}),
    [managedCollectionsGrouped, managerRoles]
  );

  useEffect(() => {
    if (initialFolder.managedCollectionFolder) {
      setSelectedManagedCollectionFolder(
        managedCollectionsFoldersGrouped[
          initialFolder.managedCollectionFolder.user_id
        ].find((f) => f.id === initialFolder.managedCollectionFolder.id)
      );
      onFolderChange();
    }
  }, [managedCollectionsFoldersGrouped]);

  const [moveCollectionsToNewFolder, setMoveCollectionsToNewFolder] = useState(
    false
  );
  const moveOptions = useMemo(
    () =>
      !selectedManagedCollectionFolder
        ? (selectedFolder
            ? [
                {
                  title: 'Move to:',
                  value: '',
                  onClick() {
                    //
                  },
                  className: 'avenir-roman text-12 dark-grey',
                },
                {
                  title: defaultFolderName,
                  value: null,
                  onClick() {
                    setFolderIdToMove(null);
                    setMoveCollectionsCommand(true);
                  },
                  className: 'avenir-roman text-12 dark-grey',
                },
              ]
            : [
                {
                  title: 'Move to:',
                  value: '',
                  onClick() {
                    //
                  },
                  className: 'avenir-roman text-12 dark-grey',
                },
              ]
          ).concat(
            folders
              .filter(
                (folder) => !selectedFolder || folder.id !== selectedFolder.id
              )
              .map((folder) => ({
                title: folder.name,
                value: folder.id,
                onClick() {
                  setFolderIdToMove(folder.id);
                  setMoveCollectionsCommand(true);
                },
                className: 'avenir-roman text-12 dark-grey',
              }))
              .concat([
                {
                  title: 'Create new',
                  value: '',
                  onClick() {
                    setCreateFolderModalVisible(true);
                    setMoveCollectionsToNewFolder(true);
                  },
                  className: 'avenir-roman text-12 accent',
                },
              ])
          )
        : (selectedManagedCollectionFolder.id
            ? [
                {
                  title: 'Move to:',
                  value: '',
                  onClick() {
                    //
                  },
                  className: 'avenir-roman text-12 dark-grey',
                },
                {
                  title:
                    managedCollectionsFoldersGrouped[
                      selectedManagedCollectionFolder.user_id
                    ][0].name,
                  value: null,
                  onClick() {
                    setFolderIdToMove(null);
                    setMoveCollectionsCommand(true);
                  },
                  className: 'avenir-roman text-12 dark-grey',
                },
              ]
            : [
                {
                  title: 'Move to:',
                  value: '',
                  onClick() {
                    //
                  },
                  className: 'avenir-roman text-12 dark-grey',
                },
              ]
          ).concat(
            managedCollectionsFoldersGrouped[
              selectedManagedCollectionFolder.user_id
            ]
              .filter(
                (folder) =>
                  !(
                    (selectedManagedCollectionFolder &&
                      folder.id === selectedManagedCollectionFolder.id) ||
                    folder.id === 0
                  )
              )
              .map((folder) => ({
                title: folder.name,
                value: folder.id,
                onClick() {
                  setFolderIdToMove(folder.id);
                  setMoveCollectionsCommand(true);
                },
                className: 'avenir-roman text-12 dark-grey',
              }))
          ),
    [
      folders,
      defaultFolderName,
      selectedFolder,
      selectedManagedCollectionFolder,
      managedCollectionsFoldersGrouped,
    ]
  );

  const [newFolder, setNewFolder] = useState(null);

  useEffect(() => {
    if (newFolder) {
      if (moveCollectionsToNewFolder) {
        setFolderIdToMove(newFolder.id);
        setMoveCollectionsCommand(true);
        setMoveCollectionsToNewFolder(false);
        setSelectedFolder(newFolder);
      }

      setNewFolder(null);
    }
  }, [newFolder, moveCollectionsToNewFolder]);

  const [
    collectionsListModalVisible,
    setCollectionsListModalVisible,
  ] = useState(false);
  const hideCollectionsListModal = useCallback(() => {
    setCollectionsListModalVisible(false);
  }, []);
  const showCollectionsListModal = useCallback(() => {
    setCollectionsListModalVisible(true);
  }, []);

  const defaultUserId = session?.user?.id;

  const userId =
    selectedFolder?.user_id || // managed collection folder
    selectedFolder?.organizer?.id || // owned collection folder
    defaultUserId;

  const createCollectionPath = selectedFolder?.id
    ? `/collection/${userId}/details?folderId=${selectedFolder.id}`
    : `/collection/${userId}/details`;

  return (
    <>
      {media.notSmall ? (
        <CollectionsLayout>
          <h1 className="avenir-roman gray-600 title">
            {capitalize(config.strings.collection)}s
          </h1>
          <div className="flex-auto flex flex-row">
            <div className="collections card flex flex-fill flex-row">
              <FoldersNav
                defaultFolderName={defaultFolderName}
                changeDefaultFolderName={setDefaultFolderName}
                selectedFolder={selectedFolder}
                onFolderChange={onFolderChange}
                createFolderModalVisible={createFolderModalVisible}
                setCreateFolderModalVisible={setCreateFolderModalVisible}
                selectedManagedCollectionFolder={
                  selectedManagedCollectionFolder
                }
                onManagedCollectionFolderChange={
                  onManagedCollectionFolderChange
                }
                managerRoles={managerRoles}
                managedCollectionsFoldersGrouped={
                  managedCollectionsFoldersGrouped
                }
                onFolderCreated={setNewFolder}
              />
              <div className="flex flex-fill flex-column">
                <CollectionListHeader
                  collections={folderCollections}
                  checkedCollectionIds={checkedCollectionIds}
                  setCheckedCollectionIds={setCheckedCollectionIds}
                  moveOptions={moveOptions}
                  sortOptions={sortOptions}
                  sortOption={sortOption}
                  setCreateFolderModalVisible={setCreateFolderModalVisible}
                  selectedManagedCollectionFolder={
                    selectedManagedCollectionFolder
                  }
                  accountToCreateCollections={accountToCreateCollections}
                  selectedFolder={selectedFolder}
                  defaultFolderName={defaultFolderName}
                />
                <div className="flex-auto collections-body">
                  {folderCollections.map((collection) => (
                    <CollectionListItem
                      key={collection.id}
                      collection={collection}
                      toggleCloseModal={handleToggleCloseCollectionModal}
                      toggleDeleteModal={handleToggleDeleteCollectionModal}
                      handleCollectionToggle={handleCollectionToggle}
                      checked={checkedCollectionIds.includes(collection.id)}
                      accountToCreateCollections={accountToCreateCollections}
                    />
                  ))}
                  {!folderCollections.length &&
                    accountToCreateCollections.canCreate && (
                      <div className="no-collections avenir-light">
                        {accountToCreateCollections &&
                        accountToCreateCollections.canCreate ? (
                          <>
                            <Link to={createCollectionPath}>
                              Create a collection
                            </Link>
                            <span className="gray-600"> or take a quick </span>
                          </>
                        ) : (
                          <span className="gray-600"> Take a quick </span>
                        )}
                        <span className="tint pointer" onClick={startTour}>
                          tour
                        </span>
                        .
                      </div>
                    )}
                </div>
              </div>
              {collectionCloseModalVisible && (
                <CloseCollectionModal
                  collection={collectionToClose}
                  onDidCloseCollection={onDidCloseCollection}
                  onCancel={hideCollectionCloseModal}
                  onDismiss={hideCollectionCloseModal}
                />
              )}
              {collectionDeleteModalVisible && collectionToDelete && (
                <DeleteCollectionModal
                  collection={collectionToDelete}
                  onDidDeleteCollection={onDidDeleteCollection}
                  onCancel={hideCollectionDeleteModal}
                  onDismiss={hideCollectionDeleteModal}
                />
              )}
            </div>
            {media.showSideElements && (
              <div className="right-side">
                <Withdraw className="side-element mb2-5" />
                <PartnerBenefits className="side-element" />
              </div>
            )}
          </div>
        </CollectionsLayout>
      ) : (
        <CollectionsMobileLayout>
          <div className="pa4">
            <h1 className="avenir-roman gray-600 title">
              {capitalize(config.strings.collection)}s
            </h1>
            {collections.length !== 0 && (
              <p className="avenir-roman text-14 light-grey lh1">
                Want to create a collection?{' '}
                {isIOS() ? (
                  <a href={config.links.mobileAppStore.ios}>
                    Download our app{' '}
                  </a>
                ) : (
                  <a href={config.links.mobileAppStore.android}>
                    Download our app{' '}
                  </a>
                )}{' '}
                or click a folder below to get started.
              </p>
            )}
          </div>
          {collections.length === 0 ? (
            <GetStarted />
          ) : (
            <>
              <FoldersNavMobile
                defaultFolderName={defaultFolderName}
                changeDefaultFolderName={setDefaultFolderName}
                selectedFolder={selectedFolder}
                onFolderChange={onFolderChange}
                createFolderModalVisible={createFolderModalVisible}
                setCreateFolderModalVisible={setCreateFolderModalVisible}
                selectedManagedCollectionFolder={
                  selectedManagedCollectionFolder
                }
                onManagedCollectionFolderChange={
                  onManagedCollectionFolderChange
                }
                managerRoles={managerRoles}
                managedCollectionsFoldersGrouped={
                  managedCollectionsFoldersGrouped
                }
                onFolderCreated={setNewFolder}
                showCollectionsListModal={showCollectionsListModal}
              />
              <Withdraw className="pa4 mb3" />
              {collectionsListModalVisible && (
                <CollectionsListModal
                  onDismiss={hideCollectionsListModal}
                  folderCollections={folderCollections}
                  checkedCollectionIds={checkedCollectionIds}
                  setCheckedCollectionIds={setCheckedCollectionIds}
                  moveOptions={moveOptions}
                  sortOptions={sortOptions}
                  sortOption={sortOption}
                  setCreateFolderModalVisible={setCreateFolderModalVisible}
                  selectedManagedCollectionFolder={
                    selectedManagedCollectionFolder
                  }
                  accountToCreateCollections={accountToCreateCollections}
                  selectedFolder={selectedFolder}
                  handleToggleCloseCollectionModal={
                    handleToggleCloseCollectionModal
                  }
                  handleToggleDeleteCollectionModal={
                    handleToggleDeleteCollectionModal
                  }
                  handleCollectionToggle={handleCollectionToggle}
                  defaultFolderName={defaultFolderName}
                />
              )}
            </>
          )}
        </CollectionsMobileLayout>
      )}
      <style jsx>{`
        .collections-body {
          padding: 1.5rem 2rem;
        }
        .no-collections {
          font-size: 18px;
          line-height: 30px;
        }
        .right-side {
          width: 20rem;
          margin-left: 1.5rem;
        }
        .help-dropdown-body li {
          margin: 1.25rem;
        }
        .fixed-full-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: white;
        }
      `}</style>
    </>
  );
};

const EnhancedCollectionsPage = React.memo(CollectionsPage);

export default EnhancedCollectionsPage;
