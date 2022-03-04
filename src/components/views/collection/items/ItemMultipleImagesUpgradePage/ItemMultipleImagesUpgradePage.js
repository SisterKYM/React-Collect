import {connect} from 'react-redux';
import React from 'react';

import {Button, Modal, ModalCloseButton} from 'elements';
import {UPDATE_SUBSCRIPTION} from 'redux/modules/stripe/constants';
import ItemDetailMultipleImagesUpgradeImage from 'theme/images/ItemDetail.MultipleImages.Upgrade.jpg';

const ItemMultipleImagesUpgradePage = ({
  history,
  location,
  updateSubscriptionStatus,
}) => {
  const handleDismiss = React.useCallback(
    (state) => {
      history.push({
        pathname: location.pathname.split('/i/')[0],
        state: {
          ...location.state,
          ...state,
        },
      });
    },
    [history, location]
  );

  React.useEffect(() => {
    if (updateSubscriptionStatus === 'success') {
      handleDismiss();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSubscriptionStatus]);

  const handleClickLearnMore = React.useCallback(() => {
    history.push(`${location.pathname}/i/plans`, location.state);
  }, [history, location]);

  return (
    <Modal onDismiss={handleDismiss}>
      <ModalCloseButton onClick={handleDismiss} />
      <div className="ph3 ph5-ns pv4">
        <div className="flex mb4">
          <h3 className="w-100 w-80-ns">
            You&apos;ve got a good thing going! Upgrade to PRO and add up to 3
            images per item.
          </h3>
        </div>
        <Button
          backgroundColorSet
          className="w-100 w5-ns bg-brand"
          onClick={handleClickLearnMore}
        >
          Learn More
        </Button>
      </div>
      <div className="pa4 mt2 bt b--gray-300">
        <div className="flex">
          <div className="w-40">
            <img
              alt="Upgrade"
              className="mw-100"
              src={ItemDetailMultipleImagesUpgradeImage}
            />
          </div>
          <div className="w-60 ph3 mv4">
            <h3 className="f3 brand">
              Take your collection to the
              <br />
              next level with multiple images
            </h3>
            <p className="mt2 f-regular">
              Drive sales and delight customers
              <br />
              with up to three views of your item.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const enhance = connect((state) => ({
  updateSubscriptionStatus: state.async.statuses[UPDATE_SUBSCRIPTION],
}));

const EnhancedItemMultipleImagesUpgradePage = enhance(
  ItemMultipleImagesUpgradePage
);

export default EnhancedItemMultipleImagesUpgradePage;
