import {Image, StyleSheet, Text, View} from '@react-pdf/renderer';
import React from 'react';

import {colors} from 'theme/constants';
import getCollectionFieldValueFormatted from 'helpers/getCollectionFieldValueFormatted';

const styles = StyleSheet.create({
  container: {
    padding: 8,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
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
    lineHeight: 1.6,
    color: colors.black,
  },
  signatureImage: {
    height: 80,
  },
});

const PaymentObjectFieldViewRow = ({fieldView}) => {
  const valueIsImage =
    fieldView.field_type === 'signature' || fieldView.field_type === 'image';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{fieldView.name}</Text>
      {valueIsImage ? (
        <Image style={styles.signatureImage} src={fieldView.value} />
      ) : (
        <Text style={styles.value}>
          {getCollectionFieldValueFormatted(fieldView)}
        </Text>
      )}
    </View>
  );
};

export default PaymentObjectFieldViewRow;
