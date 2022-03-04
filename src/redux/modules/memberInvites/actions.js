import * as cx from 'redux/modules/memberInvites/constants';

export const getMemberInvites = payload => ({
  type: cx.GET_MEMBER_INVITES,
  payload,
});
export const addMemberInvites = payload => ({
  type: cx.ADD_MEMBER_INVITES,
  payload,
});
export const removeMemberInvite = payload => ({
  type: cx.REMOVE_MEMBER_INVITE,
  payload,
});
export const resendMemberInvite = payload => ({
  type: cx.RESEND_MEMBER_INVITE,
  payload,
});
export const resendEmailAllMemberInvites = payload => ({
  type: cx.RESEND_EMAIL_ALL_MEMBER_INVITES,
  payload,
});
export const cancelAddMemberInvites = () => ({
  type: cx.CANCEL_ADD_MEMBER_INVITES,
});
