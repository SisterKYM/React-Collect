import config from 'config';

const breakpoints = {
  extraSmall: 500,
  small: 700,
  medium: 1024,
  large: 1280,
  extraLarge: 1400,
};
const CONFIRM_CANCEL_SUBSCRIPTION = 'DELETE';
const DISMISS_GROWL_ERROR = {
  BODY: "Please save the form so you don't lose your changes",
  TITLE: 'Do you want to save?',
};
const formErrors = {
  ASTERIX: '*',
  EXCLAMATION: '!',
  MAX_IMAGE_SIZE: 'Maximum image size is 20 MB',
  REQUIRED: '*Required',
  NUMERIC: 'Must be number',
  POSITIVE: 'Must be positive',
};
const white = '#fff';
const baseColors = {
  white,
  black: '#373737',
  darkerGray: '#777777',
  darkGray: '#9d9d9d',
  gray100: '#fafafa',
  gray600: '#373737',
  gray700: '#414142',
  gray: '#dedede',
  lightGray: '#f2f2f2',
  orange: config.colors.brand,
  teal: config.colors.tint,
  aqua: '#b0e0e6',
  lightAqua: '#d7eff2',
};
const colors = {
  ...baseColors,
  primary: baseColors.orange,
  error: baseColors.orange,
};
const scale = [8, 20, 33, 58, 100, 200];
const fontSizes = [40, 36, 26, 22, 18, 14, 13, 11];
const fontFamily = `'AvenirLTStd-Light', sans-serif`;
const borderColor = colors.gray;
const borderWidth = 1;
const inputHeight = 40;
const inputHeightSmall = 36;

export {
  borderColor,
  borderWidth,
  breakpoints,
  colors,
  CONFIRM_CANCEL_SUBSCRIPTION,
  DISMISS_GROWL_ERROR,
  fontFamily,
  fontSizes,
  formErrors,
  inputHeight,
  inputHeightSmall,
  scale,
};
