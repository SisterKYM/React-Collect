import React from 'react';

const AddressCheckVerticalSeparator = () => (
  <>
    <div className="bg-gray-300" />
    <style jsx>{`
      div {
        width: 1px;
      }
    `}</style>
  </>
);

const EnhancedAddressCheckVerticalSeparator = React.memo(
  AddressCheckVerticalSeparator
);

export default EnhancedAddressCheckVerticalSeparator;
