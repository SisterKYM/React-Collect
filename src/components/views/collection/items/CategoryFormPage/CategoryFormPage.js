import {generatePath} from 'react-router-dom';
import React from 'react';

import {BottomBarWithButton, Modal, ModalCloseButton} from 'elements';

import {CategoryFormContainer} from './containers';

const CategoryFormPage = ({history, match}) => {
  const ownerId = Number(match.params.owner);
  const collectionId = Number(match.params.collection);
  const categoryId = match.params.category
    ? Number(match.params.category)
    : null;

  const formRef = React.useRef(null);

  const [loading, setLoading] = React.useState(false);

  const handleDismiss = () => {
    const path = generatePath('/collection/:owner/:collection/items', {
      owner: ownerId,
      collection: collectionId,
    });

    history.push(path);
  };

  return (
    <Modal
      footer={
        <BottomBarWithButton
          className="bt b--gray-300"
          disabled={loading}
          loading={loading}
          buttonTitle="Save"
          onButtonClick={() => {
            setLoading(true);
            formRef.current.submit();
          }}
        />
      }
      onDismiss={handleDismiss}
    >
      <ModalCloseButton onClick={handleDismiss} />
      <div className="pa4">
        <header className="bb b--gray-300">
          <h1 className="mb3 f3 avenir-roman gray-600">
            {categoryId ? 'Edit' : 'Create a'} Category
          </h1>
          <p className="mb3 f6 avenir-light gray-600">
            Add a category header and drag it into place on your item list.
          </p>
        </header>
        <main>
          <CategoryFormContainer
            ref={formRef}
            className="mw6 mt4"
            collectionId={collectionId}
            categoryId={categoryId}
            onDidSave={handleDismiss}
          />
        </main>
      </div>
    </Modal>
  );
};

const EnhancedCategoryFormPage = React.memo(CategoryFormPage);

export default EnhancedCategoryFormPage;
