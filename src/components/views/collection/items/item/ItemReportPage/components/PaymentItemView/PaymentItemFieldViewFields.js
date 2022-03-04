import React from 'react';

import {CollectionObjectFieldValue} from 'elements';

const PaymentItemFieldViewFields = ({className, fieldViews}) => (
  <div className={className}>
    {fieldViews.map((fieldView, idx) => {
      const inputProps = {
        key: idx,
        field: fieldView,
        small: true,
        onChange: () => {},
        inputVisible: true,
        editable: true,
        input: {
          value:
            fieldView.field_type === 'date'
              ? new Date(fieldView.value)
              : fieldView.value,
        },
      };

      switch (fieldView.field_type) {
        case 'text':
          return <CollectionObjectFieldValue.OpenText {...inputProps} />;
        case 'multiple_choice':
          return <CollectionObjectFieldValue.MultipleChoice {...inputProps} />;
        case 'checkbox':
          return <CollectionObjectFieldValue.Checkbox {...inputProps} />;
        case 'date':
          return <CollectionObjectFieldValue.Date {...inputProps} />;
        case 'time':
          return <CollectionObjectFieldValue.Time {...inputProps} />;
        case 'phone':
          return <CollectionObjectFieldValue.Phone {...inputProps} />;
        case 'signature':
          return <CollectionObjectFieldValue.Signature {...inputProps} />;
        default:
          return null;
      }
    })}
  </div>
);

const EnhancedPaymentItemFieldViewFields = React.memo(
  PaymentItemFieldViewFields
);

export default EnhancedPaymentItemFieldViewFields;
