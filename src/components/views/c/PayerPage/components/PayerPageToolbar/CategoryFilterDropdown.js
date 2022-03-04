import cx from 'classnames';
import React from 'react';

import {Dropdown} from 'elements';
import useToggle from 'hooks/useToggle';

const CategoryFilterDropdown = ({categories, onChangeCategoryPath}) => {
  const liClassName = 'pa3 f6 avenir-light gray-600 pointer';
  const categoryLiClassName = cx(liClassName, 'bg-animate hover-bg-light-gray');
  const [dropdownVisible, toggleDropdownVisible] = useToggle();
  const [hoveredCategoryId, setHoveredCategoryId] = React.useState(null);
  const visibleSubcategories =
    (hoveredCategoryId !== null &&
      categories.find(({id}) => id === hoveredCategoryId).options
        .subcategories) ||
    [];

  return (
    <Dropdown
      bodyClassName="br2"
      open={dropdownVisible}
      top="2.675rem"
      body={
        <div
          className="cf w-100"
          onMouseLeave={() => {
            setHoveredCategoryId(null);
          }}
        >
          <ul
            className={cx(
              'fl bg-white',
              visibleSubcategories.length !== 0 ? 'w-50' : 'w-100'
            )}
          >
            <li
              className={categoryLiClassName}
              onClick={() => {
                onChangeCategoryPath([]);
                toggleDropdownVisible.off();
              }}
              onMouseEnter={() => {
                setHoveredCategoryId(null);
              }}
            >
              Shop All
            </li>
            {categories.map((category) => (
              <li
                key={category.id}
                className={cx(
                  categoryLiClassName,
                  hoveredCategoryId === category.id
                    ? 'bg-light-gray'
                    : 'bg-white'
                )}
                onMouseEnter={() => {
                  const hasSubcategories =
                    category.options.subcategories &&
                    category.options.subcategories.length !== 0;

                  setHoveredCategoryId(hasSubcategories ? category.id : null);
                }}
                onClick={() => {
                  onChangeCategoryPath([category.id]);
                }}
              >
                {category.name}
              </li>
            ))}
          </ul>
          {visibleSubcategories.length !== 0 && (
            <ul className="fl w-50 bg-light-gray">
              {visibleSubcategories.map((subcategory) => (
                <li
                  key={subcategory.uuid}
                  className={cx(liClassName, 'dim')}
                  onClick={() => {
                    onChangeCategoryPath([hoveredCategoryId, subcategory.uuid]);
                  }}
                >
                  {subcategory.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      }
      onDismiss={toggleDropdownVisible.off}
    >
      <div
        className="f6 pv2 avenir-medium gray-550 br2 b--gray-300 dim pointer ph3-ns ba-ns"
        onClick={toggleDropdownVisible.on}
      >
        Shop All
      </div>
    </Dropdown>
  );
};

const EnhancedCategoryFilterDropdown = React.memo(CategoryFilterDropdown);

export default EnhancedCategoryFilterDropdown;
