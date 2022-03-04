import {compose} from 'recompose';
import {connect} from 'react-redux';
import {destroy} from 'redux-form';
import {FaCheck} from 'react-icons/fa';
import {generatePath, Link, Route, Switch} from 'react-router-dom';
import {get} from 'lodash';
import CopyToClipboard from 'react-copy-to-clipboard';
import moment from 'moment';
import posed, {PoseGroup} from 'react-pose';
import React from 'react';

import {CollectionCenterLayout} from 'layout';
import {
  CommonButton,
  CommonDropdownSelect,
  CloseCollectionModal,
  Status,
  TopTabBar,
} from 'elements';
import {GET_FORMS} from 'redux/modules/forms/constants';
import {GET_ITEMS} from 'redux/modules/items/constants';
import {GET_MEMBERS} from 'redux/modules/members/constants';
import {GET_SELLERS_FORMS} from 'redux/modules/sellersForms/constants';
import {getForms} from 'redux/modules/forms/actions';
import {getItems} from 'redux/modules/items/actions';
import {getMembers} from 'redux/modules/members/actions';
import {getSellersForms} from 'redux/modules/sellersForms/actions';
import {successAlert} from 'redux/modules/growl/actions';
import apiClient from 'helpers/apiClient';

import {currency} from 'helpers/numbers';
import {GET_COLLECTION} from 'redux/modules/collections/constants';
import {GET_DISCOUNTS} from 'redux/modules/discounts/constants';
import {
  PAYMENTS_PER_PAGE,
  GET_PAYMENTS,
} from 'redux/modules/payments/constants';
import {asyncConnect, collectionsPathHelper} from 'helpers';
import {
  getCollection,
  updateCollection,
} from 'redux/modules/collections/actions';
import {getDiscounts} from 'redux/modules/discounts/actions';
import {getPayments} from 'redux/modules/payments/actions';

import {WithdrawButtonContainer} from './containers';
import {CollectionPaymentsStats} from './CollectionManagePaymentsTab/CollectionManagePaymentsTable/components';

import CollectionManagePaymentsTab from './CollectionManagePaymentsTab';
import CollectionManageItemsTab from './CollectionManageItemsTab';
import CollectionManageFormsTab from './CollectionManageFormsTab';
import CollectionManageShippingTab from './CollectionManageShippingTab';
import CollectionManageVisitorsTab from './CollectionManageVisitorsTab';

const ITEMS_PER_PAGE = 25;
const PoseContainer = posed.div();
const openPageInNewTab = (pageUrl) => {
  const reportWindow = window.open(pageUrl, 'blank');

  reportWindow.focus();
};
class CollectionManagePage extends React.PureComponent {
  state = {
    modalVisible: false,
    isFormsOnly: false,
  };

