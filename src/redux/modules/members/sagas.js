import {FaBan, FaCheck, FaExclamationCircle} from 'react-icons/fa';
import {reset as formReset} from 'redux-form';
import {takeLatest, call, put} from 'redux-saga/effects';

import * as async from 'redux/modules/async/helpers';
import * as cx from 'redux/modules/members/constants';
import {errorAlert, successAlert} from 'redux/modules/growl/actions';
import {displayName as inviteForm} from 'views/collection/share/components/ShareInvite/InviteForm';
import {readApiError} from 'helpers/apiResponseHelpers';
import apiClient from 'helpers/apiClient';

const getMembers = async.request({
  type: cx.GET_MEMBERS,
  method: apiClient.get,
  path: (action) => `users/tabs/${action.payload.collection}/members`,
  // path: action => `users/tabs/${action.payload.collection}/members/search`,
  success: (res) => ({
    members: res.data,
    // members: res.data.data,
    // search: res.data.search,
    // sorted: {
    //   sort: res.data.sort,
    // },
    // pagination: res.data.pagination,
  }),
});

const getInvites = async.request({
  type: cx.GET_INVITES,
  method: apiClient.get,
  path: (action) => `users/tabs/${action.payload.collection}/invites`,
  success: (res) => ({invites: res.data}),
});

const deleteInvite = async.request({
  type: cx.DELETE_INVITE,
  method: apiClient.delete,
  path: (action) =>
    `users/tabs/${action.payload.collection}/invites/${action.payload.invite}`,
  onSuccess: getInvites,
});

const sendMessage = async.request({
  type: cx.SEND_MESSAGE,
  method: apiClient.post,
  path: (action) => `users/tabs/${action.payload.collection}/messages`,
  *onSuccess(action, {data: {sentCount}}) {
    const alert = successAlert({
      title: 'Success!',
      body: `${sentCount} emails sent.`,
      icon: FaCheck,
    });
    yield put(alert);
  },
  onFailure: function* onFailure() {
    yield put(
      errorAlert({
        body: 'Something went wrong when sending your messages.',
        icon: FaExclamationCircle,
        title: 'Oops!',
      })
    );
  },
});

const sendTestMessage = async.request({
  type: cx.SEND_TEST_MESSAGE,
  method: apiClient.post,
  path: (action) => `users/tabs/${action.payload.collection}/messages/preview`,
  *onSuccess() {
    const alert = successAlert({
      title: 'Success!',
      body: `Your test has been sent.`,
      icon: FaCheck,
    });
    yield put(alert);
  },
  onFailure: function* onFailure() {
    yield put(
      errorAlert({
        body: "Please make sure you've filled out a subject and message first",
        icon: FaExclamationCircle,
        title: 'Oops!',
      })
    );
  },
});

const remindInvite = async.request({
  type: cx.REMIND_INVITE,
  method: apiClient.post,
  path: (action) =>
    `users/tabs/${action.payload.collection}/invites/${action.payload.invite}/remind`,
  *onSuccess(action, {data: {sentTo}}) {
    const alert = successAlert({
      title: 'Success!',
      body: `Reminder sent to: ${sentTo}`,
      icon: FaCheck,
    });
    yield put(alert);
  },
});

const sendAllReminders = async.request({
  type: cx.SEND_ALL_REMINDERS,
  method: apiClient.post,
  path: (action) =>
    `users/tabs/${action.payload.collection}/reminders/send_all`,
  *onSuccess(action, {data: {sentTo}}) {
    const alert = successAlert({
      title: 'Success!',
      body: `${sentTo} email${sentTo === 1 ? '' : 's'} sent`,
      icon: FaCheck,
    });
    yield put(alert);
  },
});

