import {Field} from 'formik';
import React from 'react';
import cx from 'classnames';

import {
  BigCheckbox,
  Button,
  CreditCardSelectRow,
  PrintShippingLabelInvoice,
  Status,
} from 'elements';

import CreditCardFormFields from './CreditCardFormFields';

const renderCreditCardSelectRow = (creditCard) => (
  <CreditCardSelectRow
    key={creditCard.id}
    className="mb3"
    creditCard={creditCard}
    selectControl={
      <Field name="savedCardId">
        {({field}) => (
          <BigCheckbox
            type="radio"
            {...field}
            value={creditCard.id}
            checked={creditCard.id === field.value}
          />
        )}
      </Field>
    }
  />
);

const PrintShippingLabelPayForm = ({
  className,
  creditCards,
  amounts,
  amountsVisible,
  formik,
  payLoading,
  calculateShippingCostLoading,
  calculateShippingCostDisabled,
  onCalculateShippingCost,
}) => {
  const [addingCard, setAddingCard] = React.useState(false);

  const creditCardFormVisible = creditCards.length === 0 || addingCard;

  const toggleAddingCard = React.useCallback(() => {
    setAddingCard((prevAddingCard) => !prevAddingCard);
  }, []);

  return (
    <div className={cx('pa3 bg-white', className)}>
      <PrintShippingLabelInvoice
        amounts={amounts}
        amountsVisible={amountsVisible}
      />
      {amountsVisible && (
        <div className="flex mb3 justify-between items-center f6">
          <div>How would you like to pay?</div>
          {creditCards.length !== 0 && (
            <div className="tr tint pointer" onClick={toggleAddingCard}>
              {creditCardFormVisible ? 'Saved card' : 'Add card'}
            </div>
          )}
        </div>
      )}
      {amountsVisible && (
        <>
          {creditCardFormVisible ? (
            <CreditCardFormFields errors={formik.errors} />
          ) : (
            creditCards.map((x) => renderCreditCardSelectRow(x))
          )}
        </>
      )}
      <div>
        <div className="mb2">
          {calculateShippingCostLoading ? (
            <div className="flex flex-auto items-center">
              <Status status="pending" />
            </div>
          ) : (
            <Button
              className="w-100"
              type="button"
              disabled={amountsVisible || calculateShippingCostDisabled}
              onClick={onCalculateShippingCost}
            >
              Calculate Shipping Cost
            </Button>
          )}
        </div>
        {payLoading ? (
          <div className="flex flex-auto items-center">
            <Status status="pending" />
          </div>
        ) : (
          <Button
            colorSet
            backgroundColorSet
            className={cx(
              'w-100',
              amountsVisible ? 'white bg-brand' : 'gray-400 bg-gray-200'
            )}
            type="submit"
            disabled={!amountsVisible || amounts.postage <= 0}
          >
            Confirm and Pay
          </Button>
        )}
      </div>
    </div>
  );
};

const EnhancedPrintShippingLabelPayForm = React.memo(PrintShippingLabelPayForm);

export default EnhancedPrintShippingLabelPayForm;
