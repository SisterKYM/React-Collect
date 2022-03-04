import React from 'react';

import {Modal} from 'elements';

import {RefundsManageContainer} from './containers';

const RefundsManagePage = ({history, location, match}) => {
  const handleClickCollectionSummary = React.useCallback(
    collection => {
      history.push(
        `${location.pathname}/i/collection/${collection.user_id}/${collection.id}/summary`
      );
    },
    [history, location.pathname]
  );

  return (
    <Modal onDismiss={history.goBack}>
      <RefundsManageContainer
        collectionId={match.params.collection}
        paymentId={match.params.payment}
        selectedPaymentItemId={
          location.state ? location.state.selectedPaymentItemId : null
        }
        onClickCollectionSummary={handleClickCollectionSummary}
        onDismiss={history.goBack}
      />
    </Modal>
  );
};

const EnhancedRefundsManagePage = React.memo(RefundsManagePage);

export default EnhancedRefundsManagePage;
