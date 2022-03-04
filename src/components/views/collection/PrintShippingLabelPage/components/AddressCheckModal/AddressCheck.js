import React from 'react';

import AddressCheckVerticalSeparator from './AddressCheckVerticalSeparator';
import AddressOverview from './AddressOverview';

const AddressCheck = ({
  originAddress,
  easypostAddress,
  onUseEasypostAddress,
  onEditOriginAddress,
}) => {
  const handleUseEasypostAddress = React.useCallback(() => {
    onUseEasypostAddress(easypostAddress);
  }, [easypostAddress, onUseEasypostAddress]);

  return (
    <div className="pa4 bg-white">
      <div className="mw6 mb4 f6 lh-copy avenir-roman gray-600">
        We weren&apos;t able to verify your address as entered, but found a
        close match. Please confirm which is the most accurate or correct the
        address and try again.
      </div>
      <div className="flex">
        <AddressOverview
          buttonPrimary
          className="flex-auto mr3"
          title="Recommended"
          buttonTitle="Use Recommended Address"
          address={easypostAddress}
          onClickButton={handleUseEasypostAddress}
        />
        <AddressCheckVerticalSeparator />
        <AddressOverview
          className="flex-auto ml3"
          title="You Entered"
          buttonTitle="Edit Address I Entered"
          address={originAddress}
          onClickButton={onEditOriginAddress}
        />
      </div>
    </div>
  );
};

const EnhancedAddressCheck = React.memo(AddressCheck);

export default EnhancedAddressCheck;
