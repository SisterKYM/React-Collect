import React, {useState} from 'react';
import {useFetcher} from 'rest-hooks';
import {connect, useSelector} from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom';
import {compose} from 'recompose';
import _ from 'lodash';

import CollectionResource from 'resources/CollectionResource';
import {asyncConnect} from 'helpers';
import {
  CREATE_DISCOUNT,
  DELETE_DISCOUNT,
  GET_DISCOUNTS,
  SWITCH_DISCOUNTS,
  UPDATE_DISCOUNT,
} from 'redux/modules/discounts/constants';
import {
  createDiscount,
  deleteDiscount,
  getDiscounts,
  switchDiscounts,
  updateDiscount,
} from 'redux/modules/discounts/actions';

import {SwitchExpandField} from '../../components';
import Discount from './Discount';

const getDiscountPayload = values => {
  const res = _.pick(values, ['appliesTo', 'calculationMethod', 'code']);
  if (values.calculationMethod === 'fixed') {
    res.fixedAmount = values.amount;
  }
  if (values.calculationMethod === 'percentage') {
    res.percentage = values.amount;
  }
  if (values.appliesTo === 'total_order_with_minimum') {
    res.minimumPurchase = values.minimumPurchase;
  }

  return res;
};

const CollectionSettingsDiscounts = ({
  collection,
  collectionHasRecurringItems,
  createDiscountStatus,
  deleteDiscountStatus,
  discounts,
  isUpgraded,
  togglingDiscountsStatus,
  updateDiscountStatus,
  updateDiscountMetadata,
  onCreateDiscount,
  onDeleteDiscount,
  onSwitchDiscounts,
  onUpdateDiscount,
}) => {
  const history = useHistory();
  const location = useLocation();
  const browser = useSelector(state => state.browser);

  const updateCollection = useFetcher(CollectionResource.partialUpdateShape());

  const [state, setState] = useState({
    discounts_enabled: collection.discounts_enabled && collection.is_pro,
  });
  const handleChange = field => value => {
    setState({
      ...state,
      [field]: value,
    });
  };

  const handleToggle = event => {
    updateCollection({id: collection.id}, event);
  };

  const handleSubmit = React.useCallback(
    values => {
      onCreateDiscount({
        ...getDiscountPayload(values),
        collection: collection.id,
      });
    },
    [collection.id, onCreateDiscount]
  );

  const handleDeleteDiscount = React.useCallback(
    discount => {
      onDeleteDiscount({
        discount,
        collection: collection.id,
      });
    },
    [collection.id, onDeleteDiscount]
  );

  const handleSwitchDiscounts = React.useCallback(
    enable => {
      onSwitchDiscounts({
        collection: collection.id,
        discounts_enabled: Boolean(enable),
      });
    },
    [collection.id, onSwitchDiscounts]
  );

  const handleUpdateDiscount = React.useCallback(
    (values, dispatch, form) => {
      onUpdateDiscount({
        ...getDiscountPayload(values),
        collection: collection.id,
        discount: Number(form && form.discountId ? form.discountId : 0),
      });
    },
    [collection.id, onUpdateDiscount]
  );

  const handleUpgradeClick = () => {
    history.push(`${location.pathname}/i/plans`);
  };

  const DiscountsForm = (
    <div className="avenir-light dark-grey">
      <div className="pb2 text-14">
        Create discount codes that your customers can enter at checkout.
      </div>
      {collectionHasRecurringItems && (
        <div className="text-14 flamingo">
          Please note: discount codes for recurring payment items will only
          apply to first checkout
        </div>
      )}
      <Discount
        browser={browser}
        createDiscountStatus={createDiscountStatus}
        deleteDiscount={handleDeleteDiscount}
        deleteStatus={deleteDiscountStatus}
        discountOn={state.discounts_enabled}
        discounts={discounts}
        isUpgraded={isUpgraded}
        onButtonClick={handleUpgradeClick}
        switchDiscounts={handleSwitchDiscounts}
        togglingStatus={togglingDiscountsStatus}
        updateStatus={updateDiscountStatus}
        updateMetadata={updateDiscountMetadata}
        updateDiscountSubmit={handleUpdateDiscount}
        saveCodeFormSubmit={handleSubmit}
      />
    </div>
  );

  return (
    <SwitchExpandField
      collection={collection}
      label="Create discount codes"
      id="discounts-enabled"
      input={{
        name: 'discounts_enabled',
        value: state.discounts_enabled,
        onChange: handleChange('discounts_enabled'),
      }}
      body={DiscountsForm}
      onToggle={handleToggle}
      authority="pro"
    />
  );
};

const enhance = compose(
  asyncConnect(props => [
    {
      key: GET_DISCOUNTS,
      payload: {
        collection: props.collection.id,
      },
      promise: getDiscounts,
    },
  ]),
  connect(
    state => ({
      browser: state.browser,
      collections: state.collections,
      discountsEnabled:
        state.collections.collection &&
        state.collections.collection.discounts_enabled,
      isUpgraded:
        state.collections.collection && state.collections.collection.is_pro,
      discounts: (state.discounts && state.discounts.discounts) || [],
      session: state.session,
      createDiscountStatus: state.async.statuses[CREATE_DISCOUNT],
      deleteDiscountStatus: state.async.statuses[DELETE_DISCOUNT],
      togglingDiscountsStatus: state.async.statuses[SWITCH_DISCOUNTS],
      updateDiscountStatus: state.async.statuses[UPDATE_DISCOUNT],
      updateDiscountMetadata: state.async.metadatas[UPDATE_DISCOUNT],
    }),
    dispatch => ({
      onCreateDiscount: payload => dispatch(createDiscount(payload)),
      onDeleteDiscount: payload => dispatch(deleteDiscount(payload)),
      onSwitchDiscounts: payload => dispatch(switchDiscounts(payload)),
      onUpdateDiscount: payload => dispatch(updateDiscount(payload)),
    })
  )
);

export default enhance(CollectionSettingsDiscounts);
