import PropTypes from 'prop-types';
import React from 'react';

import {Button, Input, Status} from 'elements';
import {CONFIRM_CANCEL_SUBSCRIPTION} from 'theme/constants';

const DowngradeButtons = ({
  confirm,
  showPause,
  isPending,
  cancelSubscription,
  pauseSubscription,
  buttonName,
}) => {
  const [text, setText] = React.useState('');

  const handleChangeText = React.useCallback(event => {
    setText(event.target.value);
  }, []);
  const handleCancelSubscription = React.useCallback(() => {
    cancelSubscription(text);
  }, [cancelSubscription, text]);

  return (
    <div>
      {confirm && (
        <>
          <p className="mb2 f6 fw7 gray-600 avenir-heavy">
            Type {CONFIRM_CANCEL_SUBSCRIPTION} to confirm
          </p>
          <Input
            border
            className="text-input"
            onChange={handleChangeText}
            value={text}
          />
        </>
      )}
      <div className="flex-ns mt4 mt3 items-center-ns tc">
        <Button
          small
          backgroundColorSet
          className="bg-brand mr3"
          disabled={isPending}
          onClick={handleCancelSubscription}
        >
          {buttonName || 'Cancel'} my subscription
        </Button>
        {showPause && (
          <div className="mt1 mt0-ns">
            <Button
              small
              colorSet
              backgroundColorSet
              className="gray-600 bg-gray-250"
              disabled={isPending}
              onClick={pauseSubscription}
            >
              Pause my subscription
            </Button>
          </div>
        )}
        {isPending && (
          <div className="flex ml2-ns mt2 mt0-ns justify-center">
            <Status status="pending" />
          </div>
        )}
      </div>
      <style jsx>{`
        :global(.text-input) {
          max-width: 400px;
        }
      `}</style>
    </div>
  );
};

DowngradeButtons.propTypes = {
  cancelSubscription: PropTypes.func,
  confirm: PropTypes.bool,
  showPause: PropTypes.bool,
  isPending: PropTypes.bool,
  pauseSubscription: PropTypes.func,
};

const EnhancedDowngradeButtons = React.memo(DowngradeButtons);

export default EnhancedDowngradeButtons;
