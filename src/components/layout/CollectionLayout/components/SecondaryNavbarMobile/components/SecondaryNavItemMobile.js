import React from 'react';
import {Link, withRouter, useRouteMatch} from 'react-router-dom';
import {compose} from 'recompose';
import cx from 'classnames';

const SecondaryNavItemMobile = ({label, disabled, to}) => {
  const Component = disabled ? 'span' : Link;
  const match = useRouteMatch();
  const active = (to && match.url.includes(to)) || (!to && !disabled);

  return (
    <div
      className={cx(
        'collection-secondary-nav-item-mobile flex justify-center items-center',
        disabled && 'not-allowed o-50'
      )}
    >
      <Component to={disabled ? '' : to}>
        <div
          className={cx(
            'collection-secondary-nav-item-label text-12',
            active ? 'brand' : 'dark-grey',
            disabled ? 'o-50' : ''
          )}
        >
          {label}
        </div>
      </Component>
      <style jsx>{`
        .collection-secondary-nav-item-mobile {
          width: 100px;
          height: 35px;
        }
        .collection-secondary-nav-item-mobile.not-allowed {
          background-color: inherit;
        }
        .collection-secondary-nav-item-label {
          height: 17px;
          max-width: 100px;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
};

const enhance = compose(withRouter, React.memo);

const EnhancedSecondaryNavItemMobile = enhance(SecondaryNavItemMobile);

export default EnhancedSecondaryNavItemMobile;
