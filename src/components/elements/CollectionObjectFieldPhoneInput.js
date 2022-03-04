import React from 'react';
import cx from 'classnames';

import {scale} from 'theme/constants';
import PhoneInput from 'elements/PhoneInput';

class CollectionObjectFieldPhoneInput extends React.PureComponent {
  state = {
    value: '',
  };

  handleChangeValue = value => {
    this.setState({value});
  };

  render() {
    return (
      <div
        className={cx(
          'ba b--gray-300 br2',
          this.props.disabled ? 'bg-light-gray' : 'bg-white',
          this.props.className
        )}
      >
        <PhoneInput
          inputClassName={cx('phone-input-input gray-600')}
          disabled={this.props.disabled}
          country={this.props.input || this.props.onChange ? 'US' : undefined}
          placeholder="____-____-____"
          value={
            this.props.value ||
            (this.props.input && this.props.input.value) ||
            this.state.value
          }
          onChange={
            this.props.onChange ||
            (this.props.input && this.props.input.onChange) ||
            this.handleChangeValue
          }
        />
        <style jsx>{`
          :global(.phone-input-input) {
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
            order: -1;
            margin-right: ${-scale[2] - scale[0]}px;
            font-size: ${this.props.small ? 16 : 18}px !important;
          }
          :global(.phone-input-input::-ms-clear) {
            width: 0px;
            height: 0px;
          }
        `}</style>
      </div>
    );
  }
}

export default CollectionObjectFieldPhoneInput;
