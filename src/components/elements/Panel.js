import cx from 'classnames';
import React from 'react';

const Panel = ({className, heading, children}) => (
  <div className={cx('bg-white ba b--gray-300 br2-ns shadow-6', className)}>
    <header className="pa3-5 bb b--gray-300">
      <h3 className="ttu f-small avenir-roman dark-grey">{heading}</h3>
    </header>
    <div className="pa4">{children}</div>
    <style jsx>{`
      header {
        padding: 1.5rem;
      }
    `}</style>
  </div>
);

export default Panel;
