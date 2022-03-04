import {useResource} from 'rest-hooks';
import React from 'react';
import ReactToPrint from 'react-to-print';

import {CommonButton} from 'elements';
import {ExpandableSidebarLayout} from 'layout';
import {currency} from 'helpers/numbers';
import CollectionResource from 'resources/CollectionResource';
import ItemResource from 'resources/ItemResource';
import apiClient from 'helpers/apiClient';

import {ItemReport, PaymentItemView} from '../components';

const ItemReportContainer = ({collectionId, itemId, onDismiss}) => {
  const [collection, item] = useResource(
    [CollectionResource.detailShape(), {id: collectionId}],
    [ItemResource.reportShape(), {collectionId, id: itemId}]
  );

  const printDivRef = React.useRef();
  const [selectedPaymentItemId, setSelectedPaymentItemId] = React.useState(
    null
  );

  return (
    <>
      <ExpandableSidebarLayout
        sidebarVisible={Boolean(selectedPaymentItemId)}
        sidebar={
          Boolean(selectedPaymentItemId) && (
            <PaymentItemView
              item={item}
              paymentItemId={selectedPaymentItemId}
            />
          )
        }
        headerButtons={
          <div className="flex items-center">
            <ReactToPrint
              trigger={() => (
                <CommonButton className="pt-12 dn db-ns mr2 bg-tint white">
                  Print
                </CommonButton>
              )}
              content={() => printDivRef.current}
            />
            <a
              className="dn-p"
              onClick={() => {
                apiClient.fetchAndSave({
                  url: `users/tabs/${collection.id}/exports/items.xlsx`,
                  fileName: `${collection.name}-items.xlsx`,
                });
              }}
              rel="noopener noreferrer"
              target="_blank"
            >
              <CommonButton className="pt-12 dn gray-600 bg-gray-250">
                Export Spreadsheet
              </CommonButton>
            </a>
          </div>
        }
        heading="Item Report"
        sidebarTitle={item ? item.name : ''}
        headingSubtitle={
          item && (
            <>
              <p className="avenir-roman text-16 gray-600">{collection.name}</p>
              <p className="avenir-light text-14 gray-600">
                {item.amount_type === 'fixed' ? currency(item.amount) : '$Open'}
              </p>
            </>
          )
        }
        onClickClose={onDismiss}
        onClickCloseSidebar={() => {
          setSelectedPaymentItemId(null);
        }}
      >
        <div ref={printDivRef} className="item-report-wrapper">
          <ItemReport
            collection={collection}
            item={item}
            fieldViewsVisiblePaymentItemId={selectedPaymentItemId}
            onViewFieldViews={paymentItemId => {
              setSelectedPaymentItemId(prevSelectedPaymentItemId =>
                prevSelectedPaymentItemId === paymentItemId
                  ? null
                  : paymentItemId
              );
            }}
          />
        </div>
      </ExpandableSidebarLayout>
      <style jsx>{`
        @media print {
          .item-report-wrapper {
            overflow: auto;
            height: auto;
          }
        }
      `}</style>
    </>
  );
};

export default ItemReportContainer;
