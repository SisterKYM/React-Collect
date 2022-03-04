import React, {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {SwitchBox, Button} from 'elements';

const SwitchExpandField = ({
  className,
  collection,
  input,
  label,
  body,
  onClick,
  onToggle,
  authority,
  warning,
  disableToggle,
}) => {
  const history = useHistory();
  const location = useLocation();
  const [expanded, toggle] = React.useState(input.value);
  useEffect(() => {
    toggle(input.value);
  }, [input.value]);

  const onSelect = React.useCallback(
    checked => {
      onToggle({
        [input.name]: checked,
      });
      toggle(checked);
      input.onChange(checked);
    },
    [input, onToggle]
  );

  const upgradeToPro = () => {
    history.push(`${location.pathname}/i/plans`);
  };

  return (
    <div className="switch-expand-field pa3 bg-white">
      <div
        className={cx('flex justify-between items-center', className)}
        onClick={onClick}
      >
        <div className="text-16 dark-grey avenir-light">{label}</div>
        {!authority ||
        (authority === 'pro' && collection.is_pro) ||
        (authority === 'team' && collection.is_team) ? (
          <SwitchBox
            input={input}
            checked={input.value ? 'checked' : ''}
            onChange={!disableToggle && onSelect}
          />
        ) : (
          <Button
            small
            backgroundColorSet
            className="bg-gray-200 dark-grey"
            style={{height: 30, fontSize: 12}}
            onClick={upgradeToPro}
          >
            {authority === 'pro' ? 'Go PRO' : 'Go TEAM'}
          </Button>
        )}
      </div>
      {warning && <div className="text-14 flamingo">{warning}</div>}
      {Boolean(body) && expanded && <div className="mt3">{body}</div>}
      <style jsx>{`
        .switch-expand-field {
          border-bottom: 1px solid #eaedf3;
          padding-left: 1.5rem;
        }
      `}</style>
    </div>
  );
};

const EnhancedSwitchExpandField = Object.assign(React.memo(SwitchExpandField), {
  propTypes: {
    id: PropTypes.string.isRequired,
    onToggle: PropTypes.func,
  },
});

export default EnhancedSwitchExpandField;
