import {compose} from 'recompose';
import {connect} from 'react-redux';
import React from 'react';

import {Status} from 'elements';

import {CollectionMemberRow} from '../components';

class CollectionMemberListContainer extends React.PureComponent {
  renderMember = (item) => (
    <CollectionMemberRow
      key={item.id}
      browser={this.props.browser}
      userBasic={this.props.userBasic}
      item={item}
      collection={this.props.collection}
      history={this.props.history}
    />
  );

  render() {
    const {items, getMembersStatus} = this.props;

    if (!getMembersStatus || getMembersStatus !== 'success') {
      return (
        <div className="flex w-100 pa5 justify-center">
          <Status
            status={getMembersStatus || 'pending'}
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

    return items.map(this.renderMember);
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

const EnahncedCollectionMemberListContainer = enhance(
  CollectionMemberListContainer
);

export default EnahncedCollectionMemberListContainer;
