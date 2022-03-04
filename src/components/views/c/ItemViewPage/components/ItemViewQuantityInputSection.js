import React from 'react';

import {TextInput} from 'elements';
import parseNumberValue from 'helpers/parseNumberValue';

const ItemViewQuantityInputSection = ({
  itemView,
  listing,
  value,
  onChangeValue,
  errorMessage,
  setErrorMessage,
}) => {
  const maxValue = React.useMemo(() => {
    if (listing) {
      return listing.available_quantity;
    }

    return typeof itemView.available_quantity === 'number'
      ? itemView.available_quantity
      : null;
  }, [listing, itemView]);

  const handleChange = React.useCallback(
    event => {
      const nextValue = event.target.value;
      const parsedValue = parseNumberValue(event.target.value, {float: false});

      if (Number.isNaN(parsedValue) || !parsedValue) {
        onChangeValue('');
        setErrorMessage('');
      } else if (typeof maxValue !== 'number' || parsedValue <= maxValue) {
        onChangeValue(parsedValue.toString());

        if (Number(nextValue) !== 0) {
          setErrorMessage('');
        }
      } else {
        setErrorMessage(`Quantity can not exceed ${maxValue}`);
      }
    },
    [maxValue, onChangeValue, setErrorMessage]
  );

  return (
    <div className="ph3 ph4-ns">
      <div className="cf pt3 pb4 bb b--gray-300">
        <TextInput
          className="fl"
          inputClassName="quantity-text-input"
          name="item-view-quantity"
          type="number"
          label={`Qty${
            itemView.options.makeAvailableQuantityPublic
              ? ` (${itemView.available_quantity} left)`
              : ''
          }:`}
          placeholder="0"
          errorMessage={errorMessage}
          value={value}
          onChange={handleChange}
          required
        />
      </div>
      <style jsx>{`
        :global(.quantity-text-input) {
          width: 4rem !important;
        }
      `}</style>
    </div>
  );
};

const EnhancedItemViewQuantityInputSection = React.memo(
  ItemViewQuantityInputSection
);

export default EnhancedItemViewQuantityInputSection;
