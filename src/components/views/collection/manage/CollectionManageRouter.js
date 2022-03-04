import {Route, Switch} from 'react-router-dom';
import React from 'react';
import posed, {PoseGroup} from 'react-pose';

import CollectionManageMessagePage from './CollectionManageMessagePage';
import CollectionManagePage from './CollectionManagePage';
import DeletePaymentPage from './DeletePaymentPage';
import OrderSummaryPage from './OrderSummaryPage';
import PaymentDetailsPage from './PaymentDetailsPage';
import RefundsManagePage from './RefundsManagePage';
import ItemFormPage from '../items/ItemFormPage';
import ItemReportPage from '../items/item/ItemReportPage';
import FormFormPage from '../forms/FormFormPage';

const PoseContainer = posed.div();

const CollectionManageRouter = ({location}) => (
  <>
    <div className="dn-p">
      <Route
        path={[
          '/collection/:owner/:collection/manage/:selectedTab',
          '/collection/:owner/:collection/manage',
        ]}
        component={CollectionManagePage}
      />
    </div>
    <PoseGroup>
      <PoseContainer key={location.pathname}>
        <Switch location={location}>
          <Route
            path="/collection/:owner/:collection/manage/payments/message"
            component={CollectionManageMessagePage}
          />
          <Route
            path="/collection/:owner/:collection/:from/forms/:form/edit"
            component={FormFormPage}
          />
          <Route
            path="/collection/:owner/:collection/manage/payments/payment/:payment"
            component={OrderSummaryPage}
          />
          <Route
            path="/collection/:owner/:collection/manage/payments/:payment/refunds"
            component={RefundsManagePage}
          />
          <Route
            path="/collection/:owner/:collection/manage/payments/:payment/delete"
            component={DeletePaymentPage}
          />
          <Route
            path="/collection/:owner/:collection/:isFrom/items/item/:item/edit"
            component={ItemFormPage}
          />
          <Route
            path="/collection/:owner/:collection/:isFrom/items/item/:item"
            component={ItemReportPage}
          />
        </Switch>
      </PoseContainer>
    </PoseGroup>
    <PoseGroup>
      <PoseContainer key={location.pathname}>
        <Switch location={location}>
          <Route
            path="/collection/:owner/:collection/manage/payments/:payment/recurring"
            component={PaymentDetailsPage}
          />
          <Route
            path="/collection/:owner/:collection/manage/payments/payment/:payment/scheduled/:invoice"
            component={PaymentDetailsPage}
          />
        </Switch>
      </PoseContainer>
    </PoseGroup>
  </>
);

const EnhancedCollectionManageRouter = React.memo(CollectionManageRouter);

export default EnhancedCollectionManageRouter;
