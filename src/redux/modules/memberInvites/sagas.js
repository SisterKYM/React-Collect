import {FaCheck, FaCheckCircle} from 'react-icons/fa';
import {
  all,
  call,
  cancelled,
  delay,
  put,
  race,
  select,
  take,
  takeLatest,
} from 'redux-saga/effects';
import {chunk, get, identity, pickBy, reject, toPairs} from 'lodash';

import * as async from 'redux/modules/async/helpers';
import * as cx from 'redux/modules/memberInvites/constants';
import {
  clearAlerts,
  errorAlert,
  successAlert,
} from 'redux/modules/growl/actions';
import {promiseStripeToken} from 'redux/modules/stripe/helpers';
import apiClient from 'helpers/apiClient';

const normalizeMemberInvites = ({data: {pagination, search, data = []}}) => ({
  pagination,
  search,
  memberInvites: data,
});

const getMemberInvites = async.request({
  type: cx.GET_MEMBER_INVITES,
  method: apiClient.get,
  path: action => {
    const query = pickBy(get(action, 'payload.query'), identity);

    const queryString = toPairs({
      sort: 'created_at',
      direction: 'asc',
      ...query,
    })
      .map(q => q.join('='))
      .join('&');

    return `users/org_member_invites?${queryString}`;
  },
  success: normalizeMemberInvites,
});

const resendEmailAllMemberInvites = async.request({
  type: cx.RESEND_EMAIL_ALL_MEMBER_INVITES,
  method: apiClient.post,
  path: 'users/org_member_invites/resend_all',
  transformPayload: payload => {
    const query = get(payload, 'query');

    return {
      sort: 'created_at',
      direction: 'asc',
      ...query,
    };
  },
  *onSuccess(action, payload) {
    yield put(
      successAlert({
        title: 'Invites resent!',
        body: `${payload.data.sent} welcome email${
          payload.data.sent === 1 ? '' : 's'
        } resent. `,
        icon: FaCheckCircle,
      })
    );
  },
});

