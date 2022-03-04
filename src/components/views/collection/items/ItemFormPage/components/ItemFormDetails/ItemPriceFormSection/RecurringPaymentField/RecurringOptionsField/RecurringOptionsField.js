import React from 'react';

import DateHelpers from 'helpers/DateHelpers';

import RecurringOptionsAmountInfoField from './RecurringOptionsAmountInfoField';
import RecurringOptionsEndsField from './RecurringOptionsEndsField';
import RecurringOptionsRepeatIntervalField from './RecurringOptionsRepeatIntervalField';
import RecurringOptionsStartField from './RecurringOptionsStartField';
import RecurrintOptionsFieldTitle from './RecurrintOptionsFieldTitle';

class RecurringOptionsField extends React.PureComponent {
  constructor(props) {
    super(props);

    if (!props.value) {
      props.onChange({
        start: {
          type: 'first_payment',
        },
        ends: {
          type: 'never',
        },
        repeatInterval: 'P1M',
      });
    }
  }

  getRepeatPeriod = repeatInterval =>
    DateHelpers.parseDuration(repeatInterval).asMonths ? 'month' : 'week';

  handleChangeStart = start => {
    this.props.onChange({
      ...this.props.value,
      start,
    });
  };

  handleChangeRepeatInterval = repeatInterval => {
    const prevRepeatPeriod = this.getRepeatPeriod(
      this.props.value.repeatInterval
    );
    const nextRepeatPeriod = this.getRepeatPeriod(repeatInterval);
    const startType =
      prevRepeatPeriod !== nextRepeatPeriod
        ? 'first_payment'
        : this.props.value.start.type;

    this.props.onChange({
      ...this.props.value,
      start: {
        ...this.props.value.start,
        type: startType,
        date: startType !== 'date' ? undefined : this.props.value.start.date,
      },
      repeatInterval,
    });
  };

  handleChangeEnds = ends => {
    this.props.onChange({
      ...this.props.value,
      ends,
    });
  };

  render() {
    const repeatPeriod = this.getRepeatPeriod(this.props.value.repeatInterval);

    return this.props.value ? (
      <div className="f6 ba b--gray-300">
        <div className="flex-ns items-center-ns">
          <RecurrintOptionsFieldTitle title="Amount charged each cycle" />
          <div className="w-two-thirds-ns">
            <RecurringOptionsAmountInfoField
              value={this.props.amountInfo}
              onChange={this.props.onChangeAmountInfo}
            />
          </div>
        </div>
        <div className="flex-ns items-center-ns bt b--gray-300">
          <RecurrintOptionsFieldTitle title="Repeat payment every" />
          <div className="w-two-thirds-ns">
            <RecurringOptionsRepeatIntervalField
              value={this.props.value.repeatInterval}
              onChange={this.handleChangeRepeatInterval}
            />
          </div>
        </div>
        <div className="flex-ns items-center-ns bt b--gray-300">
          <RecurrintOptionsFieldTitle title="Payment happens on" />
          <div className="w-two-thirds-ns">
            <RecurringOptionsStartField
              repeatPeriod={repeatPeriod}
              value={this.props.value.start}
              onChange={this.handleChangeStart}
            />
          </div>
        </div>
        <div className="flex-ns items-center-ns bt b--gray-300">
          <RecurrintOptionsFieldTitle title="Payments end" />
          <div className="w-two-thirds-ns">
            <RecurringOptionsEndsField
              value={this.props.value.ends}
              onChange={this.handleChangeEnds}
            />
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default RecurringOptionsField;
