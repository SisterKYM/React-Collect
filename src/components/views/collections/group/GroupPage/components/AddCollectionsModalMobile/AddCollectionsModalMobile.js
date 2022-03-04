import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {useFetcher, useResource} from 'rest-hooks';
import {capitalize} from 'lodash';
import moment from 'moment';

import config from 'config';
import {
  Checkbox,
  CommonButton,
  Modal,
  ModalCloseButton,
  SwitchBox,
  CommonDropdownSelect,
} from 'elements';
import useToggle from 'hooks/useToggle';
import FolderResource from 'resources/FolderResource';
import CollectionResource from 'resources/CollectionResource';
import GroupPageResource from 'resources/GroupPageResource';
import GroupPageCollectionsResource from 'resources/GroupPageCollectionsResource';

import {CollectionListItemMobile} from './components';

const selectAllCheckBoxLabelStyle = {
  fontSize: '14px',
};

const checkIfCollectionIsActive = (collection, chargesEnabled) => {
  if (collection.closed_at) {
    return false;
  }
  if (!chargesEnabled) {
    return false;
  }
  if (!collection.is_pro && collection.requires_pro) {
    return false;
  }
  if (collection.timing?.opens && collection.timing?.closes) {
    const current = moment();
    const closes = moment(collection.timing.closes);

    if (closes <= current) {
      return false;
    }
  }
  return true;
};

