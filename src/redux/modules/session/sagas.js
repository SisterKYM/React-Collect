import {EventTypes} from 'redux-segment';
import {FaBan, FaCheck, FaExclamationCircle} from 'react-icons/fa';
import {call, put, takeLatest, select} from 'redux-saga/effects';
import {get, indexOf, isArray, some} from 'lodash';
import {push} from 'connected-react-router';

import {
  clearAlerts,
  errorAlert,
  successAlert,
} from 'redux/modules/growl/actions';
import {normalizeSession} from 'redux/modules/session/helpers';
import {request, report, success} from 'redux/modules/async/helpers';
import {storage, getFingerprint} from 'helpers';
import S3ImageUploader from 'helpers/S3ImageUploader';
import apiClient from 'helpers/apiClient';

import * as cx from './constants';
import {getSession as getSessionAction} from './actions';

const GUEST_PAGE_PATHNAMES = [
  '/login',
  '/c',
  '/contact',
  '/me',
  '/group-payments',
  '/pta-online-payments',
  '/boy-scout',
  '/girl-scout',
  '/reunion',
  '/how-it-works',
  '/signup',
  '/orgs',
  '/invitations',
];

const setTrackingData = (payload) => {
  const email = get(payload, 'user.email', null);
  const id = get(payload, 'user.id', null);
  const cflow = get(payload, 'analytics.cflow', false);
  if (cflow && !window.convertflow) {
    const script = document.createElement('script');
    script.src = 'https://js.convertflow.co/production/websites/11117.js';
    script.type = 'text/javascript';
    document.querySelectorAll('head')[0].append(script);
  }
  window.trackcmp_email = email;
  window.trackcmp_id = id;
  if (window.NickelledLaunchers && id) {
    window.NickelledLaunchers.setUser({
      appId: 'cheddarup.com-328331',
      userId: id,
      ...payload.capabilities,
      ...payload.user,
    });
  }
  if (window.HelpHero && id) {
    const mediaQuery =
      window.matchMedia && window.matchMedia('(max-width: 959px)');

    window.HelpHero.identify(id, {
      ...payload.user,
      ...payload.capabilities,
      partner: payload?.organization,
      isMobile: mediaQuery != null && mediaQuery.matches,
    });

    if (mediaQuery != null) {
      mediaQuery.addListener((ev) => {
        window.HelpHero.update({isMobile: ev.matches});
      });
    }
  }
  if (
    window.ORIBI &&
    window.ORIBI.scriptInitialized &&
    window.ORIBI.setUserEmail
  ) {
    window.ORIBI.setUserEmail(email);
  }
  if (window.Upscope) {
    window.Upscope('updateConnection', {
      identities: payload && [email, get(payload, 'user.name', null)],
      uniqueId: payload && get(payload, 'user.id', null),
      tags: payload
        ? [get(payload, 'organization_data.name', null)]
        : ['Guest'],
    });
  }
  window.zESettings = window.zESettings || {};
  window.zESettings.webWidget = window.zESettings.webWidget || {};
  window.zESettings.webWidget.authenticate = {
    chat: {
      jwtFn: async (callback) => {
        const {data: jwt} = await apiClient.get('zendesk');
        callback(jwt);
      },
    },
  };
};

const changePassword = request({
  onFailure: function* onFailure(err) {
    const currentPassword = get(err, 'data.errors.current_password', []);
    const password = get(err, 'data.errors.password', []);
    const passwordConf = get(err, 'data.errors.password_confirmation', []);
    let body = '';
    if (currentPassword.length !== 0) {
      body = 'Invalid current password';
    } else if (password.length !== 0) {
      body = password[0];
    } else if (passwordConf.length !== 0) {
      body = 'New password and its confirmation must match';
    }
    yield put(clearAlerts());
    yield put(
      errorAlert({
        body,
        icon: FaExclamationCircle,
        title: 'Oops!',
      })
    );
  },
  onSuccess: function* onSuccess() {
    yield put(clearAlerts());
    yield put(
      successAlert({
        title: 'Success',
        body: 'Your password was successfully updated',
        icon: FaCheck,
      })
    );
  },
  path: 'password',
  type: cx.CHANGE_PASSWORD,
  method: apiClient.patch,
});

