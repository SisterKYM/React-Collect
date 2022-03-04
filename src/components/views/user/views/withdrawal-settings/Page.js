import {compose, mapProps, withHandlers, withState} from 'recompose';
import {connect} from 'react-redux';
import React from 'react';
import config from 'config';

import {BankAccountForm, BankAccountFormCa} from 'views/user/components/forms';
import {List as BankAccountsList} from 'views/user/components/Lists';
import {Status} from 'elements';
import {UserBasePage, Plate} from 'views/user/components';
import {asyncConnect} from 'helpers';

import {ACTIONS, HANDLERS} from './config';
import {connector, mapStore, propsMapper} from './lib';

const WithdrawalSettingsPage = ({
  addAccount,
  bankAccounts,
  baStatus,
  currentUrl,
  isCanadian,
  addingBankStatus,
  onAddAccountFormClose,
  onBankAccountDelete,
  onBankAccountFormSubmit,
  session,
  loading,
  showAddAccountForm,
}) => (
  <UserBasePage currentUrl={currentUrl} heading="Withdrawal Settings">
    <h2 className="mt3 f3">
      This is where we&#8217;ll send the money you collect.
      <br />
      Add as many accounts as you&#8217;d like.
    </h2>
    <div className="mt3 mb3 f6">
      <a rel="noopener noreferrer" target="_blank" href={config.links.withdraw}>
        How long will it take for my funds to deposit?
      </a>
    </div>
    <h5 className="mt3">My Bank Account(s):</h5>
    <div className="withdrawal-settings-page-content-container mt3">
      {loading ? (
        <div className="flex pt4 justify-center items-center">
          <Status status="pending" />
        </div>
      ) : (
        <>
          <BankAccountsList
            items={bankAccounts}
            deleteDisabled={session.bankModificationsDisabled}
            onDelete={onBankAccountDelete}
            status={baStatus}
          />
          <div className="mt3">
            {(() => {
              if (addAccount) {
                return (
                  <Plate onClose={onAddAccountFormClose}>
                    {isCanadian ? (
                      <BankAccountFormCa
                        status={addingBankStatus}
                        onSubmit={onBankAccountFormSubmit}
                      />
                    ) : (
                      <BankAccountForm
                        status={addingBankStatus}
                        onSubmit={onBankAccountFormSubmit}
                      />
                    )}
                  </Plate>
                );
              }

              if (session.bankModificationsDisabled) {
                return (
                  <p className="mt2 ml3 f6">
                    <span className="fw7">
                      Banking information changes are disabled by your
                      organization.
                    </span>
                  </p>
                );
              }

              return (
                <p className="mt2 ml3 f6">
                  <span
                    className="fw7 tint pointer"
                    onClick={showAddAccountForm}
                  >
                    Add Account
                  </span>
                </p>
              );
            })()}
          </div>
        </>
      )}
    </div>
    <style jsx>{`
      .withdrawal-settings-page-content-container {
        max-width: 470px;
      }
    `}</style>
  </UserBasePage>
);

const enhance = compose(
  asyncConnect(connector),
  connect(mapStore, ACTIONS),
  withState('addAccount', 'toggleAddAccount'),
  mapProps(propsMapper),
  withHandlers(HANDLERS),
  React.memo
);

const EnhancedWithdrawalSettingsPage = enhance(WithdrawalSettingsPage);

export default EnhancedWithdrawalSettingsPage;
