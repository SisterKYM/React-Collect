import {connect} from 'react-redux';
import {formValueSelector} from 'redux-form';
import React from 'react';
import cx from 'classnames';

import {ADD_ATTACHMENT} from 'redux/modules/collections/constants';
import {PromptModal, ModalCloseButton, Status} from 'elements';
import {addAttachment} from 'redux/modules/collections/actions';

import {Form} from './components';

const AddAttachmentPage = ({
  match,
  from,
  status,
  onDismiss,
  history,
  onAddAttachment,
  submitFirst,
}) => {
  const dismissPath = `/collection/${match.params.owner}/${
    match.params.collection
  }/${from || 'settings'}`;

  const handleSubmit = React.useCallback(
    ({file}) => {
      if (match.params.collection) {
        onAddAttachment({
          file,
          collection: match.params.collection,
        });
      } else {
        submitFirst(file);
      }
    },
    [match, onAddAttachment, submitFirst]
  );

  React.useEffect(() => {
    if (status === 'success') {
      history.push(dismissPath);
      if (onDismiss) {
        onDismiss();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <PromptModal flexibleHeight onDismiss={onDismiss}>
      {status !== 'pending' && (
        <ModalCloseButton onClick={onDismiss} className="dark-grey" />
      )}
      <div className={cx('flex', status === 'pending' && 'justify-center')}>
        {status === 'pending' ? (
          <div className="flex pa3">
            <Status status={status} messages={{pending: 'Uploading...'}} />
          </div>
        ) : (
          <Form onSubmit={handleSubmit} onDismiss={onDismiss} />
        )}
      </div>
    </PromptModal>
  );
};

const selector = formValueSelector('AddAttachmentForm');

const enhance = connect(
  (state) => ({
    status: state.async.statuses[ADD_ATTACHMENT],
    attachments: state.collections.attachments || [],
    formFile: selector(state, 'file'),
  }),
  (dispatch) => ({
    onAddAttachment: (payload) => dispatch(addAttachment(payload)),
  })
);

const EnhancedAddAttachmentPage = enhance(AddAttachmentPage);

export default EnhancedAddAttachmentPage;
