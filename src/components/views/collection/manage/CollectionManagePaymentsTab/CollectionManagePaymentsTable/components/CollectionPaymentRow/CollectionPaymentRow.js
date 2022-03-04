import React, {useCallback, useState, useMemo, useEffect} from 'react';
import {Link, useRouteMatch} from 'react-router-dom';
import {IoMdSync} from 'react-icons/io';
import moment from 'moment';

import {Checkbox, NoteEditor, PaymentStatus} from 'elements';
import {currency} from 'helpers/numbers';
import {PAYMENT_METHOD_LABELS} from 'views/collection/constants';
import {ReactComponent as DefaultAvatarIcon} from 'theme/images/DefaultAvatar.svg';
import config from 'config';
import DateHelpers from 'helpers/DateHelpers';
import useMedia from 'hooks/useMedia';

import PaymentActionsDropdown from './PaymentActionsDropdown';
import ScheduledInvoice from './ScheduledInvoice';

const CollectionPaymentRow = ({
  onStatusChange,
  payment,
  onAddNote,
  onClickPrintShippingLabel,
  onClickShippingSummary,
  browser,
  updatePaymentStatus,
  userBasic,
  onClickPaymentSummary,
  onClickRefunds,
  onClickPrintOrder,
}) => {
  const media = useMedia();

  const handlePaymentStatusChange = useCallback(() => {
    onStatusChange({
      payment: payment.id,
      status: payment.status === 'available' ? 'pending' : 'approved',
    });
  }, [onStatusChange, payment.id, payment.status]);

  const handleSubmitNote = useCallback(
    (payload) => {
      onAddNote({
        note: payload.note,
        payment: payment.id,
      });
    },
    [onAddNote, payment.id]
  );

  const handleClickPrintShippingLabel = useCallback(() => {
    onClickPrintShippingLabel(payment);
  }, [onClickPrintShippingLabel, payment]);

  const handleClickShippingSummary = useCallback(() => {
    onClickShippingSummary(payment);
  }, [onClickShippingSummary, payment]);

  const method = PAYMENT_METHOD_LABELS[payment.payment_method];

  const recurringInvoice = useMemo(() => payment.recurring_payment_invoice, [
    payment.recurring_payment_invoice,
  ]);

  const recurringData = useMemo(
    () =>
      recurringInvoice
        ? {
            method,
            dueDate: DateHelpers.format(recurringInvoice.metadata.due_date),
            status: recurringInvoice.status,
          }
        : null,
    [method, recurringInvoice]
  );

  const scheduledInvoices = useMemo(() => payment.scheduled_invoices || [], [
    payment.scheduled_invoices,
  ]);

  const shippingSummaryVisible = userBasic && payment.shipment?.purchased;

  const profileImage = payment.tab_member?.profile_pic?.url;

  const [paymentReceived, setPaymentReceived] = useState(
    payment.status === 'available'
  );

  useEffect(() => {
    if (payment.status === 'available') {
      setPaymentReceived(true);
    }
  }, [payment.status]);

  const onReceiveCashOrCheckPayment = useCallback(() => {
    setPaymentReceived(!paymentReceived);
    handlePaymentStatusChange();
  }, [handlePaymentStatusChange, paymentReceived]);

  const match = useRouteMatch();

  return (
    <div className="collection-payment-row-container relative-ns pv3 pl5-ns bb b--gray-300 ph3">
      {profileImage ? (
        <div
          className="dn db-ns profile-icon profile-image absolute left-1 br-100 cover bg-center pointer"
          onClick={onClickPaymentSummary}
        />
      ) : (
        <DefaultAvatarIcon
          className="dn db-ns profile-icon absolute left-1 br-100 pointer"
          onClick={onClickPaymentSummary}
        />
      )}
      <div className="flex items-start">
        <div className="w-40 w-30-ns lh-copy ml2">
          <h4
            className="f6 f5-ns avenir-roman pointer truncate"
            onClick={onClickPaymentSummary}
          >
            {payment.tab_member.name}
          </h4>
          {!recurringData && scheduledInvoices.length === 0 ? (
            <div className="f9-s f6-ns avenir-light">
              {moment(payment.created_at).format('M/D/YYYY')}
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="w-40 cf">
          <div className="fl w-50 w-40-ns tl f6 f5-ns lh-copy avenir-roman black">
            {payment.subtotal !== 0 ? (
              <>
                <span>{currency(payment.total || 0)}</span>
                {((!recurringData && scheduledInvoices.length === 0) ||
                  scheduledInvoices.length !== 0) && (
                  <div
                    key="i-don't-know-why-it-asks-for-key-here"
                    className="f9-s f6-ns avenir-light gray-500"
                  >
                    {method}
                  </div>
                )}
              </>
            ) : scheduledInvoices.length === 0 && payment.subtotal === 0 ? (
              <>No Payment</>
            ) : (
              ''
            )}
          </div>
          <div className="fl w-50 lh-copy">
            {payment.payment_method === 'cash' ? (
              <>
                <div className="checkbox-align-block" />
                <div className="ml3">
                  <Checkbox
                    small
                    name="received"
                    label="Received"
                    checked={paymentReceived}
                    onChange={onReceiveCashOrCheckPayment}
                  />
                </div>
              </>
            ) : payment.subtotal !== 0 && scheduledInvoices.length === 0 ? (
              <PaymentStatus className="ml3" payment={payment} />
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="flex w-30 items-start justify-end">
          {media.notSmall && (
            <div className="dn flex-ns items-start justify-end">
              <div className="mr3 f6" style={{maxWidth: 'calc(100% - 46px)'}}>
                {payment.note}
              </div>
              <NoteEditor
                form={`views/collection/manage/Payment-${payment.id}`}
                initialValues={payment}
                onSubmit={handleSubmitNote}
                status={updatePaymentStatus}
                tooltip="Add note"
              />
            </div>
          )}
          <PaymentActionsDropdown
            className="ml3-ns"
            refundsVisible={payment.payment_method !== 'cash'}
            printShippingLabelVisible={
              !shippingSummaryVisible &&
              !userBasic &&
              payment.shipping_info &&
              payment.shipping_info.charge !== null
            }
            shippingSummaryVisible={shippingSummaryVisible}
            payerEmail={
              payment.tab_member.email &&
              !payment.tab_member.email.includes('@cheddarup.com')
                ? payment.tab_member.email
                : null
            }
            onClickPaymentSummary={onClickPaymentSummary}
            onClickRefunds={onClickRefunds}
            onClickPrintOrder={onClickPrintOrder}
            onClickPrintShippingLabel={handleClickPrintShippingLabel}
            onClickShippingSummary={handleClickShippingSummary}
          />
        </div>
      </div>
      <div className="avenir-light gray-500">
        {recurringData && (
          <ScheduledInvoice
            browser={browser}
            dateStart={recurringData.dueDate}
            method={recurringData.method}
          />
        )}
        {scheduledInvoices.length !== 0 &&
          scheduledInvoices.map((scheduledInvoice, idx) => (
            <ScheduledInvoice
              isFuture
              key={idx}
              browser={browser}
              dateStart={DateHelpers.format(scheduledInvoice.start_date)}
              status={scheduledInvoice.status}
            />
          ))}
      </div>
      {recurringData && (
        <div className="avenir-light text-14 ml2">
          <div className="relative mt2 ml3">
            <IoMdSync
              className="absolute"
              style={{top: '0.125rem', left: '-1rem'}}
              size="0.875rem"
            />
            <Link
              className="tint pointer"
              to={`/collection/${match.params.owner}/${match.params.collection}/manage/payments/${payment.id}/recurring?from=${match.url}`}
            >
              View terms
            </Link>
          </div>
        </div>
      )}
      <style jsx>{`
        :global(.profile-icon) {
          width: 40px;
          height: 40px;
        }
        .profile-image {
          background-image: url('${profileImage}');
        }
        .checkbox-align-block {
          height: 21px;
        }
        .collection-payment-row-container * {
          color: #373737;
        }
        .collection-payment-row-container :global(#default-avatar-icon) {
          fill: ${config.siteName === 'PIXIE_LANE'
            ? config.colors.tint
            : config.colors.lightTint} !important;
          stroke: ${config.colors.lightTint} !important;
        }
      `}</style>
    </div>
  );
};

export default React.memo(CollectionPaymentRow);
