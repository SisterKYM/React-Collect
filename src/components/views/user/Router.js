import {Redirect, Route, Switch} from 'react-router-dom';
import React from 'react';
import posed, {PoseGroup} from 'react-pose';

import ProfileRouter from 'views/user/views/profile/Router';
import WithdrawalSettingsRouter from 'views/user/views/withdrawal-settings/Router';

import BillingInfoPage from './BillingInfoPage';
import ChangePasswordPage from './ChangePasswordPage';
import InviteMembersRouter from './views/invite-members';
import MembersRouter from './views/members';
import PaymentMethodsPage from './PaymentMethodsPage';
import PaymentsToOthersPage from './PaymentsToOthersPage';
import PaymentToOthersDetailsPage from './PaymentToOthersDetailsPage';
import PaymentToOthersPaymentItemReportPage from './PaymentToOthersPaymentItemReportPage';
import PaymentToOthersRefundsPage from './PaymentToOthersRefundsPage';
import PaymentToOthersReportPage from './PaymentToOthersReportPage';
import RecurringPaymentsPage from './RecurringPaymentsPage';
import UserManagersPage from './UserManagersPage';

const PoseContainer = posed.div();

const UserRouter = ({location}) => (
  <>
    <Route exact path="/user" render={() => <Redirect to="/user/profile" />} />
    <Route component={ChangePasswordPage} path="/user/password" />
    <Switch>
      <Route
        component={PaymentToOthersPaymentItemReportPage}
        path="/user/payments/:payment/payment-item/:paymentItem"
      />
      <Route
        component={PaymentToOthersReportPage}
        path="/user/payments/:payment/report"
      />
      <Route component={PaymentsToOthersPage} path="/user/payments" />
    </Switch>
    <Route component={ProfileRouter} path="/user/profile" />
    <Route
      component={WithdrawalSettingsRouter}
      path="/user/withdrawal-settings"
    />
    <Route component={PaymentMethodsPage} path="/user/payment-methods" />
    <Route component={UserManagersPage} path="/user/managers" />
    <Route component={BillingInfoPage} path="/user/billing" />
    <Route component={RecurringPaymentsPage} path="/user/recurring-payments" />
    <Route component={InviteMembersRouter} path="/user/invite-members" />
    <Route component={MembersRouter} path="/user/members" />
    <PoseGroup>
      <PoseContainer key={location.pathname}>
        <Switch location={location}>
          <Route
            component={PaymentToOthersDetailsPage}
            path="/user/payments/:payment/details"
          />
          <Route
            component={PaymentToOthersRefundsPage}
            path="/user/payments/:payment/refunds"
          />
        </Switch>
      </PoseContainer>
    </PoseGroup>
  </>
);

const EnhancedUserRouter = React.memo(UserRouter);

export default EnhancedUserRouter;
