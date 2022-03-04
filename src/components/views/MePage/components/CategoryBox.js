import React from 'react';

const CategoryBox = ({category, children}) => (
  <div className="bg-white pa4-25 br2 card-shadow mt3">
    {category && category.name && (
      <div className="dark-grey merriweather shared-collections__category-box__header">
        {category.name}
      </div>
    )}
    <div>{children}</div>
  </div>
);

const EnhancedCategoryBox = React.memo(CategoryBox);

export default EnhancedCategoryBox;
