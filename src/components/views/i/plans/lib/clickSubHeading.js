import {get, noop} from 'lodash';

const clickSubHeading = props => () => {
  const onGoProClick = get(props, 'onGoProClick', noop);
  const push = get(props, 'history.push', noop);

  if (props.isProUser || props.isTeamUser) {
    push('/user/billing');
  } else if (props.isPause) {
    onGoProClick();
  }
};

export default clickSubHeading;
