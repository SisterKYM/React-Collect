import _ from 'lodash';
import cx from 'classnames';
import React from 'react';

import {InputLabel, Select} from 'elements';

const ItemViewVariants = ({
  className,
  hideSoldOutItems,
  initialOptionValues,
  options,
  listings: listingsRaw,
  onChangeListingUuid,
}) => {
  const listings = !hideSoldOutItems
    ? listingsRaw
    : listingsRaw.filter((i) => i.available_quantity > 0);

  const filteredOptions =
    !hideSoldOutItems || options.length !== 1
      ? options
      : options.map((option) => ({
          ...option,
          values: option.values.filter((value) => {
            if (options.length !== 1) {
              return true;
            }

            const listingIsSoldOut = listings.some(
              (listing) =>
                Object.values(listing.optionValues)[0] === value &&
                listing.available_quantity === 0
            );

            return !listingIsSoldOut;
          }),
        }));

  const [selectedOptionValues, setSelectedOptionValues] = React.useState(
    () =>
      initialOptionValues || listings.map((listing) => listing.optionValues)[0]
  );

  React.useEffect(() => {
    const nextLising = listings.find((listing) =>
      _.isEqual(listing.optionValues, selectedOptionValues)
    );
    onChangeListingUuid(nextLising ? nextLising.uuid : null);
  }, [listings, selectedOptionValues, onChangeListingUuid]);

  return (
    <div className={className}>
      <div className="pv4 bb b--gray-300">
        {filteredOptions.map((option, idx) => (
          <InputLabel
            required
            key={option.key}
            className={cx('db', idx === 0 ? '' : 'mt4')}
            htmlFor={option.key}
            label={option.key}
          >
            {option.values.length > 1 ? (
              <Select
                name={option.key}
                className="ba b--gray-300 br2"
                selectClassName="item-view-variants-select avenir-light"
                options={option.values
                  .filter((value) => {
                    const selectedOptionsAndCurrent = {
                      ...selectedOptionValues,
                      [option.key]: value,
                    };

                    return listings.some((listing) =>
                      _.isEqual(listing.optionValues, selectedOptionsAndCurrent)
                    );
                  })
                  .map((value) => ({
                    value,
                    children: value,
                  }))}
                value={selectedOptionValues[option.key]}
                onChange={(event) => {
                  event.persist();

                  setSelectedOptionValues((prevSelectedOptionValues) => ({
                    ...prevSelectedOptionValues,
                    [option.key]: (event.target && event.target.value) || null,
                  }));
                }}
              />
            ) : (
              <div className="flex items-center ph2 f5 avenir-light ba b--gray-300 br2">
                {option.values[0]}
              </div>
            )}
            <style jsx>{`
              :global(.item-view-variants-select) {
                height: 2.5rem;
                font-size: 1rem !important;
              }
              div {
                height: 2.5rem;
              }
            `}</style>
          </InputLabel>
        ))}
      </div>
    </div>
  );
};

export default ItemViewVariants;
