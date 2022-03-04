import {StyleSheet, Text, View} from '@react-pdf/renderer';
import React from 'react';

import {colors} from 'theme/constants';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: colors.gray,
  },
  cell: {
    flex: 1,
  },
  text: {
    fontFamily: 'AvenirLTStd-Roman',
    fontSize: 10,
    color: colors.black,
  },
  items: {
    flex: 2,
  },
});

const PaymentItemTableHeader = () => (
  <View style={styles.container}>
    <Text style={[styles.cell, styles.text, styles.items]}>Item(s)</Text>
    <Text style={[styles.cell, styles.text]}>Quantity</Text>
    <Text style={[styles.cell, styles.text]}>Price</Text>
    <Text style={[styles.cell, styles.text]}>Subtotal</Text>
    <View style={styles.cell} />
  </View>
);

const EnhancedPaymentItemTableHeader = React.memo(PaymentItemTableHeader);

export default EnhancedPaymentItemTableHeader;