const login = request({
  cache: 30,
  path: 'login',
  type: cx.LOGIN,
  cacheKey: cx.SESSION,
  method: apiClient.post,
  transformPayload: async (incoming) => {
    const payload = incoming;
    const fp = await getFingerprint();
    payload.fpHash = fp.hash;

    return payload;
  },
  success: ({data}) => normalizeSession(data),
  failure: (res) => get(res, 'data.errors[0]'),
  onSuccess: (action, payload) => {
    setTrackingData(payload);
  },
  successMeta: ({user, analytics, organization}) => ({
    googleTagManager: {
      event: 'LOGGED_IN',
      userId: user.id,
      email: user.email,
      partner: organization,
      ...(analytics?.sib || {}),
    },
    sendinblue: [
      {
        method: 'identify',
        parameters: {
          email: user.email,
          name: user.full_name,
          firstname: user.first_name,
          lastname: user.last_name,
          partner: organization,
          sign_up_date: user.created_at,
        },
      },
    ],
  }),
});

const forgotPassword = request({
  path: 'password/forgot',
  type: cx.FORGOT_PASSWORD,
  method: apiClient.post,
});

const resetPassword = request({
  path: 'password/reset',
  type: cx.RESET_PASSWORD,
  method: apiClient.post,
  onSuccess: function* onSuccess(action) {
    yield put({type: cx.LOGIN, payload: action.payload});
  },
});

const signUp = request({
  path: 'signup',
  type: cx.SIGNUP,
  method: apiClient.post,
  success: ({data}) => normalizeSession(data),
  onSuccess: (action, payload) => {
    setTrackingData(payload);
  },
  successMeta: ({user, analytics, organization}) => ({
    googleTagManager: {
      event: 'SIGNED_UP',
      userId: user.id,
      email: user.email,
      partner: organization,
      ...(analytics?.sib || {}),
    },
    sendinblue: [
      {
        method: 'identify',
        parameters: {
          email: user.email,
          name: user.full_name,
          firstname: user.first_name,
          lastname: user.last_name,
          partner: organization,
          sign_up_date: user.created_at,
        },
      },
    ],
    analytics: [
      {
        eventType: EventTypes.identify,
        eventPayload: {
          userId: user.id,
          traits: {
            email: user.email,
            createdAt: user.created_at,
            firstName: user.first_name,
            lastName: user.last_name,
            name: user.full_name,
            id: user.id,
          },
        },
      },
    ],
  }),
});

const logout = request({
  path: 'logout',
  type: cx.LOGOUT,
  method: apiClient.delete,
  success: () => {
    storage.clear();
    window.trackcmp_email = '';
    setTrackingData(null);
    if (window.convertflow) {
      // This is taken from the admin "reset tracking" script
      window.convertflow.app.helpers.setCookie('cf_11117_id', '', -10000);
      localStorage.removeItem('cf_person');
      localStorage.removeItem('cf_11117_person');
    }
    return {user: null, capabilities: null};
  },
  successMeta: () => ({
    analytics: {
      eventType: EventTypes.reset,
    },
    googleTagManager: {
      event: 'LOGGED_OUT',
      userId: null,
    },
    sendinblue: [
      {
        method: 'identify',
        parameters: {},
      },
    ],
  }),
});

const getSession = request({
  path: 'session',
  type: cx.GET_SESSION,
  method: apiClient.get,
  success: ({data}) => normalizeSession(data),
  onSuccess: (action, payload) => {
    setTrackingData(payload);
  },
  successMeta: ({user, analytics, organization}) => ({
    googleTagManager: {
      event: 'GET_SESSION',
      userId: user.id,
      email: user.email,
      partner: organization,
      ...(analytics?.sib || {}),
    },
    sendinblue: [
      {
        method: 'identify',
        parameters: {
          email: user.email,
          name: user.full_name,
          firstname: user.first_name,
          lastname: user.last_name,
          partner: organization,
          sign_up_date: user.created_at,
        },
      },
    ],
    analytics: {
      eventType: EventTypes.identify,
      eventPayload: {
        userId: user.id,
        traits: {
          email: user.email,
          createdAt: user.created_at,
          firstName: user.first_name,
          lastName: user.last_name,
          name: user.full_name,
          id: user.id,
        },
      },
    },
  }),
});

