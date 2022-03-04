import React from 'react';
import {capitalize} from 'lodash';
import {NavLink} from 'react-router-dom';

import config from 'config';
import {ReactComponent as CollectionsBag} from 'theme/images/CollectionsBag.svg';
import {ReactComponent as List} from 'theme/images/List.svg';
import {ReactComponent as UserPlus} from 'theme/images/UserPlus.svg';
import {ReactComponent as Pin} from 'theme/images/Pin.svg';
import {ReactComponent as BarChart} from 'theme/images/BarChart.svg';

const CollectionsSidebar = () => (
  <div className="collections-sidebar">
    <NavLink to="/collections" exact className="link">
      <div className="icon-box">
        <CollectionsBag />
      </div>
      <div className="text">
        <span className="avenir-roman gray-600 f6">
          {capitalize(config.strings.collection)}s
        </span>
      </div>
    </NavLink>
    <NavLink to="/collections/payments" exact className="link">
      <div className="icon-box">
        <List />
      </div>
      <div className="text">
        <span className="avenir-roman gray-600 f6">Payment History</span>
      </div>
    </NavLink>
    <NavLink to="/collections/managers" exact className="link">
      <div className="icon-box">
        <UserPlus />
      </div>
      <div className="text">
        <span className="avenir-roman gray-600 f6 text">Managers</span>
      </div>
    </NavLink>
    <NavLink to="/collections/group" exact className="link">
      <div className="icon-box">
        <Pin />
      </div>
      <div className="text">
        <span className="avenir-roman gray-600 f6">Group Page</span>
      </div>
    </NavLink>
    <NavLink to="/collections/reports" exact className="link">
      <div className="icon-box">
        <BarChart />
      </div>
      <div className="text">
        <span className="avenir-roman gray-600 f6 text">Reports</span>
      </div>
    </NavLink>
  </div>
);
export default React.memo(CollectionsSidebar);
