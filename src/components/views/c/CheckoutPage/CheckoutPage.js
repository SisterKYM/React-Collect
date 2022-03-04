import {compose} from 'recompose';
import {generatePath} from 'react-router-dom';
import {injectStripe} from 'react-stripe-elements';
import {useResource} from 'rest-hooks';
import {useSelector, useDispatch} from 'react-redux';
import _ from 'lodash';
import cx from 'classnames';
import queryString from 'query-string';
import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {Logo, Status, Touchable, CommonButton} from 'elements';

import {GrowlAlertsContainer} from 'containers';
import CartHelpers from 'helpers/CartHelpers';
import PaymentMethodResource from 'resources/PaymentMethodResource';
import useMedia from 'hooks/useMedia';
import {logout} from 'redux/modules/session/actions';
import useToggle from 'hooks/useToggle';
import {ReactComponent as EmptyCart} from 'theme/images/EmptyCart.svg';
import {
  CartOverview,
  CartOverviewButtonMobile,
  PayerFlowBreadcrumbs,
  PayerFlowNavigationBar,
} from '../components';
import {
  CheckoutAuthContainer,
  CheckoutInvoiceContainer,
  PaymentMethodSelectContainer,
} from './containers';
import {CheckoutShippingInfo} from './components';
import ErrorModal from './components/ErrorModal';

const EMAIL_REGEX = /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\d-AZa-z-]+\.)+[A-Za-z]{2,}))$/;

