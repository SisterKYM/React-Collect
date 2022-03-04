import React, {useEffect, useMemo} from 'react';
import {MdClose} from 'react-icons/md';

import {Input} from 'elements';
import {ReactComponent as Search} from 'theme/images/Search.svg';

import {DropdownSelect} from '../../../../components';

const dropdownProps = {
  width: 150,
};
const dropdownStyle = {
  marginTop: 'auto',
};

const PaymentsListActions = ({
  sortOption,
  updateSortOption,
  input,
  onInputChange,
  clearInput,
}) => {
  const sortOptions = useMemo(
    () => [
      {
        title: 'Payment Date',
        value: 'created_at',
        onClick() {
          updateSortOption(this);
        },
      },
      {
        title: 'Amount',
        value: 'total',
        onClick() {
          updateSortOption(this);
        },
      },
      {
        title: 'Method',
        value: 'payment_method',
        onClick() {
          updateSortOption(this);
        },
      },
    ],
    [updateSortOption]
  );

  useEffect(() => {
    updateSortOption(sortOptions[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOptions]);

  return (
    <div className="flex-ns">
      {/* <DropdownSelect */}
      {/*  className="dn db-ns bg-white ba b--gray-300 mr3" */}
      {/*  backgroundColor="white" */}
      {/*  title="All" */}
      {/*  options={sortOptions} */}
      {/*  width={100} */}
      {/*  dropdownProps={dropdownProps} */}
      {/*  style={dropdownStyle} */}
      {/* /> */}

      <div>
        <DropdownSelect
          className="bg-white ba b--gray-300"
          backgroundColor="white"
          title={sortOption.title}
          options={sortOptions}
          width={150}
          dropdownProps={dropdownProps}
          style={dropdownStyle}
        />
      </div>

      <div className="flex-auto mt2" />

      <div className="relative input-wrapper">
        <Input
          name="input"
          className="input"
          value={input}
          onChange={onInputChange}
          style={{
            border: '1px solid #DEDEDE',
            borderRadius: '4px',
            height: '30px',
            width: '255px',
            opacity: 1,
            padding: '0.5rem 2.5rem 0.5rem 1rem',
          }}
        />
        <div className="magnifier medium-grey">
          {input ? (
            <MdClose className="pointer" size={24} onClick={clearInput} />
          ) : (
            <Search />
          )}
        </div>
      </div>
      <style jsx>{`
        .input {
          margin-right: 6rem;
        }
        .input-wrapper {
          width: 255px;
        }
        .magnifier {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 15px;
          height: 15px;
          top: 7px;
          right: 17px;
        }
      `}</style>
    </div>
  );
};

const EnhancedPaymentsListActions = React.memo(PaymentsListActions);

export default EnhancedPaymentsListActions;
