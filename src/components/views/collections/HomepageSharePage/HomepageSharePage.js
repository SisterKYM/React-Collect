import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import config from 'config';

import {Button, CollectionShare, Modal, ModalCloseButton} from 'elements';
import {UPDATE_USER_SLUG} from 'redux/modules/session/constants';
import {updateUserSlug} from 'redux/modules/session/actions';
import SettingsCollectionHomeUpgradeLrgImage from 'theme/images/Settings.CollectionHome.v2.Upgrade.Lrg.png';

import {HomepageShareForm} from './components';

const HomepageSharePage = ({
  history,
  browser,
  isTeamUser,
  userSlug,
  updateUserSlugStatus,
  onUpdateUserSlug,
}) => {
  const chpDomain = 'mycheddarup.com';
  const userUrl = `https://${userSlug}.${chpDomain}`;

  const handleDismiss = React.useCallback(() => {
    history.push('/collections');
  }, [history]);

  const handleSubmitForm = React.useCallback(
    ({slug}, dispatch, form) => {
      if (slug !== form.initialValues.slug) {
        onUpdateUserSlug({slug});
      }
    },
    [onUpdateUserSlug]
  );

  return (
    <Modal onDismiss={handleDismiss}>
      <ModalCloseButton onClick={handleDismiss} />
      <div>
        <div className="pa4 bb b--gray-300">
          <h1>
            {isTeamUser
              ? 'All collections. One link.'
              : 'One-stop shopping for your payers. Global reporting for you.'}
          </h1>
          <p className="mt2">
            {isTeamUser
              ? `Your Group Page allows your payers to browse all of your active collections in one spot.`
              : "Upgrade to TEAM to share one URL that lists all your collections. Your community will have a one-stop link to pay for everything and you'll enjoy account-wide reporting."}
          </p>
          <div className="flex mt3 flex-wrap">
            <Link
              target={isTeamUser ? '_blank' : '_self'}
              to={
                isTeamUser
                  ? `/me/${userSlug}`
                  : '/collections/i/plans/team-upgrade'
              }
            >
              <Button
                backgroundColorSet
                className={isTeamUser ? 'bg-tint' : 'bg-brand'}
                small={browser.lessThan.small}
              >
                {isTeamUser ? 'Preview my page' : 'Upgrade to TEAM'}
              </Button>
            </Link>
            {!isTeamUser && (
              <div
                className={cx(
                  browser.greaterThan.small && 'ml3',
                  browser.lessThan.medium && 'w-100',
                  browser.lessThan.medium && 'mt3',
                  browser.lessThan.small && 'mt2'
                )}
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://my.cheddarup.com/me/westhillspta"
                >
                  <Button
                    colorSet
                    backgroundColorSet
                    className="brand bg-white ba b--brand"
                    small={browser.lessThan.small}
                  >
                    See Group Page Example
                  </Button>
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="pa4">
          {isTeamUser ? (
            <>
              <HomepageShareForm
                enableReinitialize
                domain={chpDomain}
                initialValues={{
                  link: userUrl,
                  slug: userSlug,
                }}
                status={updateUserSlugStatus}
                onSubmit={handleSubmitForm}
              />
              <CollectionShare
                className="mt3"
                shareUrls={{
                  facebook: `https://www.facebook.com/sharer/sharer.php?u=${userUrl}`,
                  twitter: `https://twitter.com/home?status=${userUrl}`,
                  mail: `mailto:?&subject=You're invited to ${config.strings.name}!&body=Check%20this%20out%3A%20${userUrl}`,
                }}
              />
            </>
          ) : (
            <div className="tc">
              <img
                alt="Upgrade"
                className="mw-100"
                src={SettingsCollectionHomeUpgradeLrgImage}
              />
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        img {
          max-height: 450px;
        }
      `}</style>
    </Modal>
  );
};

const enhance = connect(
  (state) => ({
    browser: state.browser,
    userSlug: _.get(state, 'session.user.slug'),
    isTeamUser: _.get(state, 'session.isTeamUser', false),
    updateUserSlugStatus: state.async.statuses[UPDATE_USER_SLUG],
  }),
  (dispatch) => ({
    onUpdateUserSlug: (payload) => dispatch(updateUserSlug(payload)),
  })
);

const EnhancedHomepageSharePage = enhance(HomepageSharePage);

export default EnhancedHomepageSharePage;
