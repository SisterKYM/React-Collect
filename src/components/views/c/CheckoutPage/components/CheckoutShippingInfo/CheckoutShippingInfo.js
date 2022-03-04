import cx from 'classnames';
import React from 'react';

import {currency} from 'helpers/numbers';
import {MarkdownParagraph} from 'elements';

import CheckoutShipToMeForm from './CheckoutShipToMeForm';
import MasterDetailLayout from '../MasterDetailLayout';

const CheckoutShippingInfo = ({
  className,
  shippingFree,
  shippingOptions,
  value,
  onChangeValue,
}) => {
  const masterStates = React.useMemo(() => {
    const options = [
      {
        key: 'TO_ME',
        title: (
          <>
            <span className="mr2">Ship to Me</span>
            {shippingFree ? (
              <>
                <span className="strike">
                  ({currency(shippingOptions.cost)})
                </span>
                <span className="ml2 brand">Free!</span>
              </>
            ) : (
              `(${currency(shippingOptions.cost)})`
            )}
          </>
        ),
      },
    ];
    if (shippingOptions.localPickupEnabled) {
      options.push({
        key: 'LOCAL_PICKUP',
        title: 'Local Pickup (free)',
      });
    }

    return options;
  }, [shippingFree, shippingOptions]);

  return (
    <MasterDetailLayout
      className={cx('ph3 ph4-ns pv4 shadow-6 br2-ns bg-white', className)}
      heading="Shipping Method"
      masterStates={masterStates}
      selectedMasterStateKey={value.method}
      onChangeSelectedMasterStateKey={nextMethod => {
        onChangeValue({
          ...value,
          method: nextMethod,
        });
      }}
      renderDetail={selectedMethod => {
        switch (selectedMethod) {
          case 'TO_ME':
            return (
              <CheckoutShipToMeForm
                value={value}
                onChangeValue={onChangeValue}
              />
            );
          case 'LOCAL_PICKUP':
            return shippingOptions.localPickupInstructions ? (
              <>
                <MarkdownParagraph
                  className="checkout-shipping-info-markdown-paragraph pa3 f6 bg-gray-200"
                  markdown={shippingOptions.localPickupInstructions}
                />
                <style jsx>{`
                  :global(.checkout-shipping-info-markdown-paragraph) {
                    line-height: 1.4285 !important;
                  }
                `}</style>
              </>
            ) : null;
          default:
            return null;
        }
      }}
    />
  );
};

const EnhancedCheckoutShippingInfo = React.memo(CheckoutShippingInfo);

export default EnhancedCheckoutShippingInfo;
