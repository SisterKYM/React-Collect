import {compose} from 'recompose';
import {connect} from 'react-redux';
import {find, fromPairs} from 'lodash';
import React from 'react';

import config from 'config';
import {GET_COLLECTIONS} from 'redux/modules/collections/constants';
import {getCollections} from 'redux/modules/collections/actions';
import Checkbox from 'elements/Checkbox';
import asyncConnect from 'helpers/asyncConnect';

import CollectionAccessDropdown from './CollectionAccessDropdown';
import CollectionPickerDropdown from './CollectionPickerDropdown';
import SelectedCollectionList from './SelectedCollectionList';

const collectionAccesses = [
  {label: `All ${config.strings.collection}s`, value: 'all'},
  {label: `Specific ${config.strings.collection}s`, value: 'specific'},
  {
    label: `Only ${config.strings.collection}s created by manager`,
    value: 'own',
  },
];

const getCollectionAccessForAccessScopeType = (type) =>
  find(collectionAccesses, {value: type});

class ManagerPermissions extends React.PureComponent {
  state = {
    controlsExpanded: false,
  };

  componentDidUpdate(prevProps) {
    if (this.props.isForceExpanded !== prevProps.isForceExpanded) {
      this.setState({controlsExpanded: this.props.isForceExpanded});
    }
  }

  toggleControlsExpanded = () => {
    this.setState((prevState) => ({
      controlsExpanded: !prevState.controlsExpanded,
    }));
  };

  handleChangeReceiveMessages = () => {
    const {manager} = this.props;

    this.props.updateManager({
      ...manager,
      manager: manager.id,
      access_scope: {
        ...manager.access_scope,
        collections: {
          ...manager.access_scope.collections,
          all: {
            receive_messages: !manager.access_scope.collections.all
              .receive_messages,
          },
        },
      },
    });
  };

  handleChangeCollectionAccess = (collectionAccess) => {
    const {manager} = this.props;

    const nextSpecific =
      collectionAccess.value === 'own'
        ? fromPairs(
            this.props.collections
              .filter(
                ({creating_user_id: creatingUserId}) =>
                  Boolean(manager.granted_user) &&
                  manager.granted_user.id === creatingUserId
              )
              .map((collection) => [
                collection.id,
                {
                  id: collection.id,
                  receive_messages: true,
                },
              ])
          )
        : manager.access_scope.collections.specific;

    this.props.updateManager({
      ...manager,
      manager: manager.id,
      access_scope: {
        ...manager.access_scope,
        collections: {
          ...manager.access_scope.collections,
          type: collectionAccess.value,
          specific: nextSpecific,
        },
      },
    });
  };

  handleChangeCollections = (collections) => {
    const {manager} = this.props;

    const specificPairs = collections.map(({id}) => [
      id,
      {
        id,
        receive_messages: true,
      },
    ]);

    this.props.updateManager({
      ...manager,
      manager: manager.id,
      access_scope: {
        ...manager.access_scope,
        collections: {
          ...manager.access_scope.collections,
          specific: {
            ...manager.access_scope.collections.specific,
            ...fromPairs(specificPairs),
          },
        },
      },
    });
  };

  renderPickerDropdown = () => (
    <CollectionPickerDropdown
      collections={this.props.collections}
      manager={this.props.manager}
      onChangeCollections={this.handleChangeCollections}
    />
  );

  render() {
    const {manager, collections, updateManager} = this.props;
    const collectionAccess = getCollectionAccessForAccessScopeType(
      manager.access_scope.collections.type
    );
    const collectionIds =
      (collectionAccess.value === 'specific' &&
        Object.keys(manager.access_scope.collections.specific)) ||
      [];

    return (
      <div>
        <div className="flex items-center">
          <CollectionAccessDropdown
            collectionAccesses={collectionAccesses}
            collectionAccess={collectionAccess}
            onChangeCollectionAccess={this.handleChangeCollectionAccess}
          />
          {collectionAccess.value === 'specific' && (
            <div className="dn db-l ml2">{this.renderPickerDropdown()}</div>
          )}
        </div>
        {collectionAccess.value === 'all' && (
          <div className="pb3">
            <Checkbox
              checkedOnValue
              input={{
                value: manager.access_scope.collections.all.receive_messages,
              }}
              small
              label={`Receive email notifications for all ${config.strings.collection}s`}
              onChange={this.handleChangeReceiveMessages}
            />
          </div>
        )}
        {collectionAccess.value === 'specific' && (
          <div className="db dn-l">{this.renderPickerDropdown()}</div>
        )}
        {collectionIds.length > 0 && (
          <>
            <div
              className="bt b--gray-300 gray-600"
              style={{marginRight: -16, marginLeft: -16}}
            />
            <div className="mv4 selected-collection-list gray-600">
              <SelectedCollectionList
                manager={manager}
                collections={collections}
                collectionIds={collectionIds}
                updateManager={updateManager}
              />
            </div>
          </>
        )}
        <style jsx>{`
          .selected-collection-list {
            max-height: 175px;
            overflow-y: auto;
          }
        `}</style>
      </div>
    );
  }
}

const enhance = compose(
  asyncConnect([
    {
      key: GET_COLLECTIONS,
      promise: getCollections,
    },
  ]),
  connect((state) => ({
    collections: state.collections.collections || [],
  }))
);

const EnhancedManagerPermissions = enhance(ManagerPermissions);

export default EnhancedManagerPermissions;
