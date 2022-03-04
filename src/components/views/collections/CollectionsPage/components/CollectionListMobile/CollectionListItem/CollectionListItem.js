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
    <div className="collection mb3">
      <div
        className="horizontal-flex items-center pointer justify-between"
        onClick={handleCheckboxChange}
      >
        <div className="absolute">
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
        />
        <CollectionActionsDropdown
          collection={collection}
          toggleCloseModal={toggleCloseModal}
          toggleDeleteModal={toggleDeleteModal}
          accountToCreateCollections={accountToCreateCollections}
        />
      </div>
      <div>
        <div className="flex-fill horizontal-flex content-between items-center">
          <div className="w-100">
            <div className="collection-info__name avenir-roman mt2 mb2">
              <Link to={manageLink}>{collection.name}</Link>
            </div>
            <div className="horizontal-flex justify-between ">
              <div className="collection-info__updated dark-grey text-14">
                Updated {moment(collection.updated_at).format('MM/DD/YYYY')}
              </div>
              <div className="collection-info__status dark-grey text-14 mr3">
                <CollectionListItemStatus collection={collection} />
              </div>
            </div>
          </div>
        </div>
        <div className="collection-amount-action horizontal-flex items-center mt2">
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
    </div>
  );
};

export default React.memo(CollectionListItem);
