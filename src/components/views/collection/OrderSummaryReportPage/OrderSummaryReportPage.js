import {Document, Page, PDFViewer, StyleSheet} from '@react-pdf/renderer';
import {useResource} from 'rest-hooks';
import React from 'react';

import {PdfReport} from 'elements';
import CollectionResource from 'resources/CollectionResource';
import initReactPdfResources from 'helpers/initReactPdfResources';
import PaymentResource from 'resources/PaymentResource';

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

const OrderSummaryReportPage = ({match}) => {
  const collectionId = Number(match.params.collection);
  const paymentId = Number(match.params.payment);

  const collection = useResource(CollectionResource.detailShape(), {
    id: collectionId,
  });
  const payment = useResource(PaymentResource.detailShape(), {
    id: paymentId,
    collectionId,
  });

  return (
    <PDFViewer style={styles.document}>
      <Document shallow title={`${collection.name} payment`}>
        <Page wrap size="A4" style={styles.page}>
          <PdfReport.PaymentHeader
            collectionName={collection.name}
            tabMember={payment.tab_member}
            note={payment.note}
            shippingInfo={payment.shipping_info}
          />
          <PdfReport.PaymentInvoice payment={payment} />
          <PdfReport.PaymentItemTable
            style={styles.paymentItemTable}
            refunds={payment.refunds}
            paymentItems={payment.payment_items.filter(paymentItem =>
              Boolean(paymentItem.tab_item)
            )}
          />
          {payment.payment_items
            .filter(({tab_form}) => Boolean(tab_form))
            .map(paymentItem => (
              <PdfReport.PaymentFormRow
                key={paymentItem.id}
                paymentForm={paymentItem}
              />
            ))}
        </Page>
      </Document>
    </PDFViewer>
  );
};

const EnhancedOrderSummaryReportPage = React.memo(OrderSummaryReportPage);

export default EnhancedOrderSummaryReportPage;
