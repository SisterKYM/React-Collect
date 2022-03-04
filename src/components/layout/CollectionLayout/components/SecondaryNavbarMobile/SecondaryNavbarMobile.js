import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';
import React from 'react';
import _ from 'lodash';

import {collectionsRouterPathHelper} from 'helpers';
import {SecondaryNavItemMobile} from './components';

const SecondaryNavbarMobile = ({collection, match, navItems}) => {
  const disabled = !collection || !collection.id;

  return (
    <div className="flex shadow-4 justify-center items-center bg-white overflow-hidden">
      {navItems.map((item) => (
        <SecondaryNavItemMobile
          key={item.slug}
          label={item.label}
          disabled={item.slug !== 'details' && disabled}
          to={collectionsRouterPathHelper(_.get(match, 'params'), item.slug)}
        />
      ))}
    </div>
  );
};

const enhance = compose(withRouter, React.memo);

const EnhancedSecondaryNavbarMobile = enhance(SecondaryNavbarMobile);

export default EnhancedSecondaryNavbarMobile;
