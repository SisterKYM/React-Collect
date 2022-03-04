import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import cx from 'classnames';
import {CommonButton} from 'elements';
import {currency} from 'helpers/numbers';

const Withdraw = ({className}) => {
  const sessionBalance = useSelector((state) => state.session?.balance);

  return (
    <div className={cx('card', className)}>
      <div className="dark-grey">
        <div className="f8 lh1 avenir-roman medium-grey mb2">
          AVAILABLE TO WITHDRAW
        </div>
        <div className="f8 lh1 avenir-light withdraw-amount gray-600 mb2">
          {currency(sessionBalance)}
        </div>
      </div>
      <Link to="/withdraw">
        <CommonButton className="pt-14 bg-tint white">Withdraw</CommonButton>
      </Link>
      <style jsx>{`
        .side-element {
          display: inline-block;
          max-width: 100%;
          width: 20rem;
          min-height: 10.625rem;
          padding: 1.6875rem;
        }
        .withdraw-amount {
          font-size: 1.875rem;
        }
        .card {
          background-color: #ffffff;
          box-shadow: 0px 1px 3px #0000000a;
          border: 1px solid #eaedf3;
          border-radius: 4px;
        }
        .right-side .side-element.card:not(:last-child) {
          margin-bottom: 0.75rem;
        }
      `}</style>
    </div>
  );
};

export default React.memo(Withdraw);
