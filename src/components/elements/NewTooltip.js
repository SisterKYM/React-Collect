import cx from 'classnames';
import React from 'react';
import ReactTooltip from 'react-tooltip';

import {colors} from 'theme/constants';

const NewTooltip = ({type, clickable, ...props}) => (
  <ReactTooltip
    border
    className={cx('f5', type === 'dark' ? 'white' : 'dark-grey')}
    delayHide={clickable ? 500 : undefined}
    delayUpdate={clickable ? 500 : undefined}
    effect="solid"
    type={type}
    borderColor={colors.lightGray}
    {...props}
  />
);

const EnhancedNewTooltip = React.memo(NewTooltip);

export default EnhancedNewTooltip;
