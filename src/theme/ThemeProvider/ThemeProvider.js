import {withContext} from 'recompose';
import PropTypes from 'prop-types';

import {colors, fontSizes} from 'theme/constants';

const ThemeProvider = ({children}) => children;

const enhance = withContext(
  {
    reactIconBase: PropTypes.object,
    betterReactSpinkit: PropTypes.object,
  },
  () => ({
    reactIconBase: {
      size: fontSizes[3],
    },
    betterReactSpinkit: {
      size: 15,
      color: colors.primary,
    },
  })
);

const EnhancedThemeProvider = enhance(ThemeProvider);

export default EnhancedThemeProvider;
