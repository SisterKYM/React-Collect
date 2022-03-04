import React, {useState, useCallback, useEffect} from 'react';
import {MdMoreHoriz} from 'react-icons/md';

import cx from 'classnames';
import {Dropdown} from 'elements';

const FolderNavItem = ({
  defaultFolder = false,
  selectFolder,
  active,
  name,
  onRenameClick,
  onDeleteClick = () => {},
  folder,
}) => {
  const [dropDownOpen, setDropdownOpen] = useState(false);
  const closeDropdown = useCallback(() => {
    setDropdownOpen(false);
  }, []);
  const openDropdown = useCallback(() => {
    setDropdownOpen(true);
  }, []);

  const handleClick = useCallback(() => {
    selectFolder(folder);
  }, [selectFolder, folder]);

  useEffect(() => {
    if (!active && dropDownOpen) {
      closeDropdown();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, dropDownOpen]);

  return (
    <>
      <div
        className={cx(
          'folders-folder flex flex-row pointer',
          active && 'active'
        )}
        onClick={handleClick}
      >
        <div
          className={cx(
            'flex-auto gray-600 f6',
            defaultFolder ? '' : 'ml3',
            active ? 'avenir-heavy' : 'avenir-roman'
          )}
        >
          {name}
        </div>

        <Dropdown
          border
          borderRadius
          top={30}
          right={-14}
          dropdownWidth="180px"
          className="dark-grey"
          open={active && dropDownOpen}
          onDismiss={closeDropdown}
          body={
            <div className="pa3 avenir-light text-14">
              {defaultFolder ? (
                <div onClick={onRenameClick}>Rename default folder</div>
              ) : (
                <>
                  <div className="mb3" onClick={onRenameClick}>
                    Rename folder
                  </div>
                  <div onClick={onDeleteClick}>Delete folder</div>
                </>
              )}
            </div>
          }
        >
          <div className="tint flex items-center justify-end ellipsis">
            <MdMoreHoriz
              onClick={openDropdown}
              size={25}
              className="flex pointer"
            />
          </div>
        </Dropdown>
      </div>
      <style jsx>{`
        .folders-folder {
          width: 100%;
          padding: 0.625rem 0.875rem;
        }
        .folders-folder .ellipsis {
          visibility: hidden;
          margin-top: -2px;
          margin-bottom: -3px;
        }
        .folders-folder.active,
        .folders-folder:hover {
          background-color: #e7f6f8;
          border-radius: 0.25rem;
        }
        .folders-folder.active .ellipsis,
        .folders-folder:hover .ellipsis {
          visibility: visible;
        }
      `}</style>
    </>
  );
};

export default React.memo(FolderNavItem);
