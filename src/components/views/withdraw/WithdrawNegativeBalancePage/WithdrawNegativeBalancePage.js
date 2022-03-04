import React from 'react';

import {Modal, ModalCloseButton} from 'elements';

import {WithdrawNegativeBalanceContainer} from './containers';

const WithdrawNegativeBalancePage = ({history}) => (
  <Modal flexibleHeight size="MEDIUM" onClickOverlay={history.goBack}>
    <ModalCloseButton onClick={history.goBack} />
    <div className="pv5 ph4 tc">
      <h1 className="f3">Negative Collection Balance</h1>
      <WithdrawNegativeBalanceContainer className="pv4" />
    </div>
  </Modal>
);

const EnhancedWithdrawNegativeBalancePage = React.memo(
  WithdrawNegativeBalancePage
);

export default EnhancedWithdrawNegativeBalancePage;
