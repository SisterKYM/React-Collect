import {Document, Page, PDFViewer, StyleSheet} from '@react-pdf/renderer';
import {compact, get, reverse} from 'lodash';
import {useSelector} from 'react-redux';
import React from 'react';

import {GET_COLLECTION} from 'redux/modules/collections/constants';
import {GET_ORDERS_EXPORT} from 'redux/modules/payments/constants';
import {PdfReport} from 'elements';
import {asyncConnect} from 'helpers';
import {getCollection} from 'redux/modules/collections/actions';
import {getOrdersExport} from 'redux/modules/payments/actions';
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

const OrdersReportPage = () => {
  const collectionName = useSelector(state =>
    get(state.collections.collection, 'name')
  );
  const ordersExport = useSelector(
    state => reverse(get(state.payments, 'ordersExport')) || []
  );

  return (
    <div className="container ma0 overflow-hidden">
      {Boolean(collectionName) && Boolean(ordersExport) && (
        <PDFViewer style={styles.document}>
          <Document title={`${collectionName} orders`}>
            {ordersExport.map(order => (
              <Page wrap key={order.id} style={styles.page}>
                <PdfReport.PaymentHeader
                  collectionName={collectionName}
                  tabMember={order.tab_member}
                  note={order.note}
                  shippingInfo={order.shipping_info}
                />
                <PdfReport.PaymentInvoice payment={order} />
                <PdfReport.PaymentItemTable
                  style={styles.paymentItemTable}
                  refunds={order.refunds}
                  paymentItems={order.payment_items.filter(paymentItem =>
                    Boolean(paymentItem.tab_item)
                  )}
                />
                {order.payment_items
                  .filter(paymentItem => Boolean(paymentItem.tab_form))
                  .map(paymentItem => (
                    <PdfReport.PaymentFormRow
                      key={paymentItem.id}
                      paymentForm={paymentItem}
                    />
                  ))}
              </Page>
            ))}
          </Document>
        </PDFViewer>
      )}
      <style jsx>{`
        .container {
          max-height: 100vh;
        }
      `}</style>
    </div>
  );
};

const enhance = asyncConnect(props => {
  const state = props.store.getState();

  const collection = get(props, 'match.params.collection', -1);
  const collectionInState = get(state, 'collections.collection.id');
  const shouldLoadCollection =
    !collectionInState || String(collectionInState) !== String(collection);

  return compact([
    shouldLoadCollection
      ? {
          key: GET_COLLECTION,
          promise: getCollection,
          payload: {collection},
        }
      : null,
    {
      key: GET_ORDERS_EXPORT,
      promise: getOrdersExport,
      payload: {collection},
    },
  ]);
});

const EnhancedOrdersReportPage = enhance(OrdersReportPage);

export default EnhancedOrdersReportPage;
