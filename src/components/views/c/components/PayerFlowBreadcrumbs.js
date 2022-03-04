import {generatePath, Link, matchPath} from 'react-router-dom';
import _ from 'lodash';
import cx from 'classnames';
import queryString from 'query-string';
import React from 'react';

import useMedia from 'hooks/useMedia';

const PayerFlowBreadcrumbs = ({
  className,
  collectionSlug,
  missingRequiredFormViewFields = false,
  userLoggedIn,
  publicCollection,
  location,
}) => {
  const {notSmall} = useMedia();
  const formsCount =
    (publicCollection.forms && publicCollection.forms.length) || 0;
  const itemsCount =
    (publicCollection.items && publicCollection.items.length) || 0;

  const collectionHasFormsOnly = formsCount !== 0 && itemsCount === 0;
  const shippingEnabled = Boolean(
    publicCollection?.shippingOptions?.shipToEnabled
  );

  const crumbs = [
    itemsCount !== 0 && {
      title: 'Cart',
      pathname: '/c/:collection',
      state: {
        cartVisible: true,
      },
    },
    formsCount !== 0 && {
      title: 'Forms',
      pathname: '/c/:collection/forms',
    },
    shippingEnabled && {
      title: 'Shipping',
      mobileOnly: true,
      disabled: missingRequiredFormViewFields,
      pathname: '/c/:collection/checkout',
      search: '?step=shipping',
    },
    !notSmall &&
      !collectionHasFormsOnly &&
      !userLoggedIn && {
        title: 'Details',
        mobileOnly: true,
        disabled: missingRequiredFormViewFields,
        pathname: '/c/:collection/checkout',
        search: '?step=details',
      },
    {
      title: 'Payment',
      disabled: missingRequiredFormViewFields,
      pathname: '/c/:collection/checkout',
      search: '?step=payment',
    },
  ].filter(Boolean);
  const step = React.useMemo(() => {
    const parsedSearch = queryString.parse(location.search);

    return parsedSearch.step;
  }, [location.search]);

  const activeCrumbIdx = _.findLastIndex(crumbs, (crumb) => {
    const crumbStep = queryString.parse(crumb.search).step;

    return (
      matchPath(location.pathname, crumb.pathname) &&
      (notSmall || !step || crumbStep === step)
    );
  });

  return (
    <nav
      className={cx(
        'ph3 ph4-ns pv3 f6 avenir-roman bg-white overflow-x-auto',
        className
      )}
    >
      {collectionHasFormsOnly && crumbs.length === 2 ? (
        <Link
          className="f6 grow tint"
          to={{
            pathname: generatePath(crumbs[0].pathname, {
              collection: collectionSlug,
            }),
            search: crumbs[0].search,
            state: crumbs[0].state,
          }}
        >
          {'<'} Back
        </Link>
      ) : (
        crumbs.map((crumb, idx) => (
          <div
            key={crumb.title}
            className={cx('di', crumb.mobileOnly && 'dn-ns')}
          >
            {idx !== 0 && <span className="gray-600 mh2">{'>'}</span>}
            <Link
              className={cx(
                'f6 grow',
                crumb.disabled && 'link-disabled not-allowed gray-300',
                !crumb.disabled && activeCrumbIdx === idx && 'brand',
                !crumb.disabled && activeCrumbIdx < idx && 'gray-400',
                !crumb.disabled && activeCrumbIdx > idx && 'gray-600'
              )}
              to={{
                pathname: generatePath(crumb.pathname, {
                  collection: collectionSlug,
                }),
                search: crumb.search,
                state: crumb.state,
              }}
            >
              {crumb.title}
            </Link>
          </div>
        ))
      )}
      <style jsx>{`
        nav {
          -webkit-overflow-scrolling: touch;
        }
        :global(.link-disabled) {
          pointer-events: none;
        }
      `}</style>
    </nav>
  );
};

const EnhancedPayerFlowBreadcrumbs = React.memo(PayerFlowBreadcrumbs);

export default EnhancedPayerFlowBreadcrumbs;
