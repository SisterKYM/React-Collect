import {IoIosSearch} from 'react-icons/io';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import {Input} from 'elements';

const SEARCH_OPTIONS = {
  ALL: 'All',
  NONE: 'None',
};

const SelectGroupedSearch = ({
  disabledOptions,
  searchOptionClick,
  value,
  onChange,
}) => {
  const handleChange = React.useCallback(
    event => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <div className="relative">
      <Input
        small
        className="search-input"
        placeholder="Search Items"
        value={value}
        onChange={handleChange}
      />
      <div className="icon-wrapper absolute top-0 left-0 bottom-0 flex justify-center items-center">
        <IoIosSearch color="gray" />
      </div>
      <ul className="absolute top-0 right-0 bottom-0 flex items-center f6">
        {Object.values(SEARCH_OPTIONS).map((so, key) => {
          const disabled = disabledOptions[so] || false;

          return (
            <li
              className={cx('mr2', disabled ? 'gray-400' : 'tint pointer')}
              key={key}
              onClick={() => {
                disabled || searchOptionClick(so);
              }}
            >
              {so}
            </li>
          );
        })}
      </ul>
      <style jsx>{`
        :global(.search-input) {
          padding-left: 20px;
          padding-right: 63px;
        }
        .icon-wrapper {
          width: 29px;
        }
      `}</style>
    </div>
  );
};

const EnhancedSelectGroupedSearch = Object.assign(
  React.memo(SelectGroupedSearch),
  {
    propTypes: {
      onChange: PropTypes.func,
      disabledOptions: PropTypes.shape({
        [PropTypes.oneOf(Object.keys(SEARCH_OPTIONS))]: PropTypes.bool,
      }),
      searchOptionClick: PropTypes.func,
      selectedAll: PropTypes.bool,
      selectedNone: PropTypes.bool,
      value: PropTypes.string,
    },
  }
);

export {SEARCH_OPTIONS};
export default EnhancedSelectGroupedSearch;
