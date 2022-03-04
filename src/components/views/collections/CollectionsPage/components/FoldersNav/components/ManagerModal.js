import React, {useCallback} from 'react';

import {Modal, ModalCloseButton} from 'elements';

const ManagerModal = ({manager, onDismiss}) => {
  const handleDismiss = useCallback(() => {
    onDismiss();
  }, [onDismiss]);

  return (
    <Modal
      className="pa4 dark-grey avenir-roman"
      flexibleHeight
      onDismiss={handleDismiss}
      size="SMALL"
    >
      <ModalCloseButton size={24} onClick={handleDismiss} />
      <div className="text-16">You are a manager on this account.</div>
      <div className="text-14 avenir-light">
        <a
          href="https://support.cheddarup.com/hc/en-us/articles/360035226692-How-to-accept-a-manager-invite"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more about managing an account.
        </a>
      </div>
      <div className="text-14 pt3-5">
        <div>
          Account: <span className="avenir-light">{manager.name}</span>
        </div>
        <div>
          Contact:{' '}
          <span className="avenir-light">
            {manager.full_name},{' '}
            <a href={`mailto:${manager.email}`}>{manager.email}</a>
          </span>
        </div>
      </div>
      <div className="text-14 pt3-5">
        <div>Your permissions:</div>
        <ul className="avenir-light">
          {manager.permissions?.create && <li>• Create collections</li>}
          {manager.permissions?.type === 'all' && (
            <li>• View, edit and manage all collections</li>
          )}
          {manager.permissions?.type === 'specific' && (
            <li>• View, edit and manage selected collections</li>
          )}
          {manager.permissions?.type === 'own' && (
            <li>• View, edit and manage collections that you create</li>
          )}
        </ul>
      </div>
    </Modal>
  );
};

const EnhancedManagerModal = React.memo(ManagerModal);

export default EnhancedManagerModal;
