import {Document, Page, PDFViewer, StyleSheet} from '@react-pdf/renderer';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import React, {Fragment} from 'react';
import _ from 'lodash';
import cx from 'classnames';

import {GET_ORDERS_EXPORT} from 'redux/modules/payments/constants';
import {PdfReport, Button} from 'elements';
import {asyncConnect} from 'helpers';
import {getOrdersExport} from 'redux/modules/payments/actions';
import {loadCollection} from 'views/collection/helpers';
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
});

const FormsReportPage = ({formPayments, collectionName}) => {
  const [visibleFormId, setVisibleFormId] = React.useState(
    formPayments && formPayments.length !== 0 ? formPayments[0].tabFormId : null
  );

  const visibleForm = React.useMemo(
    () =>
      formPayments
        ? formPayments.find(({tabFormId}) => visibleFormId === tabFormId)
        : null,
    [formPayments, visibleFormId]
  );

  React.useEffect(() => {
    if (formPayments && formPayments.length !== 0) {
      setVisibleFormId(formPayments[0].tabFormId);
    }
  }, [formPayments]);

  const renderFormNavigationButton = React.useCallback(
    ({tabFormId, tabFormName}, idx) => {
      const handleClick = () => {
        setVisibleFormId(tabFormId);
      };

      return (
        <Fragment key={tabFormId}>
          <Button
            colorSet
            backgroundColorSet
            borderRadius={false}
            key={tabFormId}
            className={cx(
              'form-report-page-navigation-button truncate',
              idx !== 0 && 'ml3',
              visibleFormId === tabFormId
                ? 'white bg-tint'
                : 'gray-600 bg-gray-300'
            )}
            onClick={handleClick}
          >
            {tabFormName}
          </Button>
          <style jsx>{`
            :global(.form-report-page-navigation-button) {
              min-width: 16rem;
            }
          `}</style>
        </Fragment>
      );
    },
    [visibleFormId]
  );

  const renderPage = React.useCallback(
    (paymentItem) => (
      <Page key={paymentItem.id} style={styles.page}>
        <PdfReport.PaymentItem
          collectionName={collectionName}
          tabMember={paymentItem.tabMember}
          paymentItem={paymentItem}
        />
      </Page>
    ),
    [collectionName]
  );

  return (
    Boolean(visibleForm) && (
      <>
        <div className="flex pa3 overflow-x-auto">
          {formPayments.map((x, idx) => renderFormNavigationButton(x, idx))}
        </div>
        <PDFViewer key={visibleFormId} style={styles.document}>
          <Document title="Waivers report">
            {visibleForm.paymentItems.map((x) => renderPage(x))}
          </Document>
        </PDFViewer>
      </>
    )
  );
};

const enhance = compose(
  asyncConnect((props) =>
    loadCollection(props, [
      {
        key: GET_ORDERS_EXPORT,
        promise: getOrdersExport,
        payload: {
          collection: props.match.params.collection,
        },
      },
    ])
  ),
  connect((state) => {
    const payments = _.get(state.payments, 'ordersExport', []);
    const paymentItemsWithTabMembers = _.flatMap(
      payments.map(({payment_items, tab_member}) =>
        payment_items
          .filter(({tab_form}) => Boolean(tab_form))
          .map((paymentItem) => ({
            ...paymentItem,
            tabMember: tab_member,
          }))
      )
    );
    const tabFormIdsWithNames = _.uniqBy(
      _.flatMap(
        paymentItemsWithTabMembers.map((paymentItem) => ({
          id: paymentItem.tab_form.id,
          name: paymentItem.tab_form.name,
        }))
      ),
      'id'
    );

    return {
      collectionName:
        (state.collections.collection && state.collections.collection.name) ||
        '',
      formPayments: state.payments.ordersExport
        ? tabFormIdsWithNames.map(({id, name}) => ({
            tabFormId: id,
            tabFormName: name,
            paymentItems: _.flatMap(
              paymentItemsWithTabMembers.filter(
                (paymentItem) => paymentItem.tab_form.id === id
              )
            ),
          }))
        : null,
    };
  })
);

const EnhancedFormsReportPage = enhance(FormsReportPage);

export default EnhancedFormsReportPage;
