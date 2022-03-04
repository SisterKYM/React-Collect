import React from 'react';

import {BigCheckbox, CreditCardSelectRow} from 'elements';

import CreditCardForm from './CreditCardForm';

const CreditCardSelect = ({
  userLoggedIn,
  creditCards,
  addPayment,
  value,
  onChangeValue,
}) => (
  <>
    {value.useSaved ? (
      creditCards.map(creditCard => {
        const handleChangeSelectedCreditCardId = () => {
          onChangeValue({
            ...value,
            id: creditCard.id,
          });
        };

        return (
          <CreditCardSelectRow
            key={creditCard.id}
            className="mb3"
            creditCard={creditCard}
            selectControl={
              <BigCheckbox
                type="radio"
                name="savedCardId"
                checked={value.id === creditCard.id}
                onChange={handleChangeSelectedCreditCardId}
              />
            }
          />
        );
      })
    ) : (
      <CreditCardForm
        userLoggedIn={userLoggedIn}
        addPayment={addPayment}
        value={value}
        onChangeValue={onChangeValue}
      />
    )}
    {creditCards.length !== 0 && (
      <div
        className="mt3 f6 avenir-roman tint dim pointer"
        onClick={() => {
          onChangeValue({
            ...value,
            useSaved: !value.useSaved,
          });
        }}
      >
        Use {value.useSaved ? 'New' : 'Saved'} Card
      </div>
    )}
  </>
);

const EnhancedCreditCardSelect = React.memo(CreditCardSelect);

export default EnhancedCreditCardSelect;
