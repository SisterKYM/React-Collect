import {omit} from 'lodash';
import moment from 'moment';
import storage from 'store2';

export const clear = key => {
  if (key) {
    storage.remove(key);
  } else {
    storage.clear();
  }
};

export const get = key => {
  const item = storage.get(key);
  if (!item) {
    return null;
  }
  const {_expiresAt} = item;
  if (_expiresAt && moment(new Date()) > moment(_expiresAt)) {
    // expiration is set and it expired
    storage.remove(key);

    return null;
  }

  return omit(item, '_expiresAt');
};

export const set = (key, data, expiresIn) => {
  storage.set(key, {
    ...data,
    _expiresAt: expiresIn && moment(new Date()).add(expiresIn, 's'),
  });

  return data;
};
