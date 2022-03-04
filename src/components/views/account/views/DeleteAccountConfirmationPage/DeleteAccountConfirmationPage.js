import React, {useCallback, useMemo} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {VerificationPrompt} from 'elements';
import config from 'config';
import {backgroundPath} from '../../Router';

const DeleteAccountConfirmationPage = ({location, history, onDismiss}) => {
  const session = useSelector((state) => state.session);
  const body = `Please share with us the email used on your existing account and which partner affiliation (and tools) you would like to add to your account.\nAccount email: ${session?.user?.email}\nPartner of choice: `;
  const changePartnerAffiliationUrl = `mailto:${config.strings.supportEmail}?subject=Wrong partner affiliation&body=${body}`;
  const planBillingPageLink = useMemo(
    () =>
      `${[
        backgroundPath(location).split('/account/')[0],
        'plan_and_billing',
      ].join('/account/')}`,
    [location]
  );
  const deletePageLink = useMemo(() => `${backgroundPath(location)}/delete`, [
    location,
  ]);
  const showDeleteAccountModal = useCallback(() => {
    history.push({
      pathname: deletePageLink,
    });
  }, [deletePageLink, history]);

  return (
    <VerificationPrompt
      flexibleHeight
      title="Delete Account Confirmation"
      description="Since this action cannot be undone, we want to make sure we understand your goals."
      okButtonLabel="Delete my account"
      onOkButtonClick={showDeleteAccountModal}
      cancelButtonLabel="Keep my account"
      onCancelButtonClick={onDismiss}
      onDismiss={onDismiss}
      cancelFirst
    >
      <div className="avenir-heavy text-16 line-24 mb2">
        Want to cancel a paid subscription?
      </div>
      <div className="mb3-5">
        <Link className="avenir-light" to={planBillingPageLink}>
          Please go here to downgrade.
        </Link>
      </div>
      <div className="avenir-heavy text-16 line-24 mb2">
        Sign up for the wrong partner affiliation?
      </div>
      <div className="mb3-5">
        <a className="avenir-light" href={changePartnerAffiliationUrl}>
          Please contact us and our Support team can help.
        </a>
      </div>
    </VerificationPrompt>
  );
};

const EnhancedDeleteAccountConfirmationPage = React.memo(
  DeleteAccountConfirmationPage
);

export default EnhancedDeleteAccountConfirmationPage;
