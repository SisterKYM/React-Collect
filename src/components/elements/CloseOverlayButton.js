import {Link, withRouter} from 'react-router-dom';
import {MdClose} from 'react-icons/md';
import {branch, compose} from 'recompose';
import React from 'react';

const enhance = compose(
  branch(props => !props.to, withRouter, x => x),
  React.memo
);

const CloseOverlayButton = ({color, size = 24, history, to, onClick}) => {
  const component = React.useMemo(() => {
    const linkEl = to ? Link : 'div';

    const linkProps = {};

    if (to) {
      linkProps.to = to;
    } else if (history.goBack) {
      linkProps.onClick = onClick || history.goBack;
    }

    return React.createElement(
      linkEl,
      linkProps,
      <MdClose color={color} size={size} />
    );
  }, [color, history, onClick, size, to]);

  return <div className="pointer">{component}</div>;
};

const EnhancedCloseOverlayButton = enhance(CloseOverlayButton);

export default EnhancedCloseOverlayButton;
