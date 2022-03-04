import React, {useCallback, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {useFetcher} from 'rest-hooks';
import {v4 as uuid} from 'uuid';
import {FaCheck} from 'react-icons/fa';
import {get} from 'lodash';

import CollectionResource from 'resources/CollectionResource';
import {RowControls} from 'elements';
import {collectionsPathHelper} from 'helpers';
import {errorAlert, successAlert} from 'redux/modules/growl/actions';

const appendUpdater = (newCollectionId, collectionIds) => [
  ...(collectionIds || []),
  newCollectionId,
];

// Copies a string to the clipboard. Must be called from within an
// event handler such as click. May return false if it failed, but
// this is not always possible. Browser support for Chrome 43+,
// Firefox 42+, Safari 10+, Edge and Internet Explorer 10+.
// Internet Explorer: The clipboard feature may be disabled by
// an administrator. By default a prompt is shown the first
// time the clipboard is used (per session).
const copyToClipboard = (text) => {
  if (window.clipboardData && window.clipboardData.setData) {
    // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
    return window.clipboardData.setData('Text', text);
  }
  if (
    document.queryCommandSupported &&
    document.queryCommandSupported('copy')
  ) {
    const textarea = document.createElement('textarea');
    textarea.textContent = text;
    textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in Microsoft Edge.
    document.body.append(textarea);
    textarea.select();
    try {
      return document.execCommand('copy'); // Security exception may be thrown by some browsers.
    } catch (ex) {
      console.warn('Copy to clipboard failed.', ex);
      return false;
    } finally {
      textarea.remove();
    }
  }

  return false;
};

const controlsClassName = 'text-14 avenir-light dark-grey w-100';

const CollectionActionsDropdown = ({
  collection,
  className,
  toggleCloseModal,
  toggleDeleteModal,
  accountToCreateCollections,
}) => {
  const dispatch = useDispatch();

  const detailsLink = collectionsPathHelper(collection);
  const manageLink = collectionsPathHelper(collection, 'manage');

  const handleCopyUrl = useCallback(() => {
    if (
      copyToClipboard(
        `${window.location.host}/c/${get(collection, 'slug', '')}`
      ) // preview link
    ) {
      dispatch(
        successAlert({
          icon: FaCheck,
          body: 'Link copied',
          title: 'Success',
        })
      );
    }
  }, [collection, dispatch]);

  const replicateCollection = useFetcher(CollectionResource.replicateShape());

  const handleReplicate = useCallback(async () => {
    if (collection.is_pro || !collection.requires_pro) {
      try {
        await replicateCollection(
          {
            id: collection.id,
          },
          {
            ...collection,
            id: uuid(),
            name: `${collection.name} (Copy)`,
            updated_at: new Date().toISOString(),
          },
          [[CollectionResource.listShape(), {}, appendUpdater]]
        );
      } catch (e) {
        //
      }
    } else {
      dispatch(
        errorAlert({
          body:
            'This collection uses PRO features. To replicate it, upgrade to PRO.',
          title: 'You have to be PRO',
        })
      );
    }
  }, [collection, dispatch, replicateCollection]);

  const updateCollection = useFetcher(CollectionResource.partialUpdateShape());

  const handleClose = useCallback(async () => {
    if (collection.closed_at) {
      try {
        await updateCollection({id: collection.id}, {closed_at: null});
      } catch (e) {
        //
      }
    } else {
      toggleCloseModal(collection);
    }
  }, [collection, toggleCloseModal, updateCollection]);

  const handleDelete = useCallback(() => {
    toggleDeleteModal(collection);
  }, [collection, toggleDeleteModal]);

  const controls = useMemo(
    () => [
      {
        tooltip: 'Edit',
        className: controlsClassName,
        to: detailsLink,
      },
      {
        tooltip: 'Manage',
        className: controlsClassName,
        to: manageLink,
      },
      {
        tooltip: 'Copy URL',
        onClick: handleCopyUrl,
        className: controlsClassName,
      },
      {
        tooltip: 'Replicate',
        onClick: handleReplicate,
        className: controlsClassName,
        hidden: !(
          accountToCreateCollections && accountToCreateCollections.canCreate
        ),
      },
      {
        tooltip: collection.closed_at ? 'Reopen' : 'Close',
        onClick: handleClose,
        className: controlsClassName,
      },
      {
        tooltip: 'Delete',
        onClick: handleDelete,
        className: controlsClassName,
        hidden: !(
          accountToCreateCollections &&
          accountToCreateCollections.canCreate &&
          collection.access.canDelete
        ),
      },
    ],
    [
      accountToCreateCollections,
      collection.closed_at,
      detailsLink,
      handleClose,
      handleCopyUrl,
      handleDelete,
      handleReplicate,
      manageLink,
    ]
  );

  return (
    <RowControls
      className={className}
      dropdownWidth={120}
      controls={controls}
    />
  );
};

const EnhancedCollectionActionsDropdown = React.memo(CollectionActionsDropdown);

export default EnhancedCollectionActionsDropdown;
