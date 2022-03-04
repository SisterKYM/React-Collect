import React from 'react';

import {Button, Modal, ModalCloseButton} from 'elements';
import {ReactComponent as ExclamationMarkIcon} from 'theme/images/exclamation-mark-icon.svg';
import config from 'config';

const DeleteWithdrawalSettingsWarningPage = ({history}) => {
  const handleDismiss = React.useCallback(() => {
    history.push('/user/withdrawal-settings');
  }, [history]);

  return (
    <Modal flexibleHeight size="EXTRA_SMALL" onDismiss={handleDismiss}>
      <ModalCloseButton onClick={handleDismiss} />
      <div className="pa3">
        <h1 className="flex items-center brand f-regular">
          <ExclamationMarkIcon className="h2 mr3" fill={config.colors.brand} />
          Add an account
        </h1>
        <p className="mt3">
          You must have at least one bank account on file. To delete this
          account please add another account first.
        </p>
        <div className="mt3">
          <Button
            small
            backgroundColorSet
            className="bg-brand"
            onClick={handleDismiss}
          >
            Ok
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const EnhancedDeleteWithdrawalSettingsWarningPage = React.memo(
  DeleteWithdrawalSettingsWarningPage
);

export default EnhancedDeleteWithdrawalSettingsWarningPage;
