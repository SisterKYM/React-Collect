import React, {useCallback} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import posed, {PoseGroup} from 'react-pose';
import shortid from 'shortid';

import {Modal, ModalCloseButton} from 'elements';

import {Sidebar} from './components';
import ProfilePage from './views/ProfilePage';
import DetailsPage from './views/DetailsPage';
import DeleteAccountConfirmationPage from './views/DeleteAccountConfirmationPage';
import DeleteAccountPage from './views/DeleteAccountPage';
import WithdrawFundsPage from './views/WithdrawFundsPage';
import PlanBillingPage from './views/PlanBillingPage';
import PaymentMethodsPage from './views/PaymentMethodsPage';

const PoseContainer = posed.div();

export const backgroundPath = (location) => {
  const paths = location.pathname.split('/');
  paths.pop();
  if (paths[paths.length - 1] === 'my-account') {
    paths.pop();
  }
  return paths.join('/');
};

const AccountRouter = ({history, location}) => {
  const handleDismiss = useCallback(() => {
    if (!history || !history.push || !location) {
      return false;
    }

    // hack for react-native WebView to detect url change
    window.location.hash = shortid.generate();
    const pathname = backgroundPath(location);

    return history.push({
      pathname,
      state: {
        ...location.state,
      },
    });
  }, [history, location]);

  return (
    <>
      <Route
        exact
        path="*/my-account"
        render={() => <Redirect to="my-account/profile" />}
      />
      <Switch>
        <Modal className="flex" onDismiss={handleDismiss}>
          <ModalCloseButton color="medium-grey" onClick={handleDismiss} />
          <Sidebar location={location} />
          <div className="account-content dark-grey flex-fill">
            <Switch>
              <Route path="*/my-account/profile" component={ProfilePage} />
              <Route path="*/my-account/details" component={DetailsPage} />
              <Route
                path="*/my-account/plan_and_billing"
                component={PlanBillingPage}
              />
              <Route
                path="*/my-account/payment_methods"
                component={PaymentMethodsPage}
              />
            </Switch>
            <PoseGroup>
              <PoseContainer key={location.pathname}>
                <Switch location={location}>
                  <Route
                    path="*/my-account/details/confirm-delete"
                    render={(props) => (
                      <DeleteAccountConfirmationPage
                        {...props}
                        onDismiss={handleDismiss}
                      />
                    )}
                  />
                  <Route
                    path="*/my-account/details/delete"
                    render={(props) => (
                      <DeleteAccountPage {...props} onDismiss={handleDismiss} />
                    )}
                  />
                  <Route
                    path="*/my-account/details/withdraw"
                    render={(props) => (
                      <WithdrawFundsPage {...props} onDismiss={handleDismiss} />
                    )}
                  />
                </Switch>
              </PoseContainer>
            </PoseGroup>
          </div>
        </Modal>
      </Switch>

      <style>{`
        .account-modal {
          width: 703px;
          left: 50%;
          transform: translateX(-50%) translateY(-50%) !important;
          border: solid 1px #dfdedf;
          border-radius: 8px;
          max-height: 90vh;
        }
        .account-content {
          padding: 64px 48px;
          overflow: auto;
        }
      `}</style>
    </>
  );
};

const EnhancedAccountRouter = React.memo(AccountRouter);

export default EnhancedAccountRouter;
