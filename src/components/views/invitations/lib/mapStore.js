import {ACCEPT_INVITATION} from 'redux/modules/invitations/constants';

const mapStore = ({async: {statuses}}) => ({
  acceptStatus: statuses[ACCEPT_INVITATION],
});

export default mapStore;
