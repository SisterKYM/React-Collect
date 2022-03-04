import {get} from 'lodash';

const onGoProClick = (props) => (isTeamUser, search) => {
  const results = get(props, 'checkResults.results', []);
  const errors = results.filter((result) => result.error);
  const {history, location} = props;
  const managersWarning = get(props, 'checkResults.results', []).filter(
    (result) => result.warning === 'managers_will_be_deleted'
  );
  if (errors.length !== 0) {
    props.history.push(`${props.location.pathname}/basic/error`);
  } else if (isTeamUser) {
    history.push(`${location.pathname}/downgrade:pro`);
  } else if (managersWarning.length !== 0) {
    history.push(`${location.pathname}/pro/warning`);
  } else {
    history.push({
      pathname: `${location.pathname}/pro`,
      state: location.state,
      search,
    });
  }
};

export default onGoProClick;
