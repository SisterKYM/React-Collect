import {get} from 'lodash';

import {CREATE_WITHDRAWAL_BANK_ACCOUNT} from 'redux/modules/bankAccounts/constants';

const onBankAccountFormSubmit = props => values => {
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

    const routingNumber = props.isCanadian
      ? `${values.transitNumber}-${values.institutionNumber}`
      : values.routingNumber;

    props.history.push({
      pathname: `${pathname}/phone/verify`,
      state: {
        verifyActionType: CREATE_WITHDRAWAL_BANK_ACCOUNT,
        payload: {
          account_holder_name: values.nickName || '',
          account_number: values.accountNumber,
          country: props.isCanadian ? 'CA' : 'US',
          currency: props.isCanadian ? 'CAD' : 'USD',
          routing_number: routingNumber,
        },
      },
    });
  }
};

export default onBankAccountFormSubmit;
