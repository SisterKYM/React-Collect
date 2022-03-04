import {Field} from 'formik';
import React from 'react';
import _ from 'lodash';

import CollectionObjectFieldValue from 'elements/CollectionObjectFieldValue';

const renderFieldViewField = (fieldView) => (
  <Field key={String(fieldView.id)} name={fieldView.id}>
    {({field}) => {
      const onChange = (data) => {
        if (
          fieldView.field_type === 'checkbox' ||
          fieldView.field_type === 'date' ||
          fieldView.field_type === 'phone' ||
          fieldView.field_type === 'time'
        ) {
          field.onChange({
            target: {
              name: String(field.name),
              value: data,
            },
          });
        }

        field.onChange(data);
      };

      const inputProps = {
        readOnly: fieldView.metadata.isWaiverField,
        field: fieldView,
        editable: true,
        small: true,
        inputVisible: true,
        input: {
          ...field,
          onChange: fieldView.metadata.isWaiverField ? undefined : onChange,
          value:
            fieldView.field_type === 'date'
              ? field.value
                ? new Date(field.value)
                : undefined
              : field.value || '',
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
          return (
            <CollectionObjectFieldValue.Date
              inputDisplayBlock
              {...inputProps}
            />
          );
        case 'time':
          return <CollectionObjectFieldValue.Time {...inputProps} />;
        case 'phone':
          return <CollectionObjectFieldValue.Phone {...inputProps} />;
        case 'image':
        case 'signature':
          return (
            <CollectionObjectFieldValue.Signature {...inputProps} preview />
          );
        default:
          return null;
      }
    }}
  </Field>
);

const renderFieldView = (fieldView) => {
  const inputProps = {
    key: fieldView.id,
    readOnly: true,
    editable: true,
    small: true,
    inputVisible: true,
    input: {
      onChange: undefined,
      value:
        fieldView.field_type === 'date'
          ? fieldView.value
            ? new Date(fieldView.value)
            : undefined
          : fieldView.value || '',
    },
    field: fieldView,
  };

  switch (fieldView.field_type) {
    case 'text':
      return <CollectionObjectFieldValue.OpenText {...inputProps} />;
    case 'multiple_choice':
      return <CollectionObjectFieldValue.MultipleChoice {...inputProps} />;
    case 'checkbox':
      return <CollectionObjectFieldValue.Checkbox {...inputProps} />;
    case 'date':
      return (
        <CollectionObjectFieldValue.Date inputDisplayBlock {...inputProps} />
      );
    case 'time':
      return <CollectionObjectFieldValue.Time {...inputProps} />;
    case 'phone':
      return <CollectionObjectFieldValue.Phone {...inputProps} />;
    case 'image':
    case 'signature':
      return <CollectionObjectFieldValue.Signature {...inputProps} preview />;
    default:
      return null;
  }
};

const CollectionObjectFieldViewFields = ({
  className,
  readOnly,
  fields,
  fieldViews,
}) => {
  const sortedFieldViews = _.orderBy(
    fieldViews,
    ['position', 'id'],
    ['asc', 'asc']
  );
  const allFields = React.useMemo(() => {
    // TODO: `sortedFieldViews.map(({field_id}) => field_id)`
    const fieldViewIds = sortedFieldViews.map(
      ({name, field_type}) => `${name}-${field_type}`
    );
    const unfilledFields = fields.filter(
      ({name, field_type}) => !fieldViewIds.includes(`${name}-${field_type}`)
    );

    return _.orderBy(
      [...sortedFieldViews, ...unfilledFields],
      (fieldOrFieldView) =>
        typeof fieldOrFieldView.position === 'number'
          ? fieldOrFieldView.position
          : fieldOrFieldView.item_field_id || fieldOrFieldView.id,
      ['asc']
    );
  }, [fields, sortedFieldViews]);

  return (
    <div className={className}>
      {allFields.map(
        readOnly
          ? (field) => (
              <div className="pointer-events-none">
                {renderFieldView(field)}
              </div>
            )
          : renderFieldViewField
      )}
    </div>
  );
};

const EnhancedCollectionObjectFieldViewFields = React.memo(
  CollectionObjectFieldViewFields
);

export default EnhancedCollectionObjectFieldViewFields;