const sendTestReminder = async.request({
  type: cx.SEND_TEST_REMINDER,
  method: apiClient.post,
  path: (action) => `users/tabs/${action.payload.collection}/reminders/preview`,
  *onSuccess(action, {data: {sentTo}}) {
    const alert = successAlert({
      title: 'Success!',
      body: `Test email sent to ${sentTo}`,
      icon: FaCheck,
    });
    yield put(alert);
  },
});

function* inviteMembers(action) {
  try {
    yield async.report.pending(cx.INVITE_MEMBERS);
    const {
      collection,
      emailCollection,
      message,
      captchaToken,
      duplicateCount,
    } = action.payload;
    if (!captchaToken) {
      yield put(
        errorAlert({
          body: 'A captcha response is required.',
          icon: FaExclamationCircle,
          title: 'Sorry!',
        })
      );
      yield async.report.failure(cx.INVITE_MEMBERS);
      yield async.report.error(
        cx.INVITE_MEMBERS,
        'A captcha response is required.'
      );

      return;
    }

    const response = yield call(
      apiClient.post,
      `users/tabs/${collection}/members`,
      {collection: emailCollection, message, captchaToken}
    );
    const sentTo = response.data;
    yield put({type: async.success(cx.INVITE_MEMBERS)});
    yield call(getInvites, {payload: {collection}});
    yield async.report.success(cx.INVITE_MEMBERS);
    if (sentTo.length > 0) {
      const alert = successAlert({
        title: `Success! ${sentTo.length} email${
          sentTo.length === 1 ? '' : 's'
        } sent`,
        body:
          duplicateCount &&
          `${duplicateCount} duplicate address${
            duplicateCount ? 'es' : ''
          } were not sent`,
        icon: FaCheck,
      });
      yield put(alert);
      if (sentTo.length === emailCollection.length) {
        yield put(formReset(inviteForm));
      }
    } else {
      const alert = errorAlert({
        title: 'No emails were sent',
        body: 'Please try reformatting addresses or removing duplicates.',
      });
      yield put(alert);
    }
  } catch (err) {
    yield async.report.failure(cx.INVITE_MEMBERS);
    const apiError = readApiError(err, {
      invalid_captcha: 'The captcha was invalid',
      batch_limit_exceeded: ({limit}) =>
        `You can only send ${limit} invitations at a time.`,
      per_day_limit_exceeded: ({limit}) =>
        `You can only send ${limit} invitations per day.`,
    });
    if (apiError) {
      yield put(
        errorAlert({
          title: 'Error',
          body: apiError,
          icon: FaBan,
        })
      );
    }
    yield async.report.error(cx.INVITE_MEMBERS, apiError || err);
  }
}

function* sendTest(action) {
  const {collectionId, message} = action.payload;
  let growlAlert;

  try {
    const {data} = yield call(
      apiClient.post,
      `users/tabs/${collectionId}/members/preview`,
      {message}
    );

    growlAlert = successAlert({
      title: 'Success!',
      body: `Test email sent to ${data.sent_to}`,
      icon: FaCheck,
    });
  } catch (err) {
    growlAlert = errorAlert({
      title: 'Error',
      body: `Test email was not sent. Please try again`,
      icon: FaBan,
    });
  } finally {
    yield put(growlAlert);
  }
}

export default function* rootSaga() {
  yield takeLatest(cx.GET_MEMBERS, getMembers);
  yield takeLatest(cx.INVITE_MEMBERS, inviteMembers);
  yield takeLatest(cx.SEND_TEST, sendTest);
  yield takeLatest(cx.SEND_MESSAGE, sendMessage);
  yield takeLatest(cx.SEND_TEST_MESSAGE, sendTestMessage);
  yield takeLatest(cx.GET_INVITES, getInvites);
  yield takeLatest(cx.SEND_TEST_REMINDER, sendTestReminder);
  yield takeLatest(cx.SEND_ALL_REMINDERS, sendAllReminders);
  yield takeLatest(cx.DELETE_INVITE, deleteInvite);
  yield takeLatest(cx.REMIND_INVITE, remindInvite);
}
