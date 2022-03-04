import React from 'react';

import {Modal, ModalCloseButton} from 'elements';

import AddressCheck from './AddressCheck';

const AddressCheckModal = ({
  originAddress,
  easypostAddress,
  onUseEasypostAddress,
  onDismiss,
}) => (
  <Modal flexibleHeight size="MEDIUM" onDismiss={onDismiss}>
    <ModalCloseButton onClick={onDismiss} />
    <AddressCheck
      originAddress={originAddress}
      easypostAddress={easypostAddress}
      onUseEasypostAddress={onUseEasypostAddress}
      onEditOriginAddress={onDismiss}
    />
  </Modal>
);

const EnhancedAddressCheckModal = React.memo(AddressCheckModal);

export default EnhancedAddressCheckModal;
