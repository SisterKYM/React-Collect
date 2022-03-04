import React, {useCallback, useState} from 'react';
import {MdClose} from 'react-icons/md';
import {useFetcher} from 'rest-hooks';

import {CommonButton, Modal, TextInput} from 'elements';
import FolderResource from 'resources/FolderResource';
import apiClient from 'helpers/apiClient';

const textInputStyle = {
  width: '430px',
  marginBottom: '2rem',
};
const buttonStyle = {
  marginRight: '1.5rem',
};

const RenameFolderModal = ({defaultFolderName, folder, onDismiss}) => {
  const update = useFetcher(FolderResource.updateShape());
  const [folderName, setFolderName] = useState(
    folder?.name || defaultFolderName
  );
  const [loading, setLoading] = useState(false);
  const closeModal = useCallback(
    (reFetch, newDefaultFolderName) => {
      setFolderName(folder?.name || defaultFolderName);
      onDismiss(reFetch, newDefaultFolderName);
    },
    [onDismiss, folder, defaultFolderName]
  );

  const cancel = useCallback(() => {
    setFolderName('');
    onDismiss(false);
  }, [onDismiss]);

  const onInputChange = useCallback((e) => {
    setFolderName(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const body = {};
      for (const pair of new FormData(e.target).entries()) {
        body[pair[0]] = pair[1];
      }
      setLoading(true);
      if (folder && folder.id) {
        update(
          {
            id: folder.id,
          },
          body
        )
          .then(() => {
            setLoading(false);
            closeModal(true);
          })
          .catch(() => {
            // show error
          });
      } else {
        apiClient
          .patch('user', {
            profile: {
              uiClientFlags: {
                customDefaultFolderName: folderName,
              },
            },
          })
          .then(({data}) => {
            setLoading(false);
            closeModal(
              true,
              data?.user?.profile?.uiClientFlags?.customDefaultFolderName
            );
          })
          .catch(() => {
            // show error
          });
      }
    },
    [update, closeModal, folder, folderName]
  );

  return (
    <Modal
      size="SMALL"
      flexibleHeight
      onDismiss={() => {}}
      className="dark-grey"
    >
      <div className="modal-header">
        <MdClose
          className="fr pointer flex"
          size={20.58}
          style={{marginRight: '-4.29px', marginTop: '-4.29px'}}
          onClick={() => closeModal()}
        />
        <h1 className="avenir-roman">Rename folder</h1>
        <form onSubmit={handleSubmit}>
          <TextInput
            name="name"
            className="folder-name"
            maxLength={63}
            style={textInputStyle}
            value={folderName}
            onChange={onInputChange}
          />
          <div className="flex">
            <CommonButton
              type="submit"
              className="pt-14 bg-tint white"
              style={buttonStyle}
              status={loading && 'pending'}
            >
              Save
            </CommonButton>
            <CommonButton className="pt-14 bg-gray-250" onClick={cancel}>
              Cancel
            </CommonButton>
          </div>
        </form>
      </div>
      <style jsx>{`
        .modal-header {
          position: relative;
          padding: 32px;
          border-bottom: 1px solid #e2e3e4;
        }
        h1 {
          font-size: 24px;
          line-height: 44px;
        }
      `}</style>
    </Modal>
  );
};

export default React.memo(RenameFolderModal);
