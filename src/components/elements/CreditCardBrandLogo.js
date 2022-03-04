import PropTypes from 'prop-types';
import React from 'react';

import CardBrandLogoAmexIcon from 'theme/images/CardBrandLogoAmex.svg';
import CardBrandLogoDiscoverIcon from 'theme/images/CardBrandLogoDiscover.svg';
import CardBrandLogoGenericIcon from 'theme/images/CardBrandLogoGeneric.svg';
import CardBrandLogoMastercardIcon from 'theme/images/CardBrandLogoMastercard.svg';
import CardBrandLogoVisaIcon from 'theme/images/CardBrandLogoVisa.svg';

const CreditCardBrandLogo = ({className, brand, width = 44}) => {
  const src = React.useMemo(() => {
    const brandLowercase = brand.toLowerCase();

    if (brandLowercase.includes('visa')) {
      return CardBrandLogoVisaIcon;
    }
    if (brandLowercase.includes('mastercard')) {
      return CardBrandLogoMastercardIcon;
    }
    if (brandLowercase.includes('discover')) {
      return CardBrandLogoDiscoverIcon;
    }
    if (
      brandLowercase.includes('amex') ||
      brandLowercase.includes('american express')
    ) {
      return CardBrandLogoAmexIcon;
    }

    return CardBrandLogoGenericIcon;
  }, [brand]);

  return (
    <>
      <img className={className} alt="Card brand" src={src} />
      <style jsx>{`
        img {
          width: ${width}px;
          max-height: ${width}px;
        }
      `}</style>
    </>
  );
};

const EnhancedCreditCardBrandLogo = Object.assign(
  React.memo(CreditCardBrandLogo),
  {
    propTypes: {
      brand: PropTypes.string.isRequired,
    },
  }
);

export default EnhancedCreditCardBrandLogo;
