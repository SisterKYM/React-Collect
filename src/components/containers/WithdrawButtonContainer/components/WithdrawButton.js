import {Link} from 'react-router-dom';
import React from 'react';
import cx from 'classnames';

import {currency} from 'helpers/numbers';
import {ReactComponent as WithdrawIcon} from 'theme/images/withdraw-icon.svg';
import Button from 'elements/Button';
import config from 'config';

const WithdrawButton = ({className, balance = 0}) => (
  <Link to="/withdraw">
    <Button
      colorSet
      disabled={balance === 0}
      backgroundColorSet
      className={cx('gray-600 bg-white', className)}
    >
      <div className="flex items-center justify-center">
        <WithdrawIcon className="winthdraw-icon" fill={config.colors.brand} />
        {balance > 0 && <div className="ml2">{currency(balance)}</div>}
        <style jsx>{`
          :global(.winthdraw-icon) {
            width: 1.875rem;
            height: 1.875rem;
          }
        `}</style>
      </div>
    </Button>
  </Link>
);

const EnhancedWithdrawButton = React.memo(WithdrawButton);

export default EnhancedWithdrawButton;
