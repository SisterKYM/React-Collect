import React from 'react';
import {useFetcher} from 'rest-hooks';
import {IoMdClose} from 'react-icons/io';

import {Button, Modal, Status} from 'elements';
import {collectionsRouterPathHelper} from 'helpers';
import CategoryResource from 'resources/CategoryResource';

const CategoryDeletePage = ({match, history}) => {
  const deleteCategory = useFetcher(CategoryResource.deleteShape());

  const [loading, setLoading] = React.useState(false);

  const handleConfirm = React.useCallback(async () => {
    try {
      setLoading(true);

      await deleteCategory({
        id: Number(match.params.category),
        collectionId: Number(match.params.collection),
      });

      history.push(collectionsRouterPathHelper(match.params, 'items'));
    } finally {
      setLoading(false);
    }
  }, [deleteCategory, history, match.params]);

  const handleDismiss = React.useCallback(() => {
    history.push(collectionsRouterPathHelper(match.params, 'items'));
  }, [history, match.params]);

  return (
    <Modal
      flexibleHeight
      size="SMALL"
      onDismiss={handleDismiss}
      className="br2"
    >
      <div className="flex flex-column justify-center">
        <div className="absolute ic-close gray-600">
          <IoMdClose size={20} onClick={handleDismiss} />
        </div>
        <h3 className="header-title pv0 avenir-heavy gray-600">
          Are you sure you want to delete this category?
        </h3>
        <div className="popup-content gray-600">
          <p className="popup-content-description lh-copy">
            Doing so will also delete any items in this category
          </p>
          <Button
            small
            backgroundColorSet
            className="mr3 bg-brand"
            disabled={loading}
            style={{height: '36px', width: '120px'}}
            onClick={handleConfirm}
          >
            Delete
          </Button>
          <Button
            small
            colorSet
            backgroundColorSet
            className="gray-600 bg-gray-200"
            disabled={loading}
            style={{height: '36px', width: '75px'}}
            onClick={handleDismiss}
          >
            Cancel
          </Button>
          {loading && <Status status="pending" />}
        </div>
      </div>
      <style jsx>{`
        .header-title {
          width: 100%;
          border-bottom: 2px solid #eeeeee;
          padding: 1.5rem 1.5rem 1.25rem;
          font-size: 1em;
        }
        .ic-close {
          top: 1.5rem;
          right: 1.5rem;
        }
        .popup-content {
          padding: 1.5rem;
          font-size: 1rem;
        }
        .popup-content-description {
          padding-bottom: 1.5rem;
        }
      `}</style>
    </Modal>
  );
};

const EnhancedCategoryDeletePage = React.memo(CategoryDeletePage);

export default EnhancedCategoryDeletePage;
