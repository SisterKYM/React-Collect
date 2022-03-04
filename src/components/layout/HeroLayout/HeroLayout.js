import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import posed, {PoseGroup} from 'react-pose';

import {DrawerMenu} from 'layout/components';
import {Layout} from 'layout';
import config from 'config';
import PayerFlowNavigationBar from '../../views/c/components/PayerFlowNavigationBar';

import {FlyoutSidebar, Footer} from './components';

const PoseContainer = posed.div();

const HeroLayout = ({
  containerClassName,
  footer,
  fixedTop,
  children,
  topAlert,
  bannerImg,
  drawerMenu,
  fixedBottom,
  flyoutSidebar,
}) => (
  <Layout growlProps={{fixedTop: true}}>
    <div className={cx('flex flex-column min-vh-100', containerClassName)}>
      <PoseGroup>
        {Boolean(flyoutSidebar) && (
          <PoseContainer key="flyout-sidebar-pose-container">
            <FlyoutSidebar {...flyoutSidebar} />
          </PoseContainer>
        )}
      </PoseGroup>
      <DrawerMenu>{drawerMenu}</DrawerMenu>

      <PayerFlowNavigationBar page="hero" />
      {topAlert}
      <div className="relative bg-gray-200">
        {Boolean(bannerImg) && (
          <div className="relative flex justify-center">
            <div className="absolute absolute--fill overflow-hidden">
              <div className="relative w-100 h-100 cover dib">
                <svg width="100%" height="100%">
                  <filter id="blurMe">
                    <feGaussianBlur in="SourceGraphic" stdDeviation={16} />
                  </filter>
                  <image
                    filter="url(#blurMe)"
                    href={bannerImg}
                    x="-10%"
                    y="-10%"
                    height="120%"
                    width="120%"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </svg>
              </div>
            </div>
            <div className="banner-image-wrapper">
              <img
                className="banner-image relative db w-100 h-auto"
                alt="Collection banner"
                src={bannerImg}
              />
            </div>
          </div>
        )}
        <div className="content-container relative flex-auto">
          <div className={!bannerImg ? 'mt3' : ''}>{children}</div>
        </div>
      </div>
      {fixedTop && (
        <div className="fixed top-0 w-100 bb b--gray-300 shadow-4">
          {fixedTop}
        </div>
      )}
      {fixedBottom && (
        <div className="fixed-bottom-wrapper fixed bottom-0 w-100 shadow-2 bt b--gray-300">
          {fixedBottom}
        </div>
      )}
      <div className="footer-wrapper">
        {config.isCheddarUp && (footer || <Footer />)}
      </div>
    </div>
    <style jsx>{`
      .banner-image-wrapper {
        width: 1024px;
      }
      .banner-image {
        max-height: 60vh;
        object-fit: cover;
        object-position: center;
      }
      .fixed-bottom-wrapper {
        z-index: 101;
      }
      .footer-wrapper {
        margin-bottom: ${fixedBottom ? 86 : 0}px;
      }
      @media (max-width: 30em) {
        .footer-wrapper {
          margin-bottom: ${fixedBottom ? 56 : 0}px;
        }
      }
    `}</style>
  </Layout>
);

HeroLayout.propTypes = {
  bannerImg: PropTypes.string,
  flyoutSidebar: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  hideMenuControl: PropTypes.bool,
  primaryNavbarElement: PropTypes.element,
};

const EnhancedHeroLayout = React.memo(HeroLayout);

export default EnhancedHeroLayout;
