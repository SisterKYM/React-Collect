import {Document, Page, PDFViewer, StyleSheet} from '@react-pdf/renderer';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {get} from 'lodash';
import React from 'react';

import {GET_PAYMENT_TO_OTHERS} from 'redux/modules/session/constants';
import {PdfReport, Status} from 'elements';
import {asyncConnect} from 'helpers';
import {getPaymentToOthers} from 'redux/modules/session/actions';
import initReactPdfResources from 'helpers/initReactPdfResources';

initReactPdfResources();

const styles = StyleSheet.create({
  documentLoaded: {
    width: '100vw',
    height: '100vh',
  },
  loadingIndicatorContainer: {
    width: '100vw',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  page: {
    paddingHorizontal: 40,
    paddingVertical: 80,
  },
});

const PaymentItemReportPage = ({
  collectionName,
  paymentCreatedAt,
  tabMember,
  paymentItem,
}) =>
  paymentItem ? (
    <PDFViewer key={paymentItem.id} style={styles.documentLoaded}>
      <Document title="Payment Item">
        <Page style={styles.page}>
          <PdfReport.PaymentItem
            paymentCreatedAt={paymentCreatedAt}
            collectionName={collectionName}
            paymentItem={paymentItem}
            tabMember={tabMember}
          />
        </Page>
      </Document>
    </PDFViewer>
  ) : (
    <div className="flex flex-column vh-100 justify-center items-center">
      <Status status="pending" />
    </div>
  );

const enhance = compose(
  asyncConnect(props => [
    {
      key: GET_PAYMENT_TO_OTHERS,
      promise: getPaymentToOthers,
      payload: {
        paymentToOtherId: props.match.params.payment,
      },
    },
  ]),
  connect((state, props) => ({
    payment: state.session.paymentToOthers,
    collectionName:
      (state.session.paymentToOthers &&
        state.session.paymentToOthers.tab.name) ||
      '',
    paymentCreatedAt: get(state.session, 'paymentToOthers.created_at'),
    tabMember: get(state.session, 'paymentToOthers.tab_member'),
    paymentItem: get(state.session, 'paymentToOthers.payment_items', []).find(
      paymentItem => String(paymentItem.id) === props.match.params.paymentItem
    ),
  }))
);

const EnhancedPaymentItemReportPage = enhance(PaymentItemReportPage);

export default EnhancedPaymentItemReportPage;
