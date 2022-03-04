import React from 'react';

import {Status} from 'elements';
import ManagerListItem from './ManagerListItem';

const ManagerList = ({
  collection,
  managers,
  getManagersStatus,
  remindManagerPending,
  isAllPermissionsExpanded,
  remindManager,
  deleteManager,
  notSmall,
}) =>
  !getManagersStatus || getManagersStatus === 'success' ? (
    managers.map(manager => (
      <ManagerListItem
        isInEditMode
        isAllPermissionsExpanded={isAllPermissionsExpanded}
        key={manager.id}
        remindPending={remindManagerPending}
        remindManager={remindManager}
        deleteManager={deleteManager}
        collection={collection}
        manager={manager}
        notSmall={notSmall}
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
