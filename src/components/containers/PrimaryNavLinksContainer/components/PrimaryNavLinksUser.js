import React, {useCallback, useState} from 'react';
import _, {capitalize} from 'lodash';

import {Dropdown, MarketplaceHeading, NavItem} from 'elements';
import config from 'config';

const helpDropdownSettings = [
  {text: 'Help Center', link: 'https://support.cheddarup.com/'},
  {text: 'Examples', link: 'https://my.cheddarup.com/me/cheddarupexamples'},
  {
    text: 'Webinars',
    link:
      'https://support.cheddarup.com/hc/en-us/articles/360035586771-Attend-a-webinar-',
  },
];

const UserNav = ({location, session}) => {
  const [helpDropdownVisible, setHelpDropdownVisible] = useState(false);

  const showHelpDropdown = useCallback(() => {
    setHelpDropdownVisible(true);
  }, []);
  const hideHelpDropdown = useCallback(() => {
    setHelpDropdownVisible(false);
  }, []);

  const upgradeVisible =
    config.enabledFeatures.subscriptions && !session.isProUser;

  return (
    <nav className="flex items-center">
      <NavItem className="ttc nowrap top-nav-item" to="/collections">
        {capitalize(config.strings.collection)}s
      </NavItem>
      {config.siteName !== 'PIXIE_LANE' && (
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
      )}
      {_.get(session, 'organization_data.internalMarketplace.enabled') && (
        <NavItem className={upgradeVisible ? 'mr4' : ''} to="/marketplace">
          <MarketplaceHeading
            text={`Search All ${_.get(
              session,
              'organization_data.internalMarketplace.organizerNickname'
            )} Sales`}
          />
        </NavItem>
      )}
      {upgradeVisible && (
        <NavItem to={`${location.pathname}/i/plans`}>Upgrade</NavItem>
      )}
    </nav>
  );
};

const EnhancedUserNav = React.memo(UserNav);

export default EnhancedUserNav;
