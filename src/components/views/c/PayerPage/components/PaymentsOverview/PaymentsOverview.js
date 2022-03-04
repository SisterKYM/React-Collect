import {generatePath, Link} from 'react-router-dom';
import _ from 'lodash';
import cx from 'classnames';
import React from 'react';

import {Button} from 'elements';
import {currency} from 'helpers/numbers';
import {ProgressBar} from './components';

const MAX_VISIBLE_PAYERS_COUNT = 8;

const PaymentsOverview = ({className, publicCollection}) => {
  const totalCollectedVisible =
    typeof publicCollection.totalCollected === 'number';

  const payers = React.useMemo(
    () => _.take(publicCollection.payers || [], MAX_VISIBLE_PAYERS_COUNT),
    [publicCollection.payers]
  );
  const hasMorePayers =
    (publicCollection.payers || []).length > MAX_VISIBLE_PAYERS_COUNT;

  const paymentGoalVisible = publicCollection.paymentGoal?.enabled;
  const paymentGoalValue = publicCollection.paymentGoal?.value;

  return (
    <div className={cx('ph3 ph4-ns pv4 bg-white br2-ns shadow-6', className)}>
      {(totalCollectedVisible || paymentGoalVisible) && (
        <>
          <h1 className="f-small avenir-roman gray-550 ttu">Total Collected</h1>
          <p className="mt3 f2 merriweather gray-600 mb3">
            {currency(publicCollection.totalCollected)}
            {paymentGoalVisible && paymentGoalValue > 0 && (
              <span className="avenir-light ml3 text-16">
                raised of{' '}
                <strong className="avenir-heavy">
                  {currency(paymentGoalValue)} Goal
                </strong>
              </span>
            )}
          </p>
          {paymentGoalVisible && paymentGoalValue > 0 && (
            <ProgressBar
              width={400}
              ratio={publicCollection.totalCollected / paymentGoalValue}
            />
          )}
        </>
      )}
      {payers.length !== 0 && (
        <>
          <h1
            className={cx(
              'f-small avenir-roman gray-550 ttu',
              totalCollectedVisible && 'mt4'
            )}
          >
            Contributors
          </h1>
          <ul className="cf mt3">
            {payers.map((payer, idx) => (
              <li
                className="fl w-50 w-third-m w-25-l mb2 f-small merriweather gray-600"
                key={idx}
              >
                {payer}
              </li>
            ))}
          </ul>
          {hasMorePayers && (
            <Link
              to={generatePath('/c/:collection/payers', {
                collection: publicCollection.slug,
              })}
            >
              <Button
                small
                fontSizeSet
                colorSet
                backgroundColorSet
                className="ph4 mt3 f-small avenir-roman tc bg-light-tint dim br2 gray-600"
              >
                Show All
              </Button>
            </Link>
          )}
        </>
      )}
    </div>
  );
};

const EnhancedPaymentsOverview = React.memo(PaymentsOverview);

export default EnhancedPaymentsOverview;
