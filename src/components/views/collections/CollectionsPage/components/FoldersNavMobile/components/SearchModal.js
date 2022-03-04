import React, {useCallback, useEffect, useState} from 'react';
import {MdClose} from 'react-icons/md';
import {capitalize} from 'lodash';

import config from 'config';
import {Modal, Input} from 'elements';
import {ReactComponent as Search} from 'theme/images/Search.svg';

import apiClient from 'helpers/apiClient';

const SearchModal = ({onDismiss, onFolderChange}) => {
  const closeModal = useCallback(() => {
    onDismiss();
  }, [onDismiss]);
  const [input, setInput] = useState('');
  const onInputChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const [collections, setCollections] = useState([]);
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectFolder = useCallback(
    (folder) => {
      onFolderChange(folder);
      closeModal();
    },
    [onFolderChange, closeModal]
  );
  const clearInput = useCallback(() => {
    setInput('');
  }, []);

  useEffect(() => {
    if (input) {
      setLoading(true);
      apiClient
        .get(`users/search/collections_and_folders?query=${input}`)
        .then(({data}) => {
          if (data.collections) {
            setCollections(data.collections);
          }
          if (data.folders) {
            setFolders(data.folders);
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          // show error
        });
    }
  }, [input]);

  const handleCloseModal = useCallback(() => {
    closeModal();
    clearInput();
  }, [clearInput, closeModal]);

  return (
    <Modal
      size="SMALL"
      flexibleHeight
      onDismiss={closeModal}
      className="dark-grey"
    >
      <div
        style={{
          padding: '1.5rem',
        }}
      >
        <div className="flex justify-end mb5">
          <MdClose
            className="pointer fr"
            size={24}
            onClick={handleCloseModal}
          />
        </div>
        <div className="relative ma2">
          <Input
            name="input"
            className="input"
            value={input}
            onChange={(e) => onInputChange(e)}
            placeholder="Find a collection or folder"
            style={{
              // background: #FFFFFF 0% 0% no-repeat padding-box;
              border: '1px solid #DEDEDE',
              borderRadius: '4px',
              opacity: 1,
              padding: '0.5rem 2.5rem 0.5rem 1rem',
              lineHeight: '40px',
            }}
          />
          <div className="magnifier medium-grey">
            {input ? (
              <MdClose className="pointer" size={24} onClick={clearInput} />
            ) : (
              <Search />
            )}
          </div>
        </div>
      </div>
      {input &&
      input.length > 1 &&
      (folders.length > 0 || collections.length > 0) ? (
        <div className="collections-folders">
          {collections.length > 0 ? (
            <div className="collections avenir-roman">
              <div className="collections-caption text-12 medium-grey">
                {capitalize(config.strings.collection)}s
              </div>
              {collections
                .sort((a, b) =>
                  a.name > b.name ? 1 : a.name < b.name ? -1 : 0
                )
                .map((collection) => (
                  <a
                    key={collection.id}
                    href={`/collection/${collection.organizer.id}/${collection.id}/manage`}
                    className="collection-item text-14 dark-grey pointer"
                  >
                    {collection.name}
                  </a>
                ))}
            </div>
          ) : null}
          {folders.length > 0 ? (
            <div className="folders avenir-roman">
              <div className="folders-caption text-12 medium-grey">Folders</div>
              {folders
                .sort((a, b) =>
                  a.name > b.name ? 1 : a.name < b.name ? -1 : 0
                )
                .map((folder) => (
                  <div
                    key={folder.id}
                    className="folder text-14 dark-grey pointer"
                    onClick={() => selectFolder(folder)}
                  >
                    {folder.name}
                  </div>
                ))}
            </div>
          ) : null}
        </div>
      ) : null}
      {input && !loading && folders.length === 0 && collections.length === 0 ? (
        <div className="collections-folders no-results avenir-roman text-14 dark-grey">
          No results found
        </div>
      ) : null}
      <style jsx>{`
        .magnifier {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          top: 0;
          right: 0;
        }
        .collections-folders {
          border-top: 1px solid #eeeeee;
          padding: 0.75rem 0;
        }
        .collections-caption,
        .folders-caption {
          padding: 0.5rem 2.25rem;
          text-transform: uppercase;
        }
        .folders:not(:first-child) {
          margin-top: 1rem;
        }
        .collection-item:hover,
        .folder:hover {
          background-color: #d7eef1;
        }
        .collection-item,
        .folder {
          display: block;
          padding: 10px 2.25rem;
          margin-bottom: 0.375rem;
        }
        .no-results {
          padding: 0.5rem 2.25rem;
        }
      `}</style>
    </Modal>
  );
};

export default React.memo(SearchModal);
