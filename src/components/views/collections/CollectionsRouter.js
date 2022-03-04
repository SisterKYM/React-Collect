import React from 'react';
import posed, {PoseGroup} from 'react-pose';
import {Route, Switch} from 'react-router-dom';

import {GrowlAlertsContainer} from 'containers';

import CollectionsPage from './CollectionsPage';
import PaymentsPage from './payments/PaymentsPage';
import PaymentDetailsPage from './payments/PaymentDetailsPage';
import PaymentItemReportPage from './payments/PaymentItemReportPage';
import PaymentReportPage from './payments/PaymentReportPage';
import PaymentRefundsPage from './payments/PaymentRefundsPage';
import InvoiceDetailsPage from './payments/InvoiceDetailsPage';
import GroupPage from './group/GroupPage';
import GroupEditBannerPage from './group/EditBannerPage';
import ManagersPage from './ManagersPage';
import ReportsPage from './ReportsPage';
import HomepageSharePage from './HomepageSharePage';

const PoseContainer = posed.div();

const CollectionsRouter = ({location}) => (
  <>
    <Route path="/collections" exact component={CollectionsPage} />
    <Route path="/collections/my-account" component={CollectionsPage} />
    <Route
      path="/collections/:userId/welcome"
      exact
      component={CollectionsPage}
    />
    <Route path="/collections/i/plans/*" exact component={CollectionsPage} />
    <Switch>
      <Route
        path="/collections/payments/:payment/payment-item/:paymentItem"
        component={PaymentItemReportPage}
      />
      <Route
        path="/collections/payments/:payment/report"
        component={PaymentReportPage}
      />
      <Route path="/collections/payments" component={PaymentsPage} />
    </Switch>
    <PoseGroup>
      <PoseContainer key={location.pathname}>
        <Switch location={location}>
          <Route
            path="/collections/payments/:payment/details"
            component={PaymentDetailsPage}
          />
          <Route
            path="/collections/payments/:payment/refunds"
            component={PaymentRefundsPage}
          />
          <Route
            path="/collections/payments/:payment/scheduled/:invoice"
            component={InvoiceDetailsPage}
          />
          <Route
            path="/collections/payments/:payment/recurring"
            component={InvoiceDetailsPage}
          />
        </Switch>
        <Route path="/collections/hp-share" component={HomepageSharePage} />
      </PoseContainer>
    </PoseGroup>
    <Route path="/collections/group" component={GroupPage} />
    <PoseGroup>
      <PoseContainer key={location.pathname}>
        <Switch location={location}>
          <Route
            path="/collections/group/edit-banner"
            component={GroupEditBannerPage}
          />
        </Switch>
      </PoseContainer>
    </PoseGroup>
    <Route path="/collections/managers" component={ManagersPage} />
    <Route path="/collections/reports" component={ReportsPage} />
    <GrowlAlertsContainer />
  </>
);

const EnhancedCollectionsRouter = React.memo(CollectionsRouter);

export default EnhancedCollectionsRouter;
