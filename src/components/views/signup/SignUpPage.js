import React from 'react';

import {GuestDrawerNav, LoginSignupNav} from 'elements';
import {PrimaryNavLinksContainer} from 'containers';
import config from 'config';

import {BasePage} from './components';

const SignUpPage = props => (
  <BasePage
    {...props}
    heading={config.strings.signUpHeading}
    subheading={config.strings.signUpSubheading}
    formCountrySelectDisplayed={config.enabledFeatures.countrySelectable}
    drawerNav={<GuestDrawerNav location={props.location} />}
    primaryNavbar={{
      className: 'bg-white',
      leftComponent: <PrimaryNavLinksContainer />,
      rightComponent: <LoginSignupNav location={props.location} />,
    }}
  />
);

const EnhancedSignUpPage = React.memo(SignUpPage);

export default EnhancedSignUpPage;
