import React from 'react';

const CollectionUnavailableBanner = ({
  userManagesCollection,
  allowPayments,
  unavailable,
}) => {
  let reasonText;
  if (userManagesCollection && !allowPayments) {
    reasonText = ' inactive. Complete your profile to reactivate.';
  } else if (userManagesCollection && unavailable === 'requires_pro') {
    reasonText = ' inactive. Upgrade to reactivate.';
  } else if (!allowPayments || unavailable === 'requires_pro') {
    reasonText = ' inactive. Please contact the organizer.';
  } else if (unavailable === 'closed') {
    reasonText = ' closed.';
  } else {
    return null;
  }

  return (
    <div>
      <div className="pv2 ph3 f5 tc white bg-tint content-container">
        {userManagesCollection ? 'Your' : 'This'} collection is
        {`${reasonText}`}
      </div>
    </div>
  );
};

const EnhancedCollectionUnavailableBanner = React.memo(
  CollectionUnavailableBanner
);

export default EnhancedCollectionUnavailableBanner;
