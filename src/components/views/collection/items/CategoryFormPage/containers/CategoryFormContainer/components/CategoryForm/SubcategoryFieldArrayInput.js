import {Field} from 'redux-form';
import {MdClose} from 'react-icons/md';
import cx from 'classnames';
import React from 'react';
import {v4 as uuid} from 'uuid';

import {Button, Input} from 'elements';

const SubcategoryFieldArrayInput = ({className, fields}) => {
  const handleAddSubcategory = React.useCallback(() => {
    fields.push({
      name: '',
      uuid: uuid(),
    });
  }, [fields]);

  return (
    <>
      <div className={className}>
        {fields.map((fieldName, idx) => {
          const handleDelete = () => {
            fields.remove(idx);
          };

          return (
            <div key={fieldName} className={cx('relative', idx !== 0 && 'mt3')}>
              <Field
                autoFocus
                name={`${fieldName}.name`}
                className="ba b--gray-300"
                borderRadius={false}
                component={Input}
              />
              <div
                className="close-icon-wrapper absolute right-1 pointer"
                onClick={handleDelete}
              >
                <MdClose size={24} />
              </div>
            </div>
          );
        })}
      </div>
      <Button
        fontSizeSet
        colorSet
        backgroundColorSet
        className="mt3 f5 gray-500 bg-gray-300"
        type="button"
        onClick={handleAddSubcategory}
      >
        Add Sub-Category
      </Button>
      <style jsx>{`
        .close-icon-wrapper {
          top: 50%;
          transform: translateY(-50%);
        }
      `}</style>
    </>
  );
};

const EnhancedSubcategoryFieldArrayInput = React.memo(
  SubcategoryFieldArrayInput
);

export default EnhancedSubcategoryFieldArrayInput;
