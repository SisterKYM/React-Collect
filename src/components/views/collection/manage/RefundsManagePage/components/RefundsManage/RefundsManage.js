import {Field, Form, Formik} from 'formik';
import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import moment from 'moment';
import config from 'config';

import {CommonButton, FormikInput, PayerOverview, RefundsTable} from 'elements';
import {currency} from 'helpers/numbers';

import RefundableItemTable from './RefundableItemTable';

const CENTS_IN_USD = 100;
const MAX_DAYS_COUNT = 90;

const getCents = (amount) => Math.floor(Number(amount) * CENTS_IN_USD);
const getTotalRefundAmount = ({refundableItems, values}) => {
  const refundAmounts = _.map(values.quantities, (quantity, key) => ({
    paymentItemId: key.replace(/^\D+/g, ''),
    quantity: Number(quantity),
  })).map(({paymentItemId, quantity}) => {
    const refundableItem = refundableItems.find(
      ({payment_item_id}) => String(payment_item_id) === paymentItemId
    );

    return quantity * refundableItem.perItemNet;
  });
  const taxAmounts = values.taxes.map((x) => getCents(x));

  return (
    _.sum(refundAmounts) +
    _.sum(taxAmounts) +
    getCents(Number(values.additionalRefund) + Number(values.shipping))
  );
};

const renderRefundInput = ({field, form}) => (
  <FormikInput
    border
    small
    style={{textAlign: 'right', width: '128px'}}
    borderRadius
    placeholder="$0.00"
    field={field}
    form={form}
  />
);

const RefundsManage = ({
  totalRefundable,
  refundableData,
  selectedRefundId,
  payment,
  onViewRefund,
  onRefund,
}) => {
  const oldToRefund =
    payment.payment_method === 'echeck' &&
    moment().diff(moment(payment.created_at), 'days') > MAX_DAYS_COUNT;
  const refundable = payment.can_refund && !oldToRefund && totalRefundable > 0;
  const initialValues = React.useMemo(
    () => ({
      quantities: _.fromPairs(
        refundableData.items.map((refundableItem) => [
          `quantity-${refundableItem.payment_item_id}`,
          0,
        ])
      ),
      shipping: '',
      additionalRefund: '',
      taxes: refundableData.taxes.map(() => ''),
    }),
    [refundableData]
  );

  const handleSubmit = React.useCallback(
    (values) => {
      const items = refundableData.items
        .filter(
          ({payment_item_id}) =>
            Number(values.quantities[payment_item_id]) !== 0
        )
        .map((refundableItem) => {
          const quantity = Number(
            values.quantities[`quantity-${refundableItem.payment_item_id}`]
          );

          return {
            quantity,
            payment_item_id: refundableItem.payment_item_id,
            name: refundableItem.name,
            amount: quantity * refundableItem.perItemNet,
          };
        });
      const taxes = values.taxes
        .filter((tax) => tax > 0)
        .map((tax, idx) => ({
          name: refundableData.taxes[idx].name,
          amount: getCents(tax),
        }));
      const shipping = getCents(values.shipping);
      const additional = getCents(values.additionalRefund);
      const total = getTotalRefundAmount({
        values,
        refundableItems: refundableData.items,
      });

      onRefund({
        items,
        taxes,
        shipping,
        additional,
        total,
      });
    },
    [refundableData, onRefund]
  );

  return (
    <>
      <PayerOverview
        className="ph2 pb4 bb b--gray-300"
        tabMember={payment.tab_member}
      />
      <div className="pv3 text-14 line-20 avenir-light">
        {refundable || payment.refunds.length !== 0 ? (
          <>
            <p>
              You can refund all or part of your buyer&apos;s payments. When you
              refund a payment made in the past 30 days, any fees that may have
              been incurred will also be refunded. Payers will see their refund
              processed within 5-10 business days and will receive an e-mail
              from {config.strings.name} letting them know that a refund has
              been issued.
            </p>
            <br />
            <p>
              To issue a refund, select the refund quantity for each item. If
              your item has a limited quantity available, it will be updated
              (relisted) according to this selection.
            </p>
          </>
        ) : (
          <p>
            {(() => {
              if (oldToRefund) {
                return 'e-Check Payments cannot be refunded more than 90 days from the payment date.';
              }

              if (!refundable) {
                return 'This payment cannot be refunded.';
              }

              return totalRefundable > 0
                ? 'You can refund all or part of a payment once it has cleared.'
                : `You have no available balance on this ${config.strings.collection} to issue a refund.`;
            })()}
          </p>
        )}
      </div>
      {payment.refunds.length !== 0 && (
        <RefundsTable
          className="mb4"
          refunds={payment.refunds}
          selectedRefundId={selectedRefundId}
          onViewRefund={onViewRefund}
        />
      )}
      {(refundable || payment.refunds.length !== 0) && (
        <>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({values}) => {
              const totalRefundAmount = getTotalRefundAmount({
                values,
                refundableItems: refundableData.items,
              });

              const lessThanZero = totalRefundAmount <= 0;
              const greaterThanTotalRefundable =
                totalRefundAmount > totalRefundable;
              const readyToRefund =
                !lessThanZero && !greaterThanTotalRefundable;

              return (
                <Form>
                  <div className="overflow-x-scroll">
                    <RefundableItemTable
                      selectedQuantities={values.quantities}
                      refundableItems={refundableData.items.filter(
                        ({refundableQuantity}) => refundableQuantity !== 0
                      )}
                    />
                  </div>
                  {refundable && (
                    <div className="flex mt3 justify-end items-center f6">
                      <div className="mr2 f7 avenir-roman">
                        Additional Refund
                      </div>
                      <Field className="br2" name="additionalRefund">
                        {renderRefundInput}
                      </Field>
                    </div>
                  )}
                  {Boolean(refundableData.shipping) && (
                    <div className="flex mt3 justify-end items-center f6">
                      <div className="mr2 f7 avenir-roman">
                        Shipping (
                        {currency(refundableData.shipping, {cents: true})})
                      </div>
                      <Field className="br2" name="shipping">
                        {renderRefundInput}
                      </Field>
                    </div>
                  )}
                  {refundableData.taxes.length !== 0 &&
                    refundableData.taxes.map((tax, idx) => (
                      <div
                        key={idx}
                        className="flex mt3 justify-end items-center f6"
                      >
                        <div className="mr2 f7">
                          {tax.name} ({currency(tax.amount, {cents: true})})
                        </div>
                        <Field name={`taxes.${idx}`}>{renderRefundInput}</Field>
                      </div>
                    ))}
                  <div className="flex mt3 justify-end">
                    <CommonButton
                      className={cx(
                        'pt-14',
                        readyToRefund ? 'bg-tint white' : 'bg-moon-gray'
                      )}
                      type="submit"
                      disabled={!readyToRefund}
                    >
                      Refund{' '}
                      {readyToRefund &&
                        currency(totalRefundAmount, {
                          cents: true,
                        })}
                    </CommonButton>
                  </div>
                  <div className="flex mt3 justify-end">
                    {greaterThanTotalRefundable && (
                      <div className="w-30 tr f6 brand">
                        Your total refund amount should be equal to or less than
                        your available ${config.strings.collection} balance of{' '}
                        {currency(totalRefundable, {
                          cents: true,
                        })}
                      </div>
                    )}
                  </div>
                </Form>
              );
            }}
          </Formik>
        </>
      )}
    </>
  );
};

const EnhancedRefundsManage = React.memo(RefundsManage);

export default EnhancedRefundsManage;
