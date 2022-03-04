import cx from 'classnames';
import React from 'react';

import {BottomBarWithButton, SwitchBox} from 'elements';

import {CategoriesSelect} from 'views/collection/items/components';

const SwitchRow = ({label, description, value, onChange, children}) => (
  <div className="pv4 ph2 bb b--gray-300">
    <SwitchBox
      reversed
      className="mb2"
      labelClassName="gray-550"
      label={label}
      checked={value}
      onChange={nextValue => {
        onChange({
          target: {
            value: nextValue,
          },
        });
      }}
    />
    <div className="f6 avenir-light gray-600">{description}</div>
    {children}
  </div>
);

const ItemsDisplayOptions = ({
  className,
  categories,
  submitting,
  value,
  onChangeValue,
  onSubmit,
}) => (
  <form className={cx('flex flex-column', className)} onSubmit={onSubmit}>
    <div className="flex-auto ph4 overflow-auto">
      <SwitchRow
        label={`Hide "sold out" items`}
        description={`Items with a quantity available of "0" will be hidden on your page.`}
        value={value.hideSoldOutItems}
        onChange={onChangeValue('hideSoldOutItems')}
      />
      <SwitchRow
        label="Display gallery layout as default view"
        description="Your page will show your items in a gallery or grid-style layout (great for selling) vs. a list-style layout."
        value={value.defaultToGalleryView}
        onChange={onChangeValue('defaultToGalleryView')}
      />
      {categories.length !== 0 && (
        <SwitchRow
          label="Display a navigation menu"
          description="Select category names to include in a drop-down menu at the top of your page."
          value={value.displayNavigationMenu}
          onChange={onChangeValue('displayNavigationMenu')}
        >
          {value.displayNavigationMenu && (
            <CategoriesSelect
              className="mt4"
              categories={categories}
              value={value.categoryIds}
              onChangeValue={categoryIds => {
                onChangeValue('categoryIds')({
                  target: {
                    value: categoryIds,
                  },
                });
              }}
            />
          )}
        </SwitchRow>
      )}
    </div>
    <BottomBarWithButton
      className="display-options-save-button bt b--gray-300"
      loading={submitting}
      buttonType="submit"
      buttonTitle="Save"
    />
    <style jsx>{`
      :global(.display-options-save-button) {
        flex-shrink: 0;
      }
    `}</style>
  </form>
);

const EnhancedItemsDisplayOptions = React.memo(ItemsDisplayOptions);

export default EnhancedItemsDisplayOptions;
