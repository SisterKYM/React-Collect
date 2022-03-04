const onAccept = (props = {}) => () =>
  props.acceptInvitation({
    manager_id: Number(props.match.params.manager),
    invite_code: props.match.params.invitation,
  });

export default onAccept;
