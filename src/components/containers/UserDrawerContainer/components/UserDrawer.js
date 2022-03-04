import {IoMdAlert} from 'react-icons/io';
import React from 'react';
import {get} from 'lodash';

import MarketplaceHeading from 'elements/MarketplaceHeading';
import NavItem from 'elements/NavItem';
import config from 'config';
import useMedia from 'hooks/useMedia';

const UserDrawer = ({location, session}) => {
  const {notSmall} = useMedia();

  return (
    <nav className="flex flex-column">
      {session &&
        (!session.chargesEnabled ||
          (session.fieldsNeeded && session.fieldsNeeded.length !== 0)) && (
          <NavItem className="mb3" to="/user">
            <div className="flex items-center brand">
              <i className="pr2">
                <IoMdAlert className="brand" />
              </i>
              Complete Settings
            </div>
          </NavItem>
        )}
      {get(session, 'organization_data.internalMarketplace.enabled') && (
        <NavItem className="dn-l mb3" to="/marketplace">
          <MarketplaceHeading
            text={`Search All ${get(
              session,
              'organization_data.internalMarketplace.organizerNickname'
            )} Sales`}
          />
        </NavItem>
      )}
      {!notSmall && (
        <NavItem className="mb3 ttc" to="/collections">
          My {config.strings.collection}s
        </NavItem>
      )}
      <NavItem className="mb3" to="/user">
        My Account
      </NavItem>
      {session && !session.isTeamUser && config.enabledFeatures.subscriptions && (
        <NavItem className="mb3" to={`${location.pathname}/i/plans`}>
          {`${session.isTeamUser ? 'My Plan' : 'Upgrade'}`}
        </NavItem>
      )}
      {!notSmall && (
        <NavItem
          className="mb3"
          href={`${location.pathname}/i/orgs/${get(
            session,
            'organization'
          )}/how-it-works`}
        >
          How It Works
        </NavItem>
      )}
      <NavItem
        className="mb3"
        href={session?.faqUrl || config.links.supportPage}
        target="_blank"
      >
        Support
      </NavItem>
      <NavItem to="/logout">Log Out</NavItem>
    </nav>
  );
};

const EnhancedUserDrawer = React.memo(UserDrawer);

export default EnhancedUserDrawer;
