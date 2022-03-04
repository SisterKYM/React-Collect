import {compose, mapProps} from 'recompose';
import {connect} from 'react-redux';
import React from 'react';
import _, {get} from 'lodash';

import {UPDATE_SUBSCRIPTION} from 'redux/modules/stripe/constants';
import {Warning} from 'views/i/plans/components';

const ProPlanWarningPage = ({
  history,
  match,
  location,
  browser,
  managers,
  status,
}) => {
  const isDowngrade = get(match, 'params.isDowngrade', '');
  const handleDismiss = React.useCallback(() => {
    history.push(`${location.pathname.split('/i/')[0]}`);
  }, [history, location]);
  const handleSubmit = React.useCallback(() => {
    history.push(
      `${location.pathname.split('/i/')[0]}/i/plans/pro:${isDowngrade}`
    );
  }, [history, isDowngrade, location.pathname]);

  return (
    <Warning
      panelClassName={browser.lessThan.medium ? 'pa3' : 'pa4'}
      browser={browser}
      handleDismiss={handleDismiss}
      managers={managers}
      onSubmit={handleSubmit}
      status={status}
    />
  );
};

const enhance = compose(
  connect(state => ({
    browser: state.browser,
    checkResults: _.get(state.stripe, 'checkResults', null),
    statuses: state.async.statuses || {},
  })),
  mapProps(props => {
    const managers = _.get(props.checkResults, 'results', []).filter(
      result => result.warning === 'managers_will_be_deleted'
    )[0];

    return {
      ...props,
      managers: _.get(managers, 'managers', []),
      status: props.statuses[UPDATE_SUBSCRIPTION],
    };
  }),
  React.memo
);

const EnhancedProPlanWarningPage = enhance(ProPlanWarningPage);

export default EnhancedProPlanWarningPage;
