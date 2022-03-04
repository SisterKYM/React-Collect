import {omit} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import {Status} from 'elements';

import DiscountItem from './DiscountItem';
import SaveCodeForm from './SaveCodeForm';
import SaveCodeFormCnt from './SaveCodeFormCnt';

const Discount = ({
  browser,
  createDiscountStatus,
  deleteDiscount,
  deleteStatus,
  discountOn,
  discounts,
  isUpgraded,
  saveCodeFormSubmit,
  togglingStatus,
  updateDiscountSubmit,
  updateMetadata,
  updateStatus,
}) => (
  // const isSmall = get(browser, 'greaterThan.extraSmall', false);
  // const pxCx = isSmall ? 'ph4' : 'ph3';

  <>
    <div
      className={cx(
        'text-14',
        'pv3',
        // pxCx,
        togglingStatus === 'pending' ||
          (!discountOn && 'flex justify-center items-center')
      )}
    >
      {(() => {
        if (isUpgraded && togglingStatus === 'pending') {
          return (
            <Status
              messages={{
                pending: `${discountOn ? 'Dis' : 'En'}abling discounts...`,
              }}
              status="pending"
            />
          );
        }

        return (
          <>
            {discounts.length !== 0 && (
              <ul className="mb3">
                {discounts.map((d, i) => (
                  <DiscountItem
                    browser={browser}
                    className={i ? 'mt2 mt3-ns' : ''}
                    deleteDiscount={deleteDiscount}
                    deleteStatus={deleteStatus}
                    key={d.id}
                    updateStatus={updateStatus}
                    updateMetadata={updateMetadata}
                    updateSubmit={updateDiscountSubmit}
                    {...omit(d, [
                      'created_at',
                      'deleted_at',
                      'errors',
                      'updated_at',
                    ])}
                  />
                ))}
              </ul>
            )}
            <SaveCodeFormCnt>
              <SaveCodeForm
                browser={browser}
                form="SaveCodeForm"
                onSubmit={saveCodeFormSubmit}
                status={createDiscountStatus}
              />
            </SaveCodeFormCnt>
          </>
        );
      })()}
    </div>
    <style jsx>{`
      img {
        max-height: 100%;
      }
    `}</style>
  </>
);
const EnhancedAddDiscount = Object.assign(React.memo(Discount), {
  propTypes: {
    browser: PropTypes.object,
    createDiscountStatus: PropTypes.string,
    deleteDiscount: PropTypes.func,
    deleteStatus: PropTypes.string,
    discountOn: PropTypes.bool,
    discounts: PropTypes.arrayOf(PropTypes.object),
    isUpgraded: PropTypes.bool,
    onButtonClick: PropTypes.func,
    onDismiss: PropTypes.func,
    saveCodeFormSubmit: PropTypes.func,
    switchDiscounts: PropTypes.func,
    togglingStatus: PropTypes.string,
    updateDiscountSubmit: PropTypes.func,
    updateStatus: PropTypes.string,
  },
  defaultProps: {
    discountOn: false,
    discounts: [],
  },
});

export default EnhancedAddDiscount;
