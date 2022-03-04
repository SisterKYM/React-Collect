import React from 'react';
import {useResource} from 'rest-hooks';
import {Document, Page, PDFViewer, StyleSheet} from '@react-pdf/renderer';

import UserPaymentsResource from 'resources/UserPaymentResource';
import {PdfReport} from 'elements';
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

const PaymentReportPage = (props) => {
  const payment = useResource(UserPaymentsResource.detailShape(), {
    id: props.match.params.payment,
  });

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

const EnhancedPaymentReportPage = React.memo(PaymentReportPage);

export default EnhancedPaymentReportPage;
