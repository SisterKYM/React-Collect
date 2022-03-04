import PropTypes from 'prop-types';
import React from 'react';

import {Button} from 'elements';

import TaxForm from './TaxForm';

const AddTax = ({
  className,
  browser,
  optionsCategorized,
  optionsNoCategorized,
  addTax,
}) => {
  const [showForm, setShowForm] = React.useState(false);

  const closeForm = React.useCallback(() => {
    setShowForm(false);
  }, []);

  const onAddTax = React.useCallback(() => {
    setShowForm(true);
  }, []);

  const onSubmit = React.useCallback(
    (values) => {
      addTax(values);
      closeForm();
    },
    [addTax, closeForm]
  );

  return (
    <div className={className}>
      {showForm ? (
        <TaxForm
          browser={browser}
          form="AddTaxForm"
          onDismiss={closeForm}
          onSubmit={onSubmit}
          optionsCategorized={optionsCategorized}
          optionsNoCategorized={optionsNoCategorized}
        />
      ) : (
        <div className="flex items-center">
          <Button
            small
            backgroundColorSet
            className="w4 mr2 bg-gray-250 dark-grey"
            onClick={onAddTax}
          >
            Add New Tax
          </Button>
        </div>
      )}
    </div>
  );
};

const EnhancedAddTax = Object.assign(React.memo(AddTax), {
  propTypes: {
    addTax: PropTypes.func,
    browser: PropTypes.object,
    className: PropTypes.string,
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
  },
});

export default EnhancedAddTax;
