import {get} from 'lodash';

import {DELETE_WITHDRAWAL_BANK_ACCOUNT} from 'redux/modules/bankAccounts/constants';

const onBankAccountDelete = props => account => {
  if (!props.bankAccounts || props.bankAccounts.length === 1) {
    props.history.push('/user/withdrawal-settings/delete-warning');

    return;
  }

  const pathname = get(props, 'location.pathname', '');
  const shouldAddPhone =
    get(props, 'session.phoneJustReset') ||
    !(
      get(props, 'session.user.profile.phone.verified') ||
      get(props, 'session.phoneJustVerified')
    );

  if (shouldAddPhone) {
    props.history.push(`${pathname}/phone/add-phone`);
  } else {
    props.requestVerificationCode();

    props.history.push({
      pathname: `${pathname}/phone/verify`,
      state: {
        verifyActionType: DELETE_WITHDRAWAL_BANK_ACCOUNT,
        payload: account,
      },
    });
  }
};

export default onBankAccountDelete;