function* addMemberInvites(action) {
  try {
    let processedMemberCount = 0;
    yield async.report.pending(cx.ADD_MEMBER_INVITES, {processedMemberCount});

    const chunkedCreateStripeTokenFuncs = chunk(
      action.payload.profiles.map(memberInvite => () =>
        memberInvite.bankAccount &&
        memberInvite.bankAccount.accountNumber &&
        memberInvite.bankAccount.routingNumber
          ? promiseStripeToken(
              {
                account_holder_name: `${memberInvite.first_name} ${memberInvite.last_name}`,
                country:
                  memberInvite.address &&
                  memberInvite.address.country === 'Canada'
                    ? 'CA'
                    : 'US',
                currency: memberInvite.currency,
                account_number: memberInvite.bankAccount.accountNumber,
                routing_number: memberInvite.bankAccount.routingNumber,
              },
              'bank_account'
            )
          : null
      ),
      cx.MAX_STRIPE_CREATE_BANK_ACCOUNT_TOKEN_COUNT
    );

    let stripeResults = [];

    for (const createStripeTokenFuncs of chunkedCreateStripeTokenFuncs) {
      if (stripeResults.length !== 0) {
        yield delay(1000);
      }

      const currentStripeResults = yield all(
        createStripeTokenFuncs.map(x => call(x))
      );
      stripeResults = [...stripeResults, ...currentStripeResults];

      const currentStripeErrors = currentStripeResults
        .filter(
          currentStripeResult =>
            currentStripeResult && currentStripeResult.error
        )
        .map(({error}) => error);

      if (currentStripeErrors.length !== 0) {
        const error = currentStripeErrors[0];
        yield async.report.failure(cx.ADD_MEMBER_INVITES);
        yield put(
          errorAlert({
            body: error.message,
            title: 'Error',
          })
        );
        yield async.report.error(cx.ADD_MEMBER_INVITES, error);

        return;
      }
    }

    const chunkedProfiles = chunk(
      action.payload.profiles.map(({bankAccount, ...profile}, idx) => ({
        ...profile,
        stripe: {
          banks: stripeResults[idx]
            ? [
                {
                  nickname: `${profile.first_name} ${profile.last_name}`,
                  token: stripeResults[idx].token.id,
                },
              ]
            : undefined,
        },
      })),
      cx.ADD_MEMBER_INVITE_MAX_PROFILE_COUNT
    );

    const inviteMemberFuncs = chunkedProfiles.map(profiles => () =>
      apiClient.post('/users/org_member_invites', {
        ...action.payload,
        profiles,
      })
    );

    const memberInvitesState = yield select(state => state.memberInvites);
    let successPayload = {
      pagination: memberInvitesState.pagination,
      memberInvites: memberInvitesState.memberInvites,
    };

    for (const inviteMemberFunc of inviteMemberFuncs) {
      if (processedMemberCount !== 0) {
        yield delay(1000);
      }

      const {
        data: {
          invites_sent: invitesSent,
          existing_users: existingUsers,
          previously_invited: previouslyInvited,
        },
      } = yield call(inviteMemberFunc);

      successPayload = {
        ...successPayload,
        memberInvites: [
          ...invitesSent,
          ...existingUsers,
          ...successPayload.memberInvites,
        ],
      };
      processedMemberCount += invitesSent.length + previouslyInvited.length;

      yield async.report.pending(cx.ADD_MEMBER_INVITES, {processedMemberCount});
    }

    const {data} = yield call(apiClient.get, 'users/org_member_invites');
    yield put({
      payload: data,
      type: async.success(cx.ADD_MEMBER_INVITES),
    });

    yield put(clearAlerts());
    yield put(
      successAlert({
        title: 'Invite sent!',
        body: `Nice work! ${action.payload.profiles.length} welcome email${
          action.payload.profiles.length === 1 ? '' : 's'
        } were just sent to new members. `,
        icon: FaCheckCircle,
      })
    );
    yield async.report.success(cx.ADD_MEMBER_INVITES);
  } catch (err) {
    const errors =
      err.response && err.response.data && err.response.data.errors
        ? err.response.data.errors
        : {};
    const email = get(Object.keys(errors), '[0]');
    const errorMessage = get(errors[email], '[0].message') || err.message;

    yield put(clearAlerts());
    yield put(
      errorAlert({
        body:
          !email || action.payload.profiles.length === 1
            ? errorMessage
            : `${errorMessage} at ${email}`,
        title: 'Error',
      })
    );

    yield async.report.failure(cx.ADD_MEMBER_INVITES);
    yield async.report.error(cx.ADD_MEMBER_INVITES, err);
  } finally {
    if (yield cancelled()) {
      yield async.report.failure(cx.ADD_MEMBER_INVITES);
    }
  }
}

function* removeMemberInvite(action) {
  try {
    yield async.report.pending(cx.REMOVE_MEMBER_INVITE);

    yield call(
      apiClient.delete,
      `/users/org_member_invites/${action.payload.id}`
    );

    const memberInvitesState = yield select(state => state.memberInvites);

    yield put({
      payload: {
        pagination: memberInvitesState.pagination,
        memberInvites: reject(memberInvitesState.memberInvites, {
          id: action.payload.id,
        }),
      },
      type: async.success(cx.REMOVE_MEMBER_INVITE),
    });

    yield async.report.success(cx.REMOVE_MEMBER_INVITE);
  } catch (err) {
    yield async.report.failure(cx.REMOVE_MEMBER_INVITE);
    yield async.report.error(cx.REMOVE_MEMBER_INVITE, err);
  }
}

const resendMemberInvite = async.request({
  method: apiClient.post,
  path: action => `/users/org_member_invites/${action.payload.invite}/resend`,
  type: cx.RESEND_MEMBER_INVITE,
  *onSuccess() {
    const alert = successAlert({
      title: 'Success!',
      body: `Invitation re-sent`,
      icon: FaCheck,
    });
    yield put(alert);
  },
});

export default function* rootSaga() {
  // eslint-disable-next-line func-names
  yield takeLatest(cx.ADD_MEMBER_INVITES, function*(...args) {
    yield race({
      task: call(addMemberInvites, ...args),
      cancel: take(cx.CANCEL_ADD_MEMBER_INVITES),
    });
  });

  yield takeLatest(cx.GET_MEMBER_INVITES, getMemberInvites);
  yield takeLatest(
    cx.RESEND_EMAIL_ALL_MEMBER_INVITES,
    resendEmailAllMemberInvites
  );
  yield takeLatest(cx.REMOVE_MEMBER_INVITE, removeMemberInvite);
  yield takeLatest(cx.RESEND_MEMBER_INVITE, resendMemberInvite);
}