function* updateUser(action) {
  try {
    yield report.pending(cx.UPDATE_USER);
    const {uploads = {}, silent, ...data} = action.payload;
    let session = yield select((state) => state.session);

    if (Object.keys(data).length !== 0) {
      session = yield call(apiClient.patch, 'user', data);
    }

    if (uploads.verification_document) {
      const formData = new window.FormData();
      formData.append('verification_document', uploads.verification_document);
      session = yield call(apiClient.patch, 'user', formData);
    }
    yield report.success(cx.UPDATE_USER);
    const normalized = normalizeSession(session.data);
    const fieldsNeeded = get(normalized, 'fieldsNeeded', []);
    let alert;
    if (fieldsNeeded.length !== 0) {
      alert = errorAlert({
        title: 'We Need More Information',
        body:
          'In order to process your profile updates, we need a bit more information.',
        icon: FaBan,
      });
    } else if (!silent) {
      alert = successAlert({
        title: 'Success',
        body: 'Your profile was successfully updated',
        icon: FaCheck,
      });
    }

    if (alert) {
      yield put(clearAlerts());
      yield put(alert);
    }

    storage.clear(cx.SESSION);
    yield put(getSessionAction());
    yield put({type: success(cx.UPDATE_USER), payload: normalized});
  } catch (err) {
    yield report.failure(cx.UPDATE_USER);
    const EMAIL_IN_USE = 'Looks like this email is in use. Try logging in.';
    const errors = get(err, 'response.data.errors', {});
    let errMsg = get(
      err,
      'response.data.error',
      'Something went wrong while saving your updates. Please reload the page and try again.'
    );
    if (isArray(errors.email) && indexOf(errors.email, EMAIL_IN_USE) > -1) {
      errMsg = 'This email address is already in use, please try another';
    }
    if (errMsg.includes('401')) {
      errMsg = `Something went wrong while saving your updates. Please reload the page and try again.`;
    }

    yield put(
      errorAlert({
        title: 'Error',
        body: errMsg,
        icon: FaBan,
      })
    );
    yield report.error(cx.UPDATE_USER, errMsg);
  }
}

function* updateProfileImage(action) {
  try {
    yield report.pending(cx.UPDATE_PROFILE_IMAGE);

    const {payload} = action;
    const uploadedImage = payload.image
      ? yield call(S3ImageUploader.uploadProfileImage, {
          image: payload.image,
          thumbnail: {
            cropDetails: payload.crop || {},
          },
        })
      : null;
    const session = yield call(apiClient.patch, 'user', {
      profile_pic_id: uploadedImage ? uploadedImage.id : null,
    });

    yield report.success(cx.UPDATE_PROFILE_IMAGE);
    const normalized = normalizeSession(session.data);

    storage.clear(cx.SESSION);
    yield put(getSessionAction());
    yield put({type: success(cx.UPDATE_PROFILE_IMAGE), payload: normalized});
  } catch (err) {
    yield report.failure(cx.UPDATE_PROFILE_IMAGE);
    let errMsg = get(
      err,
      'response.data.error',
      'Something went wrong while saving your image. Please try again.'
    );
    if (errMsg.includes('401')) {
      errMsg = `Something went wrong while saving your updates. Please reload the page and try again.`;
    }

    yield put(
      errorAlert({
        title: 'Error',
        body: errMsg,
        icon: FaBan,
      })
    );
    yield report.error(cx.UPDATE_PROFILE_IMAGE, errMsg);
  }
}

