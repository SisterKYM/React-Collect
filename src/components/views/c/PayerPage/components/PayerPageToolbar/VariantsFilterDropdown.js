import React from 'react';

import {
  Checkbox,
  Dropdown,
  SectionedExpandingList,
  Modal,
  CommonButton,
} from 'elements';
import {MdClose} from 'react-icons/md';
import useToggle from 'hooks/useToggle';
import cx from 'classnames';

const VariantsFilterDropdown = ({
  className,
  filters,
  selectedFilterValues,
  onChangeSelectedFilterValues,
}) => {
  const [dropdownVisible, toggleDropdownVisible] = useToggle();

  const sections = React.useMemo(
    () =>
      Object.keys(filters).map((filterTitle, idx) => ({
        id: filterTitle,
        title: filterTitle,
        initialExpanded: idx === 0,
        items: filters[filterTitle],
      })),
    [filters]
  );

  const renderItem = React.useCallback(
    (filterValue, _idx, section) => {
      const handleChange = (event) => {
        const values = selectedFilterValues[section.id] || [];

        onChangeSelectedFilterValues({
          ...selectedFilterValues,
          [section.id]: event.target.checked
            ? [...values, filterValue]
            : values.filter((value) => value !== filterValue),
        });
      };

      return (
        <Checkbox
          key={filterValue}
          className="pv2"
          label={filterValue}
          checked={
            selectedFilterValues[section.id]
              ? selectedFilterValues[section.id].includes(filterValue)
              : false
          }
          onChange={handleChange}
        />
      );
    },
    [selectedFilterValues, onChangeSelectedFilterValues]
  );

  const reset = React.useCallback(() => {
    onChangeSelectedFilterValues({});
  }, [onChangeSelectedFilterValues]);

  return (
    <>
      <Dropdown
        className={cx('dn db-ns', className)}
        open={dropdownVisible}
        body={
          <SectionedExpandingList
            className="pa3"
            sections={sections}
            renderItem={renderItem}
          />
        }
        onDismiss={toggleDropdownVisible.off}
      >
        <div
          className="dn db-ns ml4-ns f6 ph3 pv2 avenir-medium gray-600 ba br2 b--gray-300 dim pointer"
          onClick={toggleDropdownVisible.on}
        >
          Filters
        </div>
      </Dropdown>

      <div
        className="dn-ns ml4-ns f6 ph3 pv2 avenir-medium gray-600 ba br2 b--gray-300 dim pointer"
        onClick={toggleDropdownVisible.on}
      >
        Filters
      </div>
      {dropdownVisible && (
        <div className="dn-ns">
          <Modal size="SMALL" onDismiss={toggleDropdownVisible.off}>
            <div className="modal-header">
              <div className="close-button">
                <div
                  className="fixed pointer medium-grey"
                  onClick={toggleDropdownVisible.off}
                >
                  <MdClose size={24} />
                </div>
              </div>
              <span className="text-14 tint" onClick={reset}>
                RESET
              </span>
            </div>
            <div className="modal-body">
              <SectionedExpandingList
                sections={sections}
                renderItem={renderItem}
              />
              <div className="flex mt3 items-center">
                <CommonButton
                  className="pt-14 bg-tint white mr3"
                  onClick={toggleDropdownVisible.off}
                >
                  Apply
                </CommonButton>
              </div>
            </div>
            <style jsx>{`
              .modal-header {
                position: relative;
                padding: 24px 24px 18px;
                border-bottom: 1px solid #dedede;
              }
              .close-button {
                position: absolute;
                top: 24px;
                right: 48px;
              }
              h1 {
                font-size: 16px;
                line-height: 24px;
                color: #373737;
                font-family: 'AvenirLTStd-Heavy', sans-serif;
              }
              .modal-body {
                padding: 21px 24px 30px;
              }
              .description {
                margin-bottom: 24px;
                font-size: 16px;
                line-height: 24px;
              }
            `}</style>
          </Modal>
        </div>
      )}
    </>
  );
};

const EnhancedVariantsFilterDropdown = React.memo(VariantsFilterDropdown);

export default EnhancedVariantsFilterDropdown;
