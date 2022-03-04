import React from 'react';
import ReactSortable from 'react-sortablejs';
import shortid from 'shortid';

import {sortableOptions} from 'theme/sortable';

import CollectionObjectFieldForm from './CollectionObjectFieldForm';
import CollectionObjectFieldListItem from './CollectionObjectFieldListItem';

const collectionObjectFieldListSortClassName = shortid.generate();

const CollectionObjectFieldList = ({
  collectionObjectType,
  fields,
  onSort,
  onSubmitField,
  onDuplicateField,
  onEditField,
  onRemoveField,
}) => (
  <ReactSortable
    options={{
      ...sortableOptions,
      handle: `.${collectionObjectFieldListSortClassName}`,
    }}
    onChange={onSort}
  >
    {fields.map(({edit, ...field}) => (
      <div key={field.id} data-id={field.id} className="mt3">
        {edit ? (
          <CollectionObjectFieldForm
            form={`CollectionObjectFieldForm-${field.id}`}
            fieldId={field.id}
            collectionObjectType={collectionObjectType}
            initialValues={field}
            onRemove={onRemoveField}
            onDuplicate={onDuplicateField}
            onSubmit={onSubmitField}
          />
        ) : (
          <CollectionObjectFieldListItem
            field={field}
            sortClassName={
              onSort ? collectionObjectFieldListSortClassName : undefined
            }
            onEdit={onEditField}
          />
        )}
      </div>
    ))}
  </ReactSortable>
);

export default CollectionObjectFieldList;
