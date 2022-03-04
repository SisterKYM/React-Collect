import {FaBan, FaCheck} from 'react-icons/fa';
import shortid from 'shortid';

import * as cx from './constants';

const successAlert = payload => ({
  type: cx.SUCCESS_ALERT,
  payload: {
    id: shortid.generate(),
    icon: FaCheck,
    ...payload,
  },
});
const errorAlert = payload => ({
  type: cx.ERROR_ALERT,
  payload: {
    id: shortid.generate(),
    icon: FaBan,
    title: 'Error',
    ...payload,
  },
});

const removeAlert = payload => ({type: cx.REMOVE_ALERT, payload});
const clearAlerts = payload => ({type: cx.CLEAR_ALERTS, payload});

export {clearAlerts, errorAlert, removeAlert, successAlert};
