import React, {useCallback, useMemo} from 'react';
import {useFetcher} from 'rest-hooks';
import {useDispatch} from 'react-redux';
import {FaBan, FaCheck} from 'react-icons/fa';

import {RowControls} from 'elements';
import UserPaymentsResource from 'resources/UserPaymentResource';
import {successAlert, errorAlert} from 'redux/modules/growl/actions';

const PaymentActionsDropdown = ({payment, className}) => {
  const paymentDetailsLinkTitle = React.useMemo(() => {
    const refunded = (payment.total_refund || 0) > 0;
    const fullyRefunded = (refunded && payment.fully_refunded) || false;
    const failed = payment.status === 'failed';

    if (refunded) {
      return fullyRefunded ? 'Refunded' : 'Partial Refund';
    }
    if (failed) {
      return 'Failed';
    }

    return 'Order Summary';
  }, [payment]);

  const resend = useFetcher(UserPaymentsResource.resendShape());
  const dispatch = useDispatch();
  const handleResend = useCallback(async () => {
    try {
      await resend(
        {
          paymentId: payment.id,
        },
        {
          payment: payment.id,
        }
      );

      dispatch(
        successAlert({
          title: 'Receipt has been sent',
          body: `You will receive an email confirmation shortly at ${payment.tab_member.email}.`,
          icon: FaCheck,
        })
      );
    } catch (e) {
      dispatch(
        errorAlert({
          title: 'Error',
          body: `${e.message}`,
          icon: FaBan,
        })
      );
    }
  }, [dispatch, payment.id, payment.tab_member.email, resend]);

  const controls = useMemo(
    () => [
      {
        tooltip: paymentDetailsLinkTitle,
        className: 'text-14 avenir-light dark-grey',
        to: `/collections/payments/${payment.id}/details`,
      },
      {
        component: (
          <a
            href={`mailto:${payment.tab.user.email}?subject=${payment.tab.name}`}
          >
            <span className="ml2 text-14 avenir-light dark-grey">
              Contact Organizer
            </span>
          </a>
        ),
      },
      {
        tooltip: 'Resend Receipt',
        onClick: handleResend,
        className: 'text-14 avenir-light dark-grey',
      },
    ],
    [handleResend, payment, paymentDetailsLinkTitle]
  );

  return (
    <RowControls
      className={className}
      dropdownWidth={160}
      controls={controls}
    />
  );
};

export default PaymentActionsDropdown;
