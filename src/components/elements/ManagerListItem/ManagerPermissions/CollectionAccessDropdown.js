import {IoMdArrowDropdown} from 'react-icons/io';
import React from 'react';
import cx from 'classnames';

import Button from 'elements/Button';
import Dropdown from 'elements/Dropdown';

class CollectionAccessDropdown extends React.PureComponent {
  state = {
    dropdownExpanded: false,
    collectionAccessDropdownStyle: {
      maxWidth: 315,
    },
  };

  toggleDropdownExpanded = () => {
    this.setState((prevState) => ({
      dropdownExpanded: !prevState.dropdownExpanded,
    }));
  };

  handleSelectCollectionAccess = (collectionAccess) => {
    this.setState({dropdownExpanded: false});
    this.props.onChangeCollectionAccess(collectionAccess);
  };

  renderCollectionAccess = (option, idx) => (
    <div
      key={option.value}
      className={cx('pointer', idx !== 0 && 'mt3')}
      onClick={() => this.handleSelectCollectionAccess(option)}
    >
      <div className="f6 gray-600">{option.label}</div>
    </div>
  );

  render() {
    return (
      <div className="w-100" style={this.state.collectionAccessDropdownStyle}>
        <Button
          small
          border
          colorSet
          backgroundColorSet
          className="ba b--gray-300 mv2 dark-grey bg-white w-100"
          onClick={this.toggleDropdownExpanded}
        >
          <div className="flex items-center justify-between">
            {this.props.collectionAccess.label}
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
              {this.props.collectionAccesses.map(this.renderCollectionAccess)}
            </div>
          }
        />
      </div>
    );
  }
}

export default CollectionAccessDropdown;
