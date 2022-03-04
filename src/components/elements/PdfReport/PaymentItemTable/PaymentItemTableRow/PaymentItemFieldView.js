import {Image, StyleSheet, Text, View} from '@react-pdf/renderer';
import React from 'react';

import {colors} from 'theme/constants';
import getCollectionFieldValueFormatted from 'helpers/getCollectionFieldValueFormatted';

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: colors.gray,
  },
  label: {
    fontFamily: 'AvenirLTStd-Roman',
    fontSize: 8,
    lineHeight: 1.6,
    color: colors.black,
  },
  value: {
    fontFamily: 'AvenirLTStd-Roman',
    fontSize: 10,
    lineHeight: 1.4,
    color: colors.black,
  },
});

const PaymentItemFieldView = ({itemFieldView}) => {
  const value = React.useMemo(
    () => getCollectionFieldValueFormatted(itemFieldView),
    [itemFieldView]
  );

  return (
    <View style={styles.container} wrap={false}>
      <Text style={styles.label}>{itemFieldView.name}</Text>
      {itemFieldView.field_type === 'signature' ? (
        <Image source={value} />
      ) : (
        <Text style={styles.value}>{value}</Text>
      )}
    </View>
  );
};

const EnhancedPaymentItemFieldView = React.memo(PaymentItemFieldView);

export default EnhancedPaymentItemFieldView;
