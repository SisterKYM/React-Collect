import React from 'react';

import Checkbox from 'elements/Checkbox';

class SelectedCollectionListItem extends React.PureComponent {
  renderNotificationsCheckbox = () => (
    <div className="notification-container flex items-center">
      <Checkbox
        checkedOnValue
        input={{value: this.props.receiveNotifications}}
        onChange={this.props.onChangeReceiveMessages}
      />
      <span className="ml2">Notifications</span>
      <style jsx>{`
        .notification-container {
          width: 100px;
        }
      `}</style>
    </div>
  );

  render() {
    const {collection, onRemove} = this.props;

    return (
      <div className="pv1">
        <div className="flex justify-between-ns items-center">
          <div className="name-wrapper truncate">{collection.name}</div>
          <div className="dn db-ns">{this.renderNotificationsCheckbox()}</div>
          <span className="dn db-ns tint pointer" onClick={onRemove}>
            Remove
          </span>
        </div>
        <div className="flex justify-between dn-ns mt2">
          {this.renderNotificationsCheckbox()}
          <span className="dn-ns mt1 tint pointer" onClick={onRemove}>
            Remove
          </span>
        </div>
        <style jsx>{`
          .name-wrapper {
            width: 120px;
          }
        `}</style>
      </div>
    );
  }
}

const EnhancedSelectedCollectionListItem = React.memo(
  SelectedCollectionListItem
);

export default EnhancedSelectedCollectionListItem;
