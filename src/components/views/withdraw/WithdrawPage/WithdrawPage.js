import {useSuspenseQuery} from 'react-fetching-library';
import React from 'react';
import config from 'config';

import {ModalCloseButton} from 'elements';
import {GrowlAlertsContainer} from 'containers';

import {
  createGetCollectionsQuery,
  createGetExternalAccountsQuery,
} from 'queryCreators';

import {
  DisputesBannerContainer,
  WithdrawPageContentContainer,
} from './containers';

const WithdrawPageContext = React.createContext();

const useWithdrawPage = () => {
  const getCollectionsQueryAction = React.useMemo(
    createGetCollectionsQuery,
    []
  );
  const getCollectionsQuery = useSuspenseQuery(getCollectionsQueryAction);

  const getExternalAccountsQueryAction = React.useMemo(
    createGetExternalAccountsQuery,
    []
  );
  const getExternalAccountsQuery = useSuspenseQuery(
    getExternalAccountsQueryAction
  );

  return {getCollectionsQuery, getExternalAccountsQuery};
};

const WithdrawPage = ({history}) => {
  const contextValue = useWithdrawPage();

  return (
    <WithdrawPageContext.Provider value={contextValue}>
      <div className="white-background" />
      <GrowlAlertsContainer />
      <ModalCloseButton
        className="top-1"
        color="medium-grey"
        onClick={history.goBack}
      />
      <div
        className="pa3 pa4-ns pb3 bb bg-white gray-600"
        style={{borderColor: '#E2E3E4'}}
      >
        <h1 className="text-24 avenir-roman">Withdraw Money</h1>
        <p className="avenir-light lh-copy">
          Once a withdrawal is initiated, funds deposit to the linked bank
          account in 1-3 business days. At times, withdrawals can take longer to
          reach your bank account due to internal compliance. &nbsp;
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={config.links.withdraw}
          >
            Learn more
          </a>
        </p>
      </div>
      <DisputesBannerContainer />
      <div className="pa3 pa4-ns bg-white">
        <WithdrawPageContentContainer />
      </div>
      <style jsx>{`
        .white-background {
          position: fixed;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          background-color: white;
          z-index: -1;
        }
      `}</style>
    </WithdrawPageContext.Provider>
  );
};

const EnhancedWithdrawPage = React.memo(WithdrawPage);

export {WithdrawPageContext};
export default EnhancedWithdrawPage;
