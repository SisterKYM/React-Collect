import {get} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import config from 'config';

import Modal from './Modal';

const PlanWarningModal = ({
  browser,
  handleDismiss,
  managers,
  onSubmit,
  panelClassName,
  proCollections,
  status,
}) => (
  <Modal
    browser={browser}
    buttons={[
      {
        className: 'white bg-brand',
        text: 'Downgrade Now',
        onClick: onSubmit,
      },
      {
        className: 'gray-500 bg-gray-300',
        text: "Cancel, I'll stay upgraded",
        onClick: handleDismiss,
      },
    ]}
    collectionItems={proCollections}
    handleDismiss={handleDismiss}
    heading="Warning: This cannot be undone."
    message={
      <div>
        {get(managers, 'length', 0) !== 0 && (
          <p>
            You have {managers.length}{' '}
            {`manager${managers.length !== 1 ? 's' : ''}`} who will no longer
            have access to managing your {config.strings.collection}s or
            creating new {config.strings.collection}s under your account, if you
            downgrade from TEAM.
          </p>
        )}
        {get(proCollections, 'length', 0) !== 0 && (
          <p>
            You have {proCollections.length} {config.strings.collection}s with
            PRO features enabled.{' '}
            <strong>
              The following {config.strings.collection}s and all related data
              will be deleted if you downgrade
            </strong>
            :
          </p>
        )}
      </div>
    }
    panelClassName={panelClassName}
    status={status}
  />
);

const EnhancedPlanWarningModal = Object.assign(React.memo(PlanWarningModal), {
  propTypes: {
    alreadyHasCurtain: PropTypes.bool,
    browser: PropTypes.object,
    handleDismiss: PropTypes.func,
    managers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        invited_email: PropTypes.string,
        name: PropTypes.string,
      })
    ),
    onSubmit: PropTypes.func,
    panelClassName: PropTypes.string,
    proCollections: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    status: PropTypes.string,
  },
});

export default EnhancedPlanWarningModal;
