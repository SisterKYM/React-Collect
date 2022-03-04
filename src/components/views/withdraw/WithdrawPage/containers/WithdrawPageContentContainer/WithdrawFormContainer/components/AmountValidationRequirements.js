import React from 'react';

const AmountValidationRequirements = () => (
  <ul>
    <li>Amount can&apos;t be blank.</li>
    <li>Amount must be positive.</li>
    <li>Amount must be less than or equal to available amount.</li>
    <li>Amount may only include numbers and a single decimal.</li>
    <li>No commas or dollar signs &quot;$&quot;.</li>
  </ul>
);

const EnhancedAmountValidationRequirements = React.memo(
  AmountValidationRequirements
);

export default EnhancedAmountValidationRequirements;
