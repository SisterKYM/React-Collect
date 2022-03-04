import {createResponsiveStateReducer} from 'redux-responsive';

import {breakpoints} from 'theme/constants';

export default createResponsiveStateReducer(breakpoints);
