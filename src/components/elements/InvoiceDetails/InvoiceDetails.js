import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {MdClose} from 'react-icons/md';
import {useFetcher, useInvalidator, useResource} from 'rest-hooks';
import {Link, useHistory, useRouteMatch} from 'react-router-dom';
import _, {startCase, upperFirst} from 'lodash';

import {CommonButton, Modal, VerificationPrompt} from 'elements';
import {currency} from 'helpers/numbers';
import DateHelpers from 'helpers/DateHelpers';
import RecurringPaymentFormatter from 'helpers/RecurringPaymentFormatter';
import RecurringPaymentContractResource from 'resources/RecurringPaymentContractResource';
import UserPaymentResource from 'resources/UserPaymentResource';
import {DropdownSelect} from './components';

const buttonStyle = {
  marginRight: '1.5rem',
};
const dropdownStyle = {
  fontSize: '14px',
  lineHeight: '20px',
};
const dropdownContainerStyle = {
  width: '235px',
  marginTop: '1.5rem',
  marginBottom: '2rem',
};
const dropdownProps = {
  width: '235px',
  left: '-13px',
  top: '10px',
  bottom: '-116px',
  bodyClassName: 'br2',
};

const InvoiceDetails = ({payment, cards = []}) => {
  const history = useHistory();
  const match = useRouteMatch();
  const scheduledInvoice = useMemo(() => {
    if (typeof match.params.invoice !== 'undefined') {
      return payment?.scheduled_invoices[Number(match.params.invoice)];
    }

    return null;
  }, [match.params.invoice, payment]);

  const recurringPaymentContractId = useMemo(() => {
    if (scheduledInvoice) {
      return scheduledInvoice?.recurring_payment_contract_id;
    }

    if (payment.recurring_payment_invoice?.recurring_payment_contract?.id) {
      return payment.recurring_payment_invoice.recurring_payment_contract.id;
    }

    return null;
  }, [payment.recurring_payment_invoice, scheduledInvoice]);

  const recurringContract = useResource(
    RecurringPaymentContractResource.detailShape(),
    {id: recurringPaymentContractId}
  );

  const recurringLabels = useMemo(() => {
    if (recurringContract?.options) {
      return RecurringPaymentFormatter.getLabels(recurringContract.options);
    }

    return {};
  }, [recurringContract]);

  const repeatingEvery = useMemo(() => {
    if (recurringLabels?.repeat) {
      return startCase(
        `${
          Number.isNaN(Number.parseInt(recurringLabels.repeat, 10)) ? '1 ' : ''
        }${recurringLabels.repeat}`
      );
    }

    return '';
  }, [recurringLabels]);

  const nextInvoice = useMemo(
    () =>
      _.minBy(
        recurringContract?.recurring_payment_invoices?.filter(
          ({status}) => status === 'scheduled'
        ),
        ({metadata}) => new Date(metadata.due_date)
      ),
    [recurringContract]
  );

  const nextInvoiceDueDate = nextInvoice?.metadata.due_date || null;

  const hasNextPayment =
    Boolean(nextInvoiceDueDate) && recurringContract?.status !== 'cancelled';

  const recurringLabelNext = useMemo(
    () =>
      RecurringPaymentFormatter.getLabelsNextFormatted({
        start: recurringContract?.options.start,
        repeat: recurringContract?.options.repeat,
      }),
    [recurringContract]
  );

  const [
    cancelFuturePaymentsConfirmationVisible,
    setCancelFuturePaymentsConfirmationVisible,
  ] = useState(false);
  const showCancelFuturePaymentsConfirmation = useCallback(() => {
    setCancelFuturePaymentsConfirmationVisible(true);
  }, []);
  const hideCancelFuturePaymentsConfirmation = useCallback(() => {
    setCancelFuturePaymentsConfirmationVisible(false);
  }, []);

  const invalidate = useInvalidator(UserPaymentResource.listShape());
  const cancelRecurringPaymentContract = useFetcher(
    RecurringPaymentContractResource.cancelShape()
  );
  const [loading, setLoading] = useState(false);
  const cancelRecurringPayments = useCallback(async () => {
    setLoading(true);
    await cancelRecurringPaymentContract(recurringContract);
    invalidate(payment);
    hideCancelFuturePaymentsConfirmation();
    setLoading(false);
  }, [
    cancelRecurringPaymentContract,
    hideCancelFuturePaymentsConfirmation,
    invalidate,
    payment,
    recurringContract,
  ]);

  const [selectedCard, setSelectedCard] = useState({});
  const updateCard = useCallback((newSelectedCard) => {
    setSelectedCard((prevSelectedCard) => {
      if (newSelectedCard.value === prevSelectedCard.value) {
        return prevSelectedCard;
      }

      return newSelectedCard;
    });
  }, []);
  const options = useMemo(() => {
    const cardOptions = cards.map((card) => ({
      value: card.id,
      title: `Credit card ending in ${card.last4}`,
      onClick() {
        updateCard(this);
      },
    }));

    cardOptions.push({
      value: 0,
      title: (
        <Link
          to={{
            pathname: '/user/payment-methods',
            state: {from: match.url},
          }}
        >
          Add a new payment method
        </Link>
      ),
    });

    return cardOptions;
  }, [cards, match, updateCard]);

  const dismiss = useCallback(() => {
    history.push(history.location.search.split('?from=')[1]);
  }, [history]);

  useEffect(() => {
    const currentPaymentOption = options.find(
      (option) => option.value === recurringContract?.stripe_source
    );
    updateCard(currentPaymentOption || options[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, recurringContract]);

  const updateRecurringContractCard = useFetcher(
    RecurringPaymentContractResource.updateCardShape()
  );
  const changePaymentMethod = useCallback(async () => {
    await updateRecurringContractCard(recurringContract, selectedCard);
    dismiss();
  }, [dismiss, recurringContract, selectedCard, updateRecurringContractCard]);

  return (
    <Modal
      size="SMALL"
      flexibleHeight
      onDismiss={dismiss}
      className="dark-grey overflow-y-visible pa4"
    >
      <header className="relative">
        <MdClose
          className="fr pointer flex"
          size={20.58}
          style={{marginRight: '-4.29px', marginTop: '-4.29px'}}
          onClick={dismiss}
        />
        <h1 className="avenir-roman text-16 mb2">
          {recurringContract?.tab_item.name}
        </h1>
      </header>
      <main>
        <div className="avenir-light text-14">
          Amount: {currency(recurringContract?.metadata.amount_pennies / 100)}
        </div>
        <div className="avenir-light text-14">
          Repeating Every: {repeatingEvery}
        </div>
        <div className="avenir-light text-14">
          Starting: {recurringLabels.start}
        </div>
        <div className="avenir-light text-14">
          Ending: {recurringLabels.end}
        </div>
        <div className="avenir-light text-14">
          Next Payment:{' '}
          {hasNextPayment
            ? DateHelpers.format(nextInvoiceDueDate) || recurringLabelNext
            : upperFirst(recurringContract?.status)}
        </div>
        {hasNextPayment ? (
          <div
            className="tint pointer avenir-light text-14"
            onClick={showCancelFuturePaymentsConfirmation}
          >
            Cancel future payments
          </div>
        ) : (
          ''
        )}
        {cards.length > 0 && (
          <>
            <div style={dropdownContainerStyle}>
              <DropdownSelect
                className="dn db-ns bg-white ba b--gray-300"
                backgroundColor="white"
                title={selectedCard.title}
                options={options}
                width={235}
                dropdownProps={dropdownProps}
                style={dropdownStyle}
              />
            </div>
            <div className="flex">
              <CommonButton
                type="submit"
                className="pt-14 bg-tint white"
                style={buttonStyle}
                status={loading && 'pending'}
                onClick={changePaymentMethod}
              >
                Save
              </CommonButton>
              <CommonButton
                className="pt-14 bg-gray-250 dark-gray"
                type="button"
                onClick={dismiss}
              >
                Cancel
              </CommonButton>
            </div>
          </>
        )}
        {cancelFuturePaymentsConfirmationVisible && (
          <VerificationPrompt
            flexibleHeight
            title="Are you sure?"
            description={`You’re about to cancel all future payments for <strong class="avenir-heavy">${recurringContract?.tab_item.name}</strong>`}
            okButtonLabel="Yes, Cancel Payments"
            onOkButtonClick={cancelRecurringPayments}
            okButtonDisabled={loading}
            cancelButtonLabel="No, Don't Cancel"
            onCancelButtonClick={hideCancelFuturePaymentsConfirmation}
            cancelButtonDisabled={loading}
            onDismiss={hideCancelFuturePaymentsConfirmation}
          />
        )}
      </main>
    </Modal>
  );
};

const EnhancedInvoiceDetails = React.memo(InvoiceDetails);

export default EnhancedInvoiceDetails;
