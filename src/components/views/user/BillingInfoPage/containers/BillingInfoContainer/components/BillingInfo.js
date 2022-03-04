import {Link} from 'react-router-dom';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import {Status} from 'elements';

const BillingInfo = ({
  className,
  showUpdate,
  last4,
  echeck,
  plan,
  status,
  paymentMethodForm,
}) => {
  const [
    paymentMethodFormVisible,
    setPaymentMethodFormVisible,
  ] = React.useState(false);

  const isPending = status === 'pending';

  React.useEffect(() => {
    if (status === 'success') {
      setPaymentMethodFormVisible(false);
    }
  }, [status]);

  const handleClickEdit = React.useCallback(() => {
    setPaymentMethodFormVisible(prevIsForm => !prevIsForm);
  }, []);

  return (
    <div className={cx('f6', className)}>
      <p>
        Your Current Plan: {plan}
        {showUpdate && (
          <Link className="ml1 tint pointer" to="/user/billing/i/plans">
            Update
          </Link>
        )}
      </p>
      {Boolean(last4) && (
        <div className={isPending ? 'flex items-center' : ''}>
          {echeck ? 'Bank account' : 'Credit card'} ending in {last4}
          {isPending ? (
            <div className="ml2">
              <Status status="pending" />
            </div>
          ) : (
            <span className="ml1 tint pointer" onClick={handleClickEdit}>
              {paymentMethodFormVisible ? 'close' : 'edit'}
            </span>
          )}
        </div>
      )}
      {paymentMethodFormVisible && paymentMethodForm}
    </div>
  );
};

const EnhancedBillingInfo = Object.assign(React.memo(BillingInfo), {
  propTypes: {
    last4: PropTypes.string,
    plan: PropTypes.string,
    onSubmit: PropTypes.func,
    status: PropTypes.string,
  },
});

export default EnhancedBillingInfo;
