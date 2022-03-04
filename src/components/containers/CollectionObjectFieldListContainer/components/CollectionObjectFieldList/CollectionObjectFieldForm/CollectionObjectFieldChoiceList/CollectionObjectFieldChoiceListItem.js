import {IoMdRemoveCircleOutline} from 'react-icons/io';
import React from 'react';
import cx from 'classnames';

import {Checkbox, Input} from 'elements';
import {ReactComponent as MoveIcon} from 'theme/images/Move.svg';
import config from 'config';

class CollectionObjectFieldChoiceListItem extends React.Component {
  state = {
    optionInputFocused: false,
  };

  handleChangeOption = event => {
    this.props.onChangeChoice(event.target.value, this.props.choice);
  };

  handleRemoveOption = () => {
    this.props.onRemoveChoice(this.props.choice);
  };

  handleFocusOption = () => {
    // this is to fix react-sortable last two components swap bug
    setTimeout(() => {
      this.props.onFocusInput(this.props.choice);
    }, 100);

    this.setState({optionInputFocused: true});
  };

  handleBlurOption = () => {
    this.setState({optionInputFocused: false});
  };

  render() {
    return (
      <div className={cx('container flex items-center', this.props.className)}>
        <div className={this.props.sortingHandleClassName}>
          <MoveIcon
            id="drag-icon"
            className={cx(
              'drag-icon mr2 pointer f6',
              this.state.optionInputFocused && 'drag-icon-visible'
            )}
            fill={config.colors.tint}
            src={MoveIcon}
          />
        </div>
        <div className="w-100 w-60-ns flex items-center">
          {this.props.checkboxVisible && (
            <Checkbox inactive className="dn flex-ns mh3" />
          )}
          <Input
            border
            className="mr2 f6 br2"
            meta={{error: 'Required', submitFailed: this.props.required}}
            borderRadius={false}
            placeholder="Add option"
            value={this.props.choice.value}
            onChange={this.handleChangeOption}
            onFocus={this.handleFocusOption}
            onBlur={this.handleBlurOption}
          />
          {this.props.removable && (
            <IoMdRemoveCircleOutline
              className="tint pointer f6"
              size={24}
              onClick={this.handleRemoveOption}
            />
          )}
        </div>
        <style jsx>{`
          .container:hover :global(#drag-icon) {
            visibility: visible;
          }
          :global(.drag-icon) {
            min-width: 1px;
            height: 20px;
            visibility: hidden;
          }
          :global(.drag-icon-visible) {
            visibility: visible;
          }
        `}</style>
      </div>
    );
  }
}

export default CollectionObjectFieldChoiceListItem;
