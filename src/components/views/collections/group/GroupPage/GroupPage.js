import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import ReactSortable from 'react-sortablejs';
import {useFetcher, useResource} from 'rest-hooks';
import cx from 'classnames';

import {BannerHeader, CommonButton} from 'elements';
import {CollectionsLayout, CollectionsMobileLayout} from 'layout';
import FolderResource from 'resources/FolderResource';
import GroupPageResource from 'resources/GroupPageResource';
import GroupPageCollectionsResource from 'resources/GroupPageCollectionsResource';
import CollectionResource from 'resources/CollectionResource';
import {dragHandle, sortableOptions} from 'theme/sortable';

import {
  AddCollectionsModal,
  AddCollectionsModalMobile,
  CollectionListCategory,
  CollectionListCategoryMobile,
  CollectionListItem,
  CollectionListItemMobile,
  CreateCategoryModal,
  ShareLinkModal,
  RightSide,
} from './components';
import MediaContext from '../../../../MediaContext';

const articleLink =
  'https://support.cheddarup.com/hc/en-us/articles/360035226552-Find-and-share-your-collections-home-page';
const hCardButtonStyle = {
  width: '155px',
};

const GroupPage = () => {
  const [
    unCategorizedCollectionOrder,
    setUnCategorizedCollectionOrder,
  ] = useState([]);
  const [sharedCollections, setSharedCollections] = useState([]);
  const [sharedCollectionsUpdated, setSharedCollectionsUpdated] = useState(
    true
  );
  const groupPageCollectionsGetter = useFetcher(
    GroupPageCollectionsResource.listShape()
  );

  const session = useSelector((state) => state.session);
  const isNotTeamUser = !session?.isTeamUser;

  useEffect(() => {
    const fetchData = async () => {
      const {organizer, collections} = await groupPageCollectionsGetter({
        me: session.user.id,
      });
      if (organizer?.groupPage?.uncategorizedCollectionOrder) {
        setUnCategorizedCollectionOrder(
          organizer.groupPage.uncategorizedCollectionOrder
        );
      }
      setSharedCollections(collections);
      setSharedCollectionsUpdated(false);
    };

    if (sharedCollectionsUpdated) {
      fetchData();
    }
  }, [session.user.id, groupPageCollectionsGetter, sharedCollectionsUpdated]);

  const folders = useResource(FolderResource.listShape(), {});

  const unShareCollections = useFetcher(
    GroupPageCollectionsResource.unShareShape()
  );
  const removeCollection = useCallback(
    (collection) => {
      setSharedCollections((prevSharedCollections) =>
        prevSharedCollections.filter((c) => c.id !== collection.id).slice()
      );

      const fetchData = async () => {
        await unShareCollections(
          {
            collectionIds: [collection.id],
          },
          {}
        );
        setSharedCollectionsUpdated(true);
      };

      fetchData();
    },
    [unShareCollections]
  );

  const [addCollectionsModalVisible, setAddCollectionsModalVisible] = useState(
    false
  );
  const openAddCollectionsModal = useCallback(() => {
    setAddCollectionsModalVisible(true);
  }, []);
  const closeAddCollectionsModal = useCallback(() => {
    setAddCollectionsModalVisible(false);
  }, []);

  const [category, setCategory] = useState(null);
  const [createCategoryModalVisible, setCreateCategoryModalVisible] = useState(
    false
  );
  const openCreateCategoryModal = useCallback(() => {
    setCreateCategoryModalVisible(true);
  }, []);
  const closeCreateCategoryModal = useCallback(() => {
    setCreateCategoryModalVisible(false);
    setCategory(null);
  }, []);

  const handleCollectionsAdded = useCallback(() => {
    setSharedCollectionsUpdated(true);
  }, []);

  const [
    onlyActiveCollectionsVisible,
    setOnlyActiveCollectionsVisible,
  ] = useState(!session?.user?.profile?.uiClientFlags?.groupPage?.showInactive);

  const updateOnlyActiveCollectionsVisible = useCallback((v) => {
    setOnlyActiveCollectionsVisible(v);
    setSharedCollectionsUpdated(true);
  }, []);

  const [categories, setCategories] = useState(
    session.user?.profile?.uiClientFlags?.groupPage?.categories || []
  );

  const updateCategories = useFetcher(
    GroupPageResource.updateCategoriesShape()
  );

  const handleCategoryCreateFormSubmit = useCallback(
    async (params) => {
      const category = categories.find((cat) => cat.uuid === params.uuid);

      if (!category) {
        categories.unshift({
          ...params,
        });
      } else {
        category.name = params.name;
      }

      setCategories([...categories]);
      await updateCategories(null, {
        categories,
      });
    },
    [categories, updateCategories]
  );

  const unCategorizedSharedCollections = useMemo(
    () =>
      sharedCollections.filter(
        (collection) =>
          !collection.groupPage?.categoryId ||
          !(categories || []).find(
            (category) => category.uuid === collection.groupPage.categoryId
          )
      ),
    [categories, sharedCollections]
  );

  const updateGroupPageSettings = useFetcher(
    GroupPageResource.updateSettingsShape()
  );

  const [to, setTo] = useState(null); // category id

  const onSortableUnCategorizedCollectionsChange = useCallback(
    async (updatedUnCategorizedCollectionIds) => {
      if (
        updatedUnCategorizedCollectionIds.length >
        unCategorizedSharedCollections.length
      ) {
        setTo({
          categoryUuid: null,
          collectionId: Number(
            updatedUnCategorizedCollectionIds.find(
              (collectionId) =>
                !unCategorizedSharedCollections.find(
                  (unCategorizedSharedCollection) =>
                    unCategorizedSharedCollection.id === collectionId
                ) &&
                sharedCollections.find(
                  (sharedCollection) =>
                    sharedCollection.id === Number(collectionId)
                )
            )
          ),
        });
      }
      const {
        user: {
          profile: {uiClientFlags},
        },
      } = await updateGroupPageSettings(
        {},
        {
          uncategorizedCollectionOrder: updatedUnCategorizedCollectionIds.map(
            (id) => Number(id)
          ),
        }
      );
      if (uiClientFlags?.groupPage?.uncategorizedCollectionOrder) {
        setUnCategorizedCollectionOrder(
          uiClientFlags.groupPage.uncategorizedCollectionOrder
        );
      }
    },
    [unCategorizedSharedCollections, sharedCollections, updateGroupPageSettings]
  );

  const updateCollection = useFetcher(CollectionResource.partialUpdateShape());

  useEffect(() => {
    const updateCategoryId = async (to) => {
      await updateCollection(
        {
          id: to.collectionId,
        },
        {
          options: {
            groupPage: {
              shared: true,
              categoryId: to.categoryUuid,
            },
          },
        }
      );

      setSharedCollectionsUpdated(true);
    };

    if (to?.collectionId) {
      const collection = sharedCollections.find(
        (sharedCollection) => sharedCollection.id === to.collectionId
      );
      collection.groupPage.categoryId = to.categoryUuid;
      setSharedCollections(sharedCollections.slice());
      setTo(null);

      updateCategoryId(to);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to]);

  const removeCategory = useCallback(
    async (sharedCategoryCollections, category) => {
      if (sharedCategoryCollections.length > 0) {
        await unShareCollections(
          {
            collectionIds: sharedCategoryCollections.map(
              (collection) => collection.id
            ),
          },
          {}
        );
      }

      const futureCategories = categories.filter(
        (cat) => cat.uuid !== category.uuid
      );
      setCategories(futureCategories);
      await updateCategories(null, {
        categories: futureCategories,
      });

      setSharedCollectionsUpdated(true);
    },
    [categories, unShareCollections, updateCategories]
  );

  const editCategory = useCallback(
    (category) => {
      setCategory(category);
      openCreateCategoryModal();
    },
    [openCreateCategoryModal]
  );

  const [shareLinkModalVisible, setShareLinkModalVisible] = useState(false);
  const openShareLinkModal = useCallback(() => {
    setShareLinkModalVisible(true);
  }, []);
  const closeShareLinkModal = useCallback(() => {
    setShareLinkModalVisible(false);
  }, []);

  const bannerSettings = useMemo(
    () => session?.user?.profile?.uiClientFlags?.groupPage,
    [session]
  );

  const handleChangeCategories = useCallback(
    async (sortedCategoriesUuids) => {
      const updatedCategories = sortedCategoriesUuids.map(
        (sortedCategoriesUuid) =>
          categories.find((cat) => cat.uuid === sortedCategoriesUuid)
      );

      setCategories(updatedCategories);
      await updateCategories(null, {
        categories: updatedCategories,
      });
    },
    [categories, updateCategories]
  );

  const onCollectionOrderChange = useCallback(
    async (category, sortedCollectionIds) => {
      const updatedCategories = categories.map((aCategory) => {
        if (category.uuid === aCategory.uuid) {
          return {
            ...aCategory,
            collectionOrder: sortedCollectionIds,
          };
        }
        return aCategory;
      });

      setCategories(updatedCategories);
      await updateCategories(null, {
        categories: updatedCategories,
      });
    },
    [categories, updateCategories]
  );

  const mePageLink = `/me/${session?.user?.id}`;

  return (
    <MediaContext.Consumer>
      {(media) => (
        <>
          {!media.isMobile && (
            <CollectionsLayout>
              <h1 className="title avenir-roman dark-grey">Group Page</h1>
              <h2 className="sub-title avenir-roman gray-700">
                A custom landing page for your group
              </h2>
              <p className="lh1 light-grey mb4">
                Let your community click and view all of your collections from
                one link with a Group Page. Customize your Group Page and choose
                the collections to display. Easy and efficient.&nbsp;
                <a
                  href={articleLink}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="accent"
                >
                  Learn more.
                </a>
              </p>
              <div className="flex-fill horizontal-flex">
                <div className="flex-fill vertical-flex main">
                  <div className="card mb3">
                    <div className="horizontal-flex items-center pa3-5">
                      <div className="flex-fill vertical-flex">
                        <div className="card-title text-16 avenir-roman gray-350">
                          Custom banner
                        </div>
                        <div className="text-14 avenir-light dark-grey">
                          Add a graphic, tagline and social links to your Group
                          Page.
                        </div>
                      </div>
                      <Link to="/collections/group/edit-banner">
                        <CommonButton
                          className="pt-14 avenir-roman bg-tint white"
                          style={hCardButtonStyle}
                        >
                          Edit Banner
                        </CommonButton>
                      </Link>
                    </div>
                    {bannerSettings && <hr />}
                    {bannerSettings && <BannerHeader />}
                  </div>
                  <div className="card mb3-25">
                    <div className="horizontal-flex items-center pa3-5 bb b--gray">
                      <div className="flex-fill vertical-flex">
                        <div className="card-title text-16 avenir-roman gray-350">
                          Collections
                        </div>
                        <div className="text-14 avenir-light dark-grey">
                          Add collections to your Group Page. Drag and drop to
                          rearrange.
                        </div>
                      </div>
                      <CommonButton
                        className="pt-14 avenir-roman bg-tint white"
                        style={hCardButtonStyle}
                        onClick={openAddCollectionsModal}
                      >
                        Add Collections
                      </CommonButton>
                    </div>
                    {sharedCollections.length > 0 && (
                      <div className="pv3 ph3-5 flex justify-end">
                        <CommonButton
                          className="pt-12 bg-gray-250 dark-grey"
                          onClick={openCreateCategoryModal}
                        >
                          Create Category
                        </CommonButton>
                      </div>
                    )}
                  </div>

                  <ReactSortable
                    options={{
                      ...sortableOptions,
                    }}
                    onChange={handleChangeCategories}
                    group="categories"
                  >
                    {categories.map((category) => (
                      <div
                        key={category.uuid}
                        data-id={category.uuid}
                        className={cx(dragHandle, 'mb3 move')}
                      >
                        <CollectionListCategory
                          category={category}
                          sharedCollections={sharedCollections}
                          folders={folders}
                          removeCollection={removeCollection}
                          setTo={setTo}
                          removeCategory={removeCategory}
                          editCategory={editCategory}
                          onCollectionOrderChange={onCollectionOrderChange}
                        />
                      </div>
                    ))}
                  </ReactSortable>
                  {unCategorizedSharedCollections.length > 0 ? (
                    <div className="card pv4 ph3-5 dark-grey">
                      <ReactSortable
                        options={{
                          ...sortableOptions,
                          group: 'collections',
                        }}
                        onChange={onSortableUnCategorizedCollectionsChange}
                      >
                        {unCategorizedCollectionOrder
                          .filter((collectionId) =>
                            unCategorizedSharedCollections.find(
                              (c) => c.id === collectionId
                            )
                          )
                          .map((collectionId, idx) => {
                            const collection = unCategorizedSharedCollections.find(
                              (c) => c.id === collectionId
                            );
                            return (
                              <div
                                key={collection.id}
                                data-id={collection.id}
                                className={cx(dragHandle, 'move')}
                              >
                                <CollectionListItem
                                  collection={collection}
                                  folders={folders}
                                  removeCollection={removeCollection}
                                  className={idx ? 'mt3-25' : ''}
                                />
                              </div>
                            );
                          })}
                        {unCategorizedSharedCollections
                          .filter(
                            (collection) =>
                              !unCategorizedCollectionOrder.includes(
                                collection.id
                              )
                          )
                          .map((collection, idx) => (
                            <div
                              key={collection.id}
                              data-id={collection.id}
                              className={cx(dragHandle, 'move')}
                            >
                              <CollectionListItem
                                collection={collection}
                                folders={folders}
                                removeCollection={removeCollection}
                                className={
                                  idx || unCategorizedCollectionOrder.length > 0
                                    ? 'mt3-25'
                                    : ''
                                }
                              />
                            </div>
                          ))}
                      </ReactSortable>
                    </div>
                  ) : sharedCollections.length > 0 ? (
                    <div className="empty-collections card b-light-grey ba br2 mt3-25">
                      <ReactSortable
                        options={{
                          ...sortableOptions,
                          group: 'collections',
                        }}
                        onChange={onSortableUnCategorizedCollectionsChange}
                      >
                        <h4 className="avenir-light text-16 medium-grey tc">
                          Drag and drop collections here
                        </h4>
                      </ReactSortable>
                    </div>
                  ) : null}
                </div>
                <RightSide
                  sharedCollections={sharedCollections}
                  openAddCollectionsModal={openAddCollectionsModal}
                  openShareLinkModal={openShareLinkModal}
                />
                {addCollectionsModalVisible && (
                  <AddCollectionsModal
                    onClose={closeAddCollectionsModal}
                    onCollectionsAdded={handleCollectionsAdded}
                    sharedCollections={sharedCollections}
                    onlyActiveCollectionsVisible={onlyActiveCollectionsVisible}
                    updateOnlyActiveCollectionsVisible={
                      updateOnlyActiveCollectionsVisible
                    }
                  />
                )}
              </div>
            </CollectionsLayout>
          )}
          {media.isMobile && (
            <CollectionsMobileLayout>
              <div className="pa3-5">
                <h1 className="title avenir-roman dark-grey">Group Page</h1>
                <h2 className="sub-title mobile avenir-roman gray-700">
                  A custom landing page for your group
                </h2>
                <p className="lh1 light-grey mb4">
                  Let your community click and view all of your collections from
                  one link with a Group Page. Customize your Group Page and
                  choose the collections to display. Easy and efficient.&nbsp;
                  <a
                    href={articleLink}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="accent"
                  >
                    Learn more.
                  </a>
                </p>
                <div className="horizontal-flex">
                  <div className="flex-fill">
                    <Link to={mePageLink} target="_blank">
                      <CommonButton className="pt-14 bg-tint white w-100">
                        Preview
                      </CommonButton>
                    </Link>
                  </div>
                  <div className="flex-fill ml2-5">
                    {isNotTeamUser ? (
                      <Link to="/collections/group/i/plans">
                        <CommonButton
                          className="pt-14 bg-brand white w-100"
                          onClick={null}
                        >
                          Upgrade to Share
                        </CommonButton>
                      </Link>
                    ) : (
                      <CommonButton
                        className="pt-14 bg-brand white w-100"
                        onClick={openShareLinkModal}
                      >
                        Share
                      </CommonButton>
                    )}
                  </div>
                </div>
              </div>
              <div className="card mb3">
                <div className="flex-fill vertical-flex">
                  <div className="pa3-5">
                    <div className="card-title text-16 avenir-roman gray-350">
                      Custom banner
                    </div>
                    <div className="text-14 avenir-light dark-grey">
                      Add a graphic, tagline and social links to your Group
                      Page.
                    </div>
                    <div className="mt3">
                      <Link to="/collections/group/edit-banner">
                        <CommonButton
                          className="pt-14 avenir-roman bg-tint white"
                          style={hCardButtonStyle}
                        >
                          Edit Banner
                        </CommonButton>
                      </Link>
                    </div>
                  </div>
                  {bannerSettings && <hr />}
                  {bannerSettings && <BannerHeader />}
                </div>
              </div>
              <div className="card mb3-5">
                <div className="horizontal-flex items-center pa3-5 bb b--gray">
                  <div className="flex-fill vertical-flex">
                    <div className="card-title text-16 avenir-roman gray-350">
                      Collections
                    </div>
                    <div className="text-14 avenir-light dark-grey">
                      Add collections to your Group Page. Drag and drop to
                      rearrange.
                    </div>
                    <CommonButton
                      className="pt-14 avenir-roman bg-tint white mt3"
                      style={hCardButtonStyle}
                      onClick={openAddCollectionsModal}
                    >
                      Add Collections
                    </CommonButton>
                  </div>
                </div>
                <CommonButton
                  className="pt-12 bg-gray-250 dark-grey ma3-5"
                  onClick={openCreateCategoryModal}
                >
                  Create Category
                </CommonButton>
              </div>
              <ReactSortable
                options={{
                  ...sortableOptions,
                }}
                onChange={handleChangeCategories}
                group="categories"
              >
                {categories.map((category) => (
                  <div
                    key={category.uuid}
                    data-id={category.uuid}
                    className={cx(dragHandle, 'mb3 move')}
                  >
                    <CollectionListCategoryMobile
                      category={category}
                      sharedCollections={sharedCollections}
                      folders={folders}
                      removeCollection={removeCollection}
                      setTo={setTo}
                      removeCategory={removeCategory}
                      editCategory={editCategory}
                      onCollectionOrderChange={onCollectionOrderChange}
                    />
                  </div>
                ))}
              </ReactSortable>

              {unCategorizedSharedCollections.length > 0 ? (
                <div className="card pv4 ph3-5 dark-grey">
                  <ReactSortable
                    options={{
                      ...sortableOptions,
                      group: 'collections',
                    }}
                    onChange={onSortableUnCategorizedCollectionsChange}
                  >
                    {unCategorizedCollectionOrder.map((collectionId, idx) => {
                      const collection = unCategorizedSharedCollections.find(
                        (c) => c.id === collectionId
                      );
                      return (
                        <div
                          key={collection.id}
                          data-id={collection.id}
                          className={cx(dragHandle, 'move')}
                        >
                          <CollectionListItemMobile
                            collection={collection}
                            folders={folders}
                            removeCollection={removeCollection}
                            className={idx ? 'mt3-25' : ''}
                          />
                        </div>
                      );
                    })}
                    {unCategorizedSharedCollections
                      .filter(
                        (collection) =>
                          !unCategorizedCollectionOrder.includes(collection.id)
                      )
                      .map((collection, idx) => (
                        <div
                          key={collection.id}
                          data-id={collection.id}
                          className={cx(dragHandle, 'move')}
                        >
                          <CollectionListItemMobile
                            collection={collection}
                            folders={folders}
                            removeCollection={removeCollection}
                            className={
                              idx || unCategorizedCollectionOrder.length > 0
                                ? 'mt3-25'
                                : ''
                            }
                          />
                        </div>
                      ))}
                  </ReactSortable>
                </div>
              ) : sharedCollections.length > 0 ? (
                <div className="empty-collections card b-light-grey ba br2 mt3-25">
                  <ReactSortable
                    options={{
                      ...sortableOptions,
                      group: 'collections',
                    }}
                    onChange={onSortableUnCategorizedCollectionsChange}
                  >
                    <h4 className="avenir-light text-16 medium-grey tc">
                      Drag and drop collections here
                    </h4>
                  </ReactSortable>
                </div>
              ) : null}
              {addCollectionsModalVisible && (
                <AddCollectionsModalMobile
                  onClose={closeAddCollectionsModal}
                  onCollectionsAdded={handleCollectionsAdded}
                  sharedCollections={sharedCollections}
                  onlyActiveCollectionsVisible={onlyActiveCollectionsVisible}
                  updateOnlyActiveCollectionsVisible={
                    updateOnlyActiveCollectionsVisible
                  }
                />
              )}
            </CollectionsMobileLayout>
          )}
          {createCategoryModalVisible && (
            <CreateCategoryModal
              onSubmit={handleCategoryCreateFormSubmit}
              onClose={closeCreateCategoryModal}
              category={category}
            />
          )}
          {shareLinkModalVisible && (
            <ShareLinkModal onDismiss={closeShareLinkModal} />
          )}
          <style jsx>{`
            .main {
              margin-right: 1.25rem;
            }
            .card .card-title {
              margin-bottom: 0.75rem;
            }
            .magnifier {
              position: absolute;
              display: flex;
              justify-content: center;
              align-items: center;
              opacity: 0.5;
              width: 16px;
              height: 16px;
              top: 6px;
              right: 16px;
            }
            .search-results-wrapper {
              border: 1px solid #dedede;
            }
            .search-result:not(:last-child) {
              margin-bottom: 8px;
            }
            hr {
              margin: 0;
              border-color: #eaedf3;
            }
          `}</style>
        </>
      )}
    </MediaContext.Consumer>
  );
};

const EnhancedGroupPage = React.memo(GroupPage);

export default EnhancedGroupPage;
