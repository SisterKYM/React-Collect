import React from 'react';
import cx from 'classnames';
import numeral from 'numeral';

const CoundownCell = ({className, title, value}) => (
  <div
    className={cx(
      'countdown-cell-container flex justify-center items-center ba b--gray-300 overflow-hidden',
      className
    )}
  >
    <div className="tc">
      <p className="f1-ns f3 brand">{numeral(value).format('00')}</p>
      <p className="f7-ns f9 ttu truncate">{title}</p>
    </div>
    <style jsx>{`
      .countdown-cell-container {
        height: 4rem;
        width: 4rem;
      }

      @media (min-width: 60em) {
        .countdown-cell-container {
          height: 5rem;
          width: 5rem;
        }
      }
    `}</style>
  </div>
);

const EnhancedCoundownCell = React.memo(CoundownCell);

export default EnhancedCoundownCell;
