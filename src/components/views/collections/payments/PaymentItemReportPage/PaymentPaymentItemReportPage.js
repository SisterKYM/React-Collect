import React from 'react';
import {Document, Page, PDFViewer, StyleSheet} from '@react-pdf/renderer';

import {PdfReport, Status} from 'elements';
import initReactPdfResources from 'helpers/initReactPdfResources';
import UserPaymentsResource from 'resources/UserPaymentResource';
import {useResource} from 'rest-hooks';

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

const PaymentItemReportPage = (props) => {
  const payment = useResource(UserPaymentsResource.detailShape(), {
    id: props.match.params.payment,
  });

  const collectionName = payment.tab.name;
  const paymentCreatedAt = payment.created_at;
  const tabMember = payment.tab_member;
  const paymentItem = (payment.payment_items || []).find(
    (item) => String(item.id) === props.match.params.paymentItem
  );

  return paymentItem ? (
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
};

const EnhancedPaymentItemReportPage = React.memo(PaymentItemReportPage);

export default EnhancedPaymentItemReportPage;
