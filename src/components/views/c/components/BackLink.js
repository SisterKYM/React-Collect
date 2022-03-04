import {Link} from 'react-router-dom';
import {IoIosArrowRoundBack} from 'react-icons/io';
import cx from 'classnames';
import React from 'react';

const BackLink = ({className, to, onClick, children}) => {
  const Container = onClick ? 'span' : Link;

  return (
    <Container
      className={cx('flex items-center dim pointer', className)}
      to={to}
      onClick={onClick}
    >
      <IoIosArrowRoundBack className="tint f3 mr3" />
      <span className="text-14 avenir-roman tint">{children}</span>
    </Container>
  );
};

const EnhancedBackLink = React.memo(BackLink);

export default EnhancedBackLink;
