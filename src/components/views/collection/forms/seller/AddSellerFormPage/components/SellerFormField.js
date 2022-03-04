import React from 'react';

import {CollectionObjectFieldValue} from 'elements';

const getFieldComponentByType = fieldType => {
  switch (fieldType) {
    case 'text':
      return CollectionObjectFieldValue.OpenText;
    case 'date':
      return CollectionObjectFieldValue.Date;
    case 'time':
      return CollectionObjectFieldValue.Time;
    case 'phone':
      return CollectionObjectFieldValue.Phone;
    case 'multiple_choice':
      return CollectionObjectFieldValue.MultipleChoice;
    case 'checkbox':
      return CollectionObjectFieldValue.Checkbox;
    case 'signature':
    case 'image':
      return CollectionObjectFieldValue.Signature;
    default:
      return null;
  }
};

const SellerFormField = ({field}) => {
  const FieldComponent = getFieldComponentByType(field.field_type);

  return (
    <div className="flex mb4">
      <div className="w-90">
        {FieldComponent && (
          <FieldComponent inputVisible editable field={field} />
        )}
      </div>
    </div>
  );
};

const EnhancedSellerFormField = React.memo(SellerFormField);

export default EnhancedSellerFormField;
