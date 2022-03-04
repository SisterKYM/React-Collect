import {mapProps} from 'recompose';
import {omit} from 'lodash';

const withMatch = mapProps(props =>
  omit(props, [
    'block',
    'listen',
    'go',
    'goForward',
    'push',
    'goBack',
    'length',
    'location',
    'createHref',
    'replace',
    'history',
    'staticContext',
  ])
);

export default withMatch;
