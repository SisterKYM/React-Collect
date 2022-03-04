import React from 'react';
import {Link} from 'react-router-dom';

const PlanMethod = ({plan, location}) => (
  <div className="mb3-5">
    <p className="text-14 mb2">Your Plan</p>
    <div className="avenir-light bg-gray-250 flex justify-between items-center pv2 br2 ph3">
      <span className="text-16 line-24">{plan.name}</span>
      <Link className="text-14" to={`${location.pathname}/i/plans`}>
        Change
      </Link>
    </div>
  </div>
);

const EnhancedPlanMethod = React.memo(PlanMethod);

export default EnhancedPlanMethod;
