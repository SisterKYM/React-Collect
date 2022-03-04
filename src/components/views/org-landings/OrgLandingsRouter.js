import {Route, Switch} from 'react-router-dom';
import React from 'react';
import posed, {PoseGroup} from 'react-pose';

import AuthHocs from 'helpers/AuthHocs';

import BoyScoutPage from './BoyScoutPage';
import GirlScoutPage from './GirlScoutPage';
import GroupPaymentsPage from './GroupPaymentsPage';
import OrgLandingHowItWorksPage from './OrgLandingHowItWorksPage';
import PtaOnlinePaymentsPage from './PtaOnlinePaymentsPage';
import ReunionPage from './ReunionPage';

const WithGuestBoyScoutPage = AuthHocs.requireGuest(BoyScoutPage);
const WithGuestGirlScoutPage = AuthHocs.requireGuest(GirlScoutPage);
const WithGuestGroupPaymentsPage = AuthHocs.requireGuest(GroupPaymentsPage);
const WithGuestOrgLandingHowItWorksPage = AuthHocs.requireGuest(
  OrgLandingHowItWorksPage
);
const WithGuestPtaOnlinePaymentsPage = AuthHocs.requireGuest(
  PtaOnlinePaymentsPage
);
const WithGuestReunionPage = AuthHocs.requireGuest(ReunionPage);

const PoseContainer = posed.div();

const OrgLandingsRouter = ({location}) => (
  <>
    <Route path="/group-payments" component={WithGuestGroupPaymentsPage} />
    <Route
      path="/pta-online-payments"
      component={WithGuestPtaOnlinePaymentsPage}
    />
    <Route path="/boy-scout" component={WithGuestBoyScoutPage} />
    <Route path="/girl-scout" component={WithGuestGirlScoutPage} />
    <Route path="/reunion" component={WithGuestReunionPage} />
    <PoseGroup>
      <PoseContainer key={location.pathname}>
        <Switch location={location}>
          <Route
            exact
            path="/*/how-it-works"
            component={WithGuestOrgLandingHowItWorksPage}
          />
        </Switch>
      </PoseContainer>
    </PoseGroup>
  </>
);

const EnhancedOrgLandingsRouter = React.memo(OrgLandingsRouter);

export default EnhancedOrgLandingsRouter;
