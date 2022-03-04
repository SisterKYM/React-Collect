import {generatePath} from 'react-router-dom';
import React from 'react';

import {Modal, ModalCloseButton} from 'elements';

import {ItemsDisplayOptionsContainer} from './containers';

const ItemsDisplayOptionsPage = ({match, history}) => {
  const ownerId = Number(match.params.owner);
  const collectionId = Number(match.params.collection);

  const handleDismiss = () => {
    const path = generatePath('/collection/:owner/:collection/items', {
      owner: ownerId,
      collection: collectionId,
    });
    history.push(path);
  };

  return (
    <Modal onDismiss={handleDismiss}>
      <ModalCloseButton onClick={handleDismiss} />
      <div className="flex flex-column h-100 pt4">
        <header className="mh4 bb b--gray-300">
          <h1 className="mb3 f3 avenir-roman gray-600">Display Options</h1>
        </header>
        <main className="flex-auto">
          <ItemsDisplayOptionsContainer
            className="h-100"
            collectionId={collectionId}
            onDidSave={handleDismiss}
          />
        </main>
      </div>
    </Modal>
  );
};

const EnhancedItemsDisplayOptionsPage = React.memo(ItemsDisplayOptionsPage);

export default EnhancedItemsDisplayOptionsPage;
