import {MdMenu} from 'react-icons/md';
import {get} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import {AvatarButtonMenu, Logo} from 'elements';
import {Z_INDEX as curtainZIndex} from 'elements/Curtain';
import {scale} from 'theme/constants';
import DrawerMenuControl from 'layout/components/DrawerMenuControl';
import config from 'config';

const vh = 6.5;
const minHeight = 70;
const zIndex = curtainZIndex + 2;

const PrimaryNavbar = ({
  className,
  session,
  hideMenuControl,
  leftComponent,
  rightComponent,
  centerComponent,
}) => (
  <div
    className={cx(
      'container h3 ph3 dn-p flex items-center mid-gray top-nav',
      className
    )}
  >
    <div className="flex-auto flex items-center">
      <a className="top-nav-item" href={config.links.homePageRedirect}>
        <Logo />
      </a>
      {session?.organization === 'moneyminder' && (
        <>
          <span className="for">for</span>&nbsp;
          <span className="money-minder top-nav-item">MoneyMinder</span>
        </>
      )}
      {leftComponent && <div className="db-l dn">{leftComponent}</div>}
    </div>
    {centerComponent && (
      <div className="flex-auto dn-ns flex items-center justify-center">
        {centerComponent}
      </div>
    )}
    <div className="flex-auto flex items-center justify-end">
      {!hideMenuControl && (
        <DrawerMenuControl
          curtain
          className="db dn-ns"
          drawerClassName="w-100"
          finish={minHeight}
        >
          <MdMenu size={30} />
        </DrawerMenuControl>
      )}
      <div className="db-ns dn ml4">
        {session && session.user ? (
          <div className="flex items-center">
            <DrawerMenuControl
              drawerClassName="drawer-menu w5 top-0 right-0 mt1 mr3 br2"
              finish={minHeight - scale[1]}
            >
              <AvatarButtonMenu
                user={session.user}
                alertVisible={
                  !session.chargesEnabled ||
                  get(session, 'fieldsNeeded', []).length !== 0
                }
              />
            </DrawerMenuControl>
          </div>
        ) : (
          rightComponent
        )}
      </div>
    </div>
    <style jsx>{`
      .container {
        z-index: ${zIndex};
      }
      :global(.drawer-menu) {
        z-index: ${zIndex + 2};
      }
      .for {
        font-family: 'Merriweather', serif;
        font-style: italic;
        font-size: 14px;
        line-height: 19px;
        color: #373737;
        margin-left: 0.5rem;
      }
      .money-minder {
        font-family: 'AvenirLTStd-Heavy', sans-serif;
        font-size: 16px;
        line-height: 19px;
        color: #373737;
        margin-right: 6rem;
      }
    `}</style>
  </div>
);

const EnhancedPrimaryNavbar = Object.assign(React.memo(PrimaryNavbar), {
  propTypes: {
    session: PropTypes.object,
    hideMenuControl: PropTypes.bool,
  },
});

export {vh};
export default EnhancedPrimaryNavbar;
