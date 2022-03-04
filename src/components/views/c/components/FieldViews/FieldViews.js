import React from 'react';
import {Element as ScrollAnchor} from 'react-scroll';

import FieldViewCheckboxInput from './FieldViewCheckboxInput';
import FieldViewDateInput from './FieldViewDateInput';
import FieldViewMultipleChoiceInput from './FieldViewMultipleChoiceInput';
import FieldViewPhoneInput from './FieldViewPhoneInput';
import FieldViewRow from './FieldViewRow';
import FieldViewSignatureInput from './FieldViewSignatureInput';
import FieldViewTextInput from './FieldViewTextInput';
import FieldViewTimeInput from './FieldViewTimeInput';

const getFieldViewInput = (fieldType) => {
  switch (fieldType) {
    case 'text':
      return FieldViewTextInput;
    case 'date':
      return FieldViewDateInput;
    case 'time':
      return FieldViewTimeInput;
    case 'phone':
      return FieldViewPhoneInput;
    case 'multiple_choice':
      return FieldViewMultipleChoiceInput;
    case 'checkbox':
      return FieldViewCheckboxInput;
    case 'signature':
    case 'image':
      return FieldViewSignatureInput;
    default:
      return null;
  }
};

const FieldViews = ({
  className,
  contentContainerClassName,
  fieldViews,
  errorMessages,
  value,
  onChangeErrorMessages,
  onChangeValue,
}) => (
  <div className={className}>
    <div className={contentContainerClassName}>
      {fieldViews.map((fieldView, idx) => {
        const FieldViewInput = getFieldViewInput(fieldView.field_type);

        return (
          <FieldViewRow
            key={fieldView.id}
            className={idx === 0 ? '' : 'mt4'}
            fieldView={fieldView}
          >
            <ScrollAnchor name={`field-${fieldView.id}`} />
            <FieldViewInput
              name={fieldView.id}
              disabled={fieldView.metadata.waiverFieldType === 'signed_date'}
              errorMessage={errorMessages[fieldView.id]}
              value={value[fieldView.id]}
              values={fieldView.values}
              onChangeValue={(nextValue) => {
                if (errorMessages[fieldView.id]) {
                  onChangeErrorMessages({
                    ...errorMessages,
                    [fieldView.id]: undefined,
                  });
                }

                onChangeValue({...value, [fieldView.id]: nextValue});
              }}
            />
          </FieldViewRow>
        );
      })}
    </div>
  </div>
);

export default FieldViews;
