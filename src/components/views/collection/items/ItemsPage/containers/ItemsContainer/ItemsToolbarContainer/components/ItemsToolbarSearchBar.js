import {IoIosSearch} from 'react-icons/io';
import React from 'react';

import {TextInput} from 'elements';

const ItemsToolbarSearchBar = ({
  className,
  errorMessage,
  onResetErrorMessage,
  onSubmit,
}) => {
  const [keyword, setKeyword] = React.useState('');

  React.useEffect(onResetErrorMessage, [keyword]);

  return (
    <form
      className={className}
      onSubmit={(event) => {
        event.preventDefault();

        if (keyword.length !== 0) {
          onSubmit(keyword);
        }
      }}
    >
      <div className="flex items-center ba b--gray-300 br2">
        <TextInput
          className="flex-auto"
          inputClassName="items-toolbar-search-bar-text-input avenir-roman"
          value={keyword}
          onChange={(event) => {
            setKeyword(event.target.value);
          }}
        />
        <button className="input-reset bg-white bn flex" type="submit">
          <IoIosSearch className="f5 gray-400" />
        </button>
      </div>
      {errorMessage.length !== 0 && (
        <div className="mt2 f6 avenir-roman truncate brand">{errorMessage}</div>
      )}
      <style jsx>{`
        :global(.items-toolbar-search-bar-text-input.items-toolbar-search-bar-text-input) {
          height: 1.75rem;
          font-size: 0.75rem;
          border: none;
        }
      `}</style>
    </form>
  );
};

const EnhancedItemsToolbarSearchBar = React.memo(ItemsToolbarSearchBar);

export default EnhancedItemsToolbarSearchBar;
