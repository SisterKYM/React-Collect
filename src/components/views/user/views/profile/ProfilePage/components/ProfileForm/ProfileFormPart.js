import PropTypes from 'prop-types';
import React from 'react';

class ProfileFormPart extends React.PureComponent {
  static propTypes = {
    heading: PropTypes.string,
    linkText: PropTypes.string,
    onLinkClick: PropTypes.func,
  };

  handleClickLink = event => {
    if (this.props.onLinkClick) {
      this.props.onLinkClick(event);
    }
  };

  render() {
    const {children, heading, linkText} = this.props;

    return (
      <div className="pb3 mt3 bb b--gray-300">
        {(heading || linkText) && (
          <div className="flex justify-between items-center">
            {heading && <span className="f6 fw8 avenir-roman">{heading}</span>}
            {linkText && (
              <span className="f6 tint pointer" onClick={this.handleClickLink}>
                {linkText}
              </span>
            )}
          </div>
        )}
        <div className="mw6">{children}</div>
      </div>
    );
  }
}

export default ProfileFormPart;
