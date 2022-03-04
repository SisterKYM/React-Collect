import cx from 'classnames';
import React from 'react';
import useToggle from 'hooks/useToggle';
import {Dropdown} from 'elements';

const CategoryPath = ({
  categories,
  categoryPath,
  onChangeCategoryPath,
  onReset,
}) => {
  const crumbClassName = 'dim pointer';
  const [categoryId, subcategoryId] = categoryPath;

  const category = categories.find((category) => category.id === categoryId);
  const subcategory = (category.options.subcategories || []).find(
    (subcategory) => subcategory.uuid === subcategoryId
  );
  const crumbs = React.useMemo(
    () =>
      [
        {key: 'ALL', title: 'Shop All'},
        {key: category.id, title: category.name},
        subcategory ? {key: subcategory.uuid, title: subcategory.name} : null,
      ].filter(Boolean),
    [category, subcategory]
  );
  const [dropdownVisible, toggleDropdownVisible] = useToggle();
  const isMobile = React.useMemo(() => {
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );

    return vw < 480;
  }, []);

  return (
    <div className="pv3 f7 f6-ns avenir-light gray-600">
      {crumbs.map((crumb, idx) => {
        const handleClick = () => {
          if (crumb.key === 'ALL') {
            onReset();
          } else if (crumb.key === categoryId) {
            onChangeCategoryPath([categoryId]);
          } else {
            onChangeCategoryPath([categoryId, subcategoryId]);
          }
        };

        const trailing = idx === crumbs.length - 1;

        return (
          <React.Fragment key={crumb.key}>
            {idx === 0 && (
              <span
                className={cx(crumbClassName, trailing && 'avenir-heavy')}
                onClick={handleClick}
              >
                {crumb.title}
              </span>
            )}

            {idx === 1 &&
              category &&
              category.options &&
              category.options.subcategories && (
                <Dropdown
                  bodyClassName="br2"
                  className="inline-block"
                  open={dropdownVisible}
                  top="2.5625rem"
                  width={100}
                  body={
                    <div className="bg-white">
                      {category.options.subcategories.map((subCategory) => (
                        <div
                          key={subCategory.uuid}
                          className="pa3 f6 avenir-light gray-600 pointer bg-animate hover-bg-light-gray"
                          onClick={() => {
                            onChangeCategoryPath([
                              categoryId,
                              subCategory.uuid,
                            ]);
                            toggleDropdownVisible.off();
                          }}
                        >
                          {isMobile
                            ? subCategory.name.length > 22
                              ? `${subCategory.name.slice(0, 22)}...`
                              : subCategory.name
                            : subCategory.name}
                        </div>
                      ))}
                    </div>
                  }
                  onDismiss={toggleDropdownVisible.off}
                >
                  <span
                    className={cx(crumbClassName, trailing && 'avenir-heavy')}
                    onClick={toggleDropdownVisible.on}
                  >
                    {isMobile
                      ? crumb.title.length > 22
                        ? `${crumb.title.slice(0, 22)}...`
                        : crumb.title
                      : crumb.title}
                  </span>
                </Dropdown>
              )}

            {idx === 1 &&
              category &&
              category.options &&
              !category.options.subcategories && (
                <span
                  className={cx(crumbClassName, trailing && 'avenir-heavy')}
                  onClick={toggleDropdownVisible.on}
                >
                  {isMobile
                    ? crumb.title.length < 8
                      ? crumb.title
                      : `${crumb.title.slice(0, 8)}...`
                    : crumb.title}
                </span>
              )}

            {idx === 2 && (
              <span
                className={cx(crumbClassName, trailing && 'avenir-heavy')}
                onClick={handleClick}
              >
                {isMobile
                  ? crumb.title.length < 8
                    ? crumb.title
                    : `${crumb.title.slice(0, 8)}...`
                  : crumb.title}
              </span>
            )}

            {!trailing && <span className="mh3 strong">{'>'}</span>}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const EnhancedCategoryPath = React.memo(CategoryPath);

export default EnhancedCategoryPath;
