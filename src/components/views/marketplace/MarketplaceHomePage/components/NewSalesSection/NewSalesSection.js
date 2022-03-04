import {Link} from 'react-router-dom';
import React from 'react';
import cx from 'classnames';

import ForwardCircleArrowActive from 'theme/images/ForwardCircleArrow.Active.svg';

import {MarketplaceSectionTitle} from '../../../components';
import NewSalesItem from './NewSalesItem';

const MAX_SALE_COUNT = 4;

const NewSalesSection = ({className, sales: allSales, salesPath}) => {
  const sales = React.useMemo(() => allSales.slice(0, MAX_SALE_COUNT), [
    allSales,
  ]);

  return (
    <div className={className}>
      <div className="flex items-center hide-child">
        <MarketplaceSectionTitle>New Sales</MarketplaceSectionTitle>
        <Link className="ml3 child" to={salesPath}>
          <img alt="Arrow forward" src={ForwardCircleArrowActive} />
          <style jsx>{`
            img {
              height: 1.75rem;
            }
          `}</style>
        </Link>
      </div>
      <div className="cf mt3">
        {sales.map((sale, idx) => (
          <div
            key={sale.id}
            className={cx(
              'fl w-100 w-50-m w-25-l h4',
              idx !== 0 && 'pl3-l pt3 pt0-ns',
              idx % 2 !== 0 && 'pl3-m',
              idx > 1 && 'pt3-m pt0-l'
            )}
          >
            <NewSalesItem sale={sale} />
          </div>
        ))}
      </div>
    </div>
  );
};

const EnhancedNewSalesSection = React.memo(NewSalesSection);

export default EnhancedNewSalesSection;
