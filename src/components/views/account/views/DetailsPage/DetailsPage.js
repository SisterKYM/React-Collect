import React, {useCallback, useMemo} from 'react';
import {useSelector} from 'react-redux';

import config from 'config';
import {Tooltip} from 'elements';

import {DetailsForm} from './components';

const tooltipStyle = {
  width: 200,
  zIndex: 10,
  top: 30,
  left: -17,
};

const DetailsPage = ({history}) => {
  const user = useSelector((state) => state.session?.user);
  const verified = useMemo(() => !user?.editable, [user]);

  const balance = useSelector((state) => state.session?.balance);
  const deleteAccount = useCallback(() => {
    if (balance > 0) {
      history.push('details/withdraw');
    } else {
      history.push('details/confirm-delete');
    }
  }, [balance, history]);

  const changeAccountDetails = `mailto:${config.strings.supportEmail}?subject=Change To My Cheddar Up Account&body=Please make the following changes to my account details`;

  return (
    <>
      <h1 className="avenir-roman dark-grey mb2 tc text-32">Account Details</h1>
      <div className="text-18 line-24 dark-grey mb3 tc p4">
        {verified ? (
          <>
            Your account has been verified.
            <br /> For changes, contact{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={changeAccountDetails}
            >
              Cheddar Up Support.
            </a>
          </>
        ) : (
          <>
            In order to withdraw your funds, we{"'"}ll need the following
            information to verify your account.
          </>
        )}
      </div>
      {!verified && (
        <div className="flex justify-center">
          <Tooltip
            style={tooltipStyle}
            className="tint text-14 pointer"
            text="You can customize what payers see on their credit card statements. We recommended choosing something that your community will recognize to avoid disputes."
          >
            Why do I need to provide this?
          </Tooltip>
        </div>
      )}
      <DetailsForm />
      <span className="pointer text-14 tint" onClick={deleteAccount}>
        Delete Account
      </span>
      <style>{`
        .tooltip-tip {
          background-color: white !important;
          color: black;
          border-radius: 4px;
          border: solid 1px #dfdedf;
          text-align: left;
          box-shadow: 0px 0px 8px #0000004d;
        }
        .tooltip-arrow {
          border-top: none !important;
          border-bottom: 6px solid #fff;
          top: -5px;
        }
      `}</style>
    </>
  );
};

const EnhancedDetailsPage = React.memo(DetailsPage);

export default EnhancedDetailsPage;
