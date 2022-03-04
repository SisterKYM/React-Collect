import {compose} from 'recompose';
import {get} from 'lodash';
import {withRouter} from 'react-router-dom';
import React from 'react';

import {collectionsRouterPathHelper, withMatch} from 'helpers';

import SecondaryNavbarNavItem from './SecondaryNavbarNavItem';

const SecondaryNavbarNav = ({collection, ...props}) => {
  const matchUrl = get(props, 'match.url', '');
  const shareUrlMatch = matchUrl.includes('/share');
  const manageUrlMatch =
    matchUrl.includes('/manage') || matchUrl.includes('/shipping-tracker');
  const buildUrlMatch = !shareUrlMatch && !manageUrlMatch;
  const disabled = !collection || !collection.id;

  return (
    <nav className="flex items-center">
      <SecondaryNavbarNavItem
        to={collectionsRouterPathHelper(get(props, 'match.params'), 'details')}
        active={buildUrlMatch}
      >
        Build
      </SecondaryNavbarNavItem>
      <SecondaryNavbarNavItem
        disabled={disabled}
        to={collectionsRouterPathHelper(get(props, 'match.params'), 'share')}
        active={shareUrlMatch}
      >
        Share
      </SecondaryNavbarNavItem>
      <SecondaryNavbarNavItem
        disabled={disabled}
        to={collectionsRouterPathHelper(get(props, 'match.params'), 'manage')}
        active={manageUrlMatch}
      >
        Manage
      </SecondaryNavbarNavItem>
    </nav>
  );
};

const enhance = compose(
  withRouter,
  withMatch,
  React.memo
);

const EnhancedSecondaryNavbarNav = enhance(SecondaryNavbarNav);

export default EnhancedSecondaryNavbarNav;
