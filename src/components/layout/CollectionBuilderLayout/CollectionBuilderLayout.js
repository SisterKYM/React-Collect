import React from 'react';

import CollectionLayout from 'layout/CollectionLayout';
import DetailsIcon from 'theme/images/DetailsIcon.svg';
import FormsIcon from 'theme/images/FormsIcon.svg';
import ItemsIcon from 'theme/images/ItemsIcon.svg';
import SettingsIcon from 'theme/images/SettingsIcon.svg';

const navItems = [
  {
    label: 'Details',
    slug: 'details',
    icon: DetailsIcon,
  },
  {
    label: 'Items',
    slug: 'items',
    icon: ItemsIcon,
  },
  {
    label: 'Forms',
    slug: 'forms',
    icon: FormsIcon,
  },
  {
    label: 'Settings',
    slug: 'settings',
    icon: SettingsIcon,
  },
];

const CollectionBuilderLayout = ({collection, footer, children}) => (
  <CollectionLayout
    collection={collection}
    navItems={navItems}
    footer={<>{footer}</>}
  >
    {children}
  </CollectionLayout>
);

const EnhancedCollectionBuilderLayout = React.memo(CollectionBuilderLayout);

export default EnhancedCollectionBuilderLayout;
