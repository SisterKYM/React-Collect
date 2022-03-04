import React, {useState, useCallback, useEffect} from 'react';
import {MdKeyboardArrowRight} from 'react-icons/md';

import cx from 'classnames';

const FolderNavItem = ({
  selectFolder,
  active,
  name,
  defaultFolder = false,
  folder,
}) => {
  const [dropDownOpen, setDropdownOpen] = useState(false);
  const closeDropdown = useCallback(() => {
    setDropdownOpen(false);
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
          'folders-folder horizontal-flex pointer',
          active && 'active'
        )}
        onClick={handleClick}
      >
        <div
          className={cx(
            'flex-fill gray-600 text-14',
            defaultFolder ? '' : 'ml3',
            active ? 'avenir-heavy' : 'avenir-roman'
          )}
        >
          {name}
        </div>

        <MdKeyboardArrowRight size={20} className="flex pointer gray-400" />
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
