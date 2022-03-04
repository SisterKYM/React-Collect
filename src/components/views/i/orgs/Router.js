import {Route} from 'react-router-dom';
import React from 'react';

import HowItWorksPage from './HowItWorksPage';

const HowItWorksOuterRouter = () => (
  <Route path="*/i/orgs/:org/how-it-works" component={HowItWorksPage} />
);

const EnhancedHowItWorksOuterRouter = React.memo(HowItWorksOuterRouter);

export default EnhancedHowItWorksOuterRouter;
