import React from 'react';

const width = 215;

const SecondarySidebar = ({children}) => (
  <div className="h-100 min-vh-100-ns bg-light-tint">
    {children}
    <style jsx>{`
      div {
        width: ${width}px;
        min-height: 88vh;
      }
    `}</style>
  </div>
);

export {width};
export default SecondarySidebar;
