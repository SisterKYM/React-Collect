import {compose} from 'recompose';
import {connect} from 'react-redux';
import React from 'react';

import {Status} from 'elements';

import {CollectionItemRow} from '../components';

class CollectionItemListContainer extends React.PureComponent {
  renderItem = (item) => (
    <CollectionItemRow
      key={item.id}
      browser={this.props.browser}
      userBasic={this.props.userBasic}
      item={item}
      collection={this.props.collection}
      history={this.props.history}
    />
  );

  render() {
    const {items, getItemsStatus} = this.props;

    if (!getItemsStatus || getItemsStatus !== 'success') {
      return (
        <div className="flex w-100 pa5 justify-center">
          <Status
            status={getItemsStatus || 'pending'}
            messages={{
              failure: 'Cannot load items, please try again.',
            }}
          />
        </div>
      );
    }

    if (items.length === 0) {
      return <div style={{height: 250}} />;
    }

    return items.map(this.renderItem);
  }
}

const enhance = compose(
  connect((state) => ({
    browser: state?.browser,
    userBasic:
      !state?.session ||
      (!state.session.isTeamUser && !state.session.isProUser),
  }))
);

const EnahncedCollectionItemListContainer = enhance(
  CollectionItemListContainer
);

export default EnahncedCollectionItemListContainer;
