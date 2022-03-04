import jsonp from 'jsonp';

import appHistory from 'appHistory';

const initActiveCampaign = () => {
  appHistory.listen(() => {
    jsonp(
      `https://trackcmp.net/visit?actid=798920561&e=${window.trackcmp_email}&r=${document.referrer}&u=${window.location.href}`
    );
  });
};

initActiveCampaign();
