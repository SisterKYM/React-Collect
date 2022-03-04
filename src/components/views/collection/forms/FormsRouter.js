import {Route, Switch} from 'react-router-dom';
import React from 'react';
import posed, {PoseGroup} from 'react-pose';

import AddWaiverPage from './AddWaiverPage';
import FormDeletePage from './FormDeletePage';
import FormFormPage from './FormFormPage';
import FormsPage from './FormsPage';
import SellerFormsRouter from './seller';

const PoseContainer = posed.div();

const FormsRouter = ({location}) => (
  <>
    <Route path="/collection/:owner/:collection/forms" component={FormsPage} />
    <PoseGroup>
      <PoseContainer key={location.pathname}>
        <Switch location={location}>
          <Route
            path="/collection/:owner/:collection/forms/add-form"
            component={FormFormPage}
          />
          <Route
            exact
            path="/collection/:owner/:collection/forms/:form/edit"
            component={FormFormPage}
          />
          <Route
            path="/collection/:owner/:collection/forms/add-waiver"
            component={AddWaiverPage}
          />
          <Route
            path="/collection/:owner/:collection/forms/seller"
            component={SellerFormsRouter}
          />
          <Route
            component={FormDeletePage}
            path="/collection/:owner/:collection/forms/:form/delete"
          />
        </Switch>
      </PoseContainer>
    </PoseGroup>
  </>
);

const EnhancedFormsRouter = React.memo(FormsRouter);

export default EnhancedFormsRouter;
