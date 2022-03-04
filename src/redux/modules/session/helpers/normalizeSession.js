import {get} from 'lodash';

import {ORGS, ORG_HOW_IT_WORKS_VIDEO_URL_DEFAULT} from 'data/orgs';

const normalizeSession = (data) => {
  const user = get(data, 'user');
  const partnerMaster = get(data, 'partner_master');
  const stripe = get(data, 'stripe_data', {});
  const capabilities = get(data, 'capabilities');
  const organization = get(data, 'organization');
  const balance = Number(
    get(user, 'withdrawal_data.total_available_balance', 0)
  );

  return {
    user,
    partnerMaster,
    analytics: get(data, 'analytics', {}),
    session: get(data, 'session', {}),
    ...stripe,
    capabilities,
    organization,
    balance,
    accounts: get(data, 'collection_create_roles', []),
    managerRoles: get(data, 'manager_roles', []),
    isPause: get(capabilities, 'plan', '') === 'pause',
    isProUser: get(capabilities, 'subscribed_to_pro', false),
    organization_data: get(data, 'organization_data'),
    howItWorksVideoUrl:
      data && data.organization && ORGS[data.organization]
        ? ORGS[data.organization].howItWorksVideoUrl
        : ORG_HOW_IT_WORKS_VIDEO_URL_DEFAULT,
    faqUrl:
      data && data.organization && ORGS[data.organization]
        ? ORGS[data.organization].faqUrl
        : '',
    isTeamUser: get(capabilities, 'subscribed_to_team', false),
  };
};

export default normalizeSession;
