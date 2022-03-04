import React from 'react';
import cx from 'classnames';

import BigCheckbox from 'elements/BigCheckbox';

const SubscriptionPlanFieldPanel = ({
  className,
  value,
  input,
  title,
  description,
  checked,
  discountBadge,
  onClick,
}) => {
  const handleClick = React.useCallback(() => {
    onClick(value);
  }, [onClick, value]);

  return (
    <div
      className={cx(
        'flex flex-column br2 pointer overflow-hidden ph1',
        checked ? 'gray-600 bg-white' : 'white bg-alert',
        className
      )}
      onClick={handleClick}
    >
      <div className="pv3 flex flex-wrap items-center">
        <div className="flex w-100 w-two-thirds-ns pa3 pa0-ns items-center">
          <div className="pr2 pr3-ns pl3-ns">
            <BigCheckbox
              labelClassName={
                checked
                  ? 'subscription-plan-field-panel-label-checked'
                  : 'subscription-plan-field-panel-label-unchecked'
              }
              checked={checked}
              label={
                <>
                  <div className="subscription-field-panel-title mb2 avenir-roman">
                    {title}
                  </div>
                  <div className="f6">{description}</div>
                </>
              }
              size={27}
              onChange={() => {}}
              input={{
                ...input,
                checked,
              }}
            />
          </div>
        </div>
        {Boolean(discountBadge) && (
          <div className="discount-badge-container w-100 w-third-ns">
            {discountBadge}
          </div>
        )}
      </div>
      <style jsx>{`
        .subscription-field-panel-title {
          font-size: 1.375rem;
        }
        :global(.subscription-plan-field-panel-label-unchecked) {
          color: #ffffff !important;
        }
        :global(.subscription-plan-field-panel-label-checked) {
          color: #373737 !important;
        }
        .discount-badge-container {
          height: 8rem;
        }
      `}</style>
    </div>
  );
};

const EnhancedSubscriptionPlanFieldPanel = React.memo(
  SubscriptionPlanFieldPanel
);

export default EnhancedSubscriptionPlanFieldPanel;
