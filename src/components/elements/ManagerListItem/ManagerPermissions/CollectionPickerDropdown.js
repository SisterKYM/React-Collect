import {IoMdArrowDropdown} from 'react-icons/io';
import {connect} from 'react-redux';
import {without} from 'lodash';
import React from 'react';
import cx from 'classnames';

import {GET_COLLECTIONS} from 'redux/modules/collections/constants';
import {Button, Checkbox, Dropdown, Status, CommonButton} from 'elements';

class CollectionPickerDropdown extends React.PureComponent {
  state = {
    dropdownExpanded: false,
    selectedCollectionIds: [],
  };

  getFilteredCollections = () => {
    const existingCollectionIds = Object.keys(
      this.props.manager.access_scope.collections.specific
    );

    return this.props.collections.filter(
      ({id, access}) =>
        access.owner && !existingCollectionIds.includes(String(id))
    );
  };

  toggleDropdownExpanded = () => {
    this.setState((prevState) => ({
      dropdownExpanded: !prevState.dropdownExpanded,
    }));
  };

  handleCheckCollection = (collection) => {
    this.setState((prevState) => ({
      selectedCollectionIds: !prevState.selectedCollectionIds.includes(
        collection.id
      )
        ? [...prevState.selectedCollectionIds, collection.id]
        : without(prevState.selectedCollectionIds, collection.id),
    }));
  };

  handleSubmit = () => {
    const collections = this.getFilteredCollections();
    const selectedCollections = collections.filter(({id}) =>
      this.state.selectedCollectionIds.includes(id)
    );

    this.props.onChangeCollections(selectedCollections);
    this.setState({dropdownExpanded: false});
  };

  renderCollection = (collection, idx) => (
    <div key={collection.id} className={cx('pointer', idx !== 0 && 'mt3')}>
      <Checkbox
        checkedOnValue
        small
        labelClassName="collection-picker-dropdown-checkbox-label truncate"
        input={{
          value: this.state.selectedCollectionIds.includes(collection.id),
        }}
        label={collection.name}
        onChange={() => this.handleCheckCollection(collection)}
      />
      <style jsx>{`
        :global(.collection-picker-dropdown-checkbox-label) {
          max-height: 1.2em;
        }
      `}</style>
    </div>
  );

  render() {
    const collections = this.getFilteredCollections();

    return this.props.loading ? (
      <div className="flex flex-column flex-wrap w4 items-center">
        <Status status="pending" />
      </div>
    ) : (
      <>
        <Button
          small
          border
          colorSet
          backgroundColorSet
          className="mv2 gray-500 bg-white ba b--gray-300"
          onClick={this.toggleDropdownExpanded}
        >
          <div className="flex mr2 items-center">
            Add collections
            <i className="pl2">
              <IoMdArrowDropdown color="darkerGray" size={18} />
            </i>
          </div>
        </Button>
        <Dropdown
          border
          top={0}
          left={0}
          open={this.state.dropdownExpanded}
          onDismiss={this.toggleDropdownExpanded}
          body={
            <div className="pa3">
              <div className="collection-list-container mb3 overflow-y-auto">
                {collections.map(this.renderCollection)}
              </div>
              <div
                className="bb b--gray-300"
                style={{marginLeft: -16, marginRight: -16}}
              />
              <CommonButton
                className="bg-tint white pt-14 mt3 w-100"
                type="submit"
                disabled={this.state.selectedCollectionIds.length === 0}
                onClick={this.handleSubmit}
              >
                {this.props.manager ? 'Add' : 'Send Invite'}
              </CommonButton>
              <style jsx>{`
                .collection-list-container {
                  max-height: 185px;
                }
              `}</style>
            </div>
          }
        />
      </>
    );
  }
}

const enhance = connect(({async: {statuses}}) => ({
  loading: statuses[GET_COLLECTIONS] === 'pending',
}));

const EnhancedCollectionPickerDropdown = enhance(CollectionPickerDropdown);

export default EnhancedCollectionPickerDropdown;
