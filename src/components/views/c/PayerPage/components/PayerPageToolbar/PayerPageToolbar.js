import React from 'react';
import {mergeWith, isArray, uniq, fromPairs, sortBy} from 'lodash';
import cx from 'classnames';

import CategoryFilterDropdown from './CategoryFilterDropdown';
import CategoryPath from './CategoryPath';
import PayerPageDisplayModeSwitch from './PayerPageDisplayModeSwitch';
import VariantsFilterDropdown from './VariantsFilterDropdown';
import PayerPageCartInfo from './PayerPageCartInfo';

const PayerPageToolbar = ({
  publicCollection,
  cart,
  displayMode,
  onChangeDisplayMode,
  categoryPath,
  onChangeCategoryPath,
  onResetCategoryPath,
  selectedFilterValues,
  cartVisible,
  toggleCartVisible,
  onChangeSelectedFilterValues,
  cartElement,
}) => {
  const anchoredCategories = publicCollection.categories.filter(
    (category) =>
      category.anchor &&
      publicCollection.items.filter((i) => i.category?.id === category.id)
        .length > 0
  );
  const order = fromPairs(
    publicCollection.filterOrder.map((x) => [x.key, x.order])
  );

  const categoryPathFilters = publicCollection.filters
    .filter(
      (i) =>
        i.categoryId === categoryPath[0] &&
        (!categoryPath[1] || i.subcategoryId === categoryPath[1])
    )
    .map((v) => v.filters);

  const visibleFiltersCombined =
    categoryPathFilters &&
    mergeWith(
      {},
      ...categoryPathFilters,
      (a, b) => (isArray(a) && a.concat(b)) || undefined
    );

  const visibleFilters = Object.fromEntries(
    // convert to array, map, and then fromEntries gives back the object
    Object.entries(visibleFiltersCombined).map(([k, v]) => [
      k,
      sortBy(uniq(v), (x) => (order[k] || []).indexOf(x)),
    ])
  );

  return (
    <div
      className={cx(
        categoryPath.length === 0 ? 'dn flex-ns' : 'flex',
        'ph3 ph5-ns pv2 justify-between bb b--gray-300 bg-white'
      )}
    >
      <div className="flex items-center justify-between w-100 w-auto-ns">
        {anchoredCategories.length !== 0 && (
          <>
            {categoryPath.length === 0 ? (
              <CategoryFilterDropdown
                categories={anchoredCategories}
                onChangeCategoryPath={onChangeCategoryPath}
              />
            ) : (
              <>
                <CategoryPath
                  categories={anchoredCategories}
                  categoryPath={categoryPath}
                  onChangeCategoryPath={onChangeCategoryPath}
                  onReset={onResetCategoryPath}
                />
                {visibleFilters && Object.keys(visibleFilters).length !== 0 && (
                  <VariantsFilterDropdown
                    filters={visibleFilters}
                    selectedFilterValues={selectedFilterValues}
                    onChangeSelectedFilterValues={onChangeSelectedFilterValues}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
      <div className="dn flex-ns items-center">
        <PayerPageDisplayModeSwitch
          mode={displayMode}
          onChangeMode={onChangeDisplayMode}
        />
        <div className="h-100 ml3 ml4-ns mr3 br b--gray-300" />
        <PayerPageCartInfo
          cart={cart}
          cartVisible={cartVisible}
          toggleCartVisible={toggleCartVisible}
          cartElement={cartElement}
        />
      </div>
    </div>
  );
};

const EnhancedPayerPageToolbar = React.memo(PayerPageToolbar);

export default EnhancedPayerPageToolbar;
