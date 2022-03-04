import React, {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';

import {Input, VerificationPrompt} from 'elements';
import {cancelAccount} from 'redux/modules/session/actions';

const DeleteAccountPage = ({onDismiss, history}) => {
  const [value, setValue] = useState('');
  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const goToThankYouPage = useCallback(() => {
    history.push('/thankyou');
  }, [history]);

  const dispatch = useDispatch();
  const deleteAccount = useCallback(() => {
    if (value === 'DELETE') {
      dispatch(cancelAccount())
        .then(() => {
          goToThankYouPage();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [dispatch, goToThankYouPage, value]);

  return (
    <VerificationPrompt
      flexibleHeight
      title="Delete Account"
      titleClassName="brand"
      description="Since this action cannot be undone, we want to make sure we understand your goals."
      okButtonLabel="Delete my account"
      onOkButtonClick={deleteAccount}
      cancelButtonLabel="Keep my account"
      onCancelButtonClick={onDismiss}
      onDismiss={onDismiss}
      cancelFirst
    >
      <div>
        <label className="db mb2">Type DELETE to confirm</label>
        <Input border value={value} onChange={handleChange} />
      </div>
    </VerificationPrompt>
  );
};

const EnhancedDeleteAccountPage = React.memo(DeleteAccountPage);

export default EnhancedDeleteAccountPage;
