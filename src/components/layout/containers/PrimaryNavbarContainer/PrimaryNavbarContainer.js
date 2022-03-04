import {connect} from 'react-redux';
import React from 'react';

import {PrimaryNavbar, vh} from './components';

const PrimaryNavbarContainer = ({
  className,
  session,
  hideMenuControl,
  leftComponent,
  rightComponent,
  centerComponent,
}) => (
  <PrimaryNavbar
    className={className}
    session={session}
    hideMenuControl={hideMenuControl}
    leftComponent={leftComponent}
    rightComponent={rightComponent}
    centerComponent={centerComponent}
  />
);

const enhance = connect(state => ({
  session: state.session,
}));

const EnhancedPrimaryNavbarContainer = enhance(PrimaryNavbarContainer);

export {vh};
export default EnhancedPrimaryNavbarContainer;
