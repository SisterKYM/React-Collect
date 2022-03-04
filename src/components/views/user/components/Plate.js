import {MdClose} from 'react-icons/md';
import PropTypes from 'prop-types';
import React from 'react';

import {colors} from 'theme/constants';

const Plate = ({children, onClose}) => (
  <div className="plate relative pa3 bg-gray-200">
    <MdClose
      color={colors.darkGray}
      className="absolute top-0 right-0 mr2 mt2 pointer"
      onClick={onClose}
    />
    {children}
    <style jsx>{`
      .plate {
        padding-right: 4.4rem;
      }
    `}</style>
  </div>
);

const EnhancedPlate = Object.assign(React.memo(Plate), {
  propTypes: {
    onClose: PropTypes.func,
  },
});

export default EnhancedPlate;
