import {
  getInvitation,
  acceptInvitation,
} from 'redux/modules/invitations/actions';

import {onDismiss, onAccept} from './lib';

export const HANDLERS = {
  onDismiss,
  onAccept,
};

export const ACTIONS = {
  getInvitation,
  acceptInvitation,
};
