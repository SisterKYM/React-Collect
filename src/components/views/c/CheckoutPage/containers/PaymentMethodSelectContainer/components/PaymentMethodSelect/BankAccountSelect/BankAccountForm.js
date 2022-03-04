import {FaQuestionCircle} from 'react-icons/fa';
import React from 'react';

import {Checkbox, TextInput, Tooltip} from 'elements';
import ECheckAccountNumberHelpImage from 'theme/images/ECheckAccountNumberHelp.jpg';
import ECheckRoutingNumberHelpImage from 'theme/images/ECheckRoutingNumberHelp.jpg';

const BankAccountForm = ({userLoggedIn, addPayment, value, onChangeValue}) => {
  const handleChangeRoutingNumber = React.useCallback(
    event => {
      onChangeValue({
        ...value,
        routingNumber: event.target.value,
      });
    },
    [value, onChangeValue]
  );
  const handleChangeAccountNumber = React.useCallback(
    event => {
      onChangeValue({
        ...value,
        accountNumber: event.target.value,
      });
    },
    [value, onChangeValue]
  );
  const handleChangeAccountNumberRepeat = React.useCallback(
    event => {
      onChangeValue({
        ...value,
        accountNumberRepeat: event.target.value,
      });
    },
    [value, onChangeValue]
  );
  const handleChangeSaveSource = React.useCallback(() => {
    onChangeValue({
      ...value,
      saveSource: !value.saveSource,
    });
  }, [value, onChangeValue]);

  return (
    <div>
      <div className="cf mb3">
        <TextInput
          required
          className="fl w-90"
          name="routingNumber"
          inputClassName="bank-account-input"
          label="Routing Number"
          placeholder="9 digits"
          value={value.routingNumber}
          onChange={handleChangeRoutingNumber}
        />
        <div className="fl w-10 mt3 pt3 pl3">
          <Tooltip
            style={{left: -144, top: -285}}
            text={
              <img
                className="mw-none"
                src={ECheckRoutingNumberHelpImage}
                alt="Echeck routing number help"
              />
            }
          >
            <FaQuestionCircle className="f4 gray-400 dim pointer" />
          </Tooltip>
        </div>
      </div>
      <div className="cf mb3">
        <TextInput
          required
          className="fl w-90"
          name="accountNumber"
          inputClassName="bank-account-input"
          label="Account Number"
          placeholder="up to 17 digits"
          value={value.accountNumber}
          onChange={handleChangeAccountNumber}
        />
        <div className="fl w-10 mt3 pt3 pl3">
          <Tooltip
            className="pt2 pl1"
            style={{left: -142, top: -276}}
            text={
              <img
                className="mw-none"
                alt="ECheck account number help"
                src={ECheckAccountNumberHelpImage}
              />
            }
          >
            <FaQuestionCircle className="f4 gray-400 dim pointer" />
          </Tooltip>
        </div>
      </div>
      <div className="cf">
        <TextInput
          required
          className="fl w-90"
          name="accountNumberRepeat"
          inputClassName="bank-account-input"
          label="Re-Enter Account Number"
          placeholder="up to 17 digits"
          value={value.accountNumberRepeat}
          onChange={handleChangeAccountNumberRepeat}
        />
      </div>
      {userLoggedIn && !addPayment && (
        <div className="fl flex w-100 mt3 mb3 items-center">
          <Checkbox
            type="checkbox"
            name="saveSource"
            label="Save this account for future payments"
            checked={value.saveSource}
            onChange={handleChangeSaveSource}
          />
        </div>
      )}
      <style jsx>{`
        :global(.bank-account-input) {
          height: 2.6875rem !important;
        }
      `}</style>
    </div>
  );
};

const EnhancedBankAccountForm = React.memo(BankAccountForm);

export default EnhancedBankAccountForm;
