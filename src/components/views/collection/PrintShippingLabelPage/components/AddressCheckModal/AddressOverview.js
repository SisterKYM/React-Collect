import React from 'react';
import cx from 'classnames';

import {Button} from 'elements';

const AddressOverview = ({
  className,
  buttonPrimary,
  title,
  buttonTitle,
  address,
  onClickButton,
}) => (
  <div className={cx('f7 lh-copy avenir-roman gray-600 bg-white', className)}>
    <div className="mb3 f-regular">{title}</div>
    {address.street1}
    <br />
    {address.city}, {address.state} {address.zip}
    <br />
    {address.country === 'US' ? 'UNITED STATES' : 'CANADA'}
    <br />
    <Button
      small
      backgroundColorSet
      className={cx('w-100 mt3', buttonPrimary ? 'bg-tint' : 'bg-gray-500')}
      onClick={onClickButton}
    >
      {buttonTitle}
    </Button>
  </div>
);

const EnhancedAddressOverview = React.memo(AddressOverview);

export default EnhancedAddressOverview;
