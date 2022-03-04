import {useDispatch} from 'react-redux';
import {useFetcher} from 'rest-hooks';
import _ from 'lodash';
import cx from 'classnames';
import pluralize from 'pluralize';
import React from 'react';

import {errorAlert} from 'redux/modules/growl/actions';
import {readApiError} from 'helpers/apiResponseHelpers';
import AddItemToCartHelper from 'helpers/AddItemToCartHelper';
import {Touchable} from 'elements';
import CartItemResource from 'resources/CartItemResource';
import parseNumberValue from 'helpers/parseNumberValue';

const AddToCartButtonContainer = ({
  className,
  style,
  collectionSlug,
  cartUuid,
  cartItemId,
  addPayment,
  itemView,
  listing,
  quantity,
  amount,
  fieldViewsValue,
  onChangeFieldErrorMessages,
  onDidAdd,
}) => {
  const createCartItem = useFetcher(CartItemResource.createShape());
  const updateCartItem = useFetcher(CartItemResource.partialUpdateShape());
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const handleClickAdd = async () => {
    if (Number.isNaN(quantity) || quantity === 0 || quantity === '') {
      onChangeFieldErrorMessages({quantity: 'Required'});

      return;
    }
    if (!listing && itemView.amount_type === 'open' && !amount) {
      onChangeFieldErrorMessages({amount: 'Required'});

      return;
    }
    if (
      addPayment &&
      itemView.options.recurring &&
      itemView.options.recurring.enabled
    ) {
      setErrorMessage('You cannot record a recurring payment.');

      return;
    }

    const requiredFieldViewIds = itemView.fields
      .filter(({required}) => required)
      .map(({id}) => String(id));
    const missingRequiredFieldViewIds = Object.keys(
      _.pickBy(
        fieldViewsValue,
        (value, fieldViewId) =>
          requiredFieldViewIds.includes(fieldViewId) && !value
      )
    );

    if (missingRequiredFieldViewIds.length !== 0) {
      setErrorMessage(
        `${missingRequiredFieldViewIds.length} ${pluralize(
          'answer',
          missingRequiredFieldViewIds.length
        )} need completing`
      );

      onChangeFieldErrorMessages(
        _.fromPairs(
          missingRequiredFieldViewIds.map((id) => [
            id,
            'This field is required',
          ])
        )
      );

      return;
    }

    try {
      setLoading(true);

      const payload = {
        item_id: itemView.id,
        variant_id: (listing && listing.uuid) || undefined,
        quantity,
        amount:
          !listing && itemView.amount_type === 'open'
            ? parseNumberValue(String(amount))
            : undefined,
        cart_field_values: _.map(fieldViewsValue, (value, fieldViewId) => ({
          item_field_id: Number(fieldViewId),
          value,
        })).filter(({value}) => Boolean(value)),
      };

      if (cartItemId) {
        await updateCartItem(
          {
            collectionSlug,
            cartUuid,
            uuid: cartItemId,
          },
          payload
        );
      } else {
        await createCartItem({collectionSlug, cartUuid}, payload);
      }

      onDidAdd();
    } catch (err) {
      const errorMessage = readApiError(err, {
        exceeded_available_quantity: () => 'exceeded_available_quantity',
        cannot_subscribe_to_own_collection:
          'You cannot subscribe to your own recurring payment items.',
        amount_required: 'Amount is required',
      });

      if (errorMessage === 'exceeded_available_quantity') {
        dispatch(
          errorAlert({
            title: 'Sorry',
            body: AddItemToCartHelper.getErrorBody(err),
          })
        );
      } else {
        setErrorMessage(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const soldOut =
    (listing && listing.available_quantity === 0) ||
    (!listing && itemView?.options?.variants?.enabled);

  const buttonTitle = React.useMemo(() => {
    if (soldOut) {
      return 'Sold Out';
    }

    return cartItemId ? 'Save' : 'Add to Cart';
  }, [cartItemId, soldOut]);

  return (
    <div className={cx('flex items-center', className)} style={style}>
      <Touchable
        className={soldOut ? 'gray-600 bg-gray-300' : 'white bg-tint'}
        size="LARGE"
        disabled={soldOut}
        loading={loading}
        onClick={handleClickAdd}
      >
        {buttonTitle}
      </Touchable>
      {errorMessage && <p className="ml3 f6 brand">{errorMessage}</p>}
    </div>
  );
};

export default AddToCartButtonContainer;
