import {compose} from 'recompose';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import React, {useEffect} from 'react';
import {useInvalidator} from 'rest-hooks';
import CollectionResource from 'resources/CollectionResource';
import shortid from 'shortid';

import {GET_PAYMENT_ACCOUNTS} from 'redux/modules/paymentAccounts/constants';
import {UPDATE_SUBSCRIPTION} from 'redux/modules/stripe/constants';
import {asyncConnect} from 'helpers';
import {getPaymentAccounts} from 'redux/modules/paymentAccounts/actions';
import {updateSubscription} from 'redux/modules/stripe/actions';

import {UpgradePlan} from './components';

const UpgradePlanContainer = ({
  fieldPanels,
  history,
  match,
  location,
  heading,
  subheading,
  description,
}) => {
  const invalidateCollectionDetail = useInvalidator(
    CollectionResource.detailShape()
  );
  const dispatch = useDispatch();

  const status = useSelector(
    (state) => state.async.statuses[UPDATE_SUBSCRIPTION]
  );
  const paymentAccounts = useSelector(
    (state) => state.paymentAccounts && state.paymentAccounts.paymentAccounts
  );

  useEffect(() => {
    if (status === 'success' && match.params.collection) {
      invalidateCollectionDetail({id: match.params.collection});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, match.params.collection]);
  const handleDismiss = React.useCallback(
    (state) => {
      // hack for react-native WebView to detect url change
      window.location.hash = shortid.generate();

      history.push({
        pathname: (location.pathname || '').split('/i/')[0],
        state: {
          ...location.state,
          ...state,
        },
      });
    },
    [history, location]
  );

  const handleSubmit = React.useCallback(
    ({createToken, paymentMethodId, plan, coupon}) => {
      dispatch(
        updateSubscription({
          plan,
          createToken,
          paymentMethodId,
          coupon,
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    if (status === 'success') {
      handleDismiss({keepGrowls: true});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <UpgradePlan
      plansLink={{
        pathname: `${location.pathname.split('/i/')[0]}/i/plans`,
        state: location.state,
      }}
      paymentAccounts={paymentAccounts}
      fieldPanels={fieldPanels}
      handleDismiss={handleDismiss}
      heading={heading}
      subheading={subheading}
      description={description}
      location={location}
      onSubmit={handleSubmit}
      status={status}
    />
  );
};

const enhance = compose(
  withRouter,
  asyncConnect(() => [
    {
      key: GET_PAYMENT_ACCOUNTS,
      promise: getPaymentAccounts,
    },
  ])
);

const EnhancedUpgradePlanContainer = enhance(UpgradePlanContainer);

export default EnhancedUpgradePlanContainer;
