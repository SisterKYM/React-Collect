import * as cx from 'redux/modules/members/constants';

export const getInvites = payload => ({type: cx.GET_INVITES, payload});
export const deleteInvite = payload => ({type: cx.DELETE_INVITE, payload});
export const remindInvite = payload => ({type: cx.REMIND_INVITE, payload});
export const getMembers = payload => ({type: cx.GET_MEMBERS, payload});
export const sendMessage = payload => ({type: cx.SEND_MESSAGE, payload});
export const sendTestMessage = payload => ({
  type: cx.SEND_TEST_MESSAGE,
  payload,
});
export const inviteMembers = payload => ({type: cx.INVITE_MEMBERS, payload});
export const sendTest = payload => ({type: cx.SEND_TEST, payload});
export const sendTestReminder = payload => ({
  type: cx.SEND_TEST_REMINDER,
  payload,
});
export const sendAllReminders = payload => ({
  type: cx.SEND_ALL_REMINDERS,
  payload,
});
