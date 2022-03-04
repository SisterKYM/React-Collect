import React from 'react';

import {ManagerListItem, Status} from 'elements';

const ManagerList = ({
  managers,
  getManagersStatus,
  remindManagerPending,
  isAllPermissionsExpanded,
  updateManager,
  remindManager,
  deleteManager,
}) =>
  !getManagersStatus || getManagersStatus === 'success' ? (
    managers.map(manager => (
      <ManagerListItem
        isInEditMode
        isAllPermissionsExpanded={isAllPermissionsExpanded}
        key={manager.id}
        remindPending={remindManagerPending}
        remindManager={remindManager}
        updateManager={updateManager}
        deleteManager={deleteManager}
        manager={manager}
        {...manager}
      />
    ))
  ) : (
    <div className="flex pv4 justify-center">
      <Status status={getManagersStatus} />
    </div>
  );

const EnhancedManagerList = React.memo(ManagerList);

export default EnhancedManagerList;
