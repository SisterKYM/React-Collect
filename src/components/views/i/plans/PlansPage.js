import {get} from 'lodash';
import {connect} from 'react-redux';
import {withHandlers, mapProps, compose} from 'recompose';
import React from 'react';
import cx from 'classnames';

import {Modal} from 'elements';
import {
  CHECK_SUBSCRIPTION,
  CLEAR_CHECKED_SUBSCRIPTION,
  UPDATE_SUBSCRIPTION,
} from 'redux/modules/stripe/constants';
import {asyncConnect} from 'helpers';
import {
  checkSubscription,
  clearCheckedSubscription,
  updateSubscription,
} from 'redux/modules/stripe/actions';
import {handleDismiss} from 'views/i/helpers';

import {SubscriptionPlanPanel} from './components';
import {
  clickSubHeading,
  onGoTeamClick,
  propsMapper,
  onGoProClick,
  onSwitchToBasicClick,
} from './lib';

const descriptionStyle = {
  fontSize: '23px',
};

const PlansPage = ({
  isTeamUser,
  isPause,
  isFree,
  hasPro,
  hasTeam,
  location,
  extraSmall,
  onGoProClick,
  authenticated,
  handleDismiss,
  onGoTeamClick,
  panelClassName,
  proPanelFeatures,
  teamPanelFeatures,
  basicPanelFeatures,
  containerClassName,
  onSwitchToBasicClick,
  updateSubscriptionPending,
}) => (
  <Modal onDismiss={handleDismiss} flexibleHeight>
    <div className="bg-plan">
      <div className={cx('first', containerClassName)}>
        <h1 className="avenir-roman">Choose the plan that’s right for you.</h1>
        <div className="description dark-grey" style={descriptionStyle}>
          We offer simple, affordable plans that you can start and stop at any
          time.
        </div>
      </div>
      <div className="pv4">
        <div className={cx('second', containerClassName)}>
          <div className="flex flex-wrap nl3-l">
            <div className={panelClassName}>
              <div className="flex-auto pl3-l">
                <SubscriptionPlanPanel
                  extraSmall={extraSmall}
                  current={isFree}
                  title={{children: 'Basic', className: 'dark-grey'}}
                  subtitle="Jump right in"
                  monthlyCost="$0"
                  monthlyCostLabel="FREE forever"
                  features={basicPanelFeatures}
                  ctaBtn={{
                    disabled: isFree || updateSubscriptionPending,
                    children: authenticated
                      ? isFree
                        ? 'Your Current Plan'
                        : 'Downgrade to Basic'
                      : 'Sign Up',
                    onClick: () => onSwitchToBasicClick(hasTeam),
                  }}
                />
              </div>
            </div>
            <div className={panelClassName}>
              <div className="flex-auto pl3-l">
                <SubscriptionPlanPanel
                  isPause={isPause}
                  extraSmall={extraSmall}
                  current={hasPro}
                  title={{
                    children: 'Pro',
                    className: 'brand',
                  }}
                  subtitle="Perfect for sellers"
                  monthlyCost="$10"
                  monthlyCostLabel={
                    <span>
                      / month
                      <br />
                      with annual plan
                    </span>
                  }
                  ctaBtn={{
                    children:
                      hasPro || isPause
                        ? 'Your Current Plan'
                        : isFree || !authenticated
                        ? 'Upgrade to PRO'
                        : 'Downgrade to PRO',
                    disabled: hasPro || isPause || updateSubscriptionPending,
                    onClick: hasPro
                      ? () => {}
                      : () => onGoProClick(isTeamUser, location.search),
                  }}
                  features={proPanelFeatures}
                />
              </div>
            </div>
            <div className={panelClassName}>
              <div className="flex-auto pl3-l">
                <SubscriptionPlanPanel
                  extraSmall={extraSmall}
                  current={hasTeam}
                  title={{children: 'Team', className: 'tint'}}
                  subtitle="Add managers"
                  monthlyCost="$30"
                  monthlyCostLabel={
                    <span>
                      / month
                      <br />
                      with annual plan
                    </span>
                  }
                  ctaBtn={{
                    children: hasTeam ? 'Your Current Plan' : 'Upgrade to TEAM',
                    disabled: hasTeam || updateSubscriptionPending,
                    onClick: hasTeam
                      ? () => {}
                      : () => onGoTeamClick(location.search),
                  }}
                  features={teamPanelFeatures}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <style jsx>{`
      .bg-plan {
        background-color: #f8f8f8;
      }
      .first.content-container {
        background-color: white;
        padding-bottom: 120px;
      }
      h1 {
        padding-top: 45px;
        padding-left: 18px;
        line-height: 40px;
        font-size: 36px;
        color: #373737;
      }
      .description {
        margin-top: 10px;
        padding-left: 18px;
      }
      .second.content-container {
        margin-top: -96px;
      }
      .icon {
        height: 40px;
      }
      :global(.pro-parterships-button) {
        background-color: #ffffff33;
      }
    `}</style>
  </Modal>
);

const enhance = compose(
  asyncConnect((props) => {
    const state = props.store.getState();

    const checkResults = get(state, 'stripe.checkResults');

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

    return res;
  }),
  connect(
    (state) => ({
      isPause: state.session && state.session.isPause,
      isProUser: state.session && state.session.isProUser,
      isTeamUser: state.session && state.session.isTeamUser,
      accountPlan:
        state.session && state.session.capabilities
          ? state.session.capabilities.plan
          : '',
      planName: state.stripe.plan ? state.stripe.plan.name : '',
      extraSmall: state.browser.is.extraSmall,
      authenticated: Boolean(state.session) && Boolean(state.session.user),
      checkStatus: state.async.statuses[CHECK_SUBSCRIPTION],
      updateSubscriptionStatus: state.async.statuses[UPDATE_SUBSCRIPTION],
      checkResults: state.stripe.checkResults,
    }),
    {
      updateSubscription,
    }
  ),
  mapProps(propsMapper),
  withHandlers({
    onGoProClick,
    onGoTeamClick,
    handleDismiss,
    onSwitchToBasicClick,
  }),
  withHandlers({clickSubHeading})
);

const EnhancedPlansPage = enhance(PlansPage);

export default EnhancedPlansPage;
