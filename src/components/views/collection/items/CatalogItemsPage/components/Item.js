import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import {Checkbox, Tooltip} from 'elements';
import {currency} from 'helpers/numbers';
import ImagesUtils from 'helpers/ImagesUtils';

const Item = ({added, item, selected, onToggleSelected}) => {
  const amount = React.useMemo(() => {
    const lowestAmountListing = _.minBy(
      (item.variants && item.variants.enabled && item.variants.listings) || [],
      'amount'
    );

    return lowestAmountListing ? lowestAmountListing.amount : item.amount || 0;
  }, [item]);

  return (
    <div className="bb b--gray-300" style={{padding: '20px 36px'}}>
      <div className="flex items-center">
        {added ? (
          <Tooltip
            arrowPosition={24}
            style={{
              bottom: 27,
              left: -15,
              width: 130,
            }}
            text="Already added"
          >
            <Checkbox
              checked
              disabled
              backgroundColorSet
              labelClassName="bg-gray-300"
            />
          </Tooltip>
        ) : (
          <Checkbox checked={selected} onChange={onToggleSelected} />
        )}
        <div
          className="item-image ml2 contain bg-center"
          style={{
            backgroundImage: `url('${ImagesUtils.getItemMainThumbnailUrl(
              item.images,
              {
                width: 400,
                height: 400,
              }
            )}')`,
          }}
        />
        <div style={{marginLeft: '20px'}}>
          <div className="f5 avenir-roman dark-grey lh1">{item.name || ''}</div>
          <div
            className="avenir-light dark-grey"
            style={{fontSize: '14px', lineHeight: '20px'}}
          >
            {currency(amount)}
          </div>
        </div>
      </div>
      <style jsx>{`
        .item-image {
          width: 5rem;
          height: 5rem;
        }
      `}</style>
    </div>
  );
};

const EnhancedItem = Object.assign(React.memo(Item), {
  propTypes: {
    added: PropTypes.bool,
  },
});

export default EnhancedItem;
