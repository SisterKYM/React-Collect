import React, {useCallback, useState} from 'react';
import {MdKeyboardArrowRight} from 'react-icons/md';
import cx from 'classnames';

import ManagerModal from './ManagerModal';

const ManagedFolders = ({
  selectedManagedCollectionFolder,
  onManagedCollectionFolderChange,
  managerRoles,
  managedCollectionsFoldersGrouped,
  showCollectionsListModal,
}) => {
  const handleManagedCollectionFolderChange = useCallback(
    (e) => {
      const folderId = e.currentTarget.getAttribute('data-id');
      const managerRoleId = e.currentTarget.getAttribute('data-role');
      const folder = managedCollectionsFoldersGrouped[
        Number(managerRoleId)
      ].find((f) => f.id.toString() === folderId);
      onManagedCollectionFolderChange(folder);
      showCollectionsListModal();
    },
    [
      managedCollectionsFoldersGrouped,
      onManagedCollectionFolderChange,
      showCollectionsListModal,
    ]
  );

  const [managerModalManager, setManagerModalManager] = useState(null);
  const showManagerModal = useCallback(
    (e) => {
      const managerId = e.currentTarget.getAttribute('data-manager');
      const manager = managerRoles.find((m) => m.id.toString() === managerId);
      setManagerModalManager(manager);
    },
    [managerRoles]
  );

  const hideManagerModal = useCallback(() => {
    setManagerModalManager(null);
  }, []);

  return (
    <>
      {managerRoles.map((managerRole) => (
        <div key={managerRole.id} className="managed-folder pv3 ph4">
          <>
            <div className="folders-header">
              <div className="avenir-roman gray-600 text-14 uppercase">
                {managerRole.name}
              </div>
              <span
                className="pointer tint text-12 uppercase"
                data-manager={managerRole.id}
                onClick={showManagerModal}
              >
                manager
              </span>
            </div>
            {Array.isArray(managedCollectionsFoldersGrouped[managerRole.id]) &&
              managedCollectionsFoldersGrouped[managerRole.id].map((folder) => (
                <div
                  data-id={folder.id}
                  data-role={managerRole.id}
                  key={folder.name + folder.user_id}
                  className={cx(
                    'gray-600 text-14 avenir-roman managed-collection pointer flex justify-between',
                    selectedManagedCollectionFolder === folder && 'active'
                  )}
                  onClick={handleManagedCollectionFolderChange}
                >
                  <div
                    className={cx(
                      folder.id !== 0 ? 'ml3' : '',
                      selectedManagedCollectionFolder === folder
                        ? 'avenir-heavy'
                        : 'avenir-roman'
                    )}
                  >
                    {folder.name}
                  </div>
                  <MdKeyboardArrowRight
                    size={20}
                    className="flex pointer gray-400"
                  />
                </div>
              ))}
          </>
        </div>
      ))}
      {managerModalManager && (
        <ManagerModal
          manager={managerModalManager}
          onDismiss={hideManagerModal}
        />
      )}
      <style jsx>{`
        .folders-header {
          padding: 0.625rem 0.125rem;
        }
        .uppercase {
          text-transform: uppercase;
        }
        .managed-collection {
          width: 100%;
          padding: 0.625rem 0.875rem;
        }
        .managed-collection.active,
        .managed-collection:hover {
          background-color: #e7f6f8;
          border-radius: 0.25rem;
        }
        .managed-folder:not(:first-child) {
          border-top: 1px solid #dedede;
        }
      `}</style>
    </>
  );
};

export default React.memo(ManagedFolders);
