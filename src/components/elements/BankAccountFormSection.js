import {FaQuestionCircle} from 'react-icons/fa';
import {Field} from 'redux-form';
import React from 'react';

import ECheckAccountNumberHelpImage from 'theme/images/ECheckAccountNumberHelp.jpg';
import ECheckRoutingNumberHelpImage from 'theme/images/ECheckRoutingNumberHelp.jpg';
import Input from 'elements/Input';
import Tooltip from 'elements/Tooltip';

const BankAccountFormSection = () => (
  <>
    <div className="mb3">
      <div className="mb2 f6">Routing Number</div>
      <div className="flex">
        <div className="flex-auto">
          <Field
            border
            component={Input}
            className="dark-grey"
            style={{height: '34px'}}
            name="routingNumber"
            placeholder="9 digits"
            validate={value => !value && 'Required'}
          />
        </div>
        <div className="bank-account-form-section-info-tooltip-toggle-container flex justify-end items-center">
          <Tooltip
            style={{
              left: -148,
              top: -285,
              width: '310px',
              height: '271px',
              pointerEvents: 'none',
            }}
            text={
              <img
                src={ECheckRoutingNumberHelpImage}
                alt="Echeck routing number help"
              />
            }
          >
            <div className="pointer">
              <FaQuestionCircle className="gray-400" size={18} />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
    <div className="mb3">
      <div className="mb2 f6">Account Number</div>
      <div className="flex">
        <div className="flex-auto">
          <Field
            border
            component={Input}
            className="dark-grey"
            style={{height: '34px'}}
            name="accountNumber"
            placeholder="up to 17 digits"
            validate={value => !value && 'Required'}
          />
        </div>
        <div className="bank-account-form-section-info-tooltip-toggle-container flex justify-end items-center">
          <Tooltip
            style={{
              left: -148,
              top: -285,
              width: '310px',
              height: '271px',
              pointerEvents: 'none',
            }}
            text={
              <img
                alt="ECheck account number help"
                src={ECheckAccountNumberHelpImage}
              />
            }
          >
            <div className="pointer">
              <FaQuestionCircle className="gray-400" size={18} />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
    <div className="mb3">
      <div className="mb2 f6">Re-Enter Account Number</div>
      <div className="flex">
        <div className="flex-auto">
          <Field
            border
            component={Input}
            className="dark-grey"
            style={{height: '34px'}}
            name="accountNumberRepeat"
            placeholder="up to 17 digits"
            validate={value => !value && 'Required'}
          />
        </div>
        <div className="bank-account-form-section-info-tooltip-toggle-container" />
      </div>
    </div>
    <style jsx>{`
      .bank-account-form-section-info-tooltip-toggle-container {
        width: 30px;
      }
    `}</style>
  </>
);

const EnhancedBankAccountFormSection = React.memo(BankAccountFormSection);

export default EnhancedBankAccountFormSection;
