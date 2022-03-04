const BillingHelpers = {
  getFriendlyPlanName: plan => {
    switch (plan) {
      case 'pro':
        return 'Pro';
      case 'team':
        return 'Team';
      case 'pause':
        return 'Pro Pause';
      default:
        return 'Basic';
    }
  },
};

export default BillingHelpers;
