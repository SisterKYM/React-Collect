import cx from 'classnames';
import React from 'react';

import Select from 'elements/Select';

import CollectionObjectFieldValueHeading from './CollectionObjectFieldValueHeading';
import CollectionObjectFieldValueWrapper from './CollectionObjectFieldValueWrapper';

const CollectionObjectFieldMultipleChoice = ({
  headingClassName,
  sortClassName,
  inputClassName,
  small,
  noHorizontalMargin,
  editable,
  field,
  input,
  value,
  onChange,
  onClick,
  onClickInput,
}) => (
  <CollectionObjectFieldValueWrapper
    sortClassName={sortClassName}
    noHorizontalMargin={noHorizontalMargin}
    backgroundTransparent={editable}
    onClick={onClick}
  >
    <CollectionObjectFieldValueHeading
      className={headingClassName}
      small={small}
      field={field}
    />
    <div>
      <Select
        fontFamilySet
        className={cx('ba mt2', inputClassName)}
        selectClassName="avenir-light"
        style={{fontSize: small ? '16px' : '18px'}}
        borderRadius
        options={[
          {
            children: 'Select one',
            value: '',
          },
          ...field.values.split('|||').map(value => ({
            value,
            children: value,
          })),
        ]}
        input={input}
        value={value}
        onChange={onChange}
        onClick={onClickInput}
      />
    </div>
  </CollectionObjectFieldValueWrapper>
);

const EnhancedCollectionObjectFieldMultipleChoice = React.memo(
  CollectionObjectFieldMultipleChoice
);

export default EnhancedCollectionObjectFieldMultipleChoice;
