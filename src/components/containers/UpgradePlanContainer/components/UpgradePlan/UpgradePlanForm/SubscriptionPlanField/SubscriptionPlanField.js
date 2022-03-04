import React from 'react';

import SubscriptionPlanFieldPanel from './SubscriptionPlanFieldPanel';

const SubscriptionPlanField = ({disabled, fieldPanels = [], input}) => {
  React.useEffect(() => {
    input.onChange(input.value);
  }, [input]);

  const handleClick = React.useCallback(
    (value) => {
      if (!disabled) {
        input.onChange(value);
      }
    },
    [disabled, input]
  );

  return fieldPanels.map((fieldPanel, idx) => (
    <SubscriptionPlanFieldPanel
      key={fieldPanel.value}
      className={idx !== 0 && 'mt3'}
      value={fieldPanel.value}
      onClick={handleClick}
      title={fieldPanel.title}
      description={fieldPanel.description}
      discountBadge={fieldPanel.discountBadge}
      checked={input.value === fieldPanel.value}
    />
  ));
};

const EnhancedSubscriptionPlanField = React.memo(SubscriptionPlanField);

export default EnhancedSubscriptionPlanField;
