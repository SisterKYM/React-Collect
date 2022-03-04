import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';
import React from 'react';
import _ from 'lodash';
import cx from 'classnames';

import {collectionsRouterPathHelper} from 'helpers';
import {PrimarySidebarNavItem} from 'layout/components';
import EditViewIcon from 'theme/images/EditView.svg';
import PaymentsViewIcon from 'theme/images/PaymentsView.svg';
import ShippingViewIcon from 'theme/images/ShippingView.svg';

const CollectionManageSidebar = ({
  shippingTrackerHidden,
  column,
  collection,
  match,
}) => {
  const disabled = !collection || !collection.id;

  return (
    <div className={cx('flex w-100 justify-center', column && 'flex-column')}>
      <PrimarySidebarNavItem
        label="Payments"
        to={collectionsRouterPathHelper(_.get(match, 'params'), 'manage')}
        imgSrc={PaymentsViewIcon}
      />
      <PrimarySidebarNavItem
        label="Edit"
        disabled={disabled}
        to={collectionsRouterPathHelper(_.get(match, 'params'), 'details')}
        imgSrc={EditViewIcon}
      />
      {!shippingTrackerHidden && (
        <PrimarySidebarNavItem
          label={
            <>
              Shipping
              <br />
              Tracker
            </>
          }
          disabled={disabled}
          to={collectionsRouterPathHelper(
            _.get(match, 'params'),
            'shipping-tracker'
          )}
          imgSrc={ShippingViewIcon}
        />
      )}
    </div>
  );
};

const enhance = compose(withRouter, React.memo);

const EnhancedCollectionManageSidebar = enhance(CollectionManageSidebar);

export default EnhancedCollectionManageSidebar;
