import React from 'react';

import {Input} from 'elements';
import {colors} from 'theme/constants';

const UploadMembersCsvResultsTableCell = ({
  isEmail,
  initialValue,
  value,
  validate,
  onChangeValue,
}) => {
  const handleChange = React.useCallback(
    event => {
      onChangeValue(event.target.value);
    },
    [onChangeValue]
  );

  return (
    <td className="cell-container pa2 truncate">
      {!validate || validate(initialValue) ? (
        <>
          {isEmail ? (
            <a href={`mailto:${initialValue}`}>{initialValue}</a>
          ) : (
            initialValue
          )}
        </>
      ) : (
        <Input
          small
          border
          style={{color: validate(value) ? undefined : colors.orange}}
          borderRadius={false}
          value={value}
          onChange={handleChange}
        />
      )}
      <style jsx>{`
        .cell-container {
          max-width: 6vw;
        }
      `}</style>
    </td>
  );
};

const EnhancedUploadMembersCsvResultsTableCell = React.memo(
  UploadMembersCsvResultsTableCell
);

export default EnhancedUploadMembersCsvResultsTableCell;
