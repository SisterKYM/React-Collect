import React from 'react';
import cx from 'classnames';

import Checkbox from 'elements/Checkbox';

import CollectionObjectFieldValueHeading from './CollectionObjectFieldValueHeading';
import CollectionObjectFieldValueWrapper from './CollectionObjectFieldValueWrapper';

const CollectionObjectFieldCheckbox = ({
  headingClassName,
  sortClassName,
  editable,
  small,
  field,
  input,
  value,
  onChange,
  onClickInput,
  onClick,
}) => (
  <CollectionObjectFieldValueWrapper
    sortClassName={sortClassName}
    backgroundTransparent={editable}
    onClick={onClick}
  >
    <CollectionObjectFieldValueHeading
      className={headingClassName}
      small={small}
      field={field}
    />
    <div className="flex mt2 flex-wrap">
      {field.values.split('|||').map((choice, idx) => {
        const realValue = input ? input.value : value;
        const realOnChange = input ? input.onChange : onChange;

        const handleChangeCheckboxValue = ({target: {value: checked}}) => {
          if (!realOnChange) {
            return;
          }

          realOnChange(
            checked === 'false'
              ? `${realValue ? `${realValue}|||` : ''}${choice}`
              : realValue
                  .split('|||')
                  .filter((value) => value !== choice)
                  .join('|||')
          );
        };

        const values = realValue ? realValue.split('|||') : [];

        return (
          <Checkbox
            checkedOnValue
            key={idx}
            className="w-100 mv2"
            labelClassName={cx('avenir-roman', small ? 'f5' : 'f-regular')}
            label={choice}
            input={{value: values.includes(choice)}}
            onChange={handleChangeCheckboxValue}
            onClick={onClickInput}
          />
        );
      })}
    </div>
  </CollectionObjectFieldValueWrapper>
);

export default CollectionObjectFieldCheckbox;
