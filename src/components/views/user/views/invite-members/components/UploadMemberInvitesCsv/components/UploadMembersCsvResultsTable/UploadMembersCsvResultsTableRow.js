import React from 'react';
import cx from 'classnames';

import {memberFieldsValidations as validations} from '../../../../lib';
import UploadMembersCsvResultsTableCell from './UploadMembersCsvResultsTableCell';

const UploadMembersCsvResultsTableRow = ({
  isLeading,
  initialMember,
  member,
  onChangeMember,
}) => {
  const handleChangeMember = React.useCallback(
    key => value => {
      const path = key.split('.');
      const nextMember =
        path.length === 1
          ? {
              ...member,
              [path[0]]: value,
            }
          : {
              ...member,
              [path[0]]: {
                ...member[path[0]],
                [path[1]]: value,
              },
            };

      onChangeMember(nextMember);
    },
    [member, onChangeMember]
  );

  return (
    <tr className={cx('bl br bb b--gray-300', isLeading && 'bt')}>
      <UploadMembersCsvResultsTableCell
        initialValue={initialMember.first_name}
        value={member.first_name}
        validate={validations.isEmpty}
        onChangeValue={handleChangeMember('first_name')}
      />
      <UploadMembersCsvResultsTableCell
        initialValue={initialMember.last_name}
        value={member.last_name}
        validate={validations.isEmpty}
        onChangeValue={handleChangeMember('last_name')}
      />
      <UploadMembersCsvResultsTableCell
        isEmail
        initialValue={initialMember.email}
        value={member.email}
        validate={validations.isEmail}
        onChangeValue={handleChangeMember('email')}
      />
      <UploadMembersCsvResultsTableCell
        initialValue={initialMember.currency}
        value={member.currency}
        validate={validations.isCurrency}
        onChangeValue={handleChangeMember('currency')}
      />
      <UploadMembersCsvResultsTableCell
        initialValue={initialMember.type}
        value={member.type}
        validate={validations.isAccountType}
        onChangeValue={handleChangeMember('type')}
      />
      <UploadMembersCsvResultsTableCell
        initialValue={initialMember.business_tax_id}
        value={member.business_tax_id}
        validate={validations.isBusinessTaxId}
        onChangeValue={handleChangeMember('business_tax_id')}
      />
      <UploadMembersCsvResultsTableCell
        initialValue={initialMember.business_name}
        value={member.business_name}
        validate={validations.isEmpty}
        onChangeValue={handleChangeMember('business_name')}
      />
      <UploadMembersCsvResultsTableCell
        initialValue={initialMember.dob}
        value={member.dob}
        validate={validations.isDob}
        onChangeValue={handleChangeMember('dob')}
      />
      <UploadMembersCsvResultsTableCell
        initialValue={initialMember.address ? initialMember.address.line1 : ''}
        value={member.address ? member.address.line1 : ''}
        onChangeValue={handleChangeMember('address.line1')}
      />
      <UploadMembersCsvResultsTableCell
        initialValue={initialMember.address ? initialMember.address.city : ''}
        value={member.address ? member.address.city : ''}
        onChangeValue={handleChangeMember('address.city')}
      />
      <UploadMembersCsvResultsTableCell
        initialValue={initialMember.address ? initialMember.address.state : ''}
        value={member.address ? member.address.state : ''}
        validate={
          member.address &&
          (member.address.country === 'Canada'
            ? validations.isCanadianProvince
            : validations.isUSState)
        }
        onChangeValue={handleChangeMember('address.state')}
      />
      <UploadMembersCsvResultsTableCell
        initialValue={
          initialMember.address ? initialMember.address.country : ''
        }
        value={member.address ? member.address.country : ''}
        validate={member.address && validations.isCountry}
        onChangeValue={handleChangeMember('address.country')}
      />
      <UploadMembersCsvResultsTableCell
        initialValue={
          initialMember.address ? initialMember.address.postal_code : ''
        }
        value={member.address ? member.address.postal_code : ''}
        validate={
          member.address &&
          (member.address.country === 'Canada'
            ? validations.isCanadianPostalCode
            : validations.isUSPostalCode)
        }
        onChangeValue={handleChangeMember('address.postal_code')}
      />
    </tr>
  );
};

const EnhancedUploadMembersCsvResultsTableRow = React.memo(
  UploadMembersCsvResultsTableRow
);

export default EnhancedUploadMembersCsvResultsTableRow;
