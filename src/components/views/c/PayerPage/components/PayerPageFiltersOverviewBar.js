import React from 'react';

import {FiltersOverviewFilterItem} from 'elements';

const PayerPageFiltersOverviewBar = ({
  selectedFilterValues,
  onChangeSelectedFilterValues,
}) => (
  <div className="cf ph3 ph5-ns pv2 bb b--gray-300 bg-white">
    {Object.keys(selectedFilterValues).map(filterValuesKey =>
      selectedFilterValues[filterValuesKey].map(filterValue => {
        const handleClickCross = () => {
          onChangeSelectedFilterValues({
            ...selectedFilterValues,
            [filterValuesKey]: selectedFilterValues[filterValuesKey].filter(
              value => value !== filterValue
            ),
          });
        };

        return (
          <FiltersOverviewFilterItem
            key={`${filterValuesKey}-${filterValue}`}
            className="fl mr4"
            title={filterValue}
            onClickCross={handleClickCross}
          />
        );
      })
    )}
  </div>
);

const EnhancedPayerPageFiltersOverviewBar = React.memo(
  PayerPageFiltersOverviewBar
);

export default EnhancedPayerPageFiltersOverviewBar;
