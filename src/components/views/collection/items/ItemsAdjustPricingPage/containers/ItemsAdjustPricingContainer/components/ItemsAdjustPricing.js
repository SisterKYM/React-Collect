import React from 'react';

import {BigCheckbox, BottomBarWithButton, Select, TextInput} from 'elements';

import {CategoriesSelect} from 'views/collection/items/components';

const BASIS_OPTIONS = [
  {
    children: 'Increase',
    value: 'INCREASE',
  },
  {
    children: 'Decrease',
    value: 'DECREASE',
  },
];

const StyledBigCheckbox = ({
  className,
  label,
  description,
  checked,
  onChange,
}) => (
  <>
    <BigCheckbox
      labelFontSizeSet
      className={className}
      labelClassName="big-checkbox-label f6"
      size="1rem"
      type="radio"
      label={label}
      checked={checked}
      onChange={onChange}
    />
    <p className="mt2 ml4 f8 lh-copy avenir-light gray-400">{description}</p>
    <style jsx>{`
      :global(.big-checkbox-label) {
        background-size: 0.7rem;
      }
    `}</style>
  </>
);

const ItemsAdjustPricing = ({
  categories,
  itemsHaveRetailPrice,
  submitting,
  errorMessages,
  value,
  onChangeValue,
  onSubmit,
}) => (
  <form
    className="flex flex-column h-100"
    onSubmit={(event) => {
      event.preventDefault();

      onSubmit();
    }}
  >
    <div className="flex-auto item-adjust-pricing-container overflow-auto">
      <div className="pb4 bb bt b--gray-300 item-adjust-pricing-content">
        <div className="cf">
          <Select
            className="items-adjust-pricing-basis-select-wrapper fl ba br2"
            selectClassName="f5-important gray-600 avenir-light items-adjust-pricing-basis-select"
            options={BASIS_OPTIONS}
            value={BASIS_OPTIONS.find((option) => option.value === value)}
            onChange={onChangeValue('direction')}
          />
          <TextInput
            className="w4 fl relative items-adjust-pricing-basis-input-wrapper"
            inputClassName="f5-important gray-600 avenir-light items-adjust-pricing-basis-input"
            type="percentage"
            errorMessage={errorMessages.percentage}
            placeholder="0"
            value={value.percentage}
            onChange={(event) => {
              const parsedValue = Number.parseFloat(event.target.value);

              if (Number.isNaN(parsedValue) || parsedValue <= 100) {
                onChangeValue('percentage')(event);
              }
            }}
          >
            <span className="percentage-symbol absolute f5 avenir-light gray-600 bl b--gray-300">
              %
            </span>
          </TextInput>
        </div>
        {itemsHaveRetailPrice && (
          <div className="mt2 pt1 avenir-light">
            <StyledBigCheckbox
              className="ml2 mt3"
              label="Apply to retail price"
              checked={value.basis === 'retail'}
              onChange={() => {
                onChangeValue('basis')({
                  target: {
                    value: 'retail',
                  },
                });
              }}
            />
            <StyledBigCheckbox
              className="ml2 mt3"
              label="Apply to sale price"
              checked={value.basis === 'sale'}
              onChange={() => {
                onChangeValue('basis')({
                  target: {
                    value: 'sale',
                  },
                });
              }}
            />
          </div>
        )}
      </div>
      {categories.length !== 0 && (
        <div className="pv4 ml2">
          <h2 className="mb2 f-regular avenir-roman gray-600">
            Select categories
          </h2>
          <p className="mb3 mt3 pb2 f6 avenir-light gray-600">
            Pricing will be adjusted in selected categories.
          </p>
          <CategoriesSelect
            categories={categories}
            value={value.categoryIds}
            onChangeValue={(categoryIds) => {
              onChangeValue('categoryIds')({
                target: {
                  value: categoryIds,
                },
              });
            }}
          />
        </div>
      )}
    </div>
    <BottomBarWithButton
      className="items-adjust-pricing-save-button bt b--gray-300"
      loading={submitting}
      buttonType="submit"
      buttonTitle="Save"
    />
    <style jsx>{`
      :global(.item-adjust-pricing-container) {
        padding-right: 3.5rem;
        padding-left: 2rem;
      }
      :global(.item-adjust-pricing-content) {
        padding-top: 1.75rem;
      }
      :global(.items-adjust-pricing-basis-select-wrapper) {
        height: 2.5rem;
        width: 12rem;
        margin-right: 0.75rem;
      }
      :global(.items-adjust-pricing-basis-select) {
        height: 100% !important;
      }
      :global(.items-adjust-pricing-basis-input-wrapper) {
        width: 6.75rem;
      }
      :global(.items-adjust-pricing-basis-input) {
        padding-top: 0.25rem;
      }
      :global(.f5-important) {
        font-size: 1rem !important;
      }
      :global(.items-adjust-pricing-save-button) {
        flex-shrink: 0;
      }
      :global(.arrow-icon-wrapper) {
        padding-top: 0.25rem;
      }
      :global(.percentage-symbol) {
        padding: 0 0.75rem;
        padding-top: 0.25rem;
        display: flex;
        align-items: center;
        top: 0;
        right: 0;
        bottom: 0;
      }
    `}</style>
  </form>
);

const EnhancedItemsAdjustPricing = React.memo(ItemsAdjustPricing);

export default EnhancedItemsAdjustPricing;
