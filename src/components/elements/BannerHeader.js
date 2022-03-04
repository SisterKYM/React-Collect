import React, {useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {useRouteMatch, useHistory} from 'react-router-dom';
import {useFetcher} from 'rest-hooks';

import ImagesUtils from 'helpers/ImagesUtils';
import GroupPageCollectionsResource from 'resources/GroupPageCollectionsResource';
import FacebookIcon from 'theme/images/FacebookIcon.svg';
import InstagramIcon from 'theme/images/InstagramIcon.png';
import LinkedInIcon from 'theme/images/LinkedInIcon.svg';
import TwitterIcon from 'theme/images/TwitterIcon.svg';

const bannerImageLength = 200;

const defaultCrop = {
  x: 0,
  y: 0,
  width: bannerImageLength,
  height: bannerImageLength,
};
const logoStyle = {
  width: bannerImageLength,
  height: bannerImageLength,
};

const BannerHeader = () => {
  const match = useRouteMatch();
  const groupPageCollectionsGetter = useFetcher(
    GroupPageCollectionsResource.listShape()
  );
  const session = useSelector((state) => state.session);
  const [organizer, setOrganizer] = useState(null);

  const history = useHistory();
  useEffect(() => {
    const fetch = async (slugOrId) => {
      const {organizer} = await groupPageCollectionsGetter({
        me: slugOrId,
      });

      setOrganizer(organizer);
    };

    if (!organizer || history.location?.state?.refresh) {
      if (match.params?.slug) {
        fetch(match.params.slug);
      } else if (session) {
        fetch(session.user.slug || session.user.id);
      }
      if (history.location?.state?.refresh) {
        history.replace({
          state: {},
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params, organizer, session, history.location]);

  const pageName = organizer?.name || '';
  const bannerSettings = useMemo(() => organizer?.groupPage || {}, [organizer]);

  const logoUrl = useMemo(
    () =>
      bannerSettings.logo
        ? ImagesUtils.getCroppedImageUrl(bannerSettings.logo, defaultCrop)
        : '',
    [bannerSettings.logo]
  );

  const bannerEdited =
    logoUrl ||
    bannerSettings.organizationName ||
    bannerSettings.tagline ||
    bannerSettings.website ||
    bannerSettings.facebook ||
    bannerSettings.instagram ||
    bannerSettings.linkedin ||
    bannerSettings.twitter;

  return (
    <div className="pa4-25 horizontal-flex bg-white">
      {bannerEdited ? (
        <>
          {logoUrl && (
            <img
              src={logoUrl}
              alt="Crop"
              className="banner-logo dn db-ns"
              style={logoStyle}
            />
          )}
          <div>
            {logoUrl && (
              <img
                src={logoUrl}
                alt="Crop"
                className="banner-logo dn-ns"
                style={logoStyle}
              />
            )}
            <div className="merriweather banner-title dark-grey mt3-25">
              {bannerSettings.organizationName}
            </div>
            <div className="avenir-light banner-tagline gray-700 mt3 text-18 line-24">
              {bannerSettings.tagline}
            </div>
            <div className="mt4-25">
              <a
                href={bannerSettings.website}
                target="_blank"
                rel="noopener noreferrer"
                className="avenir-roman text-14 text-uppercase"
              >
                {bannerSettings.website}
              </a>
            </div>
            <div>
              {bannerSettings.facebook && (
                <a
                  href={bannerSettings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={FacebookIcon}
                    className="social-icon"
                    alt={bannerSettings.facebook}
                  />
                </a>
              )}
              {bannerSettings.instagram && (
                <a
                  href={bannerSettings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={InstagramIcon}
                    className="social-icon"
                    alt={bannerSettings.instagram}
                  />
                </a>
              )}
              {bannerSettings.linkedin && (
                <a
                  href={bannerSettings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={LinkedInIcon}
                    className="social-icon"
                    alt={bannerSettings.linkedin}
                  />
                </a>
              )}
              {bannerSettings.twitter && (
                <a
                  href={bannerSettings.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={TwitterIcon}
                    className="social-icon"
                    alt={bannerSettings.twitter}
                  />
                </a>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="banner-header__empty dark-grey merriweather">
          {pageName}
        </div>
      )}

      <style>{`
        .banner-logo {
          margin-right: 40px;
          border-radius: 10px;
        }
        .banner-title {
          font-size: 36px;
          line-height: 44px;
        }
        .social-icon {
          margin-top: 1.25rem;
          margin-right: 9px;
        }
        .banner-header__empty {
          font-size: 36px;
          line-height: 44px;
        }
      `}</style>
    </div>
  );
};

const EnhancedBannerHeader = React.memo(BannerHeader);

export default EnhancedBannerHeader;
