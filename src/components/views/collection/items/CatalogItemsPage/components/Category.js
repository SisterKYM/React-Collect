import React from 'react';

const Category = ({category, children}) => (
  <div>
    <div className="ph4 pv3 f5 dark-grey lh1 bg-gray-200 avenir-light">
      {category.name || ''}
    </div>
    {children}
  </div>
);

const EnhancedCategory = React.memo(Category);

export default EnhancedCategory;
