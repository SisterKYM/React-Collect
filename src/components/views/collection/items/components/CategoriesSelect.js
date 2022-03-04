import React from 'react';

import {Checkbox} from 'elements';

const CategoriesSelect = ({className, categories, value, onChangeValue}) => (
  <ul className={className}>
    {categories.map(category => {
      const checked = value.includes(category.id);

      return (
        <li key={category.id}>
          <Checkbox
            labelClassName="pl2 f6 avenir-roman"
            label={category.name}
            labelStyle={{color: checked ? '#373737' : '#9e9e9e'}}
            checked={checked}
            onChange={() => {
              onChangeValue(
                checked
                  ? value.filter(categoryId => categoryId !== category.id)
                  : [...value, category.id]
              );
            }}
          />
        </li>
      );
    })}
    <style jsx>{`
      li:not(:first-child) {
        margin-top: 1.5rem;
      }
    `}</style>
  </ul>
);

const EnhancedCategoriesSelect = React.memo(CategoriesSelect);

export default EnhancedCategoriesSelect;
