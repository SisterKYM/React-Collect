import {StyleSheet, Text, View} from '@react-pdf/renderer';
import React from 'react';
import _ from 'lodash';
import moment from 'moment';

import {PAYMENT_METHOD_LABELS} from 'views/collection/constants';
import {colors} from 'theme/constants';
import {currency} from 'helpers/numbers';

const textStyle = {
  fontFamily: 'AvenirLTStd-Roman',
  fontSize: 11,
  lineHeight: 1.2,
  color: colors.darkerGray,
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  paymentOverviewContainer: {
    marginBottom: 16,
  },
  fieldSection: {
    paddingVertical: 8,
  },
  field: {
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: colors.gray,
  },
  fieldLabel: {
    width: '60%',
    ...textStyle,
  },
  fieldValue: {
    width: '40%',
    textAlign: 'right',
    ...textStyle,
  },
});

const PaymentInvoice = ({payment}) => {
  const shipped =
    _.get(payment.shipping_info, 'shippingMethod') === 'toMe' &&
    Boolean(_.get(payment.shipping_info, 'shipTo.name'));
  const hasAdditionalPayments =
    shipped ||
    Boolean(payment.total_discounts) ||
    Boolean(payment.total_taxes) ||
    (payment.subtotal !== 0 && Boolean(payment.total_refund));

  return (
    <View style={styles.container}>
      <View style={styles.paymentOverviewContainer}>
        <Text style={styles.fieldLabel}>
          Date: {moment(payment.created_at).format('M/D/YYYY')}
        </Text>
        <Text style={styles.fieldLabel}>
          Payment Method: {PAYMENT_METHOD_LABELS[payment.payment_method]} (
          {_.lowerCase(payment.status)})
        </Text>
      </View>
      <View style={styles.fieldSection}>
        {(shipped ||
          Boolean(payment.total_discounts) ||
          Boolean(payment.total_taxes)) && (
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Subtotal: </Text>
            <Text style={styles.fieldValue}>
              {currency(payment.items_total)}
            </Text>
          </View>
        )}
        {Boolean(payment.total_discounts) && (
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>
              Discounts: ({Object.keys(payment.discounts).join(',')}){' '}
            </Text>
            <Text style={styles.fieldValue}>
              -{currency(payment.total_discounts)}
            </Text>
          </View>
        )}
        {Boolean(payment.total_taxes) && (
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Tax: </Text>
            <Text style={styles.fieldValue}>
              {currency(payment.total_taxes)}
            </Text>
          </View>
        )}
        {shipped && (
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Shipping: </Text>
            <Text style={styles.fieldValue}>
              {currency(payment.shipping_charge)}
            </Text>
          </View>
        )}
        {Boolean(payment.total_refund) && (
          <>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Total Refunds: </Text>
              <Text style={styles.fieldValue}>
                -{currency(payment.total_refund)}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Net Payment: </Text>
              <Text style={styles.fieldValue}>{currency(payment.total)}</Text>
            </View>
          </>
        )}
      </View>
      {payment.subtotal !== 0 && Boolean(payment.total_refund) && (
        <View style={styles.fieldSection}>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Gross Amount:</Text>
            <Text style={styles.fieldValue}>
              {currency(payment.subtotal + payment.total_taxes)}
            </Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Total Refunds:</Text>
            <Text style={styles.fieldValue}>
              -{currency(payment.total_refund)}
            </Text>
          </View>
        </View>
      )}
      <View style={[styles.fieldSection, styles.field, styles.borderTop]}>
        <Text style={styles.fieldLabel}>
          {hasAdditionalPayments ? 'Net Payment:' : 'Payment:'}
        </Text>
        <Text style={styles.fieldValue}>{currency(payment.total)}</Text>
      </View>
    </View>
  );
};

export default PaymentInvoice;
