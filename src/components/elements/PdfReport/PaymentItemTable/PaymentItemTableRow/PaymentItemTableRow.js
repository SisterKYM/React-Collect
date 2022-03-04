import {Image, StyleSheet, Text, View} from '@react-pdf/renderer';
import React, {Fragment} from 'react';
import _ from 'lodash';

import {colors} from 'theme/constants';
import {currency} from 'helpers/numbers';
import config from 'config';
import ImagesUtils from 'helpers/ImagesUtils';

import PaymentItemFieldView from './PaymentItemFieldView';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  variant: {
    paddingHorizontal: 8,
  },
  mainRowContainer: {
    maxHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flex: 1,
  },
  nameColumn: {
    flex: 2,
  },
  text: {
    fontFamily: 'AvenirLTStd-Roman',
    fontSize: 10,
    lineHeight: 1.4,
    color: colors.black,
  },
  items: {
    fontFamily: 'AvenirLTStd-Medium',
  },
  refundText: {
    fontFamily: 'AvenirLTStd-Roman',
    fontSize: 10,
    color: config.colors.tint,
  },
  imageColumn: {
    height: 55,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    maxWidth: '100%',
    height: '100%',
  },
  label: {
    fontFamily: 'AvenirLTStd-Roman',
    fontSize: 8,
    lineHeight: 1.6,
    color: colors.black,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.gray,
  },
  value: {
    fontFamily: 'AvenirLTStd-Roman',
    fontSize: 10,
    lineHeight: 1.4,
    color: colors.black,
  },
});

const PaymentItemTableRow = ({paymentItem, refunds}) => {
  const refunded = refunds.length !== 0;

  return (
    <View style={styles.container}>
      <View style={styles.mainRowContainer}>
        <View style={styles.nameColumn}>
          <Text style={[styles.text, styles.items]}>
            {paymentItem.tab_item.name}
          </Text>
          {refunded && <Text style={styles.refundText}>Refunded</Text>}
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>{paymentItem.quantity}</Text>
          {refunded && (
            <Text style={styles.refundText}>
              -
              {_.sum(
                _.flatMap(
                  refunds.map(({detail}) =>
                    detail.items
                      .filter((item) => item.payment_item_id === paymentItem.id)
                      .map(({quantity}) => quantity)
                  )
                )
              )}
            </Text>
          )}
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>{currency(paymentItem.amount)}</Text>
        </View>
        <View style={styles.column}>
          <View>
            <Text style={styles.text}>{currency(paymentItem.total)}</Text>
            {refunded && (
              <Text style={styles.refundText}>
                -
                {currency(paymentItem.refund_data.total_refunded_cents, {
                  cents: true,
                })}
              </Text>
            )}
          </View>
        </View>
        <View style={[styles.column, styles.imageColumn]}>
          {paymentItem.tab_item.images &&
            paymentItem.tab_item.images.length !== 0 && (
              <Image
                style={styles.image}
                src={ImagesUtils.getItemMainThumbnailUrl(
                  paymentItem.tab_item.images,
                  {
                    width: 200,
                    height: 200,
                  }
                )}
              />
            )}
        </View>
      </View>
      {paymentItem.detail.variant &&
        paymentItem.detail.variant.optionValues.length !== 0 && (
          <View style={styles.variant} wrap={false}>
            <>
              {paymentItem.detail.variant?.sku && (
                <Fragment key={`sku-${paymentItem.detail.variant.sku}`}>
                  <Text style={styles.label}>SKU</Text>
                  <Text style={styles.value}>
                    {paymentItem.detail.variant.sku}
                  </Text>
                </Fragment>
              )}
              {Object.entries(paymentItem.detail.variant.optionValues).map(
                (variant) => (
                  <Fragment key={variant[0]}>
                    <Text style={styles.label}>{variant[0]}</Text>
                    <Text style={styles.value}>{variant[1]}</Text>
                  </Fragment>
                )
              )}
            </>
          </View>
        )}
      {paymentItem.item_field_views.length !== 0 && (
        <View>
          {paymentItem.item_field_views.map((itemFieldView) => (
            <PaymentItemFieldView
              key={itemFieldView.id}
              itemFieldView={itemFieldView}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const EnhancedPaymentItemTableRow = React.memo(PaymentItemTableRow);

export default EnhancedPaymentItemTableRow;
