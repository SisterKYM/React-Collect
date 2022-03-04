import {IoIosSearch} from 'react-icons/io';
import React from 'react';
import cx from 'classnames';

const SearchBox = ({className, onChange}) => (
  <div
    className={cx('flex items-center', className)}
    style={{position: 'relative'}}
  >
    <input
      className={className}
      placeholder="Search"
      onChange={({target: {value}}) => {
        onChange(value);
      }}
    />
    <IoIosSearch
      className="f5 gray-400 absolute"
      style={{
        right: '5px',
      }}
    />
    <style jsx>{`
      input {
        border: 1px solid #dedede;
        outline: none;
        font-size: 14px;
        line-height: 20px;
        padding: 7px 20px;
        border-radius: 4px;
        color: #373737;
      }
      input::placeholder {
        font-family: 'AvenirLTStd-Light', sans-serif;
      }
    `}</style>
  </div>
);

const EnhancedSearchBox = React.memo(SearchBox);

export default EnhancedSearchBox;
