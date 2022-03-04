import {get} from 'lodash';

const onSwitchToBasicClick = props => team2basic => {
  const results = get(props, 'checkResults.results', []);
  const errors = results.filter(result => result.error);
  const warnings = results.filter(result => result.warning);
  if (!props.authenticated) {
    props.history.push('/signup');
  } else if (errors.length !== 0) {
    props.history.push(`${props.location.pathname}/basic/error`);
  } else if (warnings.length !== 0 || props.accountPlan === 'team') {
    props.history.push(`${props.location.pathname}/downgrade:basic`);
  } else if (props.accountPlan === 'pro') {
    props.history.push(
      `${props.location.pathname}/pause${team2basic ? ':basic' : ':pro'}`
    );
  } else {
    props.updateSubscription({plan: 'free', card: null});
  }
};

export default onSwitchToBasicClick;
