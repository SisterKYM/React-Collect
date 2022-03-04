const onGoTeamClick = (props) => (search) => {
  const {history, location} = props;

  history.push({
    pathname: `${location.pathname}/team-upgrade`,
    search,
    state: location.state,
  });
};

export default onGoTeamClick;
