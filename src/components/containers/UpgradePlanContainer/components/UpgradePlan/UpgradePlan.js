// import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import {useLocation} from 'react-router-dom';
import queryString from 'query-string';

import {Elements} from 'elements/Stripe';
import {Modal, ModalCloseButton} from 'elements';

import UpgradePlanForm from './UpgradePlanForm';

const UpgradePlan = ({
  paymentAccounts,
  description,
  errMsg,
  fieldPanels,
  handleDismiss,
  heading,
  subheading,
  onSubmit,
  status,
  // plansLink,
}) => {
  const creditCards = (paymentAccounts && paymentAccounts.cards) || [];
  const bankAccounts = (paymentAccounts && paymentAccounts.banks) || [];
  const location = useLocation();
  const queryParams = React.useMemo(() => queryString.parse(location.search), [
    location.search,
  ]);
  const initialValues = React.useMemo(
    () => ({
      plan: fieldPanels[0].value,
      creditCardId: creditCards.length === 0 ? null : creditCards[0].id,
      bankAccountId: bankAccounts.length === 0 ? null : bankAccounts[0].id,
      newMethod: creditCards.length === 0,
      method: 'card',
      coupon: queryParams?.code,
    }),
    [bankAccounts, creditCards, fieldPanels, queryParams]
  );

  return (
    <Modal onClickOverlay={handleDismiss}>
      <div className="min-h-100 h-auto pa3 pa4-l white bg-tint">
        <ModalCloseButton color="white" onClick={handleDismiss} />
        <h1 className="mb3 f3 line-24 avenir-roman">{heading}</h1>
        <div className="mb4 text-16 line-24 avenir-light lh-copy">
          <p>{subheading}</p>
          <p className="mt3 f6">{description}</p>
        </div>
        <Elements>
          <UpgradePlanForm
            enableReinitialize
            initialValues={initialValues}
            creditCards={creditCards}
            bankAccounts={bankAccounts}
            errMsg={errMsg}
            fieldPanels={fieldPanels}
            loading={status === 'pending'}
            onSubmit={onSubmit}
          />
        </Elements>
      </div>
    </Modal>
  );
};

const EnhancedUpgradePlan = Object.assign(React.memo(UpgradePlan), {
  propTypes: {
    description: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    errMsg: PropTypes.string,
    fieldPanels: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        value: PropTypes.string,
      })
    ),
    handleDismiss: PropTypes.func,
    heading: PropTypes.string,
    onSubmit: PropTypes.func,
    status: PropTypes.string,
  },
});

export default EnhancedUpgradePlan;
