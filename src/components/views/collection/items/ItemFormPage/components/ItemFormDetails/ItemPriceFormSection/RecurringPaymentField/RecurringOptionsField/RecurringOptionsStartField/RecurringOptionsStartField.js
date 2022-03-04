import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import React from 'react';
import moment from 'moment';

import DateHelpers from 'helpers/DateHelpers';

import RecurringOptionsStartFieldDropdown from './RecurringOptionsStartFieldDropdown';

class RecurringOptionsStartField extends React.PureComponent {
  filterDate = date => {
    const momentDate = moment(date);

    return (
      momentDate.isSameOrAfter(moment()) &&
      (this.props.repeatPeriod === 'month'
        ? momentDate.date() === moment(this.props.value.date, 'M/D/YYYY').date()
        : momentDate.day() === moment(this.props.value.date, 'M/D/YYYY').day())
    );
  };

  handleSelectStartDate = formattedDate => {
    this.props.onChange({
      type: 'date',
      date: formattedDate,
    });
  };

  render() {
    return (
      <div className="flex items-center">
        <RecurringOptionsStartFieldDropdown
          className="w-40"
          repeatPeriod={this.props.repeatPeriod}
          value={this.props.value}
          onChange={this.props.onChange}
        />
        {this.props.value.type === 'date' && (
          <div className="w-60">
            <DatePicker
              filterDate={this.filterDate}
              customInput={
                <div>
                  <div className="flex items-center">
                    <div className="ph3 pv2 f7 bg-gray-200 ba b--gray-300 gray-600 pointer">
                      Beginning no earlier than
                    </div>
                    <div className="ml2 f7 tint">
                      {DateHelpers.format(moment(this.props.value.date))}
                    </div>
                  </div>
                </div>
              }
              selected={new Date(this.props.value.date)}
              onChange={this.handleSelectStartDate}
            />
          </div>
        )}
      </div>
    );
  }
}

export default RecurringOptionsStartField;
