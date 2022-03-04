import {IoMdCheckmark} from 'react-icons/io';
import React from 'react';
import cx from 'classnames';

import config from 'config';

const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

class WeekdaySelector extends React.PureComponent {
  renderWeekday = (weekday, idx) => {
    const handleClick = () => {
      this.props.onSelect(weekday);
    };

    return (
      <div
        key={weekday}
        className={cx(idx !== 0 && 'mt3', 'tl avenir-roman pointer')}
        onClick={handleClick}
      >
        {this.props.weekday === weekday && (
          <IoMdCheckmark className="mr2" size={10} color={config.colors.tint} />
        )}
        {weekday}
      </div>
    );
  };

  render() {
    return (
      <div className={this.props.className}>
        {WEEKDAYS.map(this.renderWeekday)}
      </div>
    );
  }
}

export default WeekdaySelector;
