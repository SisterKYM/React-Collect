import {useDispatch} from 'react-redux';
import {useFetcher} from 'rest-hooks';
import React from 'react';

import {clearAlerts, errorAlert} from 'redux/modules/growl/actions';
import {currency} from 'helpers/numbers';
import CartResource from 'resources/CartResource';

import {CheckoutDiscountCode} from './components';

const getErrorMessage = (error) => {
  switch (error.code) {
    case 'minimum_not_met':
      return `The order minimum of ${currency(
        error.minimum
      )} has not been met.`;
    case 'not_found':
      return 'Discount code is invalid.';
    default:
      return 'Something went wrong applying your discount code. Please try again';
  }
};

const CheckoutDiscountCodeContainer = ({
  collectionSlug,
  cart,
  setDiscountNotApplied,
}) => {
  const applyDiscountCode = useFetcher(CartResource.applyDiscountShape());
  const resetDiscountCode = useFetcher(CartResource.resetDiscountShape());

  const dispatch = useDispatch();

  const appliedDiscountCodes = Object.keys(cart.discounts);

  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState({code: ''});
  const onChangeValue = React.useCallback(
    (value) => {
      setValue(value);
      setDiscountNotApplied(Boolean(value.code));
    },
    [setDiscountNotApplied]
  );

  const handleApply = React.useCallback(async () => {
    try {
      setLoading(true);

      await applyDiscountCode(
        {collectionSlug, uuid: cart.uuid, discountCode: value.code},
        {}
      );

      setValue((prevValue) => ({
        ...prevValue,
        code: '',
      }));
      setDiscountNotApplied(false);
    } catch (err) {
      dispatch(clearAlerts());
      dispatch(
        errorAlert({
          title: 'Sorry!',
          body: getErrorMessage(err.response.data.error),
        })
      );
    } finally {
      setLoading(false);
    }
  }, [
    applyDiscountCode,
    collectionSlug,
    cart.uuid,
    value.code,
    setDiscountNotApplied,
    dispatch,
  ]);

  const handleReset = React.useCallback(async () => {
    try {
      setLoading(true);

      for (const code of appliedDiscountCodes) {
        await resetDiscountCode(
          {collectionSlug, uuid: cart.uuid, discountCode: code},
          {}
        );
      }

      setValue((prevValue) => ({
        ...prevValue,
        code: '',
      }));
      setDiscountNotApplied(false);
    } finally {
      setLoading(false);
    }
  }, [
    setDiscountNotApplied,
    appliedDiscountCodes,
    resetDiscountCode,
    collectionSlug,
    cart.uuid,
  ]);

  return (
    <CheckoutDiscountCode
      loading={loading}
      applied={Boolean(appliedDiscountCodes.length)}
      value={value}
      onApply={handleApply}
      onReset={handleReset}
      onChangeValue={onChangeValue}
    />
  );
};

const EnhancedCheckoutDiscountCodeContainer = React.memo(
  CheckoutDiscountCodeContainer
);

export default EnhancedCheckoutDiscountCodeContainer;
