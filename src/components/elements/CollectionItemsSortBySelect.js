import React from 'react';
import {SORT_PAYMENTS_BY} from 'redux/modules/payments/constants';
import DropdownSelect from 'elements/DropdownSelect';

const CollectionItemsSortBySelect = ({value, handleSort}) => {
  const options = [
    {
      title: 'Item Name A-Z',
      value: 'name',
      onClick: () => handleSort('name'),
    },
    {
      title: 'Price',
      value: 'amount',
      onClick: () => handleSort('amount'),
    },
    {
      title: 'Qty Remaining',
      value: 'available_quantity',
      onClick: () => handleSort('available_quantity'),
    },
    {
      title: 'Total Collected',
      value: 'net_amount',
      onClick: () => handleSort('net_amount'),
    },
  ];
  const selectedOption = options.find(({v}) => v === value);

  return (
    <DropdownSelect
      className="mr3 bg-white ba b--gray-300"
      backgroundColor="white"
      title={
        !selectedOption ||
        selectedOption.value === SORT_PAYMENTS_BY.createdAt.label
          ? 'Sort'
          : selectedOption.title
      }
      options={options}
    />
  );
};

export default CollectionItemsSortBySelect;
