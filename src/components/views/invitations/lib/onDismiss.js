const onDismiss = (props = {}) => () => {
  props.history.push('/collections');
};

export default onDismiss;
