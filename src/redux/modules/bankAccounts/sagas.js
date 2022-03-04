import {reset as formReset} from 'redux-form';
import {get} from 'lodash';
import {takeLatest, put, call} from 'redux-saga/effects';

import * as cx from 'redux/modules/bankAccounts/constants';
import {displayName as bankForm} from 'views/user/components/forms/BankAccountForm';
import {displayName as bankFormCA} from 'views/user/components/forms/BankAccountFormCa';
import {
  clearAlerts,
  successAlert,
  errorAlert,
} from 'redux/modules/growl/actions';
import {promiseStripeToken} from 'redux/modules/stripe/helpers';
import {request, report, success} from 'redux/modules/async/helpers';
import apiClient from 'helpers/apiClient';

const getBankAccounts = request({
  type: cx.GET_BANK_ACCOUNTS,
  method: apiClient.get,
  path: 'users/external_accounts',
  success: ({data: bankAccounts}) => ({bankAccounts}),
});

function* createWithdrawalBankAccount(action) {
  try {
    yield report.pending(cx.CREATE_WITHDRAWAL_BANK_ACCOUNT);
    const stripeRes = yield promiseStripeToken(action.payload, 'bank_account');

    if (stripeRes.error) {
      const {error} = stripeRes;
      yield report.failure(cx.CREATE_WITHDRAWAL_BANK_ACCOUNT);
      yield put(
        errorAlert({
          body: error.message,
          title: 'Error',
        })
      );
      yield report.error(cx.CREATE_WITHDRAWAL_BANK_ACCOUNT, error);

      return;
    }

    const token = get(stripeRes, 'token.id', '');
    const {data: bankAccount} = yield call(
      apiClient.post,
      'users/external_accounts',
      {
        nickname: action.payload.account_holder_name,
        source: token,
        security: action.payload.security,
      }
    );

    yield put({
      payload: {bankAccount},
      type: success(cx.CREATE_WITHDRAWAL_BANK_ACCOUNT),
    });
    yield put(
      successAlert({
        title: 'Account Added',
        body: `${action.payload.account_holder_name} was added to your withdrawal bank accounts.`,
      })
    );
    yield put(formReset(bankForm));
    yield put(formReset(bankFormCA));
    yield report.success(cx.CREATE_WITHDRAWAL_BANK_ACCOUNT);
  } catch (err) {
    yield report.failure(cx.CREATE_WITHDRAWAL_BANK_ACCOUNT);
    const errMsg = get(
      err,
      'response.data.error',
      'Something went wrong while saving your updates'
    );
    yield put(
      errorAlert({
        title: 'Error',
        body: errMsg,
      })
    );
    yield report.error(cx.CREATE_WITHDRAWAL_BANK_ACCOUNT, err);
  }
}

const deleteWithdrawalBankAccount = request({
  method: apiClient.post,
  *onFailure(error) {
    const message = get(error, 'data.error', '');
    yield put(clearAlerts());
    yield put(
      errorAlert({
        body: message,
        title: 'Could not delete bank account.',
      })
    );
  },
  path: action => `users/external_accounts/${action.payload.id}/remove`,
  success: ({data: bankAccounts}) => ({bankAccounts}),
  type: cx.DELETE_WITHDRAWAL_BANK_ACCOUNT,
});

export default function* rootSaga() {
  yield takeLatest(cx.GET_BANK_ACCOUNTS, getBankAccounts);
  yield takeLatest(
    cx.CREATE_WITHDRAWAL_BANK_ACCOUNT,
    createWithdrawalBankAccount
  );
  yield takeLatest(
    cx.DELETE_WITHDRAWAL_BANK_ACCOUNT,
    deleteWithdrawalBankAccount
  );
}
