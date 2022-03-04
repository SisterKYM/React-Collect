import React from 'react';
import cx from 'classnames';

import Layout from 'layout/Layout';

import {DrawerMenu} from './components';
import {PrimaryNavbarContainer} from './containers';

const BasicLayout = ({
  className,
  style,
  header,
  children,
  drawerMenuNav,
  primaryNavbar,
}) => (
  <Layout>
    <DrawerMenu right>{drawerMenuNav}</DrawerMenu>
    <PrimaryNavbarContainer {...primaryNavbar} />
    <div className={cx('vh-100', className)} style={style}>
      {header}
      <div className="relative content-container">{children}</div>
    </div>
  </Layout>
);

const EnhancedBasicLayout = React.memo(BasicLayout);

export default EnhancedBasicLayout;
