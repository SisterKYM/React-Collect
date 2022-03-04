import React from 'react';

import {generatePath} from 'react-router-dom';
import {currency} from 'helpers/numbers';
import config from 'config';
import _ from 'lodash';

import ItemActionsDropdown from './ItemActionsDropdown';

class CollectionItemRow extends React.PureComponent {
  handleReportItem = () => {
    const {history, collection, item} = this.props;
    const path = generatePath(
      '/collection/:owner/:collection/manage/items/item/:item',
      {
        owner: collection.user_id,
        collection: collection.id,
        item: item.id,
      }
    );

    history.push(path);
  };
  handleEditItem = () => {
    const {history, collection, item} = this.props;
    const path = generatePath(
      '/collection/:owner/:collection/manage/items/item/:item/edit',
      {
        owner: collection.user_id,
        collection: collection.id,
        item: item.id,
      }
    );
    history.push(path);
  };
  render() {
    const {item} = this.props;
    const lowestAmountListing = _.minBy(
      (item.options.variants &&
        item.options.variants.enabled &&
        item.options.variants.listings) ||
        [],
      'amount'
    );
    const highestAmountListing = _.maxBy(
      (item.options.variants &&
        item.options.variants.enabled &&
        item.options.variants.listings) ||
        [],
      'amount'
    );
    return (
      <div className="collection-item-row-container relative-ns pv3 bb b--gray-300 ph3 gray-600 ml2">
        <div className="flex items-center">
          <div className="w-40 w-30-ns lh-copy ml2">
            <h4
              className="f6 f5-ns avenir-roman pointer truncate"
              onClick={this.props.onClickPaymentSummary}
            >
              {item.name}
            </h4>
          </div>
          <div className="w-20 flex items-end">
            <div className="w-100 w-80-ns tr f6 f5-ns lh-copy avenir-light gray-600 truncate">
              <span>
                {currency(lowestAmountListing?.amount || item.amount || 0)}
                {lowestAmountListing?.amount !== highestAmountListing?.amount &&
                  '+'}
              </span>
            </div>
          </div>
          <div className="w-20 flex items-end">
            <div className="w-100 w-80-ns tr f6 f5-ns lh-copy avenir-light gray-600">
              {item.available_quantity ? (
                <span>{item.available_quantity}</span>
              ) : (
                item.available_quantity === 0 && (
                  <span className="flamingo">Sold Out</span>
                )
              )}
            </div>
          </div>
          <div className="w-20 flex items-end">
            <div className="w-100 w-80-ns tr f6 f5-ns lh-copy avenir-roman gray-600">
              <span>{currency(item.net_amount || 0)}</span>
            </div>
          </div>
          <div className="flex w-10 items-center justify-end">
            <ItemActionsDropdown
              className="ml3-ns"
              onEditItem={this.handleEditItem}
              onReportItem={this.handleReportItem}
            />
          </div>
        </div>
        <style jsx>{`
          :global(.profile-icon) {
            width: 40px;
            height: 40px;
          }
          .checkbox-align-block {
            height: 21px;
          }
          .collection-item-row-container :global(#default-avatar-icon) {
            fill: ${config.siteName === 'PIXIE_LANE'
              ? config.colors.tint
              : config.colors.lightTint} !important;
            stroke: ${config.colors.lightTint} !important;
          }
        `}</style>
      </div>
    );
  }
}

export default CollectionItemRow;
