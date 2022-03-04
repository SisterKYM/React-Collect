import {uniqueId} from 'lodash';
import React from 'react';
import cx from 'classnames';

import {Button} from 'elements';
import {useDispatch} from 'react-redux';
import {errorAlert} from 'redux/modules/growl/actions';

import {CollectionObjectFieldList} from './components';

const CollectionObjectFieldListContainer = ({
  className,
  addQuestionClassName,
  collectionObjectType,
  fields,
  onChangeFields,
}) => {
  const dispatch = useDispatch();
  const handleDuplicateField = React.useCallback(
    ({field, values}) => {
      const fieldToDuplicateIdx = fields.findIndex(({id}) => id === field.id);

      const newField = {
        ...field,
        id: uniqueId('local-'),
        edit: true,
        values,
      };

      const nextFields = [...fields];
      nextFields.splice(fieldToDuplicateIdx, 0, newField);

      onChangeFields(nextFields);
    },
    [fields, onChangeFields]
  );

  const handleEditField = React.useCallback(
    (fieldToEdit) => {
      const fieldIdx = fields.findIndex(({id}) => id === fieldToEdit.id);
      const nextFields = [...fields];

      nextFields.splice(fieldIdx, 1, {
        ...fieldToEdit,
        edit: true,
      });

      onChangeFields(nextFields);
    },
    [fields, onChangeFields]
  );

  const handleRemoveField = React.useCallback(
    (id) => {
      const fieldIdx = fields.findIndex((field) => field.id === id);
      const field = fields[fieldIdx];
      const nextFields = [...fields];

      nextFields.splice(
        fieldIdx,
        1,
        field.id
          ? {
              ...field,
              delete: true,
              edit: false,
            }
          : undefined
      );

      onChangeFields(nextFields);
    },
    [fields, onChangeFields]
  );

  const handleSubmitField = React.useCallback(
    (values, edit = false) => {
      const fieldIdx = fields.findIndex(({id}) => id === values.id);
      const nextFields = [...fields];

      nextFields.splice(fieldIdx, 1, {
        ...values,
        edit,
      });

      onChangeFields(nextFields);
    },
    [fields, onChangeFields]
  );

  const handleSortFields = React.useCallback(
    (order) => {
      const nextFields = order
        .map((orderId, idx) => {
          const field = fields.find(({id}) => String(id) === orderId);

          return field
            ? {
                ...field,
                position: idx,
              }
            : null;
        })
        .filter((field) => Boolean(field));

      onChangeFields(nextFields);
    },
    [fields, onChangeFields]
  );

  const handleClickAddQuestion = React.useCallback(() => {
    if (fields.filter((field) => !field.delete).length > 69) {
      dispatch(
        errorAlert({
          title: `You've reached the limit of 70 questions per ${
            collectionObjectType === 'FORM' ? 'form' : 'item'
          }.`,
        })
      );

      return;
    }
    onChangeFields([
      ...fields,
      {
        id: uniqueId('local-'),
        name: '',
        required: false,
        field_type: 'text',
        edit: true,
        position: fields.length,
      },
    ]);
  }, [collectionObjectType, dispatch, fields, onChangeFields]);

  return (
    <div className={className}>
      <CollectionObjectFieldList
        collectionObjectType={collectionObjectType}
        fields={fields.filter((field) => !field.delete)}
        onSort={handleSortFields}
        onEditField={handleEditField}
        onSubmitField={handleSubmitField}
        onRemoveField={handleRemoveField}
        onDuplicateField={handleDuplicateField}
      />
      <Button
        small
        colorSet
        backgroundColorSet
        className={cx('gray-600 bg-gray-250', addQuestionClassName)}
        type="button"
        style={{marginTop: '20px'}}
        onClick={handleClickAddQuestion}
      >
        Add a Question
      </Button>
    </div>
  );
};

const EnhancedCollectionObjectFieldListContainer = React.memo(
  CollectionObjectFieldListContainer
);

export default EnhancedCollectionObjectFieldListContainer;
