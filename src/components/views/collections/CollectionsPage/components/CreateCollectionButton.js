import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {CommonButton} from 'elements';

const CreateCollectionButton = ({classname, selectedFolder}) => {
  const defaultUserId = useSelector((state) => state.session?.user?.id);

  const userId =
    selectedFolder?.user_id || // managed collection folder
    selectedFolder?.organizer?.id || // owned collection folder
    defaultUserId;

  const createCollectionPath = selectedFolder?.id
    ? `/collection/${userId}/details?folderId=${selectedFolder.id}`
    : `/collection/${userId}/details`;

  return (
    <Link className={classname} to={createCollectionPath}>
      <CommonButton className="bg-brand white pt-14">
        Create a Collection
      </CommonButton>
    </Link>
  );
};

export default CreateCollectionButton;
