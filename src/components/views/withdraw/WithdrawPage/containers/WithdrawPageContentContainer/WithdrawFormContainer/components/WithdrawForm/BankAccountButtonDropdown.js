import {IoMdArrowDropdown} from 'react-icons/io';
import React from 'react';

import {Button, Dropdown} from 'elements';

const BankAccountButtonDropdown = ({
  open,
  disabled,
  dropdown,
  onDismiss,
  onClick,
}) => (
  <Dropdown
    top={50}
    body={dropdown}
    open={open}
    onDismiss={onDismiss}
    bodyClassName="shadow-none b--gray-300"
    borderRadius
    border
    width="unset"
  >
    <Button
      className="w-100"
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      <div className="avenir-roman flex justify-between text-14">
        Withdraw
        <div className="pl3 flex items-center">
          <IoMdArrowDropdown />
        </div>
      </div>
    </Button>
  </Dropdown>
);

const EnhancedBankAccountButtonDropdown = React.memo(BankAccountButtonDropdown);

export default EnhancedBankAccountButtonDropdown;
