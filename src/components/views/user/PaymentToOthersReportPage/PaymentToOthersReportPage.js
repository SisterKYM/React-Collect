import {Document, Page, PDFViewer, StyleSheet} from '@react-pdf/renderer';
import {useSelector} from 'react-redux';
import React from 'react';

import {GET_PAYMENT_TO_OTHERS} from 'redux/modules/session/constants';
import {PdfReport} from 'elements';
import {asyncConnect} from 'helpers';
import {getPaymentToOthers} from 'redux/modules/session/actions';
import initReactPdfResources from 'helpers/initReactPdfResources';

initReactPdfResources();

const styles = StyleSheet.create({
  document: {
    width: '100vw',
    height: '100vh',
  },
  page: {
    paddingHorizontal: 40,
    paddingVertical: 80,
  },
  paymentItemTable: {
    marginBottom: 24,
  },
});

const renderPaymentForm = (paymentItem) => (
  <PdfReport.PaymentFormRow key={paymentItem.id} paymentForm={paymentItem} />
);

const PaymentToOthersReportPage = () => {
  const payment = useSelector((state) => state.session.paymentToOthers);

  return payment ? (
    <PDFViewer style={styles.document}>
      <Document shallow title={`${payment.tab.name} payment`}>
        <Page wrap size="A4" style={styles.page}>
          <PdfReport.PaymentHeader
            collectionName={payment.tab.name}
            tabMember={payment.tab_member}
            note={payment.note}
            shippingInfo={payment.shipping_info}
          />
          <PdfReport.PaymentInvoice payment={payment} />
          <PdfReport.PaymentItemTable
            style={styles.paymentItemTable}
            refunds={payment.refunds}
            paymentItems={payment.payment_items.filter((paymentItem) =>
              Boolean(paymentItem.tab_item)
            )}
          />
          {payment.payment_items
            .filter(({tab_form}) => Boolean(tab_form))
            .map((x) => renderPaymentForm(x))}
        </Page>
      </Document>
    </PDFViewer>
  ) : null;
};

const enhance = asyncConnect((props) => [
  {
    key: GET_PAYMENT_TO_OTHERS,
    promise: getPaymentToOthers,
    payload: {
      paymentToOtherId: props.match.params.payment,
    },
  },
]);

const EnhancedPaymentToOthersReportPage = enhance(PaymentToOthersReportPage);

export default EnhancedPaymentToOthersReportPage;
