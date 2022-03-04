import React from 'react';

import {BigCheckbox, CommonButton} from 'elements';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';

class ItemAmountTypeField extends React.PureComponent {
  originalAmountType = '';

  handleSelectOpenAmountType = () => {
    this.props.amount_type.input.onChange('open');
    this.props.options.recurring.enabled.input.onChange(false);
  };

  handleSelectExactAmountType = () => {
    this.props.amount_type.input.onChange('fixed');
    this.props.options.recurring.enabled.input.onChange(false);
  };

  handleSelectRecurringAmountType = () => {
    if (this.props.onWillChangeRecurringEnabled()) {
      this.props.options.recurring.enabled.input.onChange(true);
    } else {
      this.originalAmountType = this.props.amount_type.input.value;
      this.props.amount_type.input.onChange('recurring');
    }
  };

  rollBackAmountType = () => {
    if (this.originalAmountType) {
      this.props.amount_type.input.onChange(this.originalAmountType);
    }
  };

  upgradeToTeam = () => {
    this.props.history.push(`${this.props.location.pathName}/i/plans`);
  };

  render() {
    const {
      amount_type: {
        input: {value: amountType},
      },
      options: {
        recurring: {
          enabled: {
            input: {value: recurringEnabled},
          },
        },
      },
    } = this.props;

    return !recurringEnabled && amountType === 'recurring' ? (
      <div className="gray-600">
        <div className="text-18 avenir-roman">Set up recurring payments</div>
        <div className="text-14 avenir-roman mt2">
          Upgrade to our Team Plan to automatically get paid on the schedule you
          select. Great for monthly tuition, team fee installments, and monthly
          giving campaigns
        </div>
        <div className="mt2 mt3-ns flex">
          <CommonButton
            className="pt-14 bg-tint white mr3"
            onClick={this.upgradeToTeam}
          >
            Upgrade to Team
          </CommonButton>
          <CommonButton
            className="pt-14 bg-gray-250"
            onClick={this.rollBackAmountType}
          >
            Not Now
          </CommonButton>
        </div>
      </div>
    ) : (
      <>
        <div className="flex h2 mb3 items-center">
          <BigCheckbox
            name="exact-amount"
            id="exact-amount"
            label="Exact Amount"
            size={22}
            labelFontSizeSet
            checked={!recurringEnabled && amountType === 'fixed'}
            onChange={this.handleSelectExactAmountType}
          />
          {!recurringEnabled &&
            amountType === 'fixed' &&
            this.props.itemAmountField &&
            this.props.itemAmountField}
        </div>
        <div className="h2 mb3">
          <BigCheckbox
            name="open-amount"
            id="open-amount"
            label="Any Amount"
            size={22}
            labelFontSizeSet
            checked={!recurringEnabled && amountType === 'open'}
            onChange={this.handleSelectOpenAmountType}
          />
        </div>
        <div className="h2">
          <BigCheckbox
            name="recurring-amount"
            id="recurring-amount"
            label="Recurring Amount"
            size={22}
            labelFontSizeSet
            checked={recurringEnabled}
            onChange={this.handleSelectRecurringAmountType}
          />
        </div>
      </>
    );
  }
}

const enhance = compose(withRouter, React.memo);

const EnhancedItemAmountTypeFieldn = enhance(ItemAmountTypeField);

export default EnhancedItemAmountTypeFieldn;
