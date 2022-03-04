import React from 'react';

import {generatePath} from 'react-router-dom';
import {currency} from 'helpers/numbers';
import config from 'config';
import moment from 'moment';
import {Tooltip} from 'components/elements';
import _ from 'lodash';

class CollectionMemberRow extends React.PureComponent {
  handleReportMember = () => {
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
  handleEditMember = () => {
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

    return (
      <div className="collection-item-row-container relative-ns pv3 bb b--gray-300 ph3 gray-600 ml2">
        <div className="flex items-center">
          <div className="w-40 w-30-ns lh-copy ml2">
            <h4
              className="f6 f5-ns avenir-roman pointer truncate"
              onClick={this.props.onClickPaymentSummary}
            >
              {item.name}
              <br />
              <span className="avenir-light tint text-14">{item.email}</span>
            </h4>
          </div>
          <div className="w-20 flex items-end">
            <div className="w-100 w-80-ns tr f6 f5-ns lh-copy avenir-light gray-600 truncate">
              <span>{moment(item.created_at).format('MM/DD/YY')}</span>
            </div>
          </div>
          <div className="w-20 flex items-end">
            <div className="w-100 w-80-ns tr f6 f5-ns lh-copy avenir-light gray-600">
              <span>{moment(item.updated_at).format('MM/DD/YY')}</span>
            </div>
          </div>
          <div className="w-20 flex items-end">
            <div className="w-100 w-80-ns tr f6 f5-ns lh-copy avenir-light gray-600">
              {item.identify_count ? (
                <span>{item.identify_count}</span>
              ) : (
                <Tooltip
                  text="Visit recorded by organizer."
                  style={{
                    top: '-40px',
                    right: '-86px',
                  }}
                >
                  -
                </Tooltip>
              )}
            </div>
          </div>
          <div className="w-20 flex items-end">
            <div className="w-100 w-80-ns tr f6 f5-ns lh-copy avenir-roman gray-600">
              <span>
                {currency(
                  _.sum(
                    item.payments
                      .filter(payment => payment.paid)
                      .map(payment => payment.total)
                  )
                )}
              </span>
            </div>
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

export default CollectionMemberRow;
