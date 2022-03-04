import React, {useCallback, useState} from 'react';
import {IoMdSync} from 'react-icons/io';
import {useDispatch} from 'react-redux';
import {Link, useRouteMatch} from 'react-router-dom';
import {useFetcher} from 'rest-hooks';

import {currency} from 'helpers/numbers';
import DateHelpers from 'helpers/DateHelpers';
import {PAYMENT_METHOD_LABELS} from 'views/collection/constants';
import RecurringPaymentInvoiceResource from 'resources/RecurringPaymentInvoiceResource';
import {successAlert} from 'redux/modules/growl/actions';

import {PaymentActionsDropdown} from './components';

const PaymentListItem = ({payment}) => {
  const match = useRouteMatch();

  const retryScheduledPayment = useFetcher(
    RecurringPaymentInvoiceResource.retryShape()
  );
  const [retriedInvoice, setRetriedInvoice] = useState(null);

  const dispatch = useDispatch();

  const retryPayment = useCallback(async () => {
    const invoice = await retryScheduledPayment(
      {
        invoiceId: payment.recurring_payment_invoice.id,
      },
      {}
    );
    dispatch(
      successAlert({
        title: "We've scheduled your payment!",
        body: 'Please allow 30 minutes to process.',
      })
    );
    setRetriedInvoice(invoice);
  }, [dispatch, payment, retryScheduledPayment]);

  return (
    <li className="payment-row payment-list-item flex">
      <div className="info flex-auto avenir-roman dark-grey pr3">
        <div>{payment.tab.name}</div>
        <div className="avenir-light text-14">
          <a
            href={`mailto:${payment.tab.user.email}?subject=${payment.tab.name}`}
          >
            {payment.tab.user.name}
          </a>
        </div>
        {payment.scheduled_invoices?.length > 0
          ? payment.scheduled_invoices.map((scheduledInvoice, idx) => (
              <div className="avenir-light text-14" key={idx}>
                <div className="relative mt2 ml3">
                  <IoMdSync
                    className="absolute"
                    style={{top: '0.125rem', left: '-1rem'}}
                    size="0.875rem"
                  />
                  Scheduled Payment: {scheduledInvoice.item_name}
                </div>
                <Link
                  className="ml3 tint pointer"
                  to={`/collections/payments/${payment.id}/scheduled/${idx}?from=${match.url}`}
                >
                  View terms
                </Link>
              </div>
            ))
          : null}
        {payment.recurring_payment_invoice ? (
          <div className="avenir-light text-14">
            <div className="relative mt2 ml3">
              <IoMdSync
                className="absolute"
                style={{top: '0.125rem', left: '-1rem'}}
                size="0.875rem"
              />
              Payment for{' '}
              {payment.recurring_payment_invoice.recurring_payment_contract
                ? payment.recurring_payment_invoice.recurring_payment_contract
                    .tab_item.name
                : '[Contract does not exist]'}
            </div>
            <Link
              className="ml3 tint pointer"
              to={`/collections/payments/${payment.id}/recurring?from=${match.url}`}
            >
              View terms
            </Link>
          </div>
        ) : null}
      </div>
      <div className="flex items-center">
        <div className="date avenir-light dark-grey">
          {DateHelpers.format(payment.created_at)}
        </div>
        <div className="method avenir-light dark-grey">
          {payment.recurring_payment_invoice &&
          payment.recurring_payment_invoice.status === 'failed' ? (
            <>
              {retriedInvoice?.status === 'scheduled' ? (
                <span>Scheduled</span>
              ) : (
                <span
                  data-payment={payment.id}
                  className="tint pointer"
                  onClick={retryPayment}
                >
                  Failed: Retry Payment
                </span>
              )}
            </>
          ) : (
            PAYMENT_METHOD_LABELS[payment.payment_method]
          )}
        </div>
        <div className="amount avenir-roman dark-grey pr3 tr">
          {currency(
            payment.total + payment.member_fee - payment.member_fee_refund || 0
          )}
        </div>
        <div className="actions">
          <PaymentActionsDropdown
            payment={payment}
            className="payment-action"
          />
        </div>
      </div>
    </li>
  );
};

export default React.memo(PaymentListItem);
