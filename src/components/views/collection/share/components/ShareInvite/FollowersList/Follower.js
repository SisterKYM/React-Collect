import {IoMdAlarm} from 'react-icons/io';
import {ReactComponent as TrashIcon} from 'theme/images/trash.svg';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';

import {Button, NewTooltip} from 'elements';
import {colors} from 'theme/constants';
import config from 'config';

const reminderAvailableStatuses = new Set([
  'processed',
  'click',
  'dropped',
  'unknown',
]);

const FOLLOWER_STATUS_TO_LABEL_MAP = {
  open: 'Opened',
  delivered: 'Delivered',
  bounce: 'Bounced',
  sent: 'Sending',
  processed: 'Sent',
  click: 'Read',
  dropped: 'Failed',
  unknown: null,
};

const Follower = ({
  className,
  disabled,
  follower,
  onFollowUpSend,
  onFollowUpDelete,
}) => {
  const status = follower.status || 'unknown';
  const statusLabel = FOLLOWER_STATUS_TO_LABEL_MAP[status];

  return (
    <div className={cx('pa4 flex', className)}>
      <div className="w-30 mr4">
        <a
          className="f5 avenir-roman"
          target="_blank"
          rel="noopener noreferrer"
          href={`mailto:${follower.email}?&subject=You're invited to ${config.strings.name}!`}
        >
          {follower.name || follower.email}
        </a>
        <p className="f6 avenir-light dark-grey">
          Invite sent on {moment(follower.sentAt).format('ddd. MMM D, YYYY')}
        </p>
      </div>
      <div className="w-10 mr5 flex flex-column justify-center">
        {statusLabel && (
          <p className="dn db-ns f6 avenir-light gray-600">{statusLabel}</p>
        )}
      </div>
      <div className="flex w-20  flex flex-column justify-center">
        {Boolean(follower.paid) && (
          <p className="dn db-ns f6 avenir-light gray-600">
            {follower.total > 0 ? 'Paid' : 'Submitted'}
          </p>
        )}
      </div>
      <div className="flex-auto flex justify-end items-center">
        <div className="flex justify-end items-center">
          <NewTooltip />
          {!follower.paid && reminderAvailableStatuses.has(status) && (
            <div className="mr2" data-tip="Send an instant reminder">
              <Button
                small
                style={{height: '30px', paddingTop: '3px'}}
                disabled={disabled}
                className="follower-button ph0"
                onClick={() => onFollowUpSend(follower)}
              >
                <IoMdAlarm className="f4" color={colors.white} />
              </Button>
            </div>
          )}
          <div data-tip="Remove">
            <Button
              small
              style={{height: '30px', paddingTop: '3px'}}
              backgroundColorSet
              className="follower-button ph0 bg-light-gray"
              disabled={disabled}
              onClick={() => onFollowUpDelete(follower)}
            >
              <TrashIcon className="w1 gray-400" />
            </Button>
          </div>
        </div>
      </div>
      <style jsx>{`
        :global(.follower-button) {
          width: 30px;
        }
      `}</style>
    </div>
  );
};

const EnhancedFollower = Object.assign(React.memo(Follower), {
  propTypes: {
    follower: PropTypes.object,
    isTopRow: PropTypes.bool,
    onFollowUpDelete: PropTypes.func,
  },
});

export default EnhancedFollower;
