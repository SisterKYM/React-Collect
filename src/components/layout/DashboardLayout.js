import React from 'react';
import cx from 'classnames';

import {UserDrawerContainer} from 'containers';

import {DrawerMenu, SecondarySidebarMobile} from './components';
import {PrimaryNavbarContainer, vh as primaryNavbarVh} from './containers';
import Layout from './Layout';
import PrimarySidebar from './components/PrimarySidebar';
import PrimarySidebarMobile from './components/PrimarySidebarMobile';
import SecondaryNavbar from './components/SecondaryNavbar';
import SecondarySidebar, {
  width as secondarySidebarWidth,
} from './components/SecondarySidebar';

const vh = 100 - (primaryNavbarVh + SecondaryNavbar.vh);

const DashboardLayout = ({
  className,
  overlay,
  children,
  fixedBottom,
  primaryNavbar,
  primarySidebar,
  secondaryNavbar,
  secondarySidebar,
  showPrimaryNavbar,
}) => (
  <Layout>
    <DrawerMenu>
      <UserDrawerContainer />
    </DrawerMenu>
    <div className={showPrimaryNavbar ? 'db' : 'dn db-ns'}>
      <PrimaryNavbarContainer {...primaryNavbar} />
    </div>
    {secondaryNavbar && <SecondaryNavbar {...secondaryNavbar} />}
    <div className="dashboard-layout-content-container flex bg-gray-100">
      {primarySidebar && (
        <div className="dn db-l z-1">
          <PrimarySidebar {...primarySidebar} />
        </div>
      )}
      <div className="relative flex w-100">
        {secondarySidebar && (
          <>
            <SecondarySidebarMobile
              className="db dn-l"
              contentContainerClassName="bg-gray-200"
              {...secondarySidebar}
            />
            <div className="secondary-sidebar-wrapper dn db-l z-1">
              <SecondarySidebar {...secondarySidebar} />
            </div>
          </>
        )}
        <div
          className={cx(
            'relative w-100',
            fixedBottom && 'children-container',
            className
          )}
        >
          {children}
          <div className="fixed-bottom-wrapper left-0 bottom-0 w-100 vh dn-l">
            {Boolean(fixedBottom) && (
              <div className="shadow-4">{fixedBottom}</div>
            )}
            {Boolean(primarySidebar) && (
              <PrimarySidebarMobile {...primarySidebar} />
            )}
          </div>
          <div className="fixed-bottom-wrapper fixed left-0 bottom-0 w-100">
            {Boolean(fixedBottom) && (
              <div className="shadow-4">{fixedBottom}</div>
            )}
            {Boolean(primarySidebar) && (
              <PrimarySidebarMobile className="db dn-l" {...primarySidebar} />
            )}
          </div>
        </div>
      </div>
    </div>
    {overlay}
    <style jsx>{`
      .secondary-sidebar-wrapper {
        width: ${secondarySidebarWidth}px;
      }
      .children-container {
        padding-bottom: 103px;
      }
      .fixed-bottom-wrapper {
        z-index: 10;
      }
      @media (min-width: 30em) {
        .dashboard-layout-content-container {
          min-height: ${vh}vh;
        }
      }
      @media (min-width: 60em) {
        .dashboard-layout-content-container {
          min-height: 100vh;
        }
        .children-container {
          padding-bottom: 176px;
        }
      }
    `}</style>
  </Layout>
);

const EnhancedDashboardLayout = React.memo(DashboardLayout);

export default EnhancedDashboardLayout;
