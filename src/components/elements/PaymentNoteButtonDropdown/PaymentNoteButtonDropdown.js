import {get, pick} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import Dropdown from 'elements/Dropdown';

import PaymentNoteButtonDropdownForm from './PaymentNoteButtonDropdownForm';

class PaymentNoteButtonDropdown extends React.PureComponent {
  static propTypes = {
    children: PropTypes.element,
    form: PropTypes.string.isRequired,
    initialValues: PropTypes.object,
    onSubmit: PropTypes.func,
    status: PropTypes.string,
    top: PropTypes.number,
  };

  state = {
    editMode: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.status === 'pending' && this.props.status === 'success') {
      this.setState({editMode: false});
    }
  }

  turnEditModeOn = () => {
    this.setState({editMode: true});
  };

  turnEditModeOff = () => {
    this.setState({editMode: false});
  };

  render() {
    const {top, form, status, children, onSubmit, initialValues} = this.props;

    return (
      <Dropdown
        top={top}
        borderRadius
        open={this.state.editMode}
        onDismiss={this.turnEditModeOff}
        body={
          <div className="pa3">
            <PaymentNoteButtonDropdownForm
              enableReinitialize
              allowDelete={Boolean(get(initialValues, 'note', ''))}
              form={form}
              onCancel={this.turnEditModeOff}
              initialValues={initialValues}
              onSubmit={onSubmit}
              status={status}
            />
          </div>
        }
        {...pick(this.props, ['border', 'top', 'right', 'bottom', 'left'])}
      >
        {React.cloneElement(React.Children.only(children), {
          onClick: this.turnEditModeOn,
        })}
      </Dropdown>
    );
  }
}

export default PaymentNoteButtonDropdown;
