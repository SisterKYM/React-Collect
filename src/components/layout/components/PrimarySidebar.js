import React from 'react';

const width = 105;

const PrimarySidebar = ({nav}) => {
  const element = React.useMemo(() => React.cloneElement(nav, {column: true}), [
    nav,
  ]);

  return (
    <div className="dn-p flex min-vh-100 h-100 flex-column items-center bg-accent overflow-hidden">
      {element}
      <style jsx>{`
        width: ${width}px;
      `}</style>
    </div>
  );
};

const EnhancedPrimarySidebar = React.memo(PrimarySidebar);

export {width};
export default EnhancedPrimarySidebar;
