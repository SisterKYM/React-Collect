import cx from 'classnames';
import React from 'react';

import {SORT_PAYMENTS_BY} from 'redux/modules/payments/constants';
import DropdownSelect from 'elements/DropdownSelect';

class CollectionPaymentsSortBySelect extends React.PureComponent {
  getHandleClickOption = (value) => () => {
    this.props.onChange(value);
  };

  getOptions = () =>
    [
      {
        title:
          this.props.customLabel?.[SORT_PAYMENTS_BY.name.label] || 'Payer Name',
        value: SORT_PAYMENTS_BY.name.label,
        onClick: this.getHandleClickOption(SORT_PAYMENTS_BY.name.label),
      },
      {
        title: 'Payment Date',
        value: SORT_PAYMENTS_BY.createdAt.label,
        onClick: this.getHandleClickOption(SORT_PAYMENTS_BY.createdAt.label),
      },
      {
        title: 'Label Created Status',
        value: SORT_PAYMENTS_BY.labelCreatedAt.label,
        onClick: this.getHandleClickOption(SORT_PAYMENTS_BY.createdAt.label),
      },
      {
        title: 'Payment Status',
        value: SORT_PAYMENTS_BY.status.label,
        onClick: this.getHandleClickOption(SORT_PAYMENTS_BY.status.label),
      },
      {
        title: 'Payment Method',
        value: SORT_PAYMENTS_BY.method.label,
        onClick: this.getHandleClickOption(SORT_PAYMENTS_BY.method.label),
      },
      {
        title: 'Note',
        value: SORT_PAYMENTS_BY.note.label,
        onClick: this.getHandleClickOption(SORT_PAYMENTS_BY.note.label),
      },
    ].filter(
      ({value}) =>
        this.props.excludedOptions &&
        !this.props.excludedOptions.includes(value)
    );

  render() {
    const options = this.getOptions();
    const selectedOption = options.find(
      ({value}) => value === this.props.value
    );

    return (
      <DropdownSelect
        className={cx('bg-white ba b--gray-300', this.props.className)}
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
  }
}

const EnhancedCollectionPaymentsSortBySelect = React.memo(
  CollectionPaymentsSortBySelect
);

export default EnhancedCollectionPaymentsSortBySelect;
