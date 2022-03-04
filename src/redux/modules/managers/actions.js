import * as cx from 'redux/modules/managers/constants';

export const deleteManager = payload => ({payload, type: cx.DELETE_MANAGER});
export const remindManager = payload => ({payload, type: cx.REMIND_MANAGER});
export const getManagers = payload => ({payload, type: cx.GET_MANAGERS});
export const inviteManager = payload => ({payload, type: cx.INVITE_MANAGER});
export const updateManager = payload => ({payload, type: cx.UPDATE_MANAGER});
