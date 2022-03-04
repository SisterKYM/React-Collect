import React, {useCallback} from 'react';
import moment from 'moment';
import cx from 'classnames';
import {Link} from 'react-router-dom';

import {
  Checkbox,
  CollectionListItemImage,
  CollectionListItemStatus,
} from 'elements';
import {currency} from 'helpers/numbers';
import {collectionsPathHelper} from 'helpers';

import CollectionActionsDropdown from './CollectionActionsDropdown';

const stopPropagation = (event) => {
  event.stopPropagation();
};

const CollectionListItem = ({
  collection,
  toggleCloseModal,
  toggleDeleteModal,
  handleCollectionToggle,
  checked,
  accountToCreateCollections,
}) => {
  const handleCheckboxChange = useCallback(() => {
    handleCollectionToggle(collection);
  }, [collection, handleCollectionToggle]);

  const manageLink = collectionsPathHelper(collection, 'manage');

  return (
    <div className="collection horizontal-flex items-center pointer">
      <div>
        <Checkbox
          checked={checked}
          className={cx('collection-checkbox', checked ? 'checked' : '')}
          labelClassName="b--thick-gray"
          onChange={handleCheckboxChange}
          onClick={stopPropagation}
        />
      </div>
      <CollectionListItemImage
        className="collection-image"
        image={collection.theme && collection.theme.image}
        onClick={handleCheckboxChange}
      />
      <Link
        className="collection-info flex-fill horizontal-flex justify-between items-center"
        to={manageLink}
      >
        <div>
          <div className="collection-info__name avenir-roman">
            {collection.name}
          </div>
          <div className="flex dark-grey text-12 mb2">
            <div className="collection-info__updated ">
              Updated: {moment(collection.updated_at).format('MM/DD/YYYY')}
            </div>
            <div className="mh1">|</div>
            <div className="collection-info__status">
              <CollectionListItemStatus collection={collection} />
            </div>
          </div>
          <div className="collection-amount-action horizontal-flex items-center">
            <div
              className={cx(
                'collection-amount text-14 avenir-roman',
                collection.payments_total ? 'dark-grey' : 'medium-grey'
              )}
            >
              Collected: {currency(collection.payments_total)}
            </div>
          </div>
        </div>
      </Link>
      <CollectionActionsDropdown
        collection={collection}
        className="collection-action"
        toggleCloseModal={toggleCloseModal}
        toggleDeleteModal={toggleDeleteModal}
        accountToCreateCollections={accountToCreateCollections}
      />
    </div>
  );
};

export default React.memo(CollectionListItem);
