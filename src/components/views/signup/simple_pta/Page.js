import {compose, setDisplayName} from 'recompose';
import React from 'react';

import {BasePage} from 'components/views/signup/components';
import {GuestDrawerNav, LoginSignupNav} from 'elements';
import {ORG_TYPES} from 'data/orgs';
import {PrimaryNavLinksContainer} from 'containers';

const enhance = compose(
  setDisplayName('views/signup/simple_pta/Page'),
  React.memo
);

export default enhance(props => (
  <BasePage
    {...props}
    defaultBestDescribesYou={ORG_TYPES.schoolPta.value}
    heading="Start Collecting"
    drawerNav={<GuestDrawerNav location={props.location} />}
    primaryNavbar={{
      leftComponent: <PrimaryNavLinksContainer />,
      rightComponent: <LoginSignupNav location={props.location} />,
      className: 'bg-white',
    }}
  />
));
