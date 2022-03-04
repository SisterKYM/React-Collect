import * as cx from './constants';

export const sendContactMessage = payload => ({
  payload,
  type: cx.SEND_CONTACT_MESSAGE,
});
