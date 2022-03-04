import cx from 'classnames';
import React from 'react';

import {colors} from 'theme/constants';
import {SecondarySidebarMobile} from 'layout/components';
import AdvSettingsIcon from 'theme/images/AdvSettings.svg';
import ImagesIcon from 'theme/images/Images.svg';
import ItemDetailsIcon from 'theme/images/ItemDetails.svg';
import ItemQuestionsIcon from 'theme/images/ItemQuestions.svg';

import ItemFormSidebarItem from './ItemFormSidebarItem';

const SIDEBAR_ITEMS = {
  required: [
    {
      key: 'ITEM_DETAILS',
      title: 'Item Details',
      iconSrc: ItemDetailsIcon,
    },
  ],
  optional: [
    {
      key: 'ADVANCED_SETTINGS',
      title: 'Advanced Settings',
      iconSrc: AdvSettingsIcon,
    },
    {
      key: 'IMAGES_AND_DESCRIPTION',
      title: 'Images and Description',
      iconSrc: ImagesIcon,
    },
    {
      key: 'ITEM_QUESTIONS',
      title: 'Item Questions',
      iconSrc: ItemQuestionsIcon,
    },
  ],
};

class ItemFormSidebar extends React.PureComponent {
  renderItem = (item) => {
    const handleClick = () => {
      this.props.onSelectItem(item.key);
    };

    return (
      <ItemFormSidebarItem
        key={item.key}
        highlighted={this.props.selectedItemKey === item.key}
        title={item.title}
        iconSrc={item.iconSrc}
        onClick={handleClick}
      />
    );
  };

  render() {
    const container = (
      <div className="h-100 br b--gray-300 gray-700">
        {SIDEBAR_ITEMS.required
          .filter(({key}) => !this.props.hiddenItemKeys.includes(key))
          .map(this.renderItem)}
        <div className="ml3 mv3 gray-400 f7">Optional</div>
        {SIDEBAR_ITEMS.optional
          .filter(({key}) => !this.props.hiddenItemKeys.includes(key))
          .map(this.renderItem)}
      </div>
    );

    return (
      <>
        <SecondarySidebarMobile
          className="db dn-ns"
          contentContainerClassName="bg-white"
          burgerClassName="bg-light-aqua"
          burgerIconColor={colors.darkerGray}
        >
          {container}
        </SecondarySidebarMobile>
        <div className={cx('dn db-ns', this.props.className)}>{container}</div>
      </>
    );
  }
}

const EnhancedItemFormSidebar = React.memo(ItemFormSidebar);

export default EnhancedItemFormSidebar;
