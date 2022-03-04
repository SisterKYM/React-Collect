import {useDispatch, useSelector} from 'react-redux';
import React from 'react';

import {VerificationPrompt, Status} from 'elements';
import {DELETE_FORM} from 'redux/modules/forms/constants';
import {deleteForm} from 'redux/modules/forms/actions';

const FormDeletePage = ({history, match}) => {
  const dispatch = useDispatch();
  const deleteFormStatus = useSelector(
    (state) => state.async.statuses[DELETE_FORM]
  );

  const confirmDelete = React.useCallback(() => {
    dispatch(
      deleteForm({
        collection: Number(match.params.collection),
        form: Number(match.params.form),
      })
    );
  }, [dispatch, match]);

  const handleDismiss = React.useCallback(() => {
    history.push(
      `/collection/${match.params.owner}/${match.params.collection}/forms`
    );
  }, [history, match]);

  React.useEffect(() => {
    if (deleteFormStatus === 'success') {
      history.push(
        `/collection/${match.params.owner}/${match.params.collection}/forms`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteFormStatus]);

  return (
    <VerificationPrompt
      flexibleHeight
      onDismiss={handleDismiss}
      title="Are you sure you want to delete this form?"
      description="This action can not be undone."
      okButtonLabel="Delete"
      onOkButtonClick={confirmDelete}
      okButtonDisabled={deleteFormStatus === 'pending'}
      cancelButtonLabel="Cancel"
      onCancelButtonClick={handleDismiss}
      cancelButtonDisabled={deleteFormStatus === 'pending'}
    >
      <div className="ml2">
        {deleteFormStatus === 'pending' && (
          <Status
            messages={{
              pending: 'Deleting...',
            }}
            status={deleteFormStatus}
          />
        )}
      </div>
    </VerificationPrompt>
  );
};

const EnhancedFormDeletePage = React.memo(FormDeletePage);

export default EnhancedFormDeletePage;
