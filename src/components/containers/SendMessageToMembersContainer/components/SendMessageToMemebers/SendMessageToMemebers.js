import PropTypes from 'prop-types';
import React from 'react';

import {CommonModal, Status, CommonButton} from 'elements';

import SendMessageForm from './SendMessageForm';

const SendMessageToMemebers = ({
  formName,
  members,
  sendStatus,
  onSubmit,
  onTest,
  onDismiss,
}) => {
  const formRef = React.useRef(null);

  React.useEffect(() => {
    if (sendStatus === 'success') {
      onDismiss();
    }
  }, [onDismiss, sendStatus]);

  return (
    <CommonModal
      contentContainerClassName="br2-ns"
      title="Send a Message"
      onDismiss={onDismiss}
    >
      <div className="pt3 pb5 pl4 pr5">
        <SendMessageForm
          ref={formRef}
          form={formName}
          members={members}
          onSubmit={onSubmit}
        />
        <div className="flex items-center">
          <CommonButton
            className="bg-gray-250 gray-600 pt-14 mr3"
            onClick={onTest}
          >
            Send me a test
          </CommonButton>
          <CommonButton
            className="bg-tint white pt-14"
            status={sendStatus}
            onClick={() => {
              formRef.current.submit();
            }}
          >
            Send Now
          </CommonButton>
          {Boolean(sendStatus) && (
            <div className="pl3">
              <Status
                status={sendStatus}
                messages={{
                  pending: 'Sending...',
                  success: 'Sent',
                  failure: 'Sending failed.',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </CommonModal>
  );
};

const EnhancedSendMessageToMemebers = Object.assign(
  React.memo(SendMessageToMemebers),
  {
    propTypes: {
      formName: PropTypes.string.isRequired,
      members: PropTypes.arrayOf(
        PropTypes.shape({
          email: PropTypes.string,
          id: PropTypes.number,
          payments: PropTypes.arrayOf(PropTypes.object),
        })
      ).isRequired,
      onDismiss: PropTypes.func,
      onSubmit: PropTypes.func.isRequired,
      onTest: PropTypes.func,
      sendStatus: PropTypes.string,
    },
  }
);

export default EnhancedSendMessageToMemebers;
