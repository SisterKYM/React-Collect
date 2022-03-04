import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import posed, {PoseGroup} from 'react-pose';

import {Checkbox} from 'elements';

const animationConfig = {
  enter: {
    x: 0,
  },
  exit: {
    x: '-200%',
  },
};

const AnimatedTitle = posed.div(animationConfig);
const AnimatedListItem = posed.li(animationConfig);

const MarketplaceShopItemsFilterList = ({
  className,
  title,
  items,
  selectedItemIds,
  onChangeSelectedItemIds,
}) => (
  <div className={cx('pa4', className)}>
    <AnimatedTitle className="f6 merriweather i">{title}</AnimatedTitle>
    <ul className="mv4">
      <PoseGroup>
        {items.map((item, idx) => {
          const handleChange = event => {
            onChangeSelectedItemIds(
              event.target.checked
                ? _.uniq([...selectedItemIds, item.id])
                : selectedItemIds.filter(itemId => itemId !== item.id)
            );
          };

          return (
            <AnimatedListItem key={item.id} className={idx === 0 ? '' : 'mt3'}>
              <Checkbox
                labelClassName="pl3 f6 avenir-medium"
                label={item.name}
                input={{value: selectedItemIds.includes(item.id)}}
                onChange={handleChange}
              />
            </AnimatedListItem>
          );
        })}
      </PoseGroup>
    </ul>
  </div>
);

const EnhancedMarketplaceShopItemsFilterList = React.memo(
  MarketplaceShopItemsFilterList
);

export default EnhancedMarketplaceShopItemsFilterList;
