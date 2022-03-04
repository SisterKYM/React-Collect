import React from 'react';
import {generatePath} from 'react-router-dom';
import {IoMdClose} from 'react-icons/io';

import {Modal} from 'elements';

import {ItemsAdjustPricingContainer} from './containers';

const ItemsAdjustPricingPage = ({match, history}) => {
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
    <Modal size="MEDIUM" onDismiss={handleDismiss}>
      <div className="absolute ic-close medium-grey pointer">
        <IoMdClose size={20} onClick={handleDismiss} />
      </div>
      <div className="flex flex-column h-100">
        <header className="adjust-pricing-modal-header">
          <h1 className="f3 avenir-roman gray-600">Adjust Pricing</h1>
        </header>
        <main className="flex-auto">
          <ItemsAdjustPricingContainer
            className="h-100"
            collectionId={collectionId}
            onDidSave={handleDismiss}
          />
        </main>
      </div>
      <style jsx>{`
        :global(.adjust-pricing-modal-header) {
          padding: 2.375rem 2.125rem 1.75rem 2.125rem;
        }
        .ic-close {
          top: 1.5rem;
          right: 1.5rem;
        }
      `}</style>
    </Modal>
  );
};

const EnhancedItemsAdjustPricingPage = React.memo(ItemsAdjustPricingPage);

export default EnhancedItemsAdjustPricingPage;
