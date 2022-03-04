import {useDispatch, useSelector} from 'react-redux';
import {useFetcher, useInvalidator} from 'rest-hooks';
import React from 'react';

import {clearAlerts, errorAlert} from 'redux/modules/growl/actions';
import CartResource from 'resources/CartResource';
import CartHelpers from 'helpers/CartHelpers';

import {CheckoutInvoice} from './components';
import CheckoutDiscountCodeContainer from './CheckoutDiscountCodeContainer';

const CheckoutInvoiceContainer = ({
  className,
  collectionSlug,
  publicCollection,
  cart,
  paymentMethod,
  paymentRequired,
  addPayment,
  shippingInfoValueFilled,
  guestValueFilled,
  shippingInfoValue,
  guestValue,
  paymentMethodValue,
  stripe,
  updateCart,
  onChangePayerCoversFees,
  onDidPay,
}) => {
  const payCart = useFetcher(CartResource.payShape());

  const dispatch = useDispatch();

  const userLoggedIn = useSelector((state) =>
    Boolean(state.session && state.session.user)
  );
  const invalidateCart = useInvalidator(CartResource.detailShape());

  const [loading, setLoading] = React.useState(false);
  const [discountNotApplied, setDiscountNotApplied] = React.useState(false);

  const handlePay = async () => {
    const getMethod = () => {
      switch (paymentMethod) {
        case 'CREDIT_CARD':
          return 'card';
        case 'ECHECK':
          return 'echeck';
        default:
          return 'cash';
      }
    };
    const getSaveSource = () => {
      switch (paymentMethod) {
        case 'CREDIT_CARD':
          return paymentMethodValue.creditCard.saveSource;
        case 'ECHECK':
          return paymentMethodValue.bankAccount.saveSource;
        default:
          return undefined;
      }
    };

    const getCreditCardSource = async () => {
      if (paymentMethodValue.creditCard.useSaved) {
        return {savedMethodId: paymentMethodValue.creditCard.id};
      }

      const res = await stripe.createToken({
        name: paymentMethodValue.creditCard.name,
      });

      if (res.error) {
        throw new Error(res.error.message);
      }

      return {token: res.token.id};
    };

    const getBankAccountSource = async () => {
      if (paymentMethodValue.bankAccount.useSaved) {
        return {savedMethodId: paymentMethodValue.bankAccount.id};
      }

      if (
        paymentMethodValue.bankAccount.accountNumber !==
        paymentMethodValue.bankAccount.accountNumberRepeat
      ) {
        const errorMessage = 'Account numbers do not match';

        throw new Error(errorMessage);
      }

      const res = await stripe.createToken('bank_account', {
        type: 'bank_account',
        country: 'us',
        currency: 'usd',
        account_holder_name: `${guestValue.firstName} ${guestValue.lastName}`,
        account_number: paymentMethodValue.bankAccount.accountNumber,
        routing_number: paymentMethodValue.bankAccount.routingNumber,
      });

      if (res.error) {
        throw new Error(res.error.message);
      }

      return {token: res.token.id};
    };

    const getSource = async () => {
      switch (paymentMethod) {
        case 'CREDIT_CARD':
          return getCreditCardSource();
        case 'ECHECK':
          return getBankAccountSource();
        default:
          return {};
      }
    };

    const getShippingMethod = () => {
      switch (shippingInfoValue.method) {
        case 'TO_ME':
          return 'toMe';
        default:
          return 'localPickup';
      }
    };

    try {
      if (discountNotApplied) {
        dispatch(
          errorAlert({
            title: 'Caution!',
            body:
              'We see you\'ve entered a discount code. Click "Apply" to receive your discount.',
          })
        );

        return;
      }
      setLoading(true);

      const source = paymentRequired ? await getSource() : undefined;

      const paidCart = await payCart(
        {
          collectionSlug,
          uuid: cart.uuid,
        },
        {
          name:
            (cart.member && cart.member.name) ||
            (userLoggedIn
              ? undefined
              : `${guestValue.firstName} ${guestValue.lastName}`.trim()),
          email: (cart.member && cart.member.email) || guestValue.email,
          method: paymentRequired ? getMethod() : undefined,
          saveSource: paymentRequired ? getSaveSource() : undefined,
          source: paymentRequired ? source : undefined,
          shippingMethod: getShippingMethod(),
          shipTo:
            shippingInfoValue.method === 'TO_ME'
              ? {
                  country: shippingInfoValue.country,
                  name: shippingInfoValue.name,
                  address: shippingInfoValue.address,
                  city: shippingInfoValue.city,
                  state: shippingInfoValue.state,
                  zip: shippingInfoValue.zip,
                }
              : undefined,
        }
      );

      onDidPay(paidCart);
    } catch (err) {
      dispatch(clearAlerts());
      const errorMessage = CartHelpers.getPayErrorBody(err);

      if (errorMessage === 'items_sold_out') {
        invalidateCart({
          collectionSlug,
          uuid: cart.uuid,
        });
        updateCart(err?.response?.data?.details);
      } else {
        dispatch(errorAlert({title: 'Error', body: errorMessage}));
      }
    } finally {
      setLoading(false);
    }
  };

  const newCreditCardFilled =
    !paymentRequired ||
    paymentMethod !== 'CREDIT_CARD' ||
    paymentMethodValue.creditCard.useSaved ||
    (paymentMethodValue.creditCard.name.length !== 0 &&
      paymentMethodValue.creditCard.zip.length !== 0);
  const selectCreditCardFilled =
    !paymentRequired ||
    paymentMethod !== 'CREDIT_CARD' ||
    !paymentMethodValue.creditCard.useSaved ||
    Boolean(paymentMethodValue.creditCard.id);
  const newBankAccountFilled =
    !paymentRequired ||
    paymentMethod !== 'ECHECK' ||
    paymentMethodValue.bankAccount.useSaved ||
    (paymentMethodValue.bankAccount.routingNumber.length !== 0 &&
      paymentMethodValue.bankAccount.accountNumber.length !== 0 &&
      paymentMethodValue.bankAccount.accountNumberRepeat.length !== 0);
  const selectBankAccountFilled =
    !paymentRequired ||
    paymentMethod !== 'ECHECK' ||
    !paymentMethodValue.bankAccount.useSaved ||
    Boolean(paymentMethodValue.bankAccount.id);

  const organizerSubmitDisabled =
    publicCollection.userManagesCollection && !addPayment;

  const submitDisabled =
    loading ||
    organizerSubmitDisabled ||
    !guestValueFilled ||
    !shippingInfoValueFilled ||
    !newCreditCardFilled ||
    !selectCreditCardFilled ||
    !newBankAccountFilled ||
    !selectBankAccountFilled;

  return (
    <CheckoutInvoice
      className={className}
      loading={loading}
      organizerSubmitDisabled={organizerSubmitDisabled}
      shippingEnabled={Boolean(
        publicCollection?.shippingOptions?.shipToEnabled
      )}
      onChangePayerCoversFees={onChangePayerCoversFees}
      payerCanCoverFees={publicCollection.payerCanCoverFees}
      submitDisabled={submitDisabled}
      paymentMethod={paymentMethod}
      shippingInfoValue={shippingInfoValue}
      cart={cart}
      discountCodeElement={
        publicCollection.discountsEnabled &&
        cart && (
          <CheckoutDiscountCodeContainer
            collectionSlug={collectionSlug}
            cart={cart}
            setDiscountNotApplied={setDiscountNotApplied}
          />
        )
      }
      onPay={handlePay}
    />
  );
};

const EnhancedCheckoutInvoiceContainer = React.memo(CheckoutInvoiceContainer);

export default EnhancedCheckoutInvoiceContainer;
