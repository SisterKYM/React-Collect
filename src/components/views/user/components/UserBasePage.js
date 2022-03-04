import {compose} from 'recompose';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

import {DashboardLayout} from 'layout';
import {ReactComponent as ExclamationMarkIcon} from 'theme/images/exclamation-mark-icon.svg';
import {GET_RECURRING_PAYMENTS} from 'redux/modules/recurringPayments/constants';
import {PrimaryNavLinksContainer, WithdrawButtonContainer} from 'containers';
import {UserSettingsNav} from 'views/user/components';
import {asyncConnect} from 'helpers';
import {getRecurringPayments} from 'redux/modules/recurringPayments/actions';
import config from 'config';

const UserBasePage = ({
  className,
  isPartnerMasterAccount,
  currentUrl,
  error,
  fixedBottom,
  hasRecurring,
  heading,
  children,
}) => (
    <DashboardLayout
      showPrimaryNavbar
      className={className}
      children={children} // eslint-disable-line react/no-children-prop
      primaryNavbar={{
        centerComponent: <WithdrawButtonContainer />,
        leftComponent: <PrimaryNavLinksContainer />,
      }}
      fixedBottom={fixedBottom}
      secondarySidebar={{
        children: (
          <UserSettingsNav
            isPartnerMasterAccount={isPartnerMasterAccount}
            currentUrl={currentUrl}
            hasRecurring={hasRecurring}
          />
        ),
      }}
    >
      <div className="content-container ph4 pb5">
        {Boolean(error) && (
          <p className="flex mt4 items-center">
            <ExclamationMarkIcon className="h2 mr2" fill={config.colors.brand} />
            <span className="user-base-page-error relative">{error}</span>
            <style jsx>{`
            .user-base-page-error {
              top: 1px;
            }
          `}</style>
          </p>
        )}
        <h1 className="mt4 gray-600">{heading}</h1>
        <div className="mt4">{children}</div>
      </div>
    </DashboardLayout>
  );

const enhance = compose(
  asyncConnect(() => [
    {
      key: GET_RECURRING_PAYMENTS,
      promise: getRecurringPayments,
    },
  ]),
  connect(state => ({
    isPartnerMasterAccount: _.get(state.session, 'partnerMaster.isOrg'),
    hasRecurring:
      _.get(state.recurringPayments, 'recurringPayments.contracts', [])
        .length !== 0,
  }))
);

const EnhancedUserBasePage = Object.assign(enhance(UserBasePage), {
  propTypes: {
    currentUrl: PropTypes.string,
    error: PropTypes.string,
    fixedBottom: PropTypes.element,
    heading: PropTypes.string,
    isPartnerMasterAccount: PropTypes.bool,
  },
});

export default EnhancedUserBasePage;
