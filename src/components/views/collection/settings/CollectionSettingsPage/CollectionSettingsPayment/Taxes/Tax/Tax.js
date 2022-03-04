import {find, get, isEqual, isPlainObject, round, sortBy} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import {SEARCH_OPTIONS} from 'elements/SelectGrouped/SelectGroupedSearch';

import {SettingItem} from 'views/collection/settings/CollectionSettingsPage/components';
import TaxForm from './TaxForm';

const Tax = ({
  browser,
  className,
  optionsCategorized = [],
  optionsNoCategorized,
  tax,
  position,
  editTax,
  clickDelete,
}) => {
  const [editing, toggleEditing] = React.useState(false);

  const taxAppliedTo = get(tax, 'applied_to', '');

  const initialApply = React.useMemo(() => {
    switch (taxAppliedTo) {
      case 'all':
        return SEARCH_OPTIONS.ALL;
      case 'none':
        return SEARCH_OPTIONS.NONE;
      default:
        return get(tax, 'applicable_items', []).reduce((acc, ai) => {
          const category = find(optionsCategorized, (oc) => {
            const ops = get(oc, 'options', []);

            return Boolean(find(ops, (op) => op.value === ai));
          });
          const toSave = {checked: true};
          if (category) {
            toSave.category = category.category.value;
          }
          acc[ai] = toSave;

          return acc;
        }, {});
    }
  }, [optionsCategorized, tax, taxAppliedTo]);

  const onDeleteClick = React.useCallback(() => {
    if (clickDelete) {
      clickDelete(tax);
    }
  }, [clickDelete, tax]);

  const onSubmitClick = React.useCallback(
    (values) => {
      let editable =
        `${values.amount}` !== `${tax.rate * 100}` ||
        (typeof values.apply === 'string' &&
          values.apply.toLowerCase() !== tax.applied_to.toLowerCase()) ||
        values.name !== tax.name;
      if (isPlainObject(values.apply)) {
        const applyKeys = sortBy([
          ...Object.keys(values.apply).map((v) => `${v}`),
        ]);
        const taxApplicableItems = Array.isArray(tax.applicable_items)
          ? sortBy([...tax.applicable_items.map((v) => `${v}`)])
          : tax.applicable_items;
        editable = editable || !isEqual(applyKeys, taxApplicableItems);
      }

      if (editable && editTax) {
        editTax(position, values);
      }

      toggleEditing(false);
    },
    [editTax, position, tax]
  );

  return (
    <li className={className}>
      {editing ? (
        <TaxForm
          browser={browser}
          initialValues={{
            amount: round(get(tax, 'rate', 0) * 100, 2) || '',
            apply: initialApply,
            name: get(tax, 'name', ''),
          }}
          onDismiss={() => toggleEditing(false)}
          onSubmit={onSubmitClick}
          optionsCategorized={optionsCategorized}
          optionsNoCategorized={optionsNoCategorized}
        />
      ) : (
        <SettingItem
          browser={browser}
          clickDelete={onDeleteClick}
          clickEdit={() => toggleEditing(true)}
          clickLabel={() => toggleEditing(true)}
          description={`${round(get(tax, 'rate', 0) * 100, 2)}%`}
          label={get(tax, 'name', '')}
        />
      )}
    </li>
  );
};

const EnhancedTax = Object.assign(React.memo(Tax), {
  propTypes: {
    browser: PropTypes.object,
    className: PropTypes.string,
    clickDelete: PropTypes.func,
    editTax: PropTypes.func,
    optionsCategorized: PropTypes.arrayOf(
      PropTypes.shape({
        category: PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
            .isRequired,
        }).isRequired,
        options: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
              .isRequired,
          })
        ).isRequired,
      })
    ),
    optionsNoCategorized: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
      })
    ),
    position: PropTypes.number,
    tax: PropTypes.shape({
      name: PropTypes.string,
      rate: PropTypes.number,
    }),
  },
});

export default EnhancedTax;
