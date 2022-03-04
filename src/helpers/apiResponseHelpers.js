import {get} from 'lodash';
import moment from 'moment-timezone';
import config from 'config';

const readApiError = (response, messages = {}) => {
  const apiError = get(response, 'response.data.errors[0]') || response || {};

  const msg = messages[apiError.error];
  if (typeof msg === 'function') {
    return msg(apiError.details);
  }
  if (msg) {
    return msg;
  }

  return `Something went wrong. Please contact ${config.strings.supportEmail}`;
};

const formatLoginError = error =>
  readApiError(error, {
    invalid_password: `Sorry, we don't recognize that email or password. Please try again`,
    login_lockout: ({permanent, remaining}) =>
      permanent
        ? `Your account has been locked. Please reset your password to log in again.`
        : `Your account is temporarily locked. Please try again in ${moment
            .duration(remaining * 1000)
            .humanize()}, or reset your password to continue.`,
  });

export {formatLoginError, readApiError};
