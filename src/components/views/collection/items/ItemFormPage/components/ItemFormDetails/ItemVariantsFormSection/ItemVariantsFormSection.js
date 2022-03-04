import {FieldArray} from 'redux-form';
import {useSelector} from 'react-redux';
import React from 'react';
import _ from 'lodash';

import {ITEM_FORM_DETAILS_NAME} from '../ItemFormDetails';
import ItemVariantOptionArrayInput from './ItemVariantOptionArrayInput';
import ItemVariantsFormSectionUpgrade from './ItemVariantsFormSectionUpgrade';
import ItemVariantsListingTable from './ItemVariantsListingTable';

const ItemVariantsFormSection = ({
  className,
  item,
  isProUser,
  variantOptionKeys,
  variantOptionValues,
}) => {
  const listingsVisible = useSelector(
    state =>
      _.get(
        state.form[ITEM_FORM_DETAILS_NAME],
        'values.options.variants.options',
        []
      ).filter(({values}) => values.length !== 0).length !== 0
  );

  return (
    <div className={className}>
      <h4 className="f-regular avenir-roman gray-700">Add Variants</h4>
      {!isProUser ? (
        <ItemVariantsFormSectionUpgrade />
      ) : (
        <>
          <p className="mt2 f-small avenir-roman gray-600">
            Add an option name (e.g. size) and value (e.g. small, medium, large)
          </p>
          <FieldArray
            name="options.variants.options"
            component={ItemVariantOptionArrayInput}
            variantOptionKeys={variantOptionKeys}
            variantOptionValues={variantOptionValues}
          />
        </>
      )}
      {listingsVisible && (
        <FieldArray
          name="options.variants.listings"
          className="pv3"
          item={item}
          component={ItemVariantsListingTable}
          rerenderOnEveryChange
        />
      )}
    </div>
  );
};

const EnhancedItemVariantsFormSection = React.memo(ItemVariantsFormSection);

export default EnhancedItemVariantsFormSection;
