import React, {useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import _, {capitalize, get} from 'lodash';

import {
  AvatarButtonMenu,
  Dropdown,
  CommonButton,
  Logo,
  MarketplaceHeading,
  NavItem,
} from 'elements';

import {DrawerMenu, DrawerMenuControl} from 'layout/components';
import {scale} from 'theme/constants';
import {UserDrawerContainer} from 'containers';
import config from 'config';

const minHeight = 75;
const helpDropdownSettings = [
  {text: 'Help Center', link: 'https://support.cheddarup.com/'},
  {text: 'Examples', link: 'https://my.cheddarup.com/me/cheddarupexamples'},
  {
    text: 'Webinars',
    link:
      'https://support.cheddarup.com/hc/en-us/articles/360035586771-Attend-a-webinar-',
  },
];

const CollectionsTopNav = () => {
  const session = useSelector((state) => state.session);
  const isTeamUser = session?.isTeamUser || false;
  const userId = session?.user?.id || '';
  const [helpDropdownVisible, setHelpDropdownVisible] = useState(false);

  const showHelpDropdown = useCallback(() => {
    setHelpDropdownVisible(true);
  }, []);
  const hideHelpDropdown = useCallback(() => {
    setHelpDropdownVisible(false);
  }, []);
  const location = useLocation();

  return (
    <>
      <div className="flex flex-row items-center top-nav">
        <a className="top-nav-item" href={config.links.homePageRedirect}>
          <Logo />
        </a>

        <Link
          className="top-nav-item f-small avenir-roman dark-grey"
          to="/collections"
        >
          {capitalize(config.strings.collection)}s
        </Link>

        <Dropdown
          className="br2"
          bodyClassName="mt2"
          width={200}
          open={helpDropdownVisible}
          body={
            <ul className="help-dropdown-body">
              {helpDropdownSettings.map((setting) => (
                <li key={setting.link}>
                  <a
                    className="avenir-roman f-small gray-600"
                    href={setting.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {setting.text}
                  </a>
                </li>
              ))}
            </ul>
          }
          onDismiss={hideHelpDropdown}
        >
          <div
            className="avenir-roman f-small dark-grey pointer top-nav-item"
            onClick={showHelpDropdown}
          >
            Help and Inspiration
          </div>
        </Dropdown>
        {_.get(session, 'organization_data.internalMarketplace.enabled') && (
          <NavItem to="/marketplace" target="_blank" rel="noopener noreferrer">
            <MarketplaceHeading
              text={`Search All ${_.get(
                session,
                'organization_data.internalMarketplace.organizerNickname'
              )} Sales`}
            />
          </NavItem>
        )}

        <div className="flex-auto" />
        {!isTeamUser && (
          <Link to={`${location.pathname}/i/plans`}>
            <CommonButton className="bg-gray-250 gray-600 pt-12 mv2 mv0-ns">
              Upgrade
            </CommonButton>
          </Link>
        )}
        <DrawerMenuControl
          drawerClassName="drawer-menu w5 top-0 right-0 mt1 mr3 br2"
          finish={minHeight - scale[1]}
        >
          <AvatarButtonMenu
            user={session?.user}
            alertVisible={
              !session.chargesEnabled ||
              get(session, 'fieldsNeeded', []).length !== 0
            }
          />
        </DrawerMenuControl>
      </div>
      <DrawerMenu>
        <UserDrawerContainer />
      </DrawerMenu>
      <style>{`
        .help-dropdown-body {
          padding: 20px;
        }
        .help-dropdown-body li:not(:last-child) {
          margin-bottom: 20px;
        }
      `}</style>
    </>
  );
};

export default React.memo(CollectionsTopNav);
