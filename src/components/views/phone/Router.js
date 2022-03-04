import {Route, Switch} from 'react-router-dom';
import React from 'react';

import AddPhonePage from './AddPhonePage';
import VerifyPhonePage from './VerifyPhonePage';

const PhoneRouter = () => (
  <Switch>
    <Route path="*/phone/verify" component={VerifyPhonePage} />
    <Route path="*/phone/add-phone" component={AddPhonePage} />
  </Switch>
);

const EnhancedPhoneRouter = React.memo(PhoneRouter);

export default EnhancedPhoneRouter;
