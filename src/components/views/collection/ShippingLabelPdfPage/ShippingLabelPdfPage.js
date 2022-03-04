import {
  Document,
  Image,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import {compose} from 'recompose';
import {useSelector} from 'react-redux';
import React from 'react';

import {GET_PAYMENT_SHIPMENT} from 'redux/modules/payments/constants';
import {asyncConnect, withCorsAnywhere} from 'helpers';
import {getPaymentShipment} from 'redux/modules/payments/actions';
import LogoIcon from 'theme/images/logo-icon.png';
import config from 'config';

const styles = StyleSheet.create({
  document: {
    width: '100vw',
    height: '100vh',
  },
  page: {
    position: 'relative',
    paddingHorizontal: 40,
    paddingVertical: 80,
  },
  labelContainer: {
    width: 310,
    height: 465,
    marginLeft: 103,
    marginRight: 103,
    marginTop: -92,
    transform: 'rotate(90deg)',
  },
  labelImage: {
    width: 280,
    height: 420,
  },
  logoImageWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    marginRight: 30,
  },
  logoImage: {
    width: 100,
  },
  cutLineContainer: {
    position: 'absolute',
    top: '50vh',
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'row',
  },
  cutLineSeparator: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#000000',
    borderTopStyle: 'dotted',
  },
  cutLineText: {
    marginHorizontal: 8,
    fontSize: 9,
  },
});

const ShippingLabelPdfPage = () => {
  const labelUrl = useSelector(state =>
    state.payments.shipment ? state.payments.shipment.label.url : null
  );

  return (
    labelUrl && (
      <PDFViewer style={styles.document}>
        <Document shallow title="Shipping label">
          <Page wrap={false} size="A4" style={styles.page}>
            <View style={styles.labelContainer}>
              <Image
                style={styles.labelImage}
                src={withCorsAnywhere(labelUrl)}
              />
              <View style={styles.logoImageWrapper}>
                <Image
                  style={styles.logoImage}
                  src={config.isCheddarUp ? LogoIcon : config.icons.logo}
                />
              </View>
            </View>
            <View style={styles.cutLineContainer}>
              <View style={styles.cutLineSeparator} />
              <Text style={styles.cutLineText}>Cut Along Line</Text>
              <View style={styles.cutLineSeparator} />
            </View>
          </Page>
        </Document>
      </PDFViewer>
    )
  );
};

const enhance = compose(
  asyncConnect(props => [
    {
      key: GET_PAYMENT_SHIPMENT,
      promise: getPaymentShipment,
      payload: {
        collection: props.match.params.collection,
        payment: props.match.params.payment,
      },
    },
  ]),
  React.memo
);

const EnhancedShippingLabelPdfPage = enhance(ShippingLabelPdfPage);

export default EnhancedShippingLabelPdfPage;