function* cancelAccount() {
  try {
    yield report.pending(cx.CANCEL_ACCOUNT);
    yield call(apiClient.patch, 'users/subscription', {
      plan: 'free',
      force_update: true,
    });
    yield call(apiClient.delete, 'user');
    yield report.success(cx.CANCEL_ACCOUNT);
    const alert = successAlert({
      title: 'Success',
      body: 'Your account was successfully canceled',
      icon: FaCheck,
    });
    yield put(clearAlerts());
    yield put(alert);
    storage.clear();
    yield put({type: success(cx.CANCEL_ACCOUNT)});
    yield put(push({location: '/'}));
  } catch (err) {
    yield report.failure(cx.CANCEL_ACCOUNT);
    yield report.error(cx.CANCEL_ACCOUNT, err);
  }
}

const updateUserSlug = request({
  method: apiClient.patch,
  onFailure: function* onFailure(err) {
    yield put(clearAlerts());
    yield put(
      errorAlert({
        body: err.data.errors.slug[0],
        icon: FaExclamationCircle,
        title: 'Oops!',
      })
    );
  },
  path: 'user',
  success: ({data}) => normalizeSession(data),
  type: cx.UPDATE_USER_SLUG,
});

const getPaymentsToOthers = request({
  cache: 30,
  path: 'users/payments',
  type: cx.GET_PAYMENTS_TO_OTHERS,
  method: apiClient.get,
  cacheKey: cx.GET_PAYMENTS_TO_OTHERS,
  success: ({data: paymentsToOthers}) => ({paymentsToOthers}),
});

const getPaymentToOthers = request({
  type: cx.GET_PAYMENT_TO_OTHERS,
  method: apiClient.get,
  path: ({payload}) => `users/payments/${payload.paymentToOtherId}`,
  success: ({data: paymentToOthers}) => ({paymentToOthers}),
});

function* startPhoneVerification(action) {
  try {
    yield report.pending(cx.START_PHONE_VERIFICATION);
    yield put(getSessionAction());

    const phone = get(action, 'payload.phoneNumber');
    const country = get(action, 'payload.countryCode');
    const via = get(action, 'payload.via') || 'sms';
    if (phone && country) {
      yield call(apiClient.patch, 'user', {
        profile: {
          phone: {
            country_code: country,
            phone_number: phone,
          },
        },
      });
    }

    yield call(apiClient.post, 'users/verify/start', {via});

    yield report.success(cx.START_PHONE_VERIFICATION);

    yield put(clearAlerts());
    yield put(
      successAlert({
        title: 'Success',
        body: 'Verification code sent to your phone',
        icon: FaCheck,
      })
    );
    yield put({
      type: success(cx.START_PHONE_VERIFICATION),
    });
  } catch (err) {
    const errorRes = get(err, 'response', err);
    let errorMessage = get(errorRes, 'data.err', err.message);

    if (get(errorRes, 'data.errors.profile')) {
      errorMessage = errorRes.data.errors.profile[0];
    } else if (errorMessage === 'Already Verified') {
      errorMessage = 'Phone number has already been verified';
    }

    yield put(clearAlerts());

    yield put(
      errorAlert({
        title: 'Error',
        body: errorMessage,
        icon: FaExclamationCircle,
      })
    );

    yield report.failure(cx.START_PHONE_VERIFICATION);
    yield report.error(cx.START_PHONE_VERIFICATION, err);
  }
}

const completePhoneVerification = request({
  path: 'users/verify/verify',
  type: cx.COMPLETE_PHONE_VERIFICATION,
  method: apiClient.post,
  onSuccess: function* onSuccess() {
    storage.clear(cx.SESSION);
    yield put(getSessionAction());
  },
  onFailure: function* onFailure(err) {
    let errorMessage = get(err, 'data.err');

    if (errorMessage === 'Verify Token Error') {
      errorMessage = 'Invalid verification code';
    }

    yield put(clearAlerts());

    yield put(
      errorAlert({
        title: 'Error',
        body: errorMessage,
        icon: FaExclamationCircle,
      })
    );
  },
});

