import {useSelector} from 'react-redux';
import _ from 'lodash';
import cx from 'classnames';
import React from 'react';

import {ReactComponent as CategoryPlusIcon} from 'theme/images/category-plus-icon-cheddar-up.svg';
import {
  SecondarySidebarNavItem,
  SecondarySidebarNavItemSubnav,
} from 'layout/components';
import {ReactComponent as TagPlusIcon} from 'theme/images/tag-plus-icon.svg';
import {collectionsPathHelper} from 'helpers';
import AddOrangePlusIcon from 'theme/images/AddOrangePlus.svg';
import config from 'config';

const ItemsNav = ({className, collection, itemsEmpty, itemCatalogSellers}) => {
  const uploadEnabled = useSelector(state =>
    _.get(state.session.capabilities, 'can_upload_catalogs')
  );

  const sellersSubnavProps = React.useMemo(
    () => ({
      heading: config.strings.itemCatalogsHeading,
      items: itemCatalogSellers.map(seller => ({
        children: seller.name,
        to: collectionsPathHelper(
          collection,
          `items/seller/${seller.id}/catalogs`
        ),
      })),
    }),
    [collection, itemCatalogSellers]
  );

  const sellersSidebarSubnav =
    itemCatalogSellers.length === 0 ? null : (
      <SecondarySidebarNavItemSubnav {...sellersSubnavProps} />
    );

  return (
    <nav className={cx('flex flex-column', className)}>
      {config.enabledFeatures.addItem && (
        <SecondarySidebarNavItem
          darkGreyText
          label="Add Item"
          to={collectionsPathHelper(collection, 'items/add-item')}
          icon={<TagPlusIcon fill={config.colors.tint} />}
        />
      )}
      <SecondarySidebarNavItem
        label="Create Category"
        darkGreyText
        disabled={itemsEmpty}
        to={collectionsPathHelper(collection, 'items/category')}
        icon={<CategoryPlusIcon fill={config.colors.tint} />}
      />
      <div
        className={cx(
          config.enabledFeatures.sellersSidebarSubnav ? 'bb b--white' : ''
        )}
      >
        {sellersSidebarSubnav}
      </div>
      {uploadEnabled && (
        <SecondarySidebarNavItem
          label="Upload Items"
          to={collectionsPathHelper(collection, 'items/upload-items')}
          img={{src: AddOrangePlusIcon}}
        />
      )}
      <style jsx>{`
        nav {
          width: 14rem;
        }
      `}</style>
    </nav>
  );
};

const EnhancedItemsNav = React.memo(ItemsNav);

export default EnhancedItemsNav;
