import PropTypes from 'prop-types';

export const PROP_TYPES = {
  item: PropTypes.shape({
    id: PropTypes.string,
    imgSrc: PropTypes.string,
    last4: PropTypes.string,
    name: PropTypes.string,
    nickname: PropTypes.string,
  }),
  deleteDisabled: PropTypes.bool,
  onDelete: PropTypes.func,
  pending: PropTypes.bool,
};