const CheckoutPage = ({
  history,
  match,
  location,
  addPayment,
  publicCollection,
  cart,
  updateCart,
  clearCart,
  clearVisitorValue,
  stripe,
}) => {
  const collectionSlug = match.params.collection;

  const username = useSelector((state) =>
    state.session && state.session.user
      ? `${state.session.user.first_name} ${state.session.user.last_name}`.trim()
      : ''
  );
  const userLoggedIn = username.length !== 0;
  const formsCount =
    (publicCollection.forms && publicCollection.forms.length) || 0;
  const itemsCount =
    (publicCollection.items && publicCollection.items.length) || 0;

  const collectionHasFormsOnly = formsCount !== 0 && itemsCount === 0;
  const paymentMethods = useResource(
    PaymentMethodResource.listShape(),
    userLoggedIn && !addPayment ? {username} : null
  );
  const {notSmall, smallLandscape} = useMedia();
  const dispatch = useDispatch();
  const shippingEnabled = Boolean(
    publicCollection?.shippingOptions?.shipToEnabled
  );
  const step = queryString.parse(location.search).step;

  const [guestValue, setGuestValue] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [paymentMethodValue, setPaymentMethodValue] = useState(() => ({
    creditCard: {
      id: null,
      name: (cart && cart.member && cart.member.name) || username,
      zip: '',
      useSaved: (paymentMethods || []).some(
        ({routing_number}) => !routing_number
      ),
      saveSource: false,
    },
    bankAccount: {
      id: null,
      routingNumber: '',
      accountNumber: '',
      accountNumberRepeat: '',
      useSaved: (paymentMethods || []).some(({routing_number}) =>
        Boolean(routing_number)
      ),
      saveSource: false,
    },
  }));
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    'CREDIT_CARD'
  );
  const [shippingInfoValue, setShippingInfoValue] = useState({
    method: 'TO_ME',
    country: 'US',
    name: '',
    city: '',
    address: '',
    state: 'AL',
    zip: '',
  });
  const [shippingFeesCalculated, setShippingFeesCalculated] = useState(false);

  const onChangeShippingValue = useCallback(
    async (updatedValue) => {
      const payload = {
        shippingMethod:
          updatedValue.method === 'TO_ME' ? 'toMe' : 'localPickup',
        shipTo:
          updatedValue.method === 'TO_ME'
            ? {
                country: updatedValue.country,
                name: updatedValue.name,
                address: updatedValue.address,
                city: updatedValue.city,
                state: updatedValue.state,
                zip: updatedValue.zip,
              }
            : undefined,
      };
      if (
        !shippingFeesCalculated ||
        shippingInfoValue.method !== updatedValue.method
      ) {
        setShippingFeesCalculated(true);
        await updateCart(
          {
            collectionSlug,
            uuid: cart.uuid,
          },
          payload
        );
      }
      setShippingInfoValue(updatedValue);
    },
    [
      shippingFeesCalculated,
      shippingInfoValue,
      updateCart,
      collectionSlug,
      cart,
    ]
  );

  const shippingInfoValueFilled =
    !shippingEnabled ||
    shippingInfoValue.method !== 'TO_ME' ||
    (shippingInfoValue.name.length !== 0 &&
      shippingInfoValue.address.length !== 0 &&
      shippingInfoValue.zip.length !== 0);
  const guestValueFilled =
    userLoggedIn ||
    (guestValue.firstName.length !== 0 &&
      guestValue.lastName.length !== 0 &&
      guestValue.email.length !== 0 &&
      EMAIL_REGEX.test(guestValue.email));

  useEffect(() => {
    if (cart || (guestValueFilled && !userLoggedIn)) {
      setPaymentMethodValue((prevPaymentMethodvalue) => ({
        ...prevPaymentMethodvalue,
        creditCard: {
          ...prevPaymentMethodvalue.creditCard,
          name:
            (cart && cart.member && cart.member.name) ||
            `${guestValue.firstName} ${guestValue.lastName}`.trim(),
          useSaved: userLoggedIn,
        },
      }));
    }
  }, [cart, userLoggedIn, guestValueFilled]); // eslint-disable-line react-hooks/exhaustive-deps

  const onChangePayerCoversFees = useCallback(
    async (payerChoseToCoverFees) => {
      if (
        !cart ||
        !cart.uuid ||
        cart.payerChoseToCoverFees === payerChoseToCoverFees
      ) {
        return;
      }
      await updateCart(
        {
          collectionSlug,
          uuid: cart.uuid,
        },
        {
          payerChoseToCoverFees,
        }
      );
    },
    [collectionSlug, cart, updateCart]
  );

  const feesAmount = CartHelpers.getFees({
    cart,
    paymentMethod: selectedPaymentMethod,
  });
  const shippingAmount = CartHelpers.getShipping({
    cart,
    shippingMethod: shippingInfoValue.method,
  });
  const paymentRequired =
    !cart || cart.subtotal + feesAmount + shippingAmount + cart.totalTaxes > 0;
  const cartIsEmpty = !cart?.items?.length && !cart?.forms?.length;
  const [itemsRemoved, setItemsRemoved] = useState([]);
  const [errorModalState, setErrorModalState] = useState(false);
  const [overviewVisible, toggleOverviewVisible] = useToggle();

  const cartOverviewElement = cart ? (
    <CartOverview
      className="w-100 h-100 bg-white"
      smallLandscape={smallLandscape}
      collectionName={publicCollection.name}
      cart={cart}
      itemsRemoved={itemsRemoved}
      collectionSlug={collectionSlug}
    />
  ) : null;

  const goToItemsPage = () => {
    history.push({
      pathname: generatePath('/c/:collection', {
        collection: collectionSlug,
      }),
      state: {cartVisible: true},
    });
  };

  useEffect(() => {
    if (
      (step === 'details' || step === 'payment') &&
      !shippingInfoValueFilled
    ) {
      history.push({
        pathname: generatePath('/c/:collection/checkout', {
          collection: collectionSlug,
        }),
        search: '?step=shipping',
      });
    }

    if (step === 'payment' && !userLoggedIn && !guestValueFilled) {
      history.push({
        pathname: generatePath('/c/:collection/checkout', {
          collection: collectionSlug,
        }),
        search: '?step=details',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, shippingInfoValueFilled, userLoggedIn, guestValueFilled]);

  const cartHasRecurringItem = useMemo(
    () =>
      cart &&
      _.some(
        cart.items,
        (cartItem) =>
          cartItem.tab_item.options.recurring &&
          cartItem.tab_item.options.recurring.enabled
      ),
    [cart]
  );
  const signUpForced =
    cartHasRecurringItem && !process.env.REACT_APP_SELF_SIGNUP_DISABLED;

  return (
    <div className="flex min-vh-100 h-100 bg-gray-200">
      <GrowlAlertsContainer />
      <div
        className={cx(
          'flex w-100 justify-center content-container'
          // paymentRequired ? 'w-two-thirds-ns' : 'content-container'
        )}
      >
        <div className={`w-100 ${smallLandscape ? '' : 'w-80-ns pv5-ns'}`}>
          <header
            className={`dn ${
              smallLandscape ? '' : 'flex-ns'
            } w-100 justify-center items-center mb4`}
          >
            <Logo />
          </header>
          <div className={cx(smallLandscape ? '' : 'dn-ns')}>
            <PayerFlowNavigationBar
              collectionSlug={collectionSlug}
              smallLandscape={smallLandscape}
              rightElementMobile={
                <CartOverviewButtonMobile
                  overviewVisible={overviewVisible}
                  toggleOverviewVisible={toggleOverviewVisible}
                  cartOverviewElement={cartOverviewElement}
                />
              }
            />
          </div>
          <PayerFlowBreadcrumbs
            className="mb3 br2-ns shadow-6-ns"
            collectionSlug={collectionSlug}
            userLoggedIn={userLoggedIn}
            publicCollection={publicCollection}
            location={location}
          />
          <main>
            {!cartIsEmpty &&
              !addPayment &&
              (notSmall || !step || step === 'details') && (
                <CheckoutAuthContainer
                  collectionSlug={collectionSlug}
                  cartUuid={cart ? cart.uuid : null}
                  paymentRequired={paymentRequired}
                  cartHasRecurringItems={cartHasRecurringItem}
                  guestValue={guestValue}
                  onChangeGuestValue={setGuestValue}
                />
              )}
            {(notSmall || !step || step === 'shipping') && shippingEnabled && (
              <CheckoutShippingInfo
                className="mt3"
                shippingFree={cart && cart.shipping.toMe < 0.01}
                shippingOptions={publicCollection.shippingOptions}
                value={shippingInfoValue}
                onChangeValue={onChangeShippingValue}
              />
            )}
            {(notSmall ||
              !step ||
              step === 'payment' ||
              (!notSmall && collectionHasFormsOnly && step === 'details')) && (
              <div
                className={
                  (!cartIsEmpty && !guestValueFilled) ||
                  (signUpForced && !userLoggedIn)
                    ? 'pointer-events-none o-50'
                    : ''
                }
              >
                {paymentRequired && (
                  <React.Suspense
                    fallback={
                      <div className="flex mt3 justify-center items-center">
                        <Status status="pending" />
                      </div>
                    }
                  >
                    <PaymentMethodSelectContainer
                      className="mt3"
                      addPayment={addPayment}
                      publicCollection={publicCollection}
                      cart={cart}
                      paymentMethods={paymentMethods}
                      selectedPaymentMethod={selectedPaymentMethod}
                      onChangeSelectedPaymentMethod={setSelectedPaymentMethod}
                      value={paymentMethodValue}
                      onChangeValue={setPaymentMethodValue}
                    />
                  </React.Suspense>
                )}
                {cartIsEmpty && (
                  <div className="ph3 ph4-ns pv4 bg-white br2-ns shadow-6 mt3 tc">
                    <div className="empty-cart-svg-wrapper pv3">
                      <EmptyCart />
                    </div>
                    <div className="gray-600 mv2">Your cart is empty</div>
                    <div className="flex justify-center">
                      <CommonButton
                        className="pt-16 bg-tint white"
                        onClick={() => goToItemsPage()}
                      >
                        Add items to cart
                      </CommonButton>
                    </div>
                  </div>
                )}
                {cart && !cartIsEmpty && (
                  <div className="cf mt3">
                    <CheckoutInvoiceContainer
                      className={`fr ${smallLandscape ? '' : 'w-60-ns'} w-100`}
                      collectionSlug={collectionSlug}
                      publicCollection={publicCollection}
                      cart={cart}
                      onChangePayerCoversFees={onChangePayerCoversFees}
                      updateCart={(info) => {
                        setItemsRemoved(info);
                        setErrorModalState(true);
                      }}
                      paymentRequired={paymentRequired}
                      addPayment={addPayment}
                      stripe={stripe}
                      paymentMethod={selectedPaymentMethod}
                      shippingInfoValueFilled={shippingInfoValueFilled}
                      guestValueFilled={guestValueFilled}
                      shippingInfoValue={shippingInfoValue}
                      guestValue={guestValue}
                      paymentMethodValue={paymentMethodValue}
                      onDidPay={(paidCart) => {
                        clearCart();
                        clearVisitorValue();
                        !addPayment && dispatch(logout());
                        history.push({
                          pathname: generatePath(
                            '/c/:collection/checkout/thank-you',
                            {
                              collection: collectionSlug,
                            }
                          ),
                          state: {
                            payerEmail: paidCart.member.email,
                            addPayment,
                          },
                        });
                      }}
                    />
                  </div>
                )}
              </div>
            )}
            {!collectionHasFormsOnly &&
              !notSmall &&
              Boolean(step) &&
              step !== 'payment' && (
                <div className="mt3 ph3 pv4 bg-white shadow-6">
                  <Touchable
                    className="continue-button w-100 f5 white bg-brand"
                    disabled={
                      step === 'shipping'
                        ? !shippingInfoValueFilled
                        : !guestValueFilled
                    }
                    onClick={() => {
                      window.scrollTo(0, 0);

                      history.replace({
                        pathname: location.pathname,
                        search: `?step=${
                          step === 'shipping' && !userLoggedIn
                            ? 'details'
                            : 'payment'
                        }`,
                      });
                    }}
                  >
                    Continue to{' '}
                    {step === 'shipping' && !userLoggedIn
                      ? 'Details'
                      : 'Payment'}
                  </Touchable>
                </div>
              )}
          </main>
        </div>
      </div>
      {(paymentRequired || itemsRemoved) && !smallLandscape && (
        <div className="dn db-ns w-third">{cartOverviewElement}</div>
      )}
      {errorModalState && (
        <div className="mt4">
          <ErrorModal
            isMobile={!notSmall}
            openOrderSummary={() => {
              setErrorModalState(false);
              toggleOverviewVisible.on();
            }}
            onDismiss={() => setErrorModalState(false)}
          />
        </div>
      )}
      <style jsx>{`
        .pointer-events-none {
          pointer-events: none;
        }
        :global(.continue-button) {
          height: 2.5rem;
        }
        .empty-cart-svg-wrapper {
          width: 100px;
          margin: auto;
        }
      `}</style>
    </div>
  );
};

const enhance = compose(injectStripe, React.memo);

const EnhancedCheckoutPage = enhance(CheckoutPage);

export default EnhancedCheckoutPage;
