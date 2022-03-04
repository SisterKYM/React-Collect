import {IoMdCheckmark, IoIosArrowDown} from 'react-icons/io';
import React from 'react';
import cx from 'classnames';

import {Dropdown} from 'elements';
import config from 'config';
import {borderColor} from 'theme/constants';

class RecurringOptionsFieldDropdown extends React.PureComponent {
  handleChangeWidgetValue = event => {
    this.props.onChange({widgetValue: event.target.value});
  };

  handleDropMenuChange = data => {
    if (this.props.onChange) {
      this.props.onChange({
        dropDown: {
          value: data.value,
          fromWidget: data.fromWidget || undefined,
        },
      });
    }
  };

  handleInputBlur = ({target: {value}}) => {
    this.props.onChange({widgetValue: value});
  };

  renderOption = option => {
    const selected = this.props.value === option.value;

    const handleClickLabel = () => {
      this.props.onSelectOption(option.value);
    };

    return (
      <li key={option.value} className="list-item">
        <div
          className="relative pl325 f-small avenir-roman gray-600 pointer nowrap"
          onClick={handleClickLabel}
        >
          {selected && (
            <div className="checkmark-wrapper absolute top-0 left-0 bottom-0 flex justify-center items-center">
              <IoMdCheckmark size={10} />
            </div>
          )}
          {option.label}
        </div>
        <style jsx>{`
          .list-item {
            height: 38px;
            padding: 0 1rem;
            display: flex;
            align-items: center;
          }
          .checkmark-wrapper {
            width: 20px;
          }
          .pl325 {
            padding-left: 1.25rem;
          }
        `}</style>
      </li>
    );
  };

  render() {
    const selectedOption = this.props.options.find(
      option => option.value === this.props.value
    );

    return (
      <Dropdown
        border
        borderColorSet
        className={cx(
          'recurring-options-field-dropdown br0',
          this.props.className
        )}
        bodyClassName="b--gray-400 dropdown-back"
        width="unset"
        open={this.props.open}
        onDismiss={this.props.onDismiss}
        body={
          <ul className="dropdown-menu">
            {this.props.options.map(this.renderOption)}
          </ul>
        }
      >
        <div className="pl3 pv2 pointer" onClick={this.props.onClickLabel}>
          <span className="flex pr3 items-center pointer">
            <span className="mr2 tint">
              {selectedOption ? selectedOption.label : ''}
            </span>
            <IoIosArrowDown size={10} color={config.colors.tint} />
          </span>
        </div>
        <style jsx>{`
          :global(.recurring-options-field-dropdown) {
            min-height: 33px;
          }
          :global(.dropdown-back) {
            border: 1px solid ${borderColor};
            border-radius: 4px;
            box-shadow: none;
          }
        `}</style>
      </Dropdown>
    );
  }
}

export default RecurringOptionsFieldDropdown;
