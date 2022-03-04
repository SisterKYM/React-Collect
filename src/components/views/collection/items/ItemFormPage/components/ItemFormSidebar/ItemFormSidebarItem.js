import React from 'react';
import cx from 'classnames';

const ItemFormSidebarItem = ({highlighted, title, iconSrc, onClick}) => (
  <div
    className={cx(
      'item-form-sidebar-item-container flex pl3 pl4-ns pr3 items-center pointer',
      highlighted && 'bg-light-tint'
    )}
    onClick={onClick}
  >
    <img
      className="item-form-sidebar-item-icon mr3"
      alt="Sidebar menu item"
      src={iconSrc}
    />
    <div className="f6 nowrap avenir-roman">{title}</div>
    <style jsx>{`
      .item-form-sidebar-item-container {
        height: 4rem;
      }
      .item-form-sidebar-item-icon {
        width: 1.625rem;
      }
    `}</style>
  </div>
);

const EnhancedItemFormSidebarItem = React.memo(ItemFormSidebarItem);

export default EnhancedItemFormSidebarItem;
