import * as cx from 'redux/modules/forms/constants';

export const getForm = payload => ({type: cx.GET_FORM, payload});
export const getForms = payload => ({type: cx.GET_FORMS, payload});
export const createForm = payload => ({type: cx.CREATE_FORM, payload});
export const updateForm = payload => ({type: cx.UPDATE_FORM, payload});
export const sortForms = payload => ({type: cx.SORT_FORMS, payload});
export const deleteForm = payload => ({type: cx.DELETE_FORM, payload});
export const createWaiver = payload => ({type: cx.CREATE_WAIVER, payload});
