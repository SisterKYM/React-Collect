const onDismiss = props => () => {
  if (props.history && props.location) {
    props.history.push(props.location.pathname.split('/message')[0]);
  }
};

export default onDismiss;
