import React from 'react';
import cx from 'classnames';

import CreditCardBrandLogo from 'elements/CreditCardBrandLogo';

const CreditCardSelectRow = ({className, creditCard, selectControl}) => (
  <div
    className={cx(
      'flex pa2 items-center avenir-roman text-14 gray-600 bg-gray-200 br2',
      className
    )}
  >
    {selectControl && <div className="pa2">{selectControl}</div>}
    <CreditCardBrandLogo className="ph2" brand={creditCard.brand} />
    <div className="ph2">{creditCard.brand}</div>
    <div className="flex-auto ph3 tr">*{creditCard.last4}</div>
  </div>
);

const EnhancedCreditCardSelectRow = React.memo(CreditCardSelectRow);

export default EnhancedCreditCardSelectRow;
