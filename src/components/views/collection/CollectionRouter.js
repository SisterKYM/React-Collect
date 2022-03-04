import {Route, Switch} from 'react-router-dom';
import React from 'react';
import posed, {PoseGroup} from 'react-pose';

import NotFoundPage from 'views/NotFoundPage';

const LazyCollectionDetailsPage = React.lazy(() =>
  import('./CollectionDetailsPage')
);
const LazyItemsRouter = React.lazy(() => import('./items'));
const LazyFormsRouter = React.lazy(() => import('./forms'));
const LazyCollectionSettingsRouter = React.lazy(() => import('./settings'));
const LazyCollectionLogoUploadPage = React.lazy(() =>
  import('./CollectionLogoUploadPage')
);
const LazyShareRouter = React.lazy(() => import('./share'));
const LazyCollectionManageRouter = React.lazy(() => import('./manage'));
const LazyOrdersReportPage = React.lazy(() => import('./OrdersReportPage'));
const LazyOrderSummaryReportPage = React.lazy(() =>
  import('./OrderSummaryReportPage')
);
const LazyPaymentItemReportPage = React.lazy(() =>
  import('./PaymentItemReportPage')
);
const LazyFormsReportPage = React.lazy(() => import('./FormsReportPage'));
const LazyShippingTrackerPage = React.lazy(() =>
  import('./ShippingTrackerPage')
);
const LazyPrintShippingLabelPage = React.lazy(() =>
  import('./PrintShippingLabelPage')
);
const LazyPrintShippingLabelSummaryPage = React.lazy(() =>
  import('./PrintShippingLabelSummaryPage')
);
const LazyShippingLabelPdfPage = React.lazy(() =>
  import('./ShippingLabelPdfPage')
);

const PoseContainer = posed.div();

class CollectionRouter extends React.PureComponent {
  render() {
    return (
      <>
        <Switch>
          <Route
            path="/collection/:owner/:collection?/details"
            component={LazyCollectionDetailsPage}
          />
          <Route
            path="/collection/:owner/:collection/items"
            component={LazyItemsRouter}
          />
          <Route
            path="/collection/:owner/:collection/forms"
            component={LazyFormsRouter}
          />
          <Route
            path="/collection/:owner/:collection/settings"
            component={LazyCollectionSettingsRouter}
          />
          <Route
            path="/collection/:owner/:collection/share"
            component={LazyShareRouter}
          />
          <Route
            path="/collection/:owner/:collection/manage"
            component={LazyCollectionManageRouter}
          />
          <Route
            path="/collection/:owner/:collection/orders-report"
            component={LazyOrdersReportPage}
          />
          <Route
            path="/collection/:owner/:collection/payment-report/:payment"
            component={LazyOrderSummaryReportPage}
          />
          <Route
            path="/collection/:owner/:collection/shipping-tracker"
            component={LazyShippingTrackerPage}
          />
          <Route
            path="/collection/:owner/:collection/payment/:payment/payment-item/:paymentItem"
            component={LazyPaymentItemReportPage}
          />
          <Route
            path="/collection/:owner/:collection/forms-report"
            component={LazyFormsReportPage}
          />
          <Route
            path="/collection/:owner/:collection/shipping-label/:payment"
            component={LazyShippingLabelPdfPage}
          />
          <Route component={NotFoundPage} />
        </Switch>
        <PoseGroup>
          <PoseContainer key={this.props.location.pathname}>
            <Switch location={this.props.location}>
              <Route
                path="/collection/:owner/:collection?/details/logo-upload"
                component={LazyCollectionLogoUploadPage}
              />
              <Route
                path="/collection/:owner/:collection/*/print-shipping-label/:payment"
                component={LazyPrintShippingLabelPage}
              />
              <Route
                path="/collection/:owner/:collection/*/print-shipping-label-summary/:payment"
                component={LazyPrintShippingLabelSummaryPage}
              />
            </Switch>
          </PoseContainer>
        </PoseGroup>
      </>
    );
  }
}

export default CollectionRouter;
