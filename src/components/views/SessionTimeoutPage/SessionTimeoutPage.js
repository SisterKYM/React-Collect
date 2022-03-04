import {IoMdAlert} from 'react-icons/io';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';
import _ from 'lodash';

import {Button, Modal, ModalCloseButton} from 'elements';

const SessionTimeoutPage = ({timedOut, history}) => {
  React.useEffect(() => {
    if (!timedOut) {
      history.goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timedOut]);

  return (
    <Modal flexibleHeight size="SMALL" onDismiss={history.goBack}>
      <ModalCloseButton onClick={history.goBack} />
      <div className="pa4">
        <div className="flex items-center">
          <IoMdAlert className="mr2 brand" size={42} />
          <h2>Session Timeout</h2>
        </div>
        <div className="mv3 f-regular">
          <p>You&apos;ve been logged out due to inactivity.</p>
        </div>
        <Link to="/login" target="_blank">
          <Button small backgroundColorSet className="bg-brand">
            Log Back In
          </Button>
        </Link>
      </div>
    </Modal>
  );
};

const enhance = connect((state) => ({
  timedOut: _.get(state.session, 'session.expires_in') <= 0,
}));

const EnhancedSessionTimeoutPage = enhance(SessionTimeoutPage);

export default EnhancedSessionTimeoutPage;
