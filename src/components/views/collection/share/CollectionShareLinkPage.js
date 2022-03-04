import {compose} from 'recompose';
import {connect} from 'react-redux';
import {generatePath, Redirect, Route, Switch} from 'react-router-dom';
import React from 'react';

import {asyncConnect} from 'helpers';
import {CollectionCenterLayout} from 'layout';
import {GET_COLLECTION} from 'redux/modules/collections/constants';
import {getCollection} from 'redux/modules/collections/actions';
import {PageTitle, SecondarySidebarMobile} from 'layout/components';
import config from 'config';

import {
  ShareInvite,
  ShareLink,
  ShareNavTabs,
  ShareWebsiteButton,
} from './components';

const CollectionShareLinkPage = ({location, history, match, collection}) => {
  const ownerId = Number(match.params.owner);
  const collectionId = Number(match.params.collection);
  const shareLink = config.helpers.shareUrl(collection?.slug || '');

  const handleClickReminders = React.useCallback(() => {
    history.push(
      generatePath(
        '/collection/:owner/:collection/share/invitations/reminders',
        {
          owner: ownerId,
          collection: collectionId,
        }
      )
    );
  }, [ownerId, collectionId, history]);

  const handleClickSendMessage = React.useCallback(() => {
    history.push(
      generatePath('/collection/:owner/:collection/share/invitations/message', {
        owner: ownerId,
        collection: collectionId,
      })
    );
  }, [ownerId, collectionId, history]);

  const shareNavTabsElement = collection ? (
    <ShareNavTabs currentPathname={location.pathname} collection={collection} />
  ) : null;

  return (
    <CollectionCenterLayout collection={collection}>
      <div className="content-container relative h-100 pt3 ph3">
        <SecondarySidebarMobile
          className="db dn-l"
          contentContainerClassName="absolute top-0 left-0 h-100 bg-gray-200"
        >
          {shareNavTabsElement}
        </SecondarySidebarMobile>
        <PageTitle className="mt4 dark-grey avenir-roman">Share</PageTitle>
        <div className="dn db-l">{shareNavTabsElement}</div>
        <div className="mt3 mb4">
          <Switch>
            <Route path={`${match.path}/link`}>
              {collection && (
                <ShareLink
                  collection={collection}
                  facebookUrl={`https://www.facebook.com/sharer/sharer.php?u=${shareLink}`}
                  link={shareLink}
                  mailUrl={`mailto:?&subject=You're invited to ${config.strings.name}!&body=Check%20out%20this%20collection%20I%20just%20created%20that%20will%20allow%20you%20to%20pay%20online%3A%20${shareLink}`}
                  twitterUrl={`http://twitter.com/share?text=Check+it+out:&url=${shareLink}&hashtags=`}
                />
              )}
            </Route>
            <Route path={`${match.path}/invitations`}>
              <ShareInvite
                collectionId={collectionId}
                onClickReminders={handleClickReminders}
                onClickSendMessage={handleClickSendMessage}
              />
            </Route>
            <Route path={`${match.path}/website-button`}>
              {collection && (
                <ShareWebsiteButton collectionSlug={collection.slug} />
              )}
            </Route>
            <Redirect exact from={match.path} to={`${match.path}/link`} />
          </Switch>
        </div>
      </div>
    </CollectionCenterLayout>
  );
};

const enhance = compose(
  asyncConnect((props) => [
    {
      key: GET_COLLECTION,
      promise: getCollection,
      payload: {
        collection: props.match.params.collection,
      },
    },
  ]),
  connect(({collections: {collection}}) => ({
    collection,
  }))
);

const EnhancedCollectionShareLinkPage = enhance(CollectionShareLinkPage);

export default EnhancedCollectionShareLinkPage;
