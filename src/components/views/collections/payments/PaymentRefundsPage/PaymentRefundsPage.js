import React from 'react';

import {Modal} from 'elements';

import {PaymentRefundsContainer} from './containers';

const RefundsManagePage = ({history, location, match}) => (
  <Modal onDismiss={history.goBack}>
    <PaymentRefundsContainer
      paymentId={match.params.payment}
      selectedPaymentItemId={
        location.state ? location.state.selectedPaymentItemId : null
      }
      onDismiss={history.goBack}
    />
  </Modal>
);

const EnhancedRefundsManagePage = React.memo(RefundsManagePage);

export default EnhancedRefundsManagePage;
