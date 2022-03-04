import React from 'react';

import {zIndex as drawerMenuZIndex} from 'layout/components/DrawerMenu';
import LargerCloseX from 'theme/images/LargerCloseX.svg';

const ItemFormHeader = ({editItem, onClickCross}) => (
  <div className="container relative bg-white bb b--gray-300">
    <div className="flex ph4 pt4 pb3 justify-between items-center">
      <h2 className="f3 avenir-roman dark-grey">
        {editItem ? 'Edit' : 'Add'} Item
      </h2>
      <img
        className="pointer"
        alt="Large cross"
        src={LargerCloseX}
        onClick={onClickCross}
      />
    </div>
    <style jsx>{`
      .container {
        z-index: ${drawerMenuZIndex};
      }
      img {
        width: 15px;
        height: 15px;
      }
    `}</style>
  </div>
);

const EnhancedItemFormHeader = React.memo(ItemFormHeader);

export default EnhancedItemFormHeader;
