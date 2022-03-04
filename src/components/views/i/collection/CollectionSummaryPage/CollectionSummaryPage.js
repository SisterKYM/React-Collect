import {compose} from 'recompose';
import {useSelector} from 'react-redux';
import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import moment from 'moment';

import {asyncConnect} from 'helpers';
import {colors} from 'theme/constants';
import {CommonButton, CommonModal, Status} from 'elements';
import {currency} from 'helpers/numbers';
import {Elements} from 'elements/Stripe';
import {GET_COLLECTION_DEPOSITS} from 'redux/modules/collectionDeposits/constants';
import {GET_COLLECTION} from 'redux/modules/collections/constants';
import {GET_WITHDRAWALS} from 'redux/modules/withdrawals/constants';
import {getCollection} from 'redux/modules/collections/actions';
import {getCollectionDeposits} from 'redux/modules/collectionDeposits/actions';
import {getWithdrawals} from 'redux/modules/withdrawals/actions';
import {ReactComponent as CollectionSummaryIcon} from 'theme/images/CollectionSummary.svg';
import {ReactComponent as FundCollectionIcon} from 'theme/images/Refund.svg';
import {SecondarySidebarMobile} from 'layout/components';
import config from 'config';
import truncate from 'truncate';

import {useResource} from 'rest-hooks';
import PaymentResource from 'resources/PaymentResource';
import {CollectionDepositFormContainer} from './containers';
import {CollectionDeposit, PastPayout} from './components';

