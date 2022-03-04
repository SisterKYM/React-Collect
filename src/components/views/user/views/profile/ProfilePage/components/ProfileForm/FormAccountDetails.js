import PropTypes from 'prop-types';
import React from 'react';

import config from 'config';
import {Input, Select} from 'elements';
import CAFlagIcon from 'theme/images/CAFlag.svg';
import USFlagIcon from 'theme/images/USFlag.svg';
import accountTypes from 'helpers/accountTypes';

import ProfileFormField from './ProfileFormField';

const FormAccountDetails = ({
  browser,
  country,
  editDisabled,
  showOrgFields,
}) => (
  <div>
    <ProfileFormField
      component={Select}
      className="avenir-light"
      fontFamilySet
      borderRadius
      name="accountType"
      disabled={editDisabled}
      options={[
        {
          children: 'Individual Account',
          value: accountTypes.INDIVIDUAL,
        },
        {
          children: 'Organization Account',
          value: accountTypes.ORGANIZATION,
        },
      ]}
      {...(editDisabled && {
        tooltip: `Your account has been verified. For changes, please contact ${config.strings.name} Support.`,
      })}
      tooltipArrowPosition={browser.lessThan.medium ? '93%' : ''}
      tooltipStyle={{
        left: browser.lessThan.medium ? -177 : -90,
        textAlign: 'left',
        top: -95,
        width: 200,
      }}
    />
    <div className="mt3">
      <ProfileFormField
        component={Input}
        name="display_name"
        placeholder={`${
          showOrgFields
            ? 'Organization Name'
            : `Name to appear on ${config.strings.collection}s`
        }`}
        tooltip={`This is the name your payers will see on your ${config.strings.collection} pages.`}
        tooltipArrowPosition={browser.lessThan.medium ? '93%' : ''}
        tooltipStyle={{
          left: browser.lessThan.medium ? -177 : -90,
          textAlign: 'left',
          top: -85,
          width: 200,
        }}
      />
    </div>
    <div className="mt3">
      <ProfileFormField component={Input} name="email" placeholder="E-mail" />
    </div>
    <div className="flex mt3 items-center f6">
      {(() => {
        if (country === 'US') {
          return (
            <>
              <img className="mr2" alt="United States" src={USFlagIcon} />
              United States (US Dollar)
            </>
          );
        }

        if (country === 'CA') {
          return (
            <>
              <img className="mr2" alt="Canada" src={CAFlagIcon} />
              Canada (Canadian Dollar)
            </>
          );
        }

        return null;
      })()}
    </div>
    <style jsx>{`
      img {
        width: 40px;
        height: 40px;
      }
    `}</style>
  </div>
);

FormAccountDetails.propTypes = {
  browser: PropTypes.object,
  fieldsNeeded: PropTypes.arrayOf(PropTypes.string),
};

const EnhancedFormAccountDetails = React.memo(FormAccountDetails);

export default EnhancedFormAccountDetails;
