import {StyleSheet, Text, View} from '@react-pdf/renderer';
import {get} from 'lodash';
import React from 'react';

import {colors} from 'theme/constants';

const styles = StyleSheet.create({
  container: {
    minWidth: 240,
  },
  title: {
    marginBottom: 8,
    fontFamily: 'AvenirLTStd-Medium',
    fontSize: 12,
    color: colors.black,
  },
  fieldText: {
    fontFamily: 'AvenirLTStd-Roman',
    fontSize: 11,
    lineHeight: 1.2,
    color: colors.darkerGray,
  },
});

const ShippingInfoBox = ({shippingInfo}) => {
  const shipTo = get(shippingInfo, 'shipTo', {});
  const shipped =
    get(shippingInfo, 'shippingMethod') === 'toMe' &&
    Boolean(get(shipTo, 'name'));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ship to:</Text>
      {shipped ? (
        <>
          <Text style={styles.fieldText}>{shipTo.name}</Text>
          <Text style={styles.fieldText}>{shipTo.address}</Text>
          <Text style={styles.fieldText}>
            {shipTo.city}, {shipTo.state} {shipTo.zip}
          </Text>
          <Text style={styles.fieldText}>
            {shipTo.country === 'CA' ? 'Canada' : 'United States'}
          </Text>
        </>
      ) : (
        <Text style={styles.fieldText}>Local Pickup</Text>
      )}
    </View>
  );
};

export default ShippingInfoBox;
