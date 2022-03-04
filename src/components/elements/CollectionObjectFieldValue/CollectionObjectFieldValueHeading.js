import _ from 'lodash';
import React from 'react';

const CollectionObjectFieldValueHeading = ({small, noTitle, field}) => (
  <>
    <div
      className={
        small
          ? 'text-14 avenir-roman dark-grey'
          : 'text-16 avenir-light dark-grey'
      }
    >
      {noTitle ? '\u00A0' : field.name}
      {!noTitle && (
        <span className="brand">
          {field.required &&
          _.get(field.metadata, 'waiverFieldType') !== 'signed_date'
            ? ' *'
            : ''}
        </span>
      )}
    </div>
    {field.metadata &&
      field.metadata.description &&
      field.metadata.description.enabled && (
        <div className="mt2 f6 avenir-light-oblique gray-600">
          {field.metadata.description.value || ''}
        </div>
      )}
  </>
);

const EnhancedCollectionObjectFieldValueHeading = React.memo(
  CollectionObjectFieldValueHeading
);

export default EnhancedCollectionObjectFieldValueHeading;
