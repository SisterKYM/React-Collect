import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

const RecurringDetails = ({className, title, text, children}) => (
  <li className={cx('f6', className)}>
    <b>{title}</b>: {text}
    {children}
  </li>
);

RecurringDetails.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
};

const EnhancedRecurringDetails = React.memo(RecurringDetails);

export default EnhancedRecurringDetails;
