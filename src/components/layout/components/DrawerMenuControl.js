import {connect} from 'react-redux';
import React from 'react';

import {change} from 'redux/modules/drawerMenu/actions';

const DrawerMenuControl = ({
  className,
  drawerClassName,
  open,
  onChangeDrawerMenu,
  children,
  ...props
}) => {
  const handleClick = React.useCallback(() => {
    onChangeDrawerMenu({
      open: !open,
      className: drawerClassName,
      ...props,
    });
  }, [drawerClassName, onChangeDrawerMenu, open, props]);

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
};

const enhance = connect(
  state => ({
    open: state.drawerMenu.open,
  }),
  dispatch => ({
    onChangeDrawerMenu: payload => dispatch(change(payload)),
  })
);

const EnhancedDrawerMenuControl = enhance(DrawerMenuControl);

export default EnhancedDrawerMenuControl;
