import {IoMdArrowDropdown} from 'react-icons/io';
import React from 'react';
import cx from 'classnames';

import {Dropdown, Touchable} from 'elements';
import config from 'config';
import useToggle from 'hooks/useToggle';

const ItemVariantsListingTableActionDropdown = ({
  className,
  variantsSelected,
  onEnterPrice,
  onEnterQuantity,
  onEnterSku,
  onMarkAsSoldOut,
  onDelete,
}) => {
  const [dropdownVisible, toggleDropdownVisible] = useToggle();
  const [errorVisible, toggleErrorVisible] = useToggle();

  React.useEffect(() => {
    if (variantsSelected) {
      toggleErrorVisible.off();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variantsSelected]);

  return (
    <div className={cx(className, 'relative')}>
      <div className="flex items-center">
        <Touchable
          className="flex items-center pa2 f6 ba br2 b--gray-300 bg-white"
          onClick={() => {
            if (variantsSelected) {
              toggleDropdownVisible.on();
            } else {
              toggleErrorVisible.on();
            }
          }}
        >
          Actions
          <IoMdArrowDropdown className="ml2" size={14} />
        </Touchable>
        {errorVisible && (
          <p className="ml3 f-small avenir-roman brand">
            please select at least one variant
          </p>
        )}
      </div>
      <Dropdown
        border
        open={dropdownVisible}
        left={0}
        top={5}
        body={
          <ul className="pa3 bg-white" onClick={toggleDropdownVisible.off}>
            {config.siteName !== 'PIXIE_LANE' && (
              <li
                className="relative pa2 br2 f6 hover-bg-gray-200 bg-animate pointer"
                onClick={onEnterPrice}
              >
                Enter Price
              </li>
            )}
            <li
              className="relative pa2 br2 f6 hover-bg-gray-200 bg-animate pointer"
              onClick={onEnterQuantity}
            >
              Enter Quantity
            </li>
            <li
              className="relative pa2 br2 f6 hover-bg-gray-200 bg-animate pointer"
              onClick={onEnterSku}
            >
              Enter SKU
            </li>
            <li
              className="relative pa2 br2 f6 hover-bg-gray-200 bg-animate pointer"
              onClick={onMarkAsSoldOut}
            >
              Mark as Sold Out
            </li>
            <li
              className="relative pa2 br2 f6 hover-bg-gray-200 bg-animate pointer"
              onClick={onDelete}
            >
              Delete
            </li>
          </ul>
        }
        onDismiss={toggleDropdownVisible.off}
      />
    </div>
  );
};

const EnhancedItemVariantsListingTableActionDropdown = React.memo(
  ItemVariantsListingTableActionDropdown
);

export default EnhancedItemVariantsListingTableActionDropdown;
