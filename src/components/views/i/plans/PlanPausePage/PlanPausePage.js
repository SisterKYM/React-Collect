import {IoMdCheckmark} from 'react-icons/io';
import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import _, {get} from 'lodash';
import cx from 'classnames';

import config from 'config';
import {VerificationPrompt} from 'elements';
import {UPDATE_SUBSCRIPTION} from 'redux/modules/stripe/constants';
import {updateSubscription} from 'redux/modules/stripe/actions';
import {successAlert} from 'redux/modules/growl/actions';

const points = [
  `Save all of your ${config.strings.collection}s and items`,
  `View your ${config.strings.collection}s anytime`,
  'Export your reports anytime',
  'Come back when you are ready to accept payments',
];

const PlanPausePage = ({location, history, match}) => {
  const dispatch = useDispatch();

  const isPending = useSelector(
    (state) => state.async.statuses[UPDATE_SUBSCRIPTION] === 'pending'
  );
  const [prevPendingState, setPrevPendingState] = React.useState(false);

  React.useEffect(() => {
    if (prevPendingState && !isPending) {
      dispatch(
        successAlert({
          title: 'Subscription Paused',
          body: 'You have paused your subscription',
        })
      );
    }
    setPrevPendingState(isPending);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, prevPendingState]);

  const cancelSubscription = React.useCallback(() => {
    history.push(
      `${location.pathname.split('/i/')[0]}/i/plans/downgrade:${get(
        match,
        'parmas.to',
        'basic'
      )}`
    );
  }, [history, location.pathname, match]);

  const onDismiss = React.useCallback(() => {
    history.push(_.split(location.pathname, '/i/')[0]);
  }, [history, location.pathname]);

  const pauseSubscription = React.useCallback(() => {
    dispatch(
      updateSubscription({
        plan: 'pause',
        metadata: {successRedirect: '/user/billing'},
      })
    );
  }, [dispatch]);

  return (
    <VerificationPrompt
      flexibleHeight
      onDismiss={onDismiss}
      title="Need to pause your subscription?"
      description="If you’re going to take a temporary break, <span class='avenir-heavy'>pause your account for only $5 a month.</span>"
      okButtonLabel="Pause my subscription"
      onOkButtonClick={pauseSubscription}
      okButtonDisabled={isPending}
      cancelButtonLabel="Cancel my subscription"
      onCancelButtonClick={cancelSubscription}
      cancelButtonDisabled={isPending}
      status={isPending ? 'pending' : ''}
    >
      <ul className="mb3">
        {points.map((point, key) => (
          <li
            className={cx('relative dark-grey text-16', key && 'mt2')}
            style={{paddingLeft: '24px'}}
            key={key}
          >
            <IoMdCheckmark className="absolute top-0 left-0 tint" size={15} />
            {point}
          </li>
        ))}
      </ul>
      <p className="mb4 f6 lh-copy avenir-light-oblique">
        Effective immediately, your collections utilizing Pro Plan features will
        be inactive until you upgrade back to Pro.
      </p>
    </VerificationPrompt>
  );
};

const EnhancedPlanPausePage = React.memo(PlanPausePage);

export default EnhancedPlanPausePage;
