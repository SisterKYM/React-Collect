import {matchPath, useHistory, useLocation} from 'react-router-dom';
import {useFetcher} from 'rest-hooks';
import React from 'react';

import CartResource from 'resources/CartResource';
import useSessionStorage from 'hooks/useSessionStorage';
import useStatefulResource from 'hooks/useStatefulResource';

const useAddPayment = ({cartUuid, userManagesCollection}) => {
  const history = useHistory();
  const location = useLocation();

  const initialAddPayment = location.state && location.state.addPayment;
  const key = cartUuid ? `ADD_PAYMENT-${cartUuid}` : null;

  const [addPayment, setAddPayment] = React.useState(
    () => JSON.parse(sessionStorage.getItem(key)) || initialAddPayment
  );

  const clearAddPayment = React.useCallback(() => {
    sessionStorage.removeItem(key);
  }, [key]);

  React.useEffect(() => {
    if (key) {
      const savedAddPayment = JSON.parse(sessionStorage.getItem(key));

      if (typeof initialAddPayment === 'boolean') {
        setAddPayment(initialAddPayment);
        sessionStorage.setItem(key, JSON.stringify(initialAddPayment));
      } else if (typeof savedAddPayment === 'boolean') {
        setAddPayment(savedAddPayment);
      }
    }
  }, [key, initialAddPayment]);

  React.useEffect(() => {
    if (history.length === 1 && addPayment && !initialAddPayment) {
      const matchesPayerPage = matchPath(location.pathname, {
        path: '/c/:collection',
        exact: true,
      });

      if (matchesPayerPage) {
        clearAddPayment();
        setAddPayment(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.length, initialAddPayment, addPayment, location.pathname]);

  return [userManagesCollection && addPayment, clearAddPayment];
};

const useCart = ({collectionSlug, userManagesCollection, payerValue}) => {
  const history = useHistory();
  const [cartUuid, setCartUuid, clearCartUuid] = useSessionStorage(
    `CART_UUID-${collectionSlug}`,
    null
  );
  const [addPayment, clearAddPayment] = useAddPayment({
    cartUuid,
    userManagesCollection,
  });
  const [submitting, setSubmitting] = React.useState(false);

  const {data: cart, error: fetchCartDetailError} = useStatefulResource(
    CartResource.detailShape(),
    collectionSlug && cartUuid ? {collectionSlug, uuid: cartUuid} : null
  );
  const createCart = useFetcher(CartResource.createShape(), true);
  const updateCart = useFetcher(CartResource.updateShape());
  React.useEffect(() => {
    history.listen((location) => {
      const matchesPayerFlowPage = matchPath(location.pathname, {
        path: '/c/:collection',
        exact: false,
      });

      if (!matchesPayerFlowPage) {
        clearCartUuid();
        clearAddPayment();
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(
    () => {
      if (
        (!submitting && addPayment && payerValue) ||
        (!addPayment && (!cartUuid || fetchCartDetailError))
      ) {
        const setUpCart = async () => {
          setSubmitting(true);

          const nextCart = await createCart(
            {collectionSlug},
            {
              name: (addPayment && payerValue && payerValue.name) || undefined,
              email:
                (addPayment && payerValue && payerValue.email) || undefined,
              paymentSource: 'web',
            }
          );

          setSubmitting(false);

          setCartUuid(nextCart.uuid);
        };

        setUpCart();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [addPayment, fetchCartDetailError, collectionSlug, payerValue, createCart]
  );

  return {
    addPayment,
    cart,
    updateCart,
    clear: () => {
      clearCartUuid();
      clearAddPayment();
    },
  };
};

export default useCart;
