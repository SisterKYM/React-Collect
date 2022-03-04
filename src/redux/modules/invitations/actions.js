import * as cx from 'redux/modules/invitations/constants';

export const acceptInvitation = payload => ({
  type: cx.ACCEPT_INVITATION,
  payload,
});
export const getInvitation = payload => ({type: cx.GET_INVITATION, payload});
