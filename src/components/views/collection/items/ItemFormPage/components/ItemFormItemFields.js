import React from 'react';

import {CollectionObjectFieldListContainer} from 'containers';

const ItemFormItemFields = ({fields, onChangeFields}) => (
  <>
    <div className="mv4 avenir-roman gray-600">
      <div className="mb2 f-regular">
        Collect information from your payers about this item
      </div>
      <div className="f6">
        (e.g., t-shirt size, registrant&apos;s name, etc.)
      </div>
    </div>
    <CollectionObjectFieldListContainer
      className="mb4"
      collectionObjectType="ITEM"
      fields={fields}
      onChangeFields={onChangeFields}
    />
  </>
);

const EnhancedItemFormItemFields = React.memo(ItemFormItemFields);

export default EnhancedItemFormItemFields;