const AddCollectionsModalMobile = ({
  onClose,
  onCollectionsAdded,
  sharedCollections,
  onlyActiveCollectionsVisible,
  updateOnlyActiveCollectionsVisible,
}) => {
  const handleCloseModal = useCallback(() => {
    onClose();
  }, [onClose]);

  const session = useSelector((state) => state.session);

  const showOnlyActiveCollections = useFetcher(
    GroupPageResource.showOnlyActiveCollectionsShape()
  );

  const toggleOnlyActiveCollectionsVisible = useCallback(
    async (onlyActiveCollectionsVisible) => {
      const {
        user: {
          profile: {
            uiClientFlags: {
              groupPage: {showInactive},
            },
          },
        },
      } = await showOnlyActiveCollections(null, {
        onlyActiveCollectionsVisible,
      });

      updateOnlyActiveCollectionsVisible(!showInactive);
    },
    [updateOnlyActiveCollectionsVisible, showOnlyActiveCollections]
  );

  const collections = useResource(CollectionResource.listShape(), {});

  const [ownedCollections, setOwnedCollections] = useState([]);
  useEffect(() => {
    setOwnedCollections(
      collections.filter(({access}) => access && access.owner)
    );
  }, [collections]);

  const chargesEnabled = useSelector((state) =>
    state.session ? state.session.chargesEnabled : false
  );

  const sharedCollectionIds = useMemo(
    () => sharedCollections.map((collection) => collection.id),
    [sharedCollections]
  );

  const defaultFolderName =
    session?.user?.profile?.uiClientFlags?.customDefaultFolderName ||
    `${capitalize(config.strings.collection)}s`;

  const folders = useResource(FolderResource.listShape(), {});
  const foldersWithCollections = useMemo(
    () =>
      folders.filter((folder) =>
        ownedCollections.some(
          (collection) => collection.folder?.id === folder.id
        )
      ),
    [ownedCollections, folders]
  );
  const [activeFolderIdx, setActiveFolderIdx] = useState(null);
  const setActiveFolder = useCallback(
    (folder) => {
      const idx = foldersWithCollections.indexOf(folder);
      if (idx === -1) {
        setActiveFolderIdx(null);
      } else {
        setActiveFolderIdx(Number(idx));
      }
    },
    [foldersWithCollections]
  );

  const [folderCollections, setFolderCollections] = useState([]);

  useEffect(() => {
    if (activeFolderIdx === null) {
      setFolderCollections(
        ownedCollections.filter((collection) => !collection.folder)
      );
    } else {
      setFolderCollections(
        ownedCollections.filter(
          (collection) =>
            collection.folder?.id === foldersWithCollections[activeFolderIdx].id
        )
      );
    }
  }, [activeFolderIdx, folders, foldersWithCollections, ownedCollections]);

  const ifFolderHasOnlyClosedCollections = useMemo(
    () =>
      folderCollections.every((collection) => Boolean(collection.closed_at)),
    [folderCollections]
  );

  const visibleFolderCollections = useMemo(
    () =>
      // not shared
      folderCollections.filter(
        (collection) => !sharedCollectionIds.includes(collection.id)
      ),
    [folderCollections, sharedCollectionIds]
  );

  const filteredVisibleCollections = useMemo(
    // only active when toggled
    () =>
      visibleFolderCollections.filter((collection) =>
        onlyActiveCollectionsVisible
          ? checkIfCollectionIsActive(collection, chargesEnabled)
          : true
      ),
    [visibleFolderCollections, onlyActiveCollectionsVisible, chargesEnabled]
  );

  const [selectAllCheckBoxChecked, toggleSelectAllCheckBoxChecked] = useToggle(
    false
  );

  const [checkedCollectionIds, setCheckedCollectionIds] = useState([]);

  const [selectAllCheckBoxClicked, setSelectAllCheckBoxClicked] = useState(
    false
  );
  const onChangeSelectAllCheckBoxChecked = useCallback(() => {
    setSelectAllCheckBoxClicked(true);
  }, []);
  useEffect(() => {
    if (selectAllCheckBoxClicked) {
      if (selectAllCheckBoxChecked) {
        setCheckedCollectionIds([]);
      } else {
        setCheckedCollectionIds(
          folderCollections.map((collection) => collection.id)
        );
      }
      setSelectAllCheckBoxClicked(false);
    }
  }, [selectAllCheckBoxClicked, folderCollections, selectAllCheckBoxChecked]);

  useEffect(() => {
    const allChecked =
      checkedCollectionIds.length > 0 &&
      folderCollections.length === checkedCollectionIds.length &&
      folderCollections.reduce(
        (allCollectionsChecked, folderCollection) =>
          allCollectionsChecked &&
          checkedCollectionIds.includes(folderCollection.id),
        true
      );
    if (allChecked) {
      toggleSelectAllCheckBoxChecked.on();
    } else {
      toggleSelectAllCheckBoxChecked.off();
    }
  }, [checkedCollectionIds, folderCollections, toggleSelectAllCheckBoxChecked]);

  const [toggledCollection, setToggledCollection] = useState(null);
  const toggleCollection = useCallback((collection) => {
    setToggledCollection(collection);
  }, []);
  useEffect(() => {
    if (toggledCollection) {
      const idx = checkedCollectionIds.findIndex(
        (id) => id === toggledCollection.id
      );
      if (idx === -1) {
        checkedCollectionIds.push(toggledCollection.id);
      } else {
        checkedCollectionIds.splice(idx, 1);
      }
      setCheckedCollectionIds(checkedCollectionIds.slice());

      setToggledCollection(null);
    }
  }, [toggledCollection, checkedCollectionIds]);

  const shareCollections = useFetcher(
    GroupPageCollectionsResource.shareShape()
  );
  const [status, setStatus] = useState('');
  const addCollections = useCallback(async () => {
    setStatus('pending');
    await shareCollections(
      {
        collectionIds: checkedCollectionIds,
      },
      {}
    );
    setStatus('');
    onCollectionsAdded();
    handleCloseModal();
  }, [
    checkedCollectionIds,
    handleCloseModal,
    onCollectionsAdded,
    shareCollections,
  ]);

  const dropdownTitle = useMemo(() => {
    if (activeFolderIdx === null) {
      return defaultFolderName;
    }
    return foldersWithCollections[activeFolderIdx].name;
  }, [activeFolderIdx, foldersWithCollections, defaultFolderName]);

  const dropdownOptions = useMemo(
    () =>
      [
        {
          title: defaultFolderName,
          value: null,
          onClick: () => {
            setActiveFolder(null);
          },
        },
      ].concat(
        foldersWithCollections.map((f) => ({
          title: f.name,
          value: f.id,
          onClick: () => {
            setActiveFolder(f);
          },
        }))
      ),
    [defaultFolderName, foldersWithCollections, setActiveFolder]
  );

  return (
    <Modal onDismiss={handleCloseModal} className="vertical-flex">
      <header className="bb b-standard pa3-5">
        <div className="text-capitalize avenir-roman text-24 dark-grey">
          add {config.strings.collection}s
        </div>
        <p className="mv3 dark-grey">
          Select a folder and choose the collection you would like to add to
          your group page
        </p>
        <div className="w-100 mb3 dark-grey">
          <CommonDropdownSelect
            title={dropdownTitle}
            borderColor="#DEDEDE"
            options={dropdownOptions}
          />
        </div>
        <SwitchBox
          small
          label="Show only active"
          labelClassName="avenir-light"
          checked={onlyActiveCollectionsVisible}
          onChange={toggleOnlyActiveCollectionsVisible}
        />
        <ModalCloseButton className="ma4" onClick={handleCloseModal} />
      </header>
      <div className="flex-fill dark-grey">
        <div className="relative h-100">
          <div className="absolute absolute--fill vertical-flex">
            <div className="collections-nav flex-fill overflow-y--auto">
              {filteredVisibleCollections.length > 0 ? (
                <>
                  <div className="ph3-5 mb3">
                    <Checkbox
                      checked={selectAllCheckBoxChecked}
                      onChange={onChangeSelectAllCheckBoxChecked}
                      label="Select all"
                      labelStyle={selectAllCheckBoxLabelStyle}
                    />
                  </div>
                  <hr />
                  <div className="ph3-5">
                    {filteredVisibleCollections.map(
                      (filteredVisibleCollection) => (
                        <CollectionListItemMobile
                          key={filteredVisibleCollection.id}
                          collection={filteredVisibleCollection}
                          checked={checkedCollectionIds.includes(
                            filteredVisibleCollection.id
                          )}
                          toggleCollection={toggleCollection}
                        />
                      )
                    )}
                  </div>
                </>
              ) : (
                <div className="no-collections avenir-light ph3-5">
                  {onlyActiveCollectionsVisible &&
                    ifFolderHasOnlyClosedCollections &&
                    'You have no active collections within this folder.'}
                  {onlyActiveCollectionsVisible &&
                    !ifFolderHasOnlyClosedCollections &&
                    'You have added all active collections in this folder.'}
                  {!onlyActiveCollectionsVisible &&
                    'You have added all collections within this folder.'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <footer className="bt b-standard pa3-5">
        <CommonButton
          className="avenir-light bg-brand ml-auto pt-18 white"
          onClick={addCollections}
          disabled={status === 'pending'}
        >
          Add{' '}
          {checkedCollectionIds.length > 0
            ? `${checkedCollectionIds.length} `
            : ''}
          Collections
        </CommonButton>
      </footer>
      <style jsx>{`
        .folders-nav {
          width: 25%;
        }
        .folder {
          padding: 1.25rem 2.25rem;
        }
        .collections-nav {
          padding: 1rem 0;
        }
        .no-collections {
          font-size: 18px;
        }
      `}</style>
    </Modal>
  );
};

const EnhancedAddCollectionsModalMobile = React.memo(AddCollectionsModalMobile);

export default EnhancedAddCollectionsModalMobile;
