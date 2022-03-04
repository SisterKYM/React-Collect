import React, {useCallback, useState} from 'react';
import {MdClose} from 'react-icons/md';
import {useFetcher} from 'rest-hooks';

import {CommonButton, Modal, TextInput} from 'elements';
import FolderResource from 'resources/FolderResource';

const textInputStyle = {
  width: '100%',
  marginBottom: '2rem',
  fontSize: '1rem',
};
const buttonStyle = {
  marginRight: '1.5rem',
};

const CreateFolderModal = ({onDismiss, onFolderCreated}) => {
  const create = useFetcher(FolderResource.createShape());
  const [folderName, setFolderName] = useState('');
  const [loading, setLoading] = useState(false);
  const closeModal = useCallback(
    (reFetch) => {
      setFolderName('');
      onDismiss(reFetch);
    },
    [onDismiss]
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
      create({}, body)
        .then((newFolder) => {
          setLoading(false);
          closeModal(true);
          onFolderCreated(newFolder);
        })
        .catch(() => {
          // show error
        });
    },
    [create, closeModal, onFolderCreated]
  );

  return (
    <Modal
      size="SMALL"
      flexibleHeight
      onDismiss={onDismiss}
      className="dark-grey h-auto"
    >
      <div className="modal-header">
        <MdClose
          className="fr pointer flex"
          size={20.58}
          style={{marginRight: '-4.29px', marginTop: '-4.29px'}}
          onClick={() => closeModal()}
        />
        <h1 className="avenir-roman">Create a new folder</h1>
        <h2 className="avenir-light">
          Once created, add collections to a folder by selecting or drag and
          drop.
        </h2>
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
            <CommonButton
              className="pt-14 bg-gray-250"
              type="button"
              onClick={cancel}
            >
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
        h2 {
          font-size: 16px;
          line-height: 24px;
          margin-bottom: 1.5rem;
        }
      `}</style>
    </Modal>
  );
};

export default React.memo(CreateFolderModal);
