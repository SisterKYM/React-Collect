import * as cx from 'redux/modules/collections/constants';

export const addAttachment = (payload) => ({type: cx.ADD_ATTACHMENT, payload});
export const getAttachments = (payload) => ({
  type: cx.GET_ATTACHMENTS,
  payload,
});
export const deleteAttachment = (payload) => ({
  type: cx.DELETE_ATTACHMENT,
  payload,
});
export const getCollection = (payload) => ({type: cx.GET_COLLECTION, payload});
export const getCollections = (payload) => ({
  type: cx.GET_COLLECTIONS,
  payload,
});
export const updateCollection = (payload) => ({
  type: cx.UPDATE_COLLECTION,
  payload,
});
export const deleteCollection = (payload) => ({
  type: cx.DELETE_COLLECTION,
  payload,
});
