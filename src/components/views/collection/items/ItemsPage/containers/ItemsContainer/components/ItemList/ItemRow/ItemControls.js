import {compose} from 'recompose';
import {generatePath, withRouter} from 'react-router-dom';
import {useFetcher} from 'rest-hooks';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

import {Button, RowControls, Status} from 'elements';
import ItemResource from 'resources/ItemResource';

const ItemControls = ({
  className,
  history,
  location,
  collection,
  itemCount,
  item,
}) => {
  const updateItem = useFetcher(ItemResource.partialUpdateShape());
  const cloneItem = useFetcher(ItemResource.cloneShape());
  const deleteItem = useFetcher(ItemResource.deleteShape(), true);

  const [deleting, setDeleting] = React.useState(false);

  const handleEdit = React.useCallback(() => {
    if (!deleting) {
      const path = generatePath(
        '/collection/:owner/:collection/items/item/:item/edit',
        {
          owner: collection.user_id,
          collection: collection.id,
          item: item.id,
        }
      );

      history.push(path);
    }
  }, [collection, history, item, deleting]);

  const handleReplicate = React.useCallback(async () => {
    if (deleting) {
      return;
    }

    if (
      !_.get(collection, 'is_pro', false) &&
      itemCount >= _.get(collection, 'itemLimit', 15)
    ) {
      const planUpgradePath = `${location.pathname}/i/plans/upgrade-required`;

      history.push(planUpgradePath);
    } else {
      await cloneItem({collectionId: item.tab_id, id: item.id});
    }
  }, [collection, cloneItem, history, item, itemCount, location, deleting]);

  const handleHideShow = React.useCallback(async () => {
    await updateItem(
      {
        collectionId: item.tab_id,
        id: item.id,
      },
      {hidden: !item.hidden}
    );
  }, [item, updateItem]);

  const handleDelete = React.useCallback(async () => {
    if (deleting) {
      return;
    }

    const itemRecurring = _.get(item, 'options.recurring.enabled', false);

    if ((item.total_buyers || 0) > 0 || itemRecurring) {
      const path = generatePath(
        '/collection/:owner/:collection/items/item/:item/delete',
        {
          owner: collection.user_id,
          collection: collection.id,
          item: item.id,
        }
      );

      history.push(path);
    } else {
      try {
        setDeleting(true);

        await deleteItem({collectionId: item.tab_id, id: item.id});
      } finally {
        setDeleting(false);
      }
    }
  }, [collection, deleteItem, history, item, deleting]);

  const clickItemReport = React.useCallback(() => {
    const path = generatePath(
      '/collection/:owner/:collection/items/item/:item',
      {
        owner: collection.user_id,
        collection: collection.id,
        item: item.id,
      }
    );

    history.push(path);
  }, [collection, history, item]);

  const controls = React.useMemo(
    () => [
      {
        tooltip: 'Edit',
        onClick: handleEdit,
      },
      {
        tooltip: 'Replicate',
        onClick: handleReplicate,
      },
      {
        tooltip: item.hidden ? 'Show' : 'Hide',
        onClick: handleHideShow,
      },
      {
        tooltip: 'Delete',
        onClick: handleDelete,
      },
    ],
    [handleDelete, handleEdit, handleHideShow, handleReplicate, item]
  );

  return (
    <RowControls
      bodyClassName="dark-grey"
      className={className}
      controls={controls}
      controlsFooter={
        <>
          <Button
            small
            colorSet
            backgroundColorSet
            className="ph3 dark-grey bg-gray-250"
            borderRadius
            disabled={deleting}
            onClick={clickItemReport}
          >
            Item Report
          </Button>
          {deleting && (
            <div className="ml2">
              <Status status="pending" />
            </div>
          )}
        </>
      }
    />
  );
};

const enhance = compose(withRouter, React.memo);

const EnhancedItemControls = Object.assign(enhance(ItemControls), {
  propTypes: {
    deletingStatus: PropTypes.string,
    item: PropTypes.object,
  },
});

export default EnhancedItemControls;
