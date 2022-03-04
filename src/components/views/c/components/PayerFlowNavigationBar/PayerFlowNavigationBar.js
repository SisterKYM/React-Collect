import {generatePath, Link} from 'react-router-dom';
import cx from 'classnames';
import React from 'react';
import {connect} from 'react-redux';

import _ from 'lodash';
import {AvatarButtonMenu, Logo, LogoPoweredBy} from 'elements';
import {UserDrawerContainer} from 'containers';
import DrawerMenu from 'layout/components/DrawerMenu';
import DrawerMenuControl from 'layout/components/DrawerMenuControl';
import {ORGS} from 'data/orgs';

import PayerFlowNavigationBarMobile from './PayerFlowNavigationBarMobile';

const PayerFlowNavigationBar = ({
  collectionSlug,
  user,
  categories,
  smallLandscape,
  onChangeCategoryPath,
  rightElementMobile,
  publicCollection,
  page,
  userSlug,
  collectionHasFormsOnly,
}) => {
  const linkClassName = 'link dim gray-600 f6 dib ttu';

  const coBranding = publicCollection?.organizer?.partner?.cobranding?.enabled;
  const partnerSlug = publicCollection?.organizer?.partner?.slug;
  const partnerLogo = _.get(ORGS, `${partnerSlug}.logoSrc`);
  const partnerUrl = _.get(ORGS, `${partnerSlug}.url`);
  const isHeroPage = page === 'hero';

  return (
    <>
      <nav
        className={`dn ${
          smallLandscape ? '' : 'dt-ns'
        } w-100 border-box ph5 pv3 bb b--gray-300 bg-white`}
      >
        {coBranding && partnerSlug && partnerLogo ? (
          <a className="dtc v-mid link dim" href={partnerUrl || '/'}>
            <div className="flex">
              <img className="partner-logo" alt="Org logo" src={partnerLogo} />
            </div>
          </a>
        ) : (
          <Link className="dtc v-mid link dim w-25" to="/">
            <div className="flex">
              <Logo />
            </div>
          </Link>
        )}
        <div className="dtc v-mid tr">
          <Link
            className={linkClassName}
            to={
              isHeroPage
                ? `/me/${userSlug}/help`
                : generatePath('/c/:collection/help', {
                    collection: collectionSlug,
                  })
            }
          >
            Help
          </Link>
          <Link
            className={cx(linkClassName, 'ml3 ml4-m ml5-l')}
            to={
              isHeroPage
                ? `/me/${userSlug}/share`
                : generatePath('/c/:collection/share', {
                    collection: collectionSlug,
                  })
            }
          >
            Share
          </Link>
          {user && !(coBranding && partnerSlug && partnerLogo) && (
            <>
              <DrawerMenu>
                <UserDrawerContainer />
              </DrawerMenu>
              <DrawerMenuControl
                className="dib v-mid ml3 ml4-m ml5-l"
                drawerClassName="w5 top-0 right-0 mt1 mr3 tl br2"
                finish={60}
              >
                <AvatarButtonMenu heightFlexible user={user} />
              </DrawerMenuControl>
            </>
          )}
        </div>
        {coBranding && partnerSlug && partnerLogo && (
          <div className="dtc v-mid powered-logo">
            <div className="flex items-center justify-start">
              <LogoPoweredBy />
              {user && (
                <div>
                  <DrawerMenu>
                    <UserDrawerContainer />
                  </DrawerMenu>
                  <DrawerMenuControl
                    className="dib v-mid ml3 ml4-m ml5-l"
                    drawerClassName="w5 top-0 right-0 mt1 mr3 tl br2"
                    finish={60}
                  >
                    <AvatarButtonMenu heightFlexible user={user} />
                  </DrawerMenuControl>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
      <PayerFlowNavigationBarMobile
        collectionSlug={collectionSlug}
        categories={categories}
        smallLandscape={smallLandscape}
        onChangeCategoryPath={onChangeCategoryPath}
        rightElement={rightElementMobile}
        collectionHasFormsOnly={collectionHasFormsOnly}
        coBranding={coBranding}
        partnerSlug={partnerSlug}
        partnerLogo={partnerLogo}
        partnerUrl={partnerUrl}
      />
      <style jsx>{`
        .partner-logo {
          height: 2rem;
        }
        .powered-logo {
          width: 240px;
        }
      `}</style>
    </>
  );
};

const enhance = connect((state) => ({
  userSlug: _.get(state, 'session.user.slug'),
}));

const EnhancedPayerFlowNavigationBar = enhance(
  React.memo(PayerFlowNavigationBar)
);

export default EnhancedPayerFlowNavigationBar;
