import {generatePath, Redirect, Route, Switch} from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import posed, {PoseGroup} from 'react-pose';
import React from 'react';

import {Elements} from 'elements/Stripe';
import {Status} from 'elements';
import NotFoundPage from 'views/NotFoundPage';
import useToggle from 'hooks/useToggle';

import useCart from './hooks/useCart';
import usePublicCollection from './hooks/usePublicCollection';

const LazyCheckoutPage = React.lazy(() => import('./CheckoutPage'));
const LazyItemViewPage = React.lazy(() => import('./ItemViewPage'));
const LazyPayerPage = React.lazy(() => import('./PayerPage'));
const LazyFormViewsPage = React.lazy(() => import('./FormViewsPage'));
const LazyCheckoutThankYouPage = React.lazy(() =>
  import('./CheckoutThankYouPage')
);
const LazyPrePayerTimingPage = React.lazy(() => import('./PrePayerTimingPage'));
const LazyPrePayerVisitorReportPage = React.lazy(() =>
  import('./PrePayerVisitorReportPage')
);
const LazyPayerHelpPage = React.lazy(() => import('./PayerHelpPage'));
const LazyPayerSharePage = React.lazy(() => import('./PayerSharePage'));
const LazyCollectionPayerListPage = React.lazy(() =>
  import('./CollectionPayerListPage')
);

const PoseContainer = posed.div();

const PayerRouter = ({match, location}) => {
  const collectionSlug = match.params.collection;

  const [payerValue, setPayerValue] = React.useState(null);

  const {publicCollection, loading, setVisitorValue} = usePublicCollection({
    collectionSlug,
  });
  const {cart, addPayment, clear: clearCart, updateCart} = useCart({
    collectionSlug,
    userManagesCollection: publicCollection.userManagesCollection,
    payerValue,
    updateCart,
  });

  const timingBarrier =
    publicCollection.timing &&
    (moment().isBefore(publicCollection.timing.opens) ||
      moment().isAfter(publicCollection.timing.closes));
  const visitorReportBarrier =
    publicCollection.fields_required &&
    publicCollection.fields_required.length !== 0;
  const hasBarriers =
    !loading &&
    !publicCollection.userManagesCollection &&
    (publicCollection.unavailable || timingBarrier || visitorReportBarrier);
  const [cartVisible, toggleCartVisible] = useToggle(
    location.state && location.state.cartVisible
  );
  const [categoryPath, setCategoryPath] = React.useState([]);

  React.useEffect(() => {
    if (location.state && location.state.cartVisible) {
      toggleCartVisible.on();
    }
  }, [location.state]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Switch>
        <Route
          path="/c/:collection/checkout/thank-you"
          component={(routeProps) => (
            <LazyCheckoutThankYouPage
              {...routeProps}
              publicCollection={publicCollection}
            />
          )}
        />
        <Route
          path="/c/:collection/checkout"
          render={(routeProps) =>
            hasBarriers ? (
              <Redirect
                to={generatePath('/c/:collection', {
                  collection: collectionSlug,
                })}
              />
            ) : (
              <Elements>
                <LazyCheckoutPage
                  {...routeProps}
                  publicCollection={publicCollection}
                  cart={cart}
                  addPayment={addPayment}
                  clearCart={clearCart}
                  updateCart={updateCart}
                  clearVisitorValue={() => {
                    setVisitorValue(null);
                  }}
                />
              </Elements>
            )
          }
        />
        <Route
          path="/c/:collection/forms"
          render={(routeProps) => {
            if (loading) {
              return (
                <div className="flex vh-100 flex-auto justify-center items-center">
                  <Status status="pending" />
                </div>
              );
            }

            return hasBarriers ? (
              <Redirect
                to={generatePath('/c/:collection', {
                  collection: collectionSlug,
                })}
              />
            ) : (
              <LazyFormViewsPage
                {...routeProps}
                cart={cart}
                publicCollection={publicCollection}
              />
            );
          }}
        />
        <Route
          path="/c/:collection"
          render={(routeProps) => {
            if (loading) {
              return (
                <div className="flex vh-100 flex-auto justify-center items-center">
                  <Status status="pending" />
                </div>
              );
            }

            if (
              timingBarrier &&
              publicCollection.unavailable === 'timing_out_of_range'
            ) {
              return (
                <LazyPrePayerTimingPage
                  {...routeProps}
                  publicCollection={publicCollection}
                />
              );
            }
            if (visitorReportBarrier || (addPayment && !cart)) {
              return (
                <LazyPrePayerVisitorReportPage
                  {...routeProps}
                  addPayment={addPayment}
                  visibleFields={
                    addPayment
                      ? ['name', 'email']
                      : publicCollection.fields_required.map(_.camelCase)
                  }
                  requiredFields={
                    addPayment
                      ? ['name']
                      : publicCollection.fields_required.map(_.camelCase)
                  }
                  publicCollection={publicCollection}
                  onSaveVisitorValue={
                    addPayment ? setPayerValue : setVisitorValue
                  }
                />
              );
            }

            if (
              publicCollection.items.length === 0 &&
              publicCollection.forms.length !== 0 &&
              !hasBarriers
            ) {
              return (
                <Redirect
                  to={generatePath('/c/:collection/forms', {
                    collection: collectionSlug,
                  })}
                />
              );
            }

            return (
              <LazyPayerPage
                {...routeProps}
                publicCollection={publicCollection}
                cart={cart}
                categoryPath={categoryPath}
                setCategoryPath={setCategoryPath}
                cartVisible={cartVisible}
                toggleCartVisible={toggleCartVisible}
              />
            );
          }}
        />
        <Route component={NotFoundPage} />
      </Switch>
      <PoseGroup>
        <PoseContainer key={location.pathname}>
          <Switch location={location}>
            <Route
              exact
              path="/c/:collection/item/:item"
              render={(routeProps) =>
                hasBarriers ? (
                  <Redirect
                    to={generatePath('/c/:collection', {
                      collection: collectionSlug,
                    })}
                  />
                ) : (
                  <LazyItemViewPage
                    {...routeProps}
                    addPayment={addPayment}
                    toggleCartVisible={toggleCartVisible}
                    cart={cart}
                    publicCollection={publicCollection}
                    categoryPath={categoryPath}
                  />
                )
              }
            />
            <Route path="/c/:collection/help" component={LazyPayerHelpPage} />
            <Route
              path="/c/:collection/share"
              component={(routeProps) => (
                <LazyPayerSharePage
                  {...routeProps}
                  publicCollection={publicCollection}
                />
              )}
            />
            <Route
              path="/c/:collection/payers"
              component={(routeProps) => (
                <LazyCollectionPayerListPage
                  {...routeProps}
                  publicCollection={publicCollection}
                />
              )}
            />
          </Switch>
        </PoseContainer>
      </PoseGroup>
    </>
  );
};

export default PayerRouter;
