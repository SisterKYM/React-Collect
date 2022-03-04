import React from 'react';

import {Modal, ModalCloseButton, Button} from 'elements';

const ErrorModal = ({onDismiss, isMobile, openOrderSummary}) => (
  <Modal flexibleHeight smallOnMobile size="EXTRA_SMALL">
    <ModalCloseButton onClick={onDismiss} />
    <div className="pa4">
      <h3 className="brand b mb3">Item availability has changed</h3>
      <hr />
      <p className="mt3">
        <span className="b">Your order has not been processed.</span> Please
        review your revised order and click &quot;Pay Now&quot; to proceed.
      </p>
      {isMobile && (
        <Button className="mt3" small onClick={openOrderSummary}>
          View Order Summary
        </Button>
      )}
    </div>
  </Modal>
);

export default ErrorModal;
