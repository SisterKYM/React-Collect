import {compose} from 'recompose';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import React from 'react';

import config from 'config';

import {PrimaryNavLinksGuest, PrimaryNavLinksUser} from './components';

const PrimaryNavLinksContainer = ({location, session}) =>
  session && session.user ? (
    <PrimaryNavLinksUser location={location} session={session} />
  ) : (
    <>{config.isCheddarUp && <PrimaryNavLinksGuest location={location} />}</>
  );

const enhance = compose(
  connect(state => ({
    session: state.session,
  })),
  withRouter
);

const EnhancedPrimaryNavLinksContainer = enhance(PrimaryNavLinksContainer);

export default EnhancedPrimaryNavLinksContainer;
