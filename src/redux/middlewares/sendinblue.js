import {get, castArray} from 'lodash';
import {LOCATION_CHANGE} from 'connected-react-router';

const sendinblue = () => (next) => (action) => {
  if (action.type === LOCATION_CHANGE) {
    const {location} = action.payload;
    if (window.sendinblue) {
      window.sendinblue.page(location.pathname, {
        ma_path: location.pathname,
      });
    }
    if (window.zE) {
      const page = (action?.payload?.location?.pathname || '').split('/').pop();
      const label = `pagetag${page}`;
      if (window.zE.setHelpCenterSuggestions) {
        window.zE.setHelpCenterSuggestions({url: true, labels: [label]});
      }
      window.zE('webWidget', 'helpCenter:setSuggestions', {
        url: true,
        labels: [label],
      });
    }
    if (window.convertflow) {
      try {
        window.convertflow.start();
      } catch (err) {
        console.warn(`Error in convertflow start: ${err}`);
      }
    }
  }
  const events = get(action, 'meta.sendinblue', null);
  if (!events) {
    return next(action);
  }
  const arrayed = castArray(events);
  for (const send_event of arrayed) {
    const {method, parameters} = send_event;
    if (method === 'identify') {
      const {email, ...params} = parameters;
      if (window.sendinblue) {
        window.sendinblue.identify(email, params);
      }
      if (window.convertflow) {
        try {
          window.convertflow.identify({
            email,
            override: true,
          });
          /* eslint-disable max-depth */
          if (!window.convertflow.id) {
            window.convertflow.app.visitors.get();
          }
          /* eslint-enable max-depth */
        } catch (err) {
          console.warn(`Error in convertflow identify: ${err}`);
        }
      }
    } else if (method === 'track' && window.sendinblue) {
      const {event, properties, event_data} = parameters;
      window.sendinblue.track(event, properties || {}, event_data || {});
    }
  }

  return next(action);
};

export default sendinblue;
