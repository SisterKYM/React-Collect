import {get} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import {Checkbox, Input} from 'elements';

const labelStyle = {fontSize: 16};
const radioName = 'appliesTo';

const radioData = [
  {
    label: 'Require minimum purchase to receive discount',
    name: radioName,
    style: labelStyle,
    value: 'total_order_with_minimum',
  },
  {
    label: 'Apply discount on one item (most expensive)',
    name: radioName,
    style: labelStyle,
    value: 'one_item_most_expensive',
  },
];

const SwitchBlock = ({
  browser,
  cutFrom,
  selected,
  updateSwitch,
  validationMinimumPurchase,
  minimumPurchase,
}) => {
  const isBig = get(browser, 'greaterThan.extraSmall', false);

  const radios = radioData
    .map((radio) => ({
      ...radio,
      label: radio.label,
    }))
    .filter((r, i) => (cutFrom ? i < cutFrom : r));

  return (
    <ul>
      {radios.map((r, i) => (
        <li
          className={cx('flex flex-wrap flex-column', i && 'mt3')}
          key={r.value}
        >
          <div className={isBig ? 'mr2' : 'w-100'}>
            <Checkbox
              label={r.label}
              labelStyle={{
                fontSize: 14,
              }}
              name={r.name}
              checked={selected === r.value}
              onChange={() => updateSwitch({appliesTo: r.value})}
              className={
                selected === r.value ? 'checkbox checked' : 'checkbox unchecked'
              }
            />
          </div>
          {selected === r.value && i === 0 && (
            <div
              className={
                isBig
                  ? 'minimum-purchase-input-wrapper w-20 ba b--gray-300 br2'
                  : 'w-100 ba b--gray-300 br2'
              }
            >
              <Input
                autoFocus
                small
                style={{
                  fontSize: 14,
                }}
                borderRadius={false}
                input={{
                  type: 'number',
                }}
                className="number-dollar-currency"
                onChange={(e) =>
                  updateSwitch({minimumPurchase: e.target.value})
                }
                meta={{
                  warning: 'Required',
                  touched: validationMinimumPurchase && !minimumPurchase,
                }}
              />
            </div>
          )}
        </li>
      ))}
      <style jsx>{`
        .minimum-purchase-input-wrapper {
          margin-top: 0px;
          margin-bottom: 0px;
        }
        // :global(.checkbox.unchecked .checkbox-label) {
        //   opacity: 0.5;
        // }
      `}</style>
    </ul>
  );
};

const EnhancedSwitchBlock = Object.assign(React.memo(SwitchBlock), {
  propTypes: {
    browser: PropTypes.shape({
      greaterThan: PropTypes.shape({
        extraSmall: PropTypes.bool,
      }),
    }),
    cutFrom: PropTypes.number,
    selected: PropTypes.string,
  },
});

export default EnhancedSwitchBlock;
