import React from 'react';
import cx from 'classnames';

import ProfileIcon from 'theme/images/Profile.svg';

const PayerOverview = ({className, tabMember, footer}) => (
  <div className={cx('flex', className)}>
    <img className="mr3" alt="Payer profile pic" src={ProfileIcon} />
    <div className="mb0-ns mb4">
      <div className="text-16 avenir-roman">{tabMember.name}</div>
      <a
        className="text-14 avenir-light gray-600"
        rel="noopener noreferrer"
        target="_blank"
        href={`mailto:${tabMember.email}`}
      >
        {tabMember.email}
      </a>
      {footer && <div>{footer}</div>}
    </div>
    <style jsx>{`
      img {
        width: 40px;
        height: 40px;
      }
    `}</style>
  </div>
);

const EnhancedPayerOverview = React.memo(PayerOverview);

export default EnhancedPayerOverview;
