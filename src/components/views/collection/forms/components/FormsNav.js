import {useSelector} from 'react-redux';
import cx from 'classnames';
import React from 'react';

import {ReactComponent as AddWaiverTealSmall} from 'theme/images/AddWaiverTealSmall.svg';
import {ReactComponent as FormPlusIcon} from 'theme/images/form-plus-icon.svg';
import {
  SecondarySidebarNavItem,
  SecondarySidebarNavItemSubnav,
} from 'layout/components';
import {collectionsPathHelper} from 'helpers';
import config from 'config';

const FormsNav = ({className, collection}) => {
  const sellers = useSelector(state => state.sellersForms.sellers);

  const showSellersSubnav = sellers.length !== 0;
  const sellersSubnavItems = React.useMemo(
    () =>
      sellers.map(seller => ({
        children: seller.name,
        to: collectionsPathHelper(collection, `forms/seller/${seller.id}`),
      })),
    [collection, sellers]
  );

  return (
    <nav className={cx('flex flex-column', className)}>
      <SecondarySidebarNavItem
        label="Add Form"
        darkGreyText
        to={collectionsPathHelper(collection, 'forms/add-form')}
        icon={<FormPlusIcon fill={config.colors.tint} />}
      />
      {config.siteName !== 'PIXIE_LANE' && (
        <SecondarySidebarNavItem
          disabled={!config.enabledFeatures.waivers}
          label="Add Waiver"
          darkGreyText
          to={collectionsPathHelper(collection, 'forms/add-waiver')}
          icon={<AddWaiverTealSmall fill={config.colors.tint} />}
        />
      )}
      {showSellersSubnav && (
        <SecondarySidebarNavItemSubnav
          heading={config.strings.formTemplatesHeading}
          items={sellersSubnavItems}
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

const EnhancedFormsNav = React.memo(FormsNav);

export default EnhancedFormsNav;
