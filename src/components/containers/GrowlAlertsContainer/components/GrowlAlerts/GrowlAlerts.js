import cx from 'classnames';
import posed from 'react-pose';
import PropTypes from 'prop-types';
import React from 'react';

import GrowlAlert from './GrowlAlert';

const ALERT_DISAPPEARANCE_TIMEOUT = 200;

const AnimatedAlertContainer = posed.div({
  visible: {
    x: '0%',
  },
  hidden: {
    x: '100%',
    transition: {
      duration: ALERT_DISAPPEARANCE_TIMEOUT,
    },
  },
});

const GrowlAlerts = ({fixedTop, alerts, onCloseAlert}) => {
  const [visibleAlertIds, setVisibleAlertIds] = React.useState([]);

  React.useEffect(() => {
    setVisibleAlertIds(alerts.map(({id}) => id));
  }, [alerts]);

  return (
    alerts.length !== 0 && (
      <div
        className={cx(
          'w-100 w-auto-ns fixed right-0 z-9999 pa2-l',
          fixedTop ? 'top-0' : 'bottom-0-ns'
        )}
      >
        {alerts.map((props, idx) => {
          const handleDismiss = () => {
            setVisibleAlertIds(prevVisibleAlertIds =>
              prevVisibleAlertIds.filter(alertId => alertId !== props.id)
            );

            setTimeout(() => {
              onCloseAlert(props.id);
            }, ALERT_DISAPPEARANCE_TIMEOUT);
          };

          return (
            <AnimatedAlertContainer
              key={props.id}
              className={cx(idx !== 0 && 'pt1')}
              pose={visibleAlertIds.includes(props.id) ? 'visible' : 'hidden'}
            >
              <GrowlAlert {...props} onDismiss={handleDismiss} />
            </AnimatedAlertContainer>
          );
        })}
      </div>
    )
  );
};

const EnhancedGrowlAlerts = Object.assign(React.memo(GrowlAlerts), {
  propTypes: {
    alerts: PropTypes.arrayOf(PropTypes.object),
  },
});

export default EnhancedGrowlAlerts;
