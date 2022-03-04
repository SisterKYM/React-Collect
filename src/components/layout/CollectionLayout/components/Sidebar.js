import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';
import React from 'react';
import _ from 'lodash';

import {collectionsRouterPathHelper} from 'helpers';
import PrimarySidebarNavItem from 'layout/components/PrimarySidebarNavItem';

const Sidebar = ({navItems, collection, match}) => {
  const disabled = !collection || !collection.id;

  return (
    <div className="flex flex-column h-100 bg-accent">
      {navItems.map((item) => (
        <PrimarySidebarNavItem
          key={item.slug}
          label={item.label}
          disabled={item.slug !== 'details' && disabled}
          to={collectionsRouterPathHelper(_.get(match, 'params'), item.slug)}
          imgSrc={item.icon}
        />
      ))}
    </div>
  );
};

const enhance = compose(withRouter, React.memo);

const EnhancedSidebar = enhance(Sidebar);

export default EnhancedSidebar;
