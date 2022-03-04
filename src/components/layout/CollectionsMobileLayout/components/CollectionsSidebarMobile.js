import React, {useCallback, useMemo} from 'react';
import {MdHelpOutline} from 'react-icons/md';
import posed, {PoseGroup} from 'react-pose';
import {useSelector} from 'react-redux';
import _, {capitalize} from 'lodash';

import config from 'config';
import {ReactComponent as CollectionsBag} from 'theme/images/CollectionsBag.svg';
import {ReactComponent as List} from 'theme/images/List.svg';
import {ReactComponent as UserPlus} from 'theme/images/UserPlus.svg';
import {ReactComponent as Pin} from 'theme/images/Pin.svg';
import {ReactComponent as BarChart} from 'theme/images/BarChart.svg';
import {ReactComponent as Search} from 'theme/images/Search.svg';

import {
  CollectionsSidebarMobileSubNav,
  CollectionsSidebarMobileNavItem,
  MobileProfileIcon,
} from './components';

const AnimatedSidebar = posed.div({
  enter: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      duration: 200,
    },
  },
  exit: {
    x: '-100%',
    transition: {
      duration: 150,
    },
  },
});

const CollectionsSidebarMobile = ({sidebarVisible}) => {
  const sessionInternalMarketplace = useSelector(
    (state) => state.session?.organization_data?.internalMarketplace
  );

  const navs = useMemo(() => {
    const navOptions = [
      {
        text: `${capitalize(config.strings.collection)}s`,
        link: '/collections',
        icon: <CollectionsBag />,
      },
      {
        text: 'Payment History',
        link: '/collections/payments',
        icon: <List />,
      },
      {
        text: 'Managers',
        link: '/collections/managers',
        icon: <UserPlus />,
      },
      {
        text: 'Group Page',
        link: '/collections/group',
        icon: <Pin />,
      },
      {
        text: 'Reports',
        link: '/collections/reports',
        icon: <BarChart />,
      },
    ];
    if (sessionInternalMarketplace?.enabled) {
      navOptions.push({
        text: `Search All ${sessionInternalMarketplace.organizerNickname} Sales`,
        link: '/marketplace',
        target: '_blank',
        icon: <Search size={26} />,
      });
    }
    navOptions.push(
      {
        text: 'Help and Inspiration',
        icon: <MdHelpOutline size={26} />,
        subNavs: [
          {
            text: 'Help Center',
            link: 'https://support.cheddarup.com/',
            outer: true,
            target: '_blank',
          },
          {
            text: 'Webinars',
            link:
              'https://support.cheddarup.com/hc/en-us/articles/360035586771-Attend-a-webinar-',
            outer: true,
            target: '_blank',
          },
          {
            text: 'Blog',
            link: 'https://www.cheddarup.com/blog/',
            outer: true,
            target: '_blank',
          },
          {
            text: 'Pricing',
            link: 'https://www.cheddarup.com/pricing/',
            outer: true,
            target: '_blank',
          },
        ],
      },
      {
        text: 'My Account',
        icon: <MobileProfileIcon className="w-50" />,
        subNavs: [
          {
            text: 'Profile',
            link: '/user/profile',
          },
          {
            text: 'Password',
            link: '/user/password',
          },
          {
            text: 'Plan and Billing',
            link: '/user/billing',
          },
          {
            text: 'Withdrawal Settings',
            link: '/user/withdrawal-settings',
          },
          {
            text: 'Payment Methods',
            link: '/user/payment-methods',
          },
          {
            text: 'Log out',
            link: '/logout',
            type: 'button',
          },
        ],
      },
      {
        text: 'Upgrade',
        link: 'i/plans',
        type: 'button',
      }
    );

    return navOptions;
  }, [sessionInternalMarketplace]);
  const [level, setLevel] = React.useState(-1);

  const goBack = useCallback(() => {
    setLevel(-1);
  }, []);

  return (
    <div
      className={`collections-sidebar-mobile ${sidebarVisible ? 'open' : ''}`}
    >
      <PoseGroup>
        {sidebarVisible && (
          <AnimatedSidebar
            key="animated-sidebar"
            className="absolute vh-100 bg-white"
            withParent={false}
          >
            {level === -1 ? (
              navs.map((nav, index) => (
                <CollectionsSidebarMobileNavItem
                  selectNav={setLevel}
                  key={index}
                  index={index}
                  nav={nav}
                />
              ))
            ) : (
              <CollectionsSidebarMobileSubNav nav={navs[level]}>
                <div className="nav-item pl3" onClick={goBack}>
                  <div className="text">
                    <span className="avenir-roman gray-600 text-14 text go-back">
                      Back
                    </span>
                  </div>
                </div>
              </CollectionsSidebarMobileSubNav>
            )}
          </AnimatedSidebar>
        )}
      </PoseGroup>
      <style>{`
        .go-back:before {
          content: '< ';
          margin-right: 0.5rem;
        }
        .collections-sidebar-mobile > div {
          box-shadow: 1px 0 3px #0000000a;
          z-index: 15;
        }
      `}</style>
    </div>
  );
};

export default React.memo(CollectionsSidebarMobile);
