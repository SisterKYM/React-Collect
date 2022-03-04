import React from 'react';

import {List} from 'views/user/components/Lists';
import AmexIcon from 'theme/images/Amex.svg';
import CardBrandLogoGenericIcon from 'theme/images/CardBrandLogoGeneric.svg';
import DiscoverIcon from 'theme/images/Discover.svg';
import MastercardIcon from 'theme/images/Mastercard.svg';
import VisaIcon from 'theme/images/Visa.svg';

import {PaymentMethodsPageContext} from '../PaymentMethodsPage';
import {useHandleDeletePaymentMethod} from '../hooks';

const getCreditCardBrandIcon = brand => {
  switch (brand) {
    case 'Amex':
    case 'American Express':
      return AmexIcon;
    case 'Discover':
      return DiscoverIcon;
    case 'MasterCard':
      return MastercardIcon;
    case 'Visa':
      return VisaIcon;
    default:
      return CardBrandLogoGenericIcon;
  }
};

const useCreditCardsWithBrandIcons = () => {
  const {getPaymentMethodsQuery} = React.useContext(PaymentMethodsPageContext);
  const creditCards =
    (getPaymentMethodsQuery.payload && getPaymentMethodsQuery.payload.cards) ||
    [];

  return creditCards.map(creditCard => ({
    ...creditCard,
    imgSrc: getCreditCardBrandIcon(creditCard.brand),
  }));
};

const CardAccountListContainer = () => {
  const creditCardsWithBrandIcons = useCreditCardsWithBrandIcons();
  const handleDelete = useHandleDeletePaymentMethod();

  return <List items={creditCardsWithBrandIcons} onDelete={handleDelete} />;
};

const EnhancedCardAccountListContainer = React.memo(CardAccountListContainer);

export default EnhancedCardAccountListContainer;
