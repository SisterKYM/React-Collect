import React from 'react';
import moment from 'moment';

import DateHelpers from 'helpers/DateHelpers';

import RecurringOptionsInput from './RecurringOptionsInput';

class RecurringOptionsRepeatIntervalField extends React.PureComponent {
  getValueParsed = () => {
    const durationParsed = DateHelpers.parseDuration(this.props.value);
    const period = durationParsed.asMonths ? 'month' : 'week';

    return {
      period,
      count:
        period === 'month' ? durationParsed.asMonths : durationParsed.asWeeks,
    };
  };

  handleChange = (value) => {
    const count = Number.parseInt(value.text || 0, 10);
    const isoDuration = moment
      .duration(count, value.type === 'month' ? 'months' : 'weeks')
      .toISOString();

    if (isoDuration !== 'Invalid date') {
      this.props.onChange(isoDuration);
    }
  };

  render() {
    const valueParsed = this.getValueParsed();

    return (
      <RecurringOptionsInput
        reversed
        typeOptions={[
          {
            label: 'week(s)',
            value: 'week',
          },
          {
            label: 'month(s)',
            value: 'month',
          },
        ]}
        value={{
          type: valueParsed.period,
          text: valueParsed.count,
        }}
        onChange={this.handleChange}
      />
    );
  }
}

export default RecurringOptionsRepeatIntervalField;
