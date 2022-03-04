import React from 'react';

import {PayerPageBaseContainer} from '../containers';
import {PrePayerVisitorReportContainer} from './containers';

const PrePayerVisitorReportPage = ({
  match,
  addPayment,
  visibleFields,
  requiredFields,
  publicCollection,
  onSaveVisitorValue,
}) => (
  <PayerPageBaseContainer
    prePayerPage
    collectionSlug={match.params.collection}
    publicCollection={publicCollection}
  >
    <PrePayerVisitorReportContainer
      className="w-80 w-100-ns mt4 mt3-ns center"
      collectionSlug={match.params.collection}
      publicCollection={publicCollection}
      addPayment={addPayment}
      visibleFields={visibleFields}
      requiredFields={requiredFields}
      onSaveVisitorValue={onSaveVisitorValue}
    />
  </PayerPageBaseContainer>
);

const EnhancedPrePayerVisitorReportPage = React.memo(PrePayerVisitorReportPage);

export default EnhancedPrePayerVisitorReportPage;
