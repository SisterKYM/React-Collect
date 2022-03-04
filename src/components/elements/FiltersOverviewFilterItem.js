import {IoIosCloseCircleOutline} from 'react-icons/io';
import React from 'react';
import cx from 'classnames';

const FiltersOverviewFilterItem = ({className, title, onClickCross}) => (
  <div className={cx('flex items-center f7 avenir-roman gray-600', className)}>
    <IoIosCloseCircleOutline
      className="gray-400 mr2 f4 grow pointer"
      onClick={onClickCross}
    />
    {title}
  </div>
);

const EnhancedFiltersOverviewFilterItem = React.memo(FiltersOverviewFilterItem);

export default EnhancedFiltersOverviewFilterItem;
