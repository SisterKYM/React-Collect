import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import cx from 'classnames';

import {ReactComponent as LeftArrow} from 'theme/images/LeftArrow.svg';
import {ReactComponent as Info} from 'theme/images/Info.svg';

const sidebarNavs = [
  {
    label: 'Profile',
    value: 'profile',
  },
  {
    label: 'Account Details',
    value: 'details',
  },
  {
    label: 'Security',
    value: 'security',
  },
  {
    label: 'Plan and Billing',
    value: 'plan_and_billing',
  },
  {
    label: 'Withdrawal Settings',
    value: 'settings',
  },
  {
    label: 'Payment Methods',
    value: 'payment_methods',
  },
];

const Sidebar = ({location}) => {
  const activeNavIndex = useMemo(
    () =>
      sidebarNavs.findIndex(
        (nav) => location.pathname.split('/account/')[1] === nav.value
      ),
    [location.pathname]
  );
  const errors = useSelector((state) => state.account.errors);

  return (
    <div className="account-sidebar bg-gray-250">
      <h1 className="avenir-heavy dark-grey mb3 text-14 uppercase">
        My Account
      </h1>
      <div className="flex flex-column">
        {sidebarNavs.map((nav, idx) => (
          <Link
            key={nav.value}
            className={cx(
              'avenir-roman text-16 mb3 flex items-center',
              activeNavIndex === idx ? 'brand' : 'dark-grey'
            )}
            to={nav.value}
          >
            {activeNavIndex === idx ? (
              <span className="mr2-5">
                <LeftArrow />
              </span>
            ) : (
              <span className="mr4" />
            )}
            {nav.label}
            {idx === 1 && Object.keys(errors).length > 0 && (
              <Info className="ml2 mb1" />
            )}
          </Link>
        ))}
      </div>
      <style>{`
        .account-sidebar {
          padding: 60px 40px;
          width: 320px;
        }
        .uppercase {
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
};

const EnhancedSidebar = React.memo(Sidebar);

export default EnhancedSidebar;
