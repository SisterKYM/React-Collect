import {chunk, times} from 'lodash';
import React from 'react';

const MONTH_DAY_COUNT = 28;
const DAYS_PER_ROW_COUNT = 7;

class MonthDaySelector extends React.PureComponent {
  renderMonthDay = (monthDay, idx) => {
    const handleClick = () => {
      this.props.onSelect(monthDay);
    };

    return (
      <div
        key={idx}
        className="month-day-wrapper tr avenir-roman pointer"
        onClick={handleClick}
      >
        {monthDay}
        <style jsx>{`
          .month-day-wrapper {
            width: 32px;
            height: 32px;
          }
        `}</style>
      </div>
    );
  };

  renderRow = (rowMonthDays, idx) => (
    <div key={idx} className="flex">
      {rowMonthDays.map(this.renderMonthDay)}
    </div>
  );

  render() {
    const monthDays = times(MONTH_DAY_COUNT, monthDay => monthDay + 1);
    const monthDaysChunked = chunk(monthDays, DAYS_PER_ROW_COUNT);

    return (
      <div className={this.props.className}>
        {monthDaysChunked.map(this.renderRow)}
      </div>
    );
  }
}

export default MonthDaySelector;
