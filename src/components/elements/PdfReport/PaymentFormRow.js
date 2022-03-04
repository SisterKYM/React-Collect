import {StyleSheet, Text, View} from '@react-pdf/renderer';
import React from 'react';

import {colors} from 'theme/constants';

import PaymentObjectFieldViewRow from './PaymentObjectFieldViewRow';

const styles = StyleSheet.create({
  name: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    fontFamily: 'AvenirLTStd-Roman',
    fontSize: 10,
    color: colors.black,
    backgroundColor: colors.gray,
  },
});

const PaymentFormRow = ({paymentForm}) => (
  <>
    <View style={styles.nameWrapper}>
      <Text style={styles.name}>{paymentForm.tab_form.name}</Text>
    </View>
    {paymentForm.item_field_views.map(formFieldView => (
      <PaymentObjectFieldViewRow
        key={formFieldView.id}
        fieldView={formFieldView}
      />
    ))}
  </>
);

const EnhancedPaymentFormRow = React.memo(PaymentFormRow);

export default EnhancedPaymentFormRow;
