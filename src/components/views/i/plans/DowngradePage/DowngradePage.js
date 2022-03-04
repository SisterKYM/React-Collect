// import {IoMdAlert} from 'react-icons/io';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {get, capitalize} from 'lodash';
import React, {useEffect} from 'react';
import {useInvalidator} from 'rest-hooks';

import config from 'config';
import CollectionResource from 'resources/CollectionResource';
import {
  CHECK_SUBSCRIPTION,
  CLEAR_CHECKED_SUBSCRIPTION,
  UPDATE_SUBSCRIPTION,
} from 'redux/modules/stripe/constants';
import {CONFIRM_CANCEL_SUBSCRIPTION} from 'theme/constants';
import {GET_COLLECTIONS} from 'redux/modules/collections/constants';
import {Modal, ModalCloseButton} from 'elements';
import {asyncConnect} from 'helpers';
import {
  checkSubscription,
  clearCheckedSubscription,
  updateSubscription,
} from 'redux/modules/stripe/actions';
import {clearAlerts, errorAlert} from 'redux/modules/growl/actions';
import {getCollections} from 'redux/modules/collections/actions';

import ModalDeleteIcon from 'theme/images/Modal.delete.svg';
import {DowngradeButtons} from './components';

const DowngradePage = ({
  checkResults,
  location,
  match,
  history,
  collectionsPro,
  cancelStatus,
  updateSubscription,
  clearAlerts,
  errorAlert,
  isTeamUser,
}) => {
  const invalidateCollectionDetail = useInvalidator(
    CollectionResource.detailShape()
  );
  const downgradeError =
    (checkResults ? checkResults.results : []).filter(({error}) => error)
      .length !== 0;
  const handleDismiss = React.useCallback(() => {
    history.push(match.url.split('/downgrade')[0]);
  }, [history, match]);
  const downgradeTo = get(match, 'params.to', 'basic');
  const team2pro = isTeamUser && downgradeTo === ':pro';
  const team2basic = isTeamUser && downgradeTo === ':basic';
  useEffect(() => {
    if (cancelStatus === 'success' && match.params.collection) {
      invalidateCollectionDetail({id: match.params.collection});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cancelStatus]);
  const cancelSubscription = React.useCallback(
    (confirm) => {
      if (downgradeError) {
        return;
      }

      if (team2pro) {
        const managersWarning = get(checkResults, 'results', []).filter(
          (result) => result.warning === 'managers_will_be_deleted'
        );
        const nodes = location.pathname.split('/');
        const path = nodes.slice(0, -1).join('/');
        if (managersWarning.length !== 0) {
          history.push(`${path}/pro/warning:downgrade`);
        } else {
          history.push(`${path}/pro:downgrade`, {...location.state});
        }

        return;
      }

      if (
        team2pro ||
        confirm === CONFIRM_CANCEL_SUBSCRIPTION ||
        collectionsPro.length === 0
      ) {
        updateSubscription({plan: 'free'});
      } else {
        clearAlerts();
        errorAlert({
          body: `Please type "${CONFIRM_CANCEL_SUBSCRIPTION}" to proceed with cancelling your subscription.`,
          title: 'Error',
        });
      }
    },
    [
      downgradeError,
      team2pro,
      collectionsPro.length,
      checkResults,
      location.pathname,
      location.state,
      history,
      updateSubscription,
      clearAlerts,
      errorAlert,
    ]
  );
  const pauseSubscription = React.useCallback(() => {
    history.push(
      `${location.pathname.split('/i/')[0]}/i/plans/pause:${downgradeTo}`
    );
  }, [downgradeTo, history, location.pathname]);

  React.useEffect(() => {
    if (cancelStatus === 'success') {
      handleDismiss();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cancelStatus]);

  React.useEffect(() => {
    if (downgradeError) {
      history.push(`${location.pathname.split('/i/')[0]}/i/plans/basic/error`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downgradeError]);

  return (
    <Modal flexibleHeight size="SMALL" onDismiss={handleDismiss}>
      <ModalCloseButton onClick={handleDismiss} />
      <div className="mw6 ">
        <div className="modal-content bb b--gray-300">
          <span className="mt2 fw7 gray-600 avenir-heavy">
            {team2pro ? 'Downgrade' : 'Cancel'} my subscription.
            {(team2pro || collectionsPro.length) !== 0 && (
              <span className="warning-wrapper relative mt2 brand">
                This cannot be undone.
              </span>
            )}
          </span>
        </div>
        <div className="modal-content gray-600">
          <p>
            Your{' '}
            {team2pro || (team2basic && collectionsPro.length !== 0)
              ? 'Team Plan'
              : 'subscription'}{' '}
            will be downgraded to our{' '}
            {team2pro ? 'Pro Plan' : 'FREE Basic Plan'}.{' '}
            {isTeamUser && (
              <>
                <span className="underline">
                  Recurring payments will be cancelled
                </span>
                , managers will be deleted and your Group Page link will no
                longer be active.
              </>
            )}
            {!team2pro && collectionsPro.length !== 0 && (
              <span>
                Your {config.strings.collection}s utilizing Pro Plan features
                will be deleted immediately.
              </span>
            )}
          </p>
          {!team2pro && collectionsPro.length !== 0 && (
            <>
              <p className="mv3 f6 fw7 gray-600 avenir-heavy">
                {capitalize(config.strings.collection)}s to be deleted:
              </p>
              <ul className="collection-list-container mt2 overflow-y-scroll">
                {collectionsPro.map((c) => (
                  <li key={c.id} className="mb2">
                    <img className="mr3" src={ModalDeleteIcon} alt="delete" />
                    {c.name}
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="mt4">
            <DowngradeButtons
              showPause={!team2basic && !team2pro}
              confirm={!team2pro && collectionsPro.length !== 0}
              isPending={cancelStatus === 'pending'}
              cancelSubscription={cancelSubscription}
              pauseSubscription={pauseSubscription}
              buttonName={team2pro ? 'Downgrade' : 'Cancel'}
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        .modal-content {
          padding: 23px 27px;
          line-height: 24px;
        }
        .warning-wrapper {
          padding-top: 8px;
          padding-left: 8px;
        }
        .collection-list-container {
          max-height: 200px;
        }
      `}</style>
    </Modal>
  );
};

const enhance = compose(
  asyncConnect((props) => {
    const state = props.store.getState();
    const checkResults = get(state, 'stripe.checkResults');
    const collectionsOpen = get(state, 'collections.collectionsOpen', []);

    const res = [
      checkResults
        ? {
            key: CLEAR_CHECKED_SUBSCRIPTION,
            promise: clearCheckedSubscription,
          }
        : {
            key: CHECK_SUBSCRIPTION,
            payload: {plan: 'free'},
            promise: checkSubscription,
          },
    ];

    if (collectionsOpen.length === 0) {
      res.push({
        key: GET_COLLECTIONS,
        promise: getCollections,
      });
    }

    return res;
  }),
  connect(
    (state) => ({
      isTeamUser: state.session && state.session.isTeamUser,
      cancelStatus: state.async.statuses[UPDATE_SUBSCRIPTION],
      checkResults: state.stripe.checkResults,
      collectionsPro: (state.collections.collectionsOpen || []).filter(
        ({requires_pro}) => requires_pro
      ),
    }),
    {
      clearAlerts,
      errorAlert,
      updateSubscription,
    }
  )
);

const EnhancedDowngradePage = enhance(DowngradePage);

export default EnhancedDowngradePage;
