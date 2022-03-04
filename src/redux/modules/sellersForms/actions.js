import * as cx from 'redux/modules/sellersForms/constants';

export const getSellerForm = payload => ({type: cx.GET_SELLER_FORM, payload});

export const getSellersForms = payload => ({
  type: cx.GET_SELLERS_FORMS,
  payload,
});

export const addSellerFormToCollection = payload => ({
  type: cx.ADD_SELLER_FORM_TO_COLLECTION,
  payload,
});
