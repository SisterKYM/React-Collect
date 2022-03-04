import queryString from 'query-string';

const mapProps = props => ({
  ...props,
  acceptIsPending: props.acceptStatus === 'pending',
  organizerName: queryString.parse(props.location.search).organizer,
});

export default mapProps;
