import React from 'react';
import moment from 'moment';

import {CommonButton, Dropdown} from 'elements';

import MonthDaySelector from './MonthDaySelector';
import OrSeparator from './OrSeparator';
import WeekdaySelector from './WeekdaySelector';

class RecurringOptionsStartFieldDropdown extends React.PureComponent {
  state = {
    dropdownOpen: false,
  };

  getDropdownTitle = () => {
    const {value, repeatPeriod} = this.props;

    if (value.type === 'first_payment') {
      return 'first day of payment';
    }

    return repeatPeriod === 'week'
      ? moment(value.date, 'M/D/YYYY').format('dddd')
      : `${moment(value.date, 'M/D/YYYY').format('Do')} day of ${repeatPeriod}`;
  };

  handleDropdownContentClick = () => {
    this.setState(prevState => ({dropdownOpen: !prevState.dropdownOpen}));
  };

  handleDropdownDismiss = () => {
    this.setState({dropdownOpen: false});
  };

  handleSelectMonthDay = month => {
    const date = moment({date: month});

    if (date.isBefore(moment(), 'day')) {
      date.add(1, 'month');
    }

    this.props.onChange({
      type: 'date',
      date: date.toDate(),
    });

    this.setState({dropdownOpen: false});
  };

  handleSelectWeekday = weekday => {
    const date = moment().day(weekday);

    if (date.isBefore(moment(), 'day')) {
      date.add(1, 'week');
    }

    this.props.onChange({
      type: 'date',
      date: date.toDate(),
    });

    this.setState({dropdownOpen: false});
  };

  handleSelectFirstDayOfPayment = event => {
    event.preventDefault();

    this.props.onChange({
      type: 'first_payment',
      date: undefined,
    });

    this.setState({dropdownOpen: false});
  };

  render() {
    return (
      <Dropdown
        border
        className={this.props.className}
        bodyClassName="br2"
        width="auto"
        open={this.state.dropdownOpen}
        body={
          <div className="flex flex-column flex-row-ns pa3 items-center items-start-ns gray-600">
            <div className="w-100 w-40-ns">
              <div className="mb3 avenir-roman">
                Start series of payments on a day of the{' '}
                {this.props.repeatPeriod}
              </div>
              {this.props.repeatPeriod === 'month' ? (
                <MonthDaySelector onSelect={this.handleSelectMonthDay} />
              ) : (
                <WeekdaySelector
                  weekday={
                    this.props.value.date
                      ? moment(this.props.value.date, 'M/D/YYYY').format('dddd')
                      : undefined
                  }
                  onSelect={this.handleSelectWeekday}
                />
              )}
            </div>
            <OrSeparator className="mh3" />
            <div className="w-100 w-40-ns">
              <div className="mb4 avenir-roman">
                Start series on first day of payment
              </div>
              <div className="flex items-center">
                <CommonButton
                  className="pt-14 gray-600 bg-light-tint"
                  onClick={this.handleSelectFirstDayOfPayment}
                >
                  Immediately
                </CommonButton>
              </div>
            </div>
          </div>
        }
        onDismiss={this.handleDropdownDismiss}
      >
        <div
          className="pv2 mh3 tint pointer"
          onClick={this.handleDropdownContentClick}
        >
          {this.getDropdownTitle()}
        </div>
      </Dropdown>
    );
  }
}

export default RecurringOptionsStartFieldDropdown;