  componentDidMount() {
    this.redirectToInitialTab();
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.isFormsOnly !== this.state.isFormsOnly) {
      this.redirectToInitialTab();
    }
  }

  redirectToInitialTab = () => {
    if (this.props.match.path === '/collection/:owner/:collection/manage') {
      if (this.state.isFormsOnly) {
        this.props.history.push(
          generatePath('/collection/:owner/:collection/manage/forms', {
            owner: this.props.match.params.owner,
            collection: this.props.match.params.collection,
          })
        );
      } else {
        this.props.history.push(
          generatePath('/collection/:owner/:collection/manage/payments', {
            owner: this.props.match.params.owner,
            collection: this.props.match.params.collection,
          })
        );
      }
    }
  };

  managerAccessEditLink = ({label, to}) => (
    <div className="flex">
      <p className="avenir-light dark-grey text-14 line-24">{label}</p>

      <Link to={to} className="tint ml1 text-14 line-24">
        edit
      </Link>
    </div>
  );

  handleAcceptInPersonPayment = () => {
    this.props.history.push(`/c/${this.props.collection.slug}`, {
      addPayment: true,
    });
  };

  downloadApiFile = async (url, fileName) => {
    await apiClient.fetchAndSave({url, fileName});
  };

  handleClickItems = () => {
    const reportUrl = `users/tabs/${this.props.collection.id}/exports/items.xlsx`;

    this.downloadApiFile(reportUrl, `${this.props.collection.name}-items.xlsx`);
  };

  handleClickSummary = () => {
    const {collection} = this.props;
    const reportUrl = `users/tabs/${collection.id}/exports/payments.xlsx`;
    this.downloadApiFile(reportUrl, `${collection.name}-payments.xlsx`);
  };

  handleClickVisitorSummary = () => {
    const {collection} = this.props;
    const reportUrl = `users/tabs/${collection.id}/exports/visitors.xlsx`;
    this.downloadApiFile(reportUrl, `${collection.name}-visitors.xlsx`);
  };

  handleClickOrders = () => {
    const {collection} = this.props;
    const path = collectionsPathHelper(collection, 'orders-report');
    const reportUrl = `${window.location.protocol}//${
      window.location.hostname
    }${window.location.port ? `:${window.location.port}` : ''}${path}`;

    openPageInNewTab(reportUrl);
  };

  render() {
    if (this.props.getCollectionStatus !== 'success') {
      return (
        <div className="w-100 vh-100 flex justify-center items-center">
          <Status status="pending" />
        </div>
      );
    }
    const {
      collection,
      location,
      discountsCount,
      getPaymentsStatus,
      getItemsStatus,
      itemsData,
      paymentsData,
      membersData,
      isFormsAvailable,
      getFormsStatus,
      formsData,
    } = this.props;
    const {payments} = paymentsData;
    const {modalVisible} = this.state;
    const collectionUrl = location.pathname.slice(
      0,
      location.pathname.lastIndexOf('manage') - 1
    );
    const options = [
      {
        title: 'Active',
        value: 'active',
        onClick: () => {
          this.props.onUpdateCollection({
            id: collection.id,
            closed_at: null,
          });
        },
      },
      {
        title: 'Closed',
        value: 'closed',
        onClick: () => {
          this.setState((prevState) => ({...prevState, modalVisible: true}));
        },
      },
    ];

    const now = new Date();
    const isTimeAvailable =
      Boolean(collection?.close_datetime) &&
      new Date(collection?.close_datetime) > now;
    const isStarted =
      isTimeAvailable && new Date(collection?.open_datetime) < now;
    const hasAccessCode = Boolean(collection?.access_code);
    const isVisitorReport = Boolean(collection?.payer_identify);

    const disableWithdraw =
      payments.length === 0 ||
      !this.props.collection ||
      !this.props.collection.access.owner;

    const managerAccess =
      this.props.collection &&
      (!this.props.collection.access ||
        this.props.collection.access.owner === false);

    const isShippingEnabled = Boolean(
      collection?.shipping_options?.shipToEnabled
    );
    const navigationItems = [
      this.state.isFormsOnly
        ? undefined
        : {
            label: 'Payments',
            pathname: collectionsPathHelper(collection, `manage/payments`),
          },
      this.state.isFormsOnly
        ? undefined
        : {
            label: 'Items',
            pathname: collectionsPathHelper(collection, `manage/items`),
          },
      isFormsAvailable
        ? {
            label: 'Forms',
            pathname: collectionsPathHelper(collection, `manage/forms`),
          }
        : undefined,
      isVisitorReport
        ? {
            label: 'Visitors',
            pathname: collectionsPathHelper(collection, `manage/visitors`),
          }
        : undefined,
      isShippingEnabled
        ? {
            label: 'Shipping',
            pathname: collectionsPathHelper(collection, `manage/shipping`),
          }
        : undefined,
    ].filter(Boolean);

    if (
      !this.state.isFormsOnly &&
      getItemsStatus === 'success' &&
      getFormsStatus === 'success' &&
      getPaymentsStatus === 'success' &&
      itemsData.items?.length === 0 &&
      formsData.forms?.length !== 0 &&
      payments?.length === 0
    ) {
      this.setState({isFormsOnly: true});
    }

    const reportFormPath = collectionsPathHelper(
      this.props.collection,
      'forms-report'
    );

    const reportOrderPath = collectionsPathHelper(
      this.props.collection,
      'orders-report'
    );

    return (
      <CollectionCenterLayout collection={collection}>
        <div className="flex min-h-100">
          <div className="flex-auto">
            <PoseGroup>
              <PoseContainer
                key={`close-collection-modal-container-${modalVisible}`}
              >
                {modalVisible && (
                  <CloseCollectionModal
                    collection={collection}
                    onDidCloseCollection={() => {
                      this.setState((prevState) => ({
                        ...prevState,
                        modalVisible: false,
                      }));
                    }}
                    onCancel={() => {
                      this.setState((prevState) => ({
                        ...prevState,
                        modalVisible: false,
                      }));
                    }}
                    onDismiss={() => {
                      this.setState((prevState) => ({
                        ...prevState,
                        modalVisible: false,
                      }));
                    }}
                  />
                )}
              </PoseContainer>
            </PoseGroup>
            <div className="wrapper ml-auto mr-auto pt4 ph3">
              <h1 className="dark-grey avenir-roman mb3">Manage</h1>
              <div className="">
                <div className="manage-element bg-white ba b--gray-300 br2 shadow-light mr3-ns">
                  <div className="flex-column justify-between flex flex-column h-100">
                    <div>
                      <h1 className="mb2 f7 ttu medium-grey avenir-roman">
                        Link
                      </h1>
                      {this.props.session?.capabilities?.plan === 'pause' ? (
                        <div className="flex mb2">
                          <p className="avenir-light dark-grey text-14">
                            This collection is paused. Upgrade your account to
                            reactivate.
                          </p>
                        </div>
                      ) : (
                        this.props.collection && (
                          <div className="flex mb2">
                            <p className="avenir-light dark-grey text-14">
                              https://{this.props.collection.slug}.cheddarup.com
                            </p>
                            <CopyToClipboard
                              text={`https://${this.props.collection.slug}.cheddarup.com`}
                              onCopy={() => {
                                this.props.onSuccessAlert({
                                  icon: FaCheck,
                                  title: 'Success',
                                  body: 'Link copied',
                                });
                              }}
                            >
                              <CommonButton className="ml2 text-14 pa0 bg-transparent tint">
                                Copy
                              </CommonButton>
                            </CopyToClipboard>
                          </div>
                        )
                      )}
                    </div>
                    <div>
                      {this.props.session?.capabilities?.plan === 'pause' ? (
                        <Link to={`${location.pathname}/i/plans`}>
                          <CommonButton className="bg-tint white pt-14 mv2 mv0-ns">
                            Upgrade
                          </CommonButton>
                        </Link>
                      ) : (
                        <CommonDropdownSelect
                          className="dn db-ns mr3 bg-white ba b--gray-300"
                          backgroundColor="white"
                          title={collection?.closed_at ? 'Closed' : 'Active'}
                          options={options}
                          width={150}
                          dropdownProps={{width: 209}}
                          style={{marginTop: 'auto'}}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="manage-element bg-white ba b--gray-300 shadow-light mr3">
                  {this.props.collection && (
                    <div className="stats">
                      <div className="flex flex-column justify-between">
                        <CollectionPaymentsStats
                          justTitle
                          collection={this.props.collection}
                          payments={this.props.payments}
                        />
                        <div className="total-collected-btn flex responsive flex-ipad-responsive">
                          <div>
                            {get(
                              this.props.collection,
                              'access.owner',
                              false
                            ) && (
                              <Link
                                to={`${location.pathname.replace(
                                  '/payments',
                                  ''
                                )}/payments/i${collectionsPathHelper(
                                  collection,
                                  'summary'
                                )}`}
                              >
                                <CommonButton
                                  className="bg-tint white pt-14 mv2 mv0-ns"
                                  style={{width: 145}}
                                >
                                  Balance Summary
                                </CommonButton>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="min-h-100 br w-0 b--gray-300" />
                      <div className="flex flex-column justify-between">
                        {this.props.collection &&
                          (managerAccess ? (
                            <>
                              <h1 className="mb2 f7 ttu medium-grey avenir-roman">
                                Manager Access
                              </h1>
                              <p className="text-16 gray-600 line-24 avenir-roman">
                                {this.props.collection.organizer &&
                                  this.props.collection.organizer.name}
                              </p>
                              <a
                                target="_blank"
                                href="https://support.cheddarup.com/hc/en-us/articles/360035226692-How-to-accept-a-manager-invite#commonquestions"
                                rel="noopener noreferrer"
                                className="text-12 tint mb4"
                              >
                                Learn more
                              </a>
                            </>
                          ) : (
                            <>
                              <h1 className="mb2 f7 ttu medium-grey avenir-roman">
                                Available to Withdraw
                              </h1>
                              <p
                                className="mb2 avenir-light dark-grey"
                                style={{fontSize: '30px'}}
                              >
                                {currency(
                                  collection?.withdrawal_balance_available || 0
                                )}
                              </p>
                              <WithdrawButtonContainer
                                disabled={disableWithdraw}
                                style={{width: 145}}
                              />
                            </>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
                {isTimeAvailable ||
                hasAccessCode ||
                (discountsCount && collection.discounts_enabled) ||
                isVisitorReport ? (
                  <div className="side-element bg-white ba b--gray-300 br2 shadow-light">
                    <div className="flex-column justify-between flex flex-column h-100">
                      <div>
                        <h1 className="mb2 f7 ttu medium-grey avenir-roman">
                          Access and Discount Settings
                        </h1>
                        {isTimeAvailable &&
                          !isStarted &&
                          this.managerAccessEditLink({
                            label: `Timing: Starts ${moment(
                              collection?.open_datetime
                            ).format('MM/DD/YYYY hh:mm A')}`,
                            to: `${collectionUrl}/settings/access-and-timing`,
                          })}
                        {isTimeAvailable &&
                          isStarted &&
                          this.managerAccessEditLink({
                            label: `Timing: Ends ${moment(
                              collection?.close_datetime
                            ).format('MM/DD/YYYY hh:mm A')}`,
                            to: `${collectionUrl}/settings/access-and-timing`,
                          })}
                        {hasAccessCode &&
                          this.managerAccessEditLink({
                            label: 'Access: Requires Code',
                            to: `${collectionUrl}/settings/access-and-timing`,
                          })}
                        {discountsCount && collection.discounts_enabled
                          ? this.managerAccessEditLink({
                              label: `Discounts: ${discountsCount} Code${
                                discountsCount > 1 ? 's' : ''
                              }`,
                              to: `${collectionUrl}/settings/shipping-and-discounts`,
                            })
                          : ''}
                        {isVisitorReport &&
                          this.managerAccessEditLink({
                            label: 'Visitor Report: Enabled',
                            to: `${collectionUrl}/settings/access-and-timing`,
                          })}
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="overflow-x-auto">
                <TopTabBar
                  forceDesktopStyling
                  className="bg-gray-100"
                  currentPathname={location.pathname}
                  navigationItems={navigationItems}
                />

                <Switch>
                  <Route path="/collection/:owner/:collection/manage/payments">
                    <CollectionManagePaymentsTab
                      collection={this.props.collection}
                      collectionId={this.props.match.params.collection}
                      location={this.props.location}
                      history={this.props.history}
                      getPaymentsStatus={this.props.getPaymentsStatus}
                      handleAcceptInPersonPayment={
                        this.handleAcceptInPersonPayment
                      }
                      handleClickSummary={this.handleClickSummary}
                      handleClickOrders={this.handleClickOrders}
                      {...paymentsData}
                    />
                  </Route>
                  <Route path="/collection/:owner/:collection/manage/items">
                    <CollectionManageItemsTab
                      collection={this.props.collection}
                      collectionId={this.props.match.params.collection}
                      location={this.props.location}
                      history={this.props.history}
                      getItemsStatus={this.props.getItemsStatus}
                      handleClickItems={this.handleClickItems}
                      {...itemsData}
                    />
                  </Route>
                  <Route path="/collection/:owner/:collection/manage/forms">
                    <CollectionManageFormsTab
                      collection={this.props.collection}
                      collectionId={this.props.match.params.collection}
                      location={this.props.location}
                      history={this.props.history}
                      getFormsStatus={getFormsStatus}
                      handleAcceptInPersonPayment={
                        this.handleAcceptInPersonPayment
                      }
                      reportFormPath={reportFormPath}
                      {...formsData}
                    />
                  </Route>
                  <Route path="/collection/:owner/:collection/manage/visitors">
                    <CollectionManageVisitorsTab
                      collection={this.props.collection}
                      collectionId={this.props.match.params.collection}
                      location={this.props.location}
                      history={this.props.history}
                      getVisitorsStatus={this.props.getMembersStatus}
                      handleClickVisitorSummary={this.handleClickVisitorSummary}
                      {...membersData}
                    />
                  </Route>
                  <Route path="/collection/:owner/:collection/manage/shipping">
                    <CollectionManageShippingTab
                      collection={this.props.collection}
                      collectionId={this.props.match.params.collection}
                      location={this.props.location}
                      history={this.props.history}
                      reportOrderPath={reportOrderPath}
                    />
                  </Route>
                </Switch>
              </div>
            </div>
            <style jsx>{`
              @media (max-width: 1024px) and (min-width: 30em) {
                .flex-ipad-responsive {
                  -webkit-box-orient: vertical;
                  -webkit-box-direction: normal;
                  -ms-flex-direction: column;
                  -webkit-flex-direction: column;
                  -ms-flex-direction: column;
                  flex-direction: column;
                }
              }
              .wrapper {
                max-width: 1364px;
                width: 100%;
              }
              .manage-element {
                display: inline-block;
                max-width: 100%;
                width: 29.375rem;
                padding: 1.6875rem;
                height: 10.625rem;
                margin-bottom: 1.5rem;
              }
              .side-element {
                display: inline-block;
                max-width: 100%;
                width: 20rem;
                min-height: 10.625rem;
                padding: 1.6875rem;
              }
              .stats {
                display: flex;
                justify-content: space-between;
                height: 100%;
              }
              stats > div:first-child,
              stats > div:last-child {
                padding: 1.6875rem;
                flex: 1;
              }
              @media (max-width: 30em) {
                .manage-element {
                  height: auto;
                }
                .stats {
                  flex-direction: column;
                  justify-content: space-between;
                  height: 100%;
                }
                .stats > div:last-child {
                  margin-top: 3rem;
                }
              }
            `}</style>
          </div>
        </div>
      </CollectionCenterLayout>
    );
  }
}

const enhance = compose(
  asyncConnect((props) => {
    const collection = props.match.params.collection;
    const deps = [
      {
        key: GET_DISCOUNTS,
        payload: {
          collection: props.match.params.collection,
        },
        promise: getDiscounts,
      },
      {
        key: GET_FORMS,
        promise: getForms,
        payload: {collection},
      },
      {
        key: GET_SELLERS_FORMS,
        promise: getSellersForms,
      },
    ];
    const state = props.store.getState();
    const itemsInState = get(state, 'items.items', []);

    const loadItems =
      loadCollection ||
      itemsInState.length === 0 ||
      get(itemsInState[0], 'tab_id', 0).toString() !== collection.toString();

    if (loadItems) {
      deps.push({
        key: GET_ITEMS,
        promise: getItems,
        payload: {
          collection,
          query: {
            perPage: ITEMS_PER_PAGE,
          },
        },
      });
    }
    const collectionInState = get(state, 'collections.collection.id');
    const loadCollection =
      !collectionInState ||
      collectionInState.toString() !== collection.toString();
    if (loadCollection) {
      deps.push({
        key: GET_COLLECTION,
        promise: getCollection,
        payload: {
          collection: props.match.params.collection,
        },
      });
    }
    const paymentsInState = get(state, 'payments.payments', []);
    const loadPayments =
      loadCollection ||
      paymentsInState.length === 0 ||
      get(paymentsInState[0], 'tab_id', 0).toString() !== collection.toString();

    if (loadPayments) {
      deps.push({
        key: GET_PAYMENTS,
        promise: getPayments,
        payload: {
          collection,
          query: {
            page: 1,
            perPage: PAYMENTS_PER_PAGE,
            sort: 'created_at',
            direction: 'desc',
          },
        },
      });
    }

    const membersInState = get(state, 'members.members', []);
    const loadMembers =
      loadCollection ||
      membersInState.length === 0 ||
      get(membersInState[0], 'tab_id', 0).toString() !== collection.toString();
    if (loadMembers) {
      deps.push({
        key: GET_MEMBERS,
        payload: {collection},
        promise: getMembers,
      });
    }

    return deps;
  }),
  connect(
    (state) => {
      const {payments, discounts, items, members, forms} = state;

      return {
        collection: state.collections.collection,
        banks:
          (state.bankAccounts.bankAccounts &&
            state.bankAccounts.bankAccounts.banks) ||
          [],
        paymentsData: payments || {},
        itemsData: items || {},
        discountsCount: discounts?.discounts?.length || 0,
        session: state.session,
        getCollectionStatus: state?.collections?.collection
          ? 'success'
          : state?.async?.statuses[GET_COLLECTION],
        getPaymentsStatus: state?.payments?.payments?.length
          ? 'success'
          : state?.async?.statuses[GET_PAYMENTS],
        getItemsStatus: state?.items?.items?.length
          ? 'success'
          : state?.async?.statuses[GET_ITEMS],
        getMembersStatus: state?.members?.members?.length
          ? 'success'
          : state?.async?.statuses[GET_MEMBERS],
        getFormsStatus: state?.forms?.forms?.length
          ? 'success'
          : state?.async?.statuses[GET_FORMS],
        membersData: members || {},
        isFormsAvailable: Boolean(forms?.forms?.length),
        formsData: forms,
      };
    },
    (dispatch) => ({
      getPayments,
      destroy,
      onSuccessAlert: (payload) => dispatch(successAlert(payload)),
      onUpdateCollection: (payload) => dispatch(updateCollection(payload)),
    })
  )
);

const EnhancedCollectionManagePage = enhance(CollectionManagePage);

export default EnhancedCollectionManagePage;