function* requestVerificationCode() {
  try {
    yield report.pending(cx.REQUEST_VERIFICATION_CODE);

    yield call(apiClient.post, 'users/verify/code');

    yield report.success(cx.REQUEST_VERIFICATION_CODE);

    yield put(clearAlerts());
    yield put(
      successAlert({
        title: 'Success',
        body: 'Verification code sent to your phone number',
        icon: FaCheck,
      })
    );

    yield put({type: success(cx.REQUEST_VERIFICATION_CODE)});
  } catch (err) {
    const errorRes = get(err, 'response', err);
    let errorMessage = get(errorRes, 'data.err', err.message);

    if (get(errorRes, 'data.errors.profile')) {
      errorMessage = errorRes.data.errors.profile[0];
    }

    yield put(clearAlerts());

    yield put(
      errorAlert({
        title: 'Error',
        body: errorMessage,
        icon: FaExclamationCircle,
      })
    );

    yield report.failure(cx.START_PHONE_VERIFICATION);
    yield report.error(cx.START_PHONE_VERIFICATION, err);
  }
}

const resetPhone = request({
  path: 'users/verify/reset',
  type: cx.RESET_PHONE,
  method: apiClient.post,
  onSuccess: function* onSuccess() {
    storage.clear(cx.SESSION);
    yield put(clearAlerts());
    yield put(
      successAlert({
        title: 'Success',
        body: 'Your two-factor authentication phone number has been reset',
        icon: FaCheck,
      })
    );
  },
  onFailure: function* onFailure(err) {
    let errorMessage = get(err, 'data.errors[0].error');

    if (errorMessage === 'invalid_security_token') {
      errorMessage = 'Invalid verification code';
    } else if (errorMessage === 'incorrect_reset_code') {
      errorMessage = 'Invalid backup security code';
    } else if (errorMessage === 'unauthorized') {
      errorMessage = 'Invalid password';
    }

    yield put(clearAlerts());

    yield put(
      errorAlert({
        title: 'Error',
        body: errorMessage,
        icon: FaExclamationCircle,
      })
    );
  },
});

function* handleSessionTimeout() {
  const pathname = yield select((state) => state.router.location.pathname);
  const pathnameParts = pathname.split('/');

  if (
    !pathname.includes('/session-timeout') &&
    !some(GUEST_PAGE_PATHNAMES, (guestPagePathname) =>
      pathnameParts.includes(guestPagePathname.replace('/', ''))
    )
  ) {
    yield put(push(`${pathname}/session-timeout`));
  }
}

export default function* rootSaga() {
  yield takeLatest(cx.CHANGE_PASSWORD, changePassword);
  yield takeLatest(cx.LOGIN, login);
  yield takeLatest(cx.SIGNUP, signUp);
  yield takeLatest(cx.LOGOUT, logout);
  yield takeLatest(cx.GET_SESSION, getSession);
  yield takeLatest(cx.FORGOT_PASSWORD, forgotPassword);
  yield takeLatest(cx.RESET_PASSWORD, resetPassword);
  yield takeLatest(cx.UPDATE_USER, updateUser);
  yield takeLatest(cx.CANCEL_ACCOUNT, cancelAccount);
  yield takeLatest(cx.UPDATE_USER_SLUG, updateUserSlug);
  yield takeLatest(cx.GET_PAYMENTS_TO_OTHERS, getPaymentsToOthers);
  yield takeLatest(cx.GET_PAYMENT_TO_OTHERS, getPaymentToOthers);
  yield takeLatest(cx.START_PHONE_VERIFICATION, startPhoneVerification);
  yield takeLatest(cx.COMPLETE_PHONE_VERIFICATION, completePhoneVerification);
  yield takeLatest(cx.REQUEST_VERIFICATION_CODE, requestVerificationCode);
  yield takeLatest(cx.RESET_PHONE, resetPhone);
  yield takeLatest(cx.UPDATE_PROFILE_IMAGE, updateProfileImage);

  yield takeLatest(
    (action) =>
      action.type === success(cx.GET_SESSION) &&
      get(action, 'payload.session.expires_in') <= 0,
    handleSessionTimeout
  );
}
