import * as cx from './constants';

const getOrgMembers = payload => ({
  type: cx.GET_ORG_MEMBERS,
  payload,
});
const removeOrgMember = payload => ({
  type: cx.REMOVE_ORG_MEMBER,
  payload,
});

export {getOrgMembers, removeOrgMember};
