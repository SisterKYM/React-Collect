import PropTypes from 'prop-types';
import React from 'react';

class LocalizePendingForm extends React.PureComponent {
  static propTypes = {
    formSubmit: PropTypes.func,
    status: PropTypes.string,
  };

  state = {
    pending: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.status === 'pending' && this.props.status !== 'pending') {
      this.setState({pending: false});
    }
  }

  handleSubmit = (values, dispatch, form) => {
    this.setState({pending: true});
    this.props.formSubmit(values, dispatch, form);
  };

  render() {
    return (
      <div>
        {React.cloneElement(React.Children.only(this.props.children), {
          onSubmit: this.handleSubmit,
          status: this.state.pending ? this.props.status : '',
        })}
      </div>
    );
  }
}

export default LocalizePendingForm;
