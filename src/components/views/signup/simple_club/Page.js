import {mapProps, compose, setDisplayName} from 'recompose';
import React from 'react';
import queryString from 'query-string';

import {BasePage} from 'components/views/signup/components';
import {GuestDrawerNav, LoginSignupNav} from 'elements';
import {ORG_TYPES} from 'data/orgs';

const enhance = compose(
  setDisplayName('views/signup/simple_club/Page'),
  mapProps(props => {
    const queryParams = queryString.parse(props.location.search);

    return {
      org: queryParams.org,
      inviteCode: queryParams.invite_code,
      firstName: queryParams.first_name,
      lastName: queryParams.last_name,
      email: queryParams.email,
      currency: queryParams.currency,
      location: props.location,
    };
  }),
  React.memo
);

export default enhance(props => (
  <BasePage
    {...props}
    defaultBestDescribesYou={ORG_TYPES.clubAssociation.value}
    formCountrySelectDisplayed={false}
    heading="Start Collecting"
    drawerNav={<GuestDrawerNav location={props.location} />}
    primaryNavbar={{
      rightComponent: (
        <LoginSignupNav signUpDisplayed={false} location={props.location} />
      ),
      className: 'bg-white',
    }}
  />
));
