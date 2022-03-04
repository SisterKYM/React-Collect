import * as cx from './constants';

export const getItem = payload => ({type: cx.GET_ITEM, payload});
export const getItems = payload => ({type: cx.GET_ITEMS, payload});
export const uploadItems = payload => ({type: cx.UPLOAD_ITEMS, payload});
export const uploadImages = payload => ({type: cx.UPLOAD_IMAGES, payload});