const CollectionSummaryPage = ({match, history}) => {
  const payments = useResource(PaymentResource.disputedListShape(), {
    collectionId: Number(match.params.collection),
  });
  const collection = useSelector((state) => state.collections.collection);
  const organizationName = useSelector(
    (state) => state.session?.organization_data?.name
  );
  const collectionName = truncate(_.get(collection, 'name', 'Untitled'), 40);
  const withdrawals = useSelector((state) => state.withdrawals.withdrawals);
  const disputedPayments =
    payments?.data?.filter(({dispute}) => Boolean(dispute)) || [];
  const collectionDeposits = useSelector(
    (state) => state.collectionDeposits.collectionDeposits
  );
  const loadStatus = useSelector(
    (state) => state.async.statuses[GET_WITHDRAWALS]
  );

  const withdrawButtonHidden =
    !_.get(collection, 'access.owner', false) ||
    collection.withdrawal_balance_available <= 0;

  const handleDismiss = React.useCallback(() => {
    const subUrl = `/i/collection/${match.params.owner}/${match.params.collection}/summary`;
    history.push(history.location.pathname.replace(subUrl, ''));
  }, [history, match.params.collection, match.params.owner]);

  const handleWithdraw = React.useCallback(() => {
    history.push('/withdraw');
  }, [history]);

  const [activeTab, setActiveTab] = React.useState('collection-summary');

  const sidebarContentElement = (
    <>
      <div
        className={cx(
          'navbar-item text-14 dark-grey avenir-roman',
          activeTab === 'collection-summary' ? 'active' : ''
        )}
        onClick={() => setActiveTab('collection-summary')}
      >
        <CollectionSummaryIcon className="nav-item-icon mr3" />
        Balance Summary
      </div>
      <div
        className={cx(
          'navbar-item text-14 dark-grey avenir-roman',
          activeTab === 'fund-collection' ? 'active' : ''
        )}
        onClick={() => setActiveTab('fund-collection')}
      >
        <FundCollectionIcon className="nav-item-icon mr3" />
        fund {config.strings.collection}
      </div>
    </>
  );

  return (
    <CommonModal
      onClickOverlay={handleDismiss}
      onDismiss={handleDismiss}
      title={collectionName}
      className="flex flex-column"
    >
      <div className="relative flex flex-auto">
        <SecondarySidebarMobile
          className="db dn-ns"
          contentContainerClassName="bg-white"
          burgerClassName="bg-light-aqua"
          burgerIconColor={colors.darkerGray}
        >
          {sidebarContentElement}
        </SecondarySidebarMobile>
        <div className="dn db-ns w-25 side-navbar">{sidebarContentElement}</div>
        <div className="w-100 w-75-ns">
          {activeTab === 'collection-summary' ? (
            <div className="collection-summary ph3 pv4">
              {loadStatus !== 'success' || !collection ? (
                <div className="flex pa5 justify-center items-center">
                  <Status status={loadStatus} />
                </div>
              ) : (
                <>
                  <div className="avenir-roman">
                    <div className="pv-20 bb b--gray-300 dark-grey">
                      <div className="flex justify-between f6">
                        <div>Total Collected</div>
                        <div>{currency(collection.payments_total || 0)}</div>
                      </div>
                    </div>
                    <div className="pv-20 bb b--gray-300 dark-grey">
                      <div className="flex justify-between f6 mb2">
                        <div>Cash or Check</div>
                        <div>-{currency(collection.offline_total || 0)}</div>
                      </div>
                      <div className="f7">
                        <div className="mw6 flex mb2">
                          <div className="w-25 w-20-ns">Pending:</div>
                          <div className="w-25 w-20-ns">
                            {currency(collection.offline_pending_total || 0)}
                          </div>
                        </div>
                        <div className="mw6 flex mb2">
                          <div className="w-25 w-20-ns">Received:</div>
                          <div className="w-25 w-20-ns">
                            {currency(collection.offline_confirmed_total || 0)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pv-20 bb b--gray-300 dark-grey">
                      <div className="flex justify-between f6">
                        <div>Past Payouts</div>
                        <div>
                          -{currency(collection.total_withdrawals || 0)}
                        </div>
                      </div>
                      <div className="mt1 lh-copy dark-grey">
                        {withdrawals
                          .sort((a, b) => {
                            if (a.created_at > b.created_at) {
                              return -1;
                            }
                            if (a.created_at < b.created_at) {
                              return 1;
                            }

                            return 0;
                          })
                          .map((withdrawal) => (
                            <PastPayout
                              key={withdrawal.id}
                              withdrawal={withdrawal}
                            />
                          ))}
                      </div>
                    </div>
                    {disputedPayments.length !== 0 && (
                      <div className="pv-20 bb b--gray-300 dark-grey">
                        <div className="flex justify-between f6">
                          <div>Disputes</div>
                          <div>
                            -{currency(collection.total_dispute_fees || 0)}
                          </div>
                        </div>
                        <div className="mt1 lh-copy dark-grey">
                          {disputedPayments.map((disputedPayment) => (
                            <div key={disputedPayment.id} className="f7">
                              {moment(
                                disputedPayment.dispute.created_at
                              ).format('MM/DD/YYYY')}{' '}
                              – Dispute –{' '}
                              {_.startCase(disputedPayment.dispute.status)}:{' '}
                              {currency(disputedPayment.total)} +{' '}
                              {currency(
                                disputedPayment.dispute.fee_cents / 100
                              )}{' '}
                              (dispute fee) removed from $
                              {config.strings.collection}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {collectionDeposits.length !== 0 && (
                      <div className="pv-20 bb b--gray-300 dark-grey">
                        <div className="flex justify-between f6">
                          <div>Total Funded</div>
                          <div>{currency(collection.confirmed_deposits)}</div>
                        </div>
                        <div className="mt1 lh-copy  dark-grey">
                          {collectionDeposits.map((collectionDeposit) => (
                            <CollectionDeposit
                              key={collectionDeposit.id}
                              collectionDeposit={collectionDeposit}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="pv-20 bb b--gray-300 dark-grey">
                      <div className="flex justify-between f6">
                        <div>Per Transaction Fees</div>
                        <div>-{currency(collection.total_user_fees || 0)}</div>
                      </div>
                    </div>
                    {(collection.total_platform_fees || 0) > 0 && (
                      <div className="pv-20 bb b--gray-300 dark-grey">
                        <div className="flex justify-between f6">
                          <div>{organizationName} Platform Fees</div>
                          <div>
                            -{currency(collection.total_platform_fees || 0)}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="pv-20 bb b--gray-300 dark-grey">
                      <div className="flex justify-between f6">
                        <div>Pending Balance</div>
                        <div>
                          {currency(
                            Number(collection.online_pending_total) || 0
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="pv-20 mb-15 dark-grey">
                      <div className="flex justify-end f6">
                        <div className="pr3">Available to Withdraw</div>
                        <div>
                          {currency(
                            collection.withdrawal_balance_available || 0
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      {!withdrawButtonHidden ? (
                        <CommonButton
                          className="pt-14 bg-brand white"
                          onClick={handleWithdraw}
                        >
                          Withdraw
                        </CommonButton>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            ''
          )}
          {activeTab === 'fund-collection' ? (
            <div className="fund-collection ph3 pv4">
              <p className="avenir-light dark-grey">
                Funding a ${config.strings.collection} allows you to add a
                balance to a ${config.strings.collection}. You would do this in
                order to make a refund if you&apos;ve already withdrawn all
                collected funds on this ${config.strings.collection}, or to
                correct a negative balance due to a disputed payment on this $
                {config.strings.collection}.
              </p>
              <Elements>
                <CollectionDepositFormContainer
                  className="pv3"
                  tabId={match.params.collection}
                  onDidCreateCollectionDeposit={history.goBack}
                />
              </Elements>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <style>{`
        .side-navbar {
          border-right: 1px solid #E2E3E4;
        }
        .navbar-item {
          padding: 20px 25px;
          display: flex;
          justify-content: left;
          align-items: center;
          text-transform: capitalize;
          cursor: pointer;
        }
        .navbar-item:first-child {
          border-bottom: 1px solid #E2E3E4;
        }
        .navbar-item.active {
          background-color: ${config.colors.lightTint};
        }
        .pv-20 {
          padding-top: 20px;
          padding-bottom: 20px;
        }
        .mb-15 {
          margin-bottom: 15px;
        }
        .fund-collection > p {
          font-size: 16px;
          line-height: 24px;
        }

        @media (min-width: 30em) {
          .collection-summary {
            padding: 15px 90px 15px 50px;
          }
          .fund-collection {
            padding: 30px 90px 15px 50px;
          }
        }
      `}</style>
    </CommonModal>
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
    {
      key: GET_WITHDRAWALS,
      promise: getWithdrawals,
      payload: {
        collection: props.match.params.collection,
      },
    },
    {
      key: GET_COLLECTION_DEPOSITS,
      promise: getCollectionDeposits,
      payload: {
        collection: props.match.params.collection,
      },
    },
  ]),
  React.memo
);

const EnhancedCollectionSummaryPage = enhance(CollectionSummaryPage);

export default EnhancedCollectionSummaryPage;
