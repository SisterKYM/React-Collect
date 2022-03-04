import {connect} from 'react-redux';
import React from 'react';

import {removeAlert} from 'redux/modules/growl/actions';

import {GrowlAlerts} from './components';

const GrowlAlertsContainer = ({fixedTop, alerts, onRemoveAlert}) => {
  const handleCloseAlert = React.useCallback(
    id => {
      onRemoveAlert({id});
    },
    [onRemoveAlert]
  );

  return (
    <GrowlAlerts
      fixedTop={fixedTop}
      alerts={alerts}
      onCloseAlert={handleCloseAlert}
    />
  );
};

const enhance = connect(
  state => ({
    alerts: state.growl.alerts,
  }),
  dispatch => ({
    onRemoveAlert: payload => dispatch(removeAlert(payload)),
  })
);

const EnhancedGrowlAlerts = enhance(GrowlAlertsContainer);

export default EnhancedGrowlAlerts;
