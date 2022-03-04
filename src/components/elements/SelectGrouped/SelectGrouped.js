import {IoMdArrowDropdown} from 'react-icons/io';
import {defaultTo, get, omit, values} from 'lodash';
import React from 'react';
import cx from 'classnames';

import {fontSizes, inputHeight, inputHeightSmall} from 'theme/constants';
import Dropdown from 'elements/Dropdown';

import SelectGroupedOption from './SelectGroupedOption';
import SelectGroupedSearch, {SEARCH_OPTIONS} from './SelectGroupedSearch';

const SelectGrouped = ({
  small,
  input,
  meta,
  optionsCategorized,
  optionsNoCategorized,
  border,
  borderRadius,
  placeholder,
}) => {
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const [searchBy, setSearchBy] = React.useState('');

  const inputValue = get(input, 'value');
  const disabledSearchOptions = React.useMemo(
    () => ({
      [SEARCH_OPTIONS.ALL]: inputValue === SEARCH_OPTIONS.ALL,
      [SEARCH_OPTIONS.NONE]:
        inputValue === SEARCH_OPTIONS.NONE ||
        !inputValue ||
        values(inputValue).length === 0,
    }),
    [inputValue]
  );
  const errMsg = defaultTo(meta.error, meta.warning);

  const options = React.useMemo(
    () =>
      [
        ...(optionsCategorized || []).reduce((acc, option) => {
          const category = get(option, 'category', {});

          return [
            ...acc,
            {
              ...category,
              categoryHeader: true,
            },
            ...option.options.map(opt => ({
              ...opt,
              category: category.value,
            })),
          ];
        }, []),
        ...(optionsNoCategorized || []),
      ]
        .map(option => {
          let checked;
          if (inputValue === SEARCH_OPTIONS.ALL) {
            checked = true;
          } else if (inputValue === SEARCH_OPTIONS.NONE) {
            checked = false;
          } else if (option.categoryHeader) {
            const optionCategorized = optionsCategorized.find(
              oc => get(oc, 'category.value', '') === option.value
            );
            const categoryOps = get(optionCategorized, 'options', []);
            const categoryInputValues = values(inputValue).filter(
              civ => civ.category === option.value
            );
            checked = categoryOps.length === categoryInputValues.length;
          } else {
            checked = Boolean(get(input, `value[${option.value}]`));
          }

          return {...option, checked};
        })
        .filter(({label}) =>
          label.toLowerCase().includes(searchBy.toLowerCase())
        ),
    [input, inputValue, optionsCategorized, optionsNoCategorized, searchBy]
  );
  const showErrMsg = meta.touched && Boolean(errMsg);
  const style = {
    fontSize: fontSizes[small ? 5 : 4],
    height: small ? inputHeightSmall : inputHeight,
  };

  const clickDropdown = React.useCallback(() => {
    if (options.length !== 0) {
      setDropdownVisible(!dropdownVisible);
    }
  }, [dropdownVisible, options]);

  const dismissDropdown = React.useCallback(() => {
    setDropdownVisible(false);
  }, []);

  const searchOptionClick = React.useCallback(
    searchOption => {
      if (input && input.onChange) {
        input.onChange(searchOption);
      }
    },
    [input]
  );

  const handleSelectOption = React.useCallback(
    (option, toSave) => {
      const optionToSave = {checked: true};
      const optionCategorized = (optionsCategorized || []).find(
        oc => get(oc, 'category.value', '') === option.value
      );
      const selectedCategoryOptions = get(optionCategorized, 'options', []);
      if (option.category) {
        optionToSave.category = option.category;
      }

      let value = get(input, 'value', {});
      if (value === SEARCH_OPTIONS.NONE) {
        value = {};
      }

      let valueToSave = omit(value, [option.value]);
      if (toSave) {
        valueToSave = option.categoryHeader
          ? {
              ...value,
              ...selectedCategoryOptions.reduce((acc, op) => {
                const accRes = {...acc};
                accRes[op.value] = {
                  category: option.value,
                  checked: true,
                };

                return accRes;
              }, {}),
            }
          : {
              ...value,
              [option.value]: optionToSave,
            };
      } else {
        if (value === SEARCH_OPTIONS.ALL) {
          valueToSave = options
            .filter(op => !op.categoryHeader && op.value !== option.value)
            .reduce((acc, op) => {
              const toSave = {checked: true};
              if (op.category) {
                toSave.category = op.category;
              }
              acc[op.value] = toSave;

              return acc;
            }, {});
        }
        if (option.categoryHeader) {
          const toDeleteProps = selectedCategoryOptions.map(op => op.value);
          valueToSave = omit(valueToSave, toDeleteProps);
        }
      }

      if (input && input.onChange) {
        input.onChange(valueToSave);
      }
    },
    [input, options, optionsCategorized]
  );

  return (
    <div className="relative">
      <div
        className={cx(
          'select-grouped-container relative flex ph2 items-center bg-white gray-600',
          border && 'ba b--gray-300',
          borderRadius && 'br2',
          options.length !== 0 ? 'pointer' : 'gray-400'
        )}
        onClick={clickDropdown}
        style={style}
      >
        {placeholder}
        <div className="absolute top-0 right-0 flex h-100 pr2 items-center">
          <IoMdArrowDropdown size={14} />
        </div>
      </div>
      <Dropdown
        body={
          <div>
            <SelectGroupedSearch
              disabledOptions={disabledSearchOptions}
              onChange={setSearchBy}
              searchOptionClick={searchOptionClick}
              value={searchBy}
            />
            <ul className="list overflow-y-auto">
              {options.map((option, idx) => (
                <SelectGroupedOption
                  key={idx}
                  checked={option.checked}
                  option={option}
                  onSelect={handleSelectOption}
                />
              ))}
            </ul>
          </div>
        }
        onDismiss={dismissDropdown}
        open={dropdownVisible}
        width="100%"
      />
      {Boolean(showErrMsg) && (
        <div className="absolute top-0 right-0 bottom-0 flex mr2 items-center f6 brand bg-white pointer">
          {errMsg}
        </div>
      )}
      <style jsx>{`
        .select-grouped-container {
          padding-right: 25px;
        }
        .list {
          max-height: 14.4375rem;
        }
      `}</style>
    </div>
  );
};

const EnhancedSelectGrouped = React.memo(SelectGrouped);

export default EnhancedSelectGrouped;
