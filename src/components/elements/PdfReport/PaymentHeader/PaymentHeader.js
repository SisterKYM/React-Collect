import {Image, StyleSheet, Text, View} from '@react-pdf/renderer';
import React from 'react';

import {colors} from 'theme/constants';

import ShippingInfoBox from './ShippingInfoBox';

const styles = StyleSheet.create({
  collectionName: {
    paddingHorizontal: 8,
    paddingBottom: 8,
    fontFamily: 'AvenirLTStd-Roman',
    fontSize: 14,
    color: colors.black,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  summaryContainer: {
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  payerOverviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabMemberImage: {
    width: 32,
    height: 32,
    marginRight: 16,
  },
  contactInfoContainer: {
    marginTop: 8,
    lineHeight: 1.2,
  },
  tabMemberName: {
    fontFamily: 'AvenirLTStd-Medium',
    fontSize: 12,
    color: colors.black,
  },
  note: {
    marginTop: 16,
    fontFamily: 'AvenirLTStd-Light-Oblique',
    fontSize: 11,
    color: colors.darkerGray,
  },
  tabMemberEmail: {
    marginBottom: 2,
    fontFamily: 'AvenirLTStd-Roman',
    fontSize: 12,
    color: colors.black,
  },
});

const PaymentHeader = ({collectionName, tabMember, shippingInfo, note}) => (
  <View>
    <Text style={styles.collectionName}>{collectionName}</Text>
    <View style={styles.summaryContainer}>
      <View style={styles.payerOverviewContainer}>
        <Image
          style={styles.tabMemberImage}
          src={`${window.location.origin}/images/Profile.jpg`}
        />
        <View>
          <View style={styles.contactInfoContainer}>
            <Text style={styles.tabMemberName}>{tabMember.name}</Text>
            <Text style={styles.tabMemberEmail}>{tabMember.email}</Text>
          </View>
          {Boolean(note) && <Text style={styles.note}>{note}</Text>}
        </View>
      </View>
      {shippingInfo &&
        shippingInfo.currentOptions &&
        shippingInfo.currentOptions.shipToEnabled && (
          <ShippingInfoBox shippingInfo={shippingInfo} />
        )}
    </View>
  </View>
);

export default PaymentHeader;
