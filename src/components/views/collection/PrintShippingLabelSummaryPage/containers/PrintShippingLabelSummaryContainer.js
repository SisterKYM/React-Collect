import {useSelector} from 'react-redux';
import React from 'react';

import {GET_PAYMENT_SHIPMENT} from 'redux/modules/payments/constants';
import {StatefulView} from 'elements';
import {asyncConnect} from 'helpers';
import {getPaymentShipment} from 'redux/modules/payments/actions';

import {
  PrintShippingLabelBanner,
  PrintShippingLabelSummaryHeader,
  RecipientInfo,
  ShippingCosts,
  USPSTracking,
} from '../components';

const PrintShippingLabelSummaryContainer = ({
  collectionOwnerId,
  collectionId,
  paymentId,
  firstVisit,
  onReprintShippingLabel,
}) => {
  const shipment = useSelector(state => state.payments.shipment);
  const getPaymentShipmentStatus = useSelector(
    state => state.async.statuses[GET_PAYMENT_SHIPMENT]
  );

  const handleReprintShippingLabel = React.useCallback(() => {
    if (shipment.label) {
      onReprintShippingLabel(shipment.label);
    }
  }, [onReprintShippingLabel, shipment]);

  const handleViewOrderSummary = React.useCallback(() => {
    const openedWindow = window.open(
      `/collection/${collectionOwnerId}/${collectionId}/payment-report/${paymentId}`,
      '_blank'
    );
    openedWindow.focus();
  }, [collectionId, collectionOwnerId, paymentId]);

  return (
    <StatefulView
      resultCount={shipment ? 1 : 0}
      status={getPaymentShipmentStatus}
    >
      <PrintShippingLabelSummaryHeader
        className="mb3"
        reprintShippingLabelVisible={!firstVisit}
        onReprintShippingLabel={handleReprintShippingLabel}
      />
      {firstVisit && (
        <PrintShippingLabelBanner
          className="mb4"
          onPrintShippingLabel={handleReprintShippingLabel}
        />
      )}
      <RecipientInfo
        className="w-100 mb4"
        address={shipment ? shipment.shipTo : null}
        onViewOrderSummary={handleViewOrderSummary}
      />
      <USPSTracking
        className="w-100 mb4"
        tracking={shipment ? shipment.tracking : null}
        service={shipment ? shipment.selected_rate.service : ''}
      />
      <ShippingCosts className="w-100" shipment={shipment} />
    </StatefulView>
  );
};

const enhance = asyncConnect(props => [
  {
    key: GET_PAYMENT_SHIPMENT,
    promise: getPaymentShipment,
    payload: {
      collection: props.collectionId,
      payment: props.paymentId,
    },
  },
]);

const EnhancedPrintShippingLabelSummaryContainer = enhance(
  PrintShippingLabelSummaryContainer
);

export default EnhancedPrintShippingLabelSummaryContainer;
