import React from 'react';

import Camera from 'theme/images/Camera.svg';

const AddImageIconText = ({text}) => (
  <div className="pa6 tc gray-400">
    <img className="mb2" src={Camera} alt="Caemra" />
    <p className="f-regular nowrap">{text || 'Add a banner image'}</p>
    <style jsx>{`
      img {
        height: 50px;
      }
    `}</style>
  </div>
);

const EnhancedAddImageIconText = React.memo(AddImageIconText);

export default EnhancedAddImageIconText;
