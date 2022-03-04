import React from 'react';
import _ from 'lodash';

import {RowControls} from 'elements';

const FormActionsDropdown = ({className, onEditForm, reportFormTo}) => {
  const controls = React.useMemo(
    () =>
      _.compact([
        {
          tooltip: 'Edit Form',
          onClick: onEditForm,
        },
        {
          tooltip: 'Download Form Summary',
          to: reportFormTo,
          target: '_blank',
          className: 'gray-600',
        },
      ]),
    [onEditForm, reportFormTo]
  );

  return (
    <RowControls
      className={className}
      dropdownWidth={240}
      controls={controls}
    />
  );
};

export default FormActionsDropdown;
