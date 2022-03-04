import React, {useCallback} from 'react';
import {CreditCardBrandLogo} from 'elements';

const CardItem = ({card, onDelete}) => {
  const deleteCard = useCallback(() => {
    onDelete(card);
  }, [card, onDelete]);

  return (
    <div className="bg-gray-250 mb3-25 br2 pv2 ph3 text-16 card-item">
      <CreditCardBrandLogo brand={card.brand} width={30} className="mr2" />
      <span className="w-30">{card.brand}</span>
      <span className="w-30 tc">****{card.last4}</span>
      <span className="w-30 tint pointer tr text-14" onClick={deleteCard}>
        Delete
      </span>
      <style jsx>{`
        .card-item {
          height: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

const EnhancedCardItem = React.memo(CardItem);

export default EnhancedCardItem;
