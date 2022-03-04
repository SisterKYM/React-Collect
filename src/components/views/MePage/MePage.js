import {generatePath, Link} from 'react-router-dom';
import {useFetcher} from 'rest-hooks';
import {useSelector} from 'react-redux';
import React, {useEffect, useMemo, useState} from 'react';

import {BannerHeader, Status} from 'elements';
import {sortBy} from 'lodash';
import {Layout} from 'layout';
import GroupPageCollectionsResource from 'resources/GroupPageCollectionsResource';
import ImagesUtils from 'helpers/ImagesUtils';

import {CategoryBox, CollectionCard, NavBar} from './components';

const emptyCollections = [1, 2, 3, 4, 5, 6].map((no) => (
  <CollectionCard
    key={no}
    collection={{
      name: 'Collection Name',
    }}
  />
));

const MePage = ({status, match}) => {
  const session = useSelector((state) => state.session);
  const isNotTeamUser = useMemo(
    () =>
      session?.user &&
      (session?.user.slug === match?.params?.slug ||
        session?.user.id.toString() === match?.params?.slug) &&
      session?.capabilities?.plan !== 'team',
    [session, match]
  );

  const [pending, setPending] = useState(true);

  const groupPageCollectionsGetter = useFetcher(
    GroupPageCollectionsResource.listShape()
  );

  const [organizer, setOrganizer] = useState({});
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      setPending(true);
      const {organizer, collections} = await groupPageCollectionsGetter({
        me: match?.params?.slug,
      });
      setOrganizer(organizer);
      setCollections(collections);
      setPending(false);
    };

    fetch();
  }, [groupPageCollectionsGetter, match.params.slug]);

  const groupPageSettings = useMemo(() => organizer.groupPage, [
    organizer.groupPage,
  ]);
  const pageName = organizer.name || '';

  const renderCategorizedCollections = useMemo(
    () => (
      <>
        {!pending &&
          groupPageSettings?.categories?.length > 0 &&
          groupPageSettings.categories.map((category) => (
            <CategoryBox key={category.uuid} category={category}>
              {sortBy(collections, (c) =>
                (Array.isArray(category.collectionOrder)
                  ? category.collectionOrder
                  : []
                ).indexOf(c.id)
              )
                .filter(
                  (collection) =>
                    collection.groupPage?.shared &&
                    collection.groupPage?.categoryId === category.uuid
                )
                .map((collection) => (
                  <CollectionCard key={collection.id} collection={collection} />
                ))}
            </CategoryBox>
          ))}
      </>
    ),
    [collections, groupPageSettings, pending]
  );

  const renderUnCategorizedCollections = useMemo(() => {
    const unCategorizedCollections = collections.filter(
      (collection) =>
        collection.groupPage?.shared &&
        (!collection.groupPage?.categoryId ||
          !(groupPageSettings?.categories || []).find(
            (category) => category.uuid === collection.groupPage.categoryId
          ))
    );

    return (
      !pending &&
      unCategorizedCollections.length > 0 && (
        <CategoryBox>
          {sortBy(unCategorizedCollections, (c) =>
            (Array.isArray(organizer?.groupPage?.uncategorizedCollectionOrder)
              ? organizer?.groupPage?.uncategorizedCollectionOrder
              : []
            ).indexOf(c.id)
          ).map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </CategoryBox>
      )
    );
  }, [collections, groupPageSettings, organizer, pending]);

  return (
    <Layout growlProps={{fixedTop: true}}>
      <div className="flex flex-column min-vh-100">
        <NavBar />
        <div className="flex-auto relative bg-gray-200 flex flex-column">
          {isNotTeamUser && (
            <div className="preview-only bg-tint tc white">
              Preview only:{' '}
              <Link to="/collections/i/plans" className="underline white">
                Upgrade to Team
              </Link>{' '}
              to share this page publicly and allow your payers to browse all
              active collections in one spot.
            </div>
          )}
          <div className="content-container relative flex-auto flex flex-column">
            {!pending && (
              <div className="banner-header-wrapper mb3 overflow-hidden">
                <BannerHeader />
              </div>
            )}

            <div className="flex-auto">
              {status === 'pending' || pending ? (
                <div className="status-wrapper pa5 center">
                  <Status status="pending" />
                </div>
              ) : (
                <>
                  {collections.length > 0 ? (
                    <>
                      {renderCategorizedCollections}
                      {renderUnCategorizedCollections}
                    </>
                  ) : (
                    <div className="bg-white pa4-25 br2 card-shadow mt3">
                      <div className="text-24 merriweather dark-grey">
                        It seems you haven’t added any collections yet
                      </div>
                      <div className="subtitle__empty avenir-light">
                        In addition to customizing your banner, you can decide
                        which collections to display here.
                      </div>
                      <div>{emptyCollections}</div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="pb4 pt5 tc">
              {organizer && organizer.profile_pic && (
                <img
                  className="organizer-avatar mb3 br-100"
                  alt="Organizer avatar"
                  src={ImagesUtils.getCroppedImageUrl(organizer.profile_pic, {
                    width: 180,
                    height: 180,
                  })}
                />
              )}
              <p className="mb2 mb3-ns f5 merriweather i tc gray-600">
                {pageName}
              </p>
              <Link
                className="f6 tc avenir-roman tint dim ttu"
                to={generatePath('/me/:userSlug/help', {
                  userSlug: match.params.slug,
                })}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .preview-only {
          height: 60px;
          font-size: 18px;
          line-height: 44px;
          padding: 8px;
        }
        .banner-header-wrapper {
          box-shadow: 0px 1px 3px #0000000a;
          border-radius: 4px;
        }
        .subtitle__empty {
          font-size: 18px;
          line-height: 34px;
          margin-bottom: 24px;
        }
        .status-wrapper {
          width: 15px;
        }
        .organizer-avatar {
          width: 3.75rem;
          height: 3.75rem;
        }
      `}</style>
    </Layout>
  );
};

const EnhancedMePage = React.memo(MePage);

export default EnhancedMePage;
