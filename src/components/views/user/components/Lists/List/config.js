import PropTypes from 'prop-types';

export const PROP_TYPES = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      imgSrc: PropTypes.string,
      last4: PropTypes.string,
      name: PropTypes.string,
      nickname: PropTypes.string,
    })
  ),
  onDelete: PropTypes.func,
  deleteDisabled: PropTypes.bool,
  status: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  }),
};
