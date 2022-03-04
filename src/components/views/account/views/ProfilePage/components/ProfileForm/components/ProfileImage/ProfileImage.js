import {FaTimesCircle} from 'react-icons/fa';
import React, {useCallback, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFetcher} from 'rest-hooks';

import {ReactComponent as ProfileImageIcon} from 'theme/images/ProfileImage.svg';
import ImagesUtils from 'helpers/ImagesUtils';
import UserResource from 'resources/UserResource';
import {getSession} from 'redux/modules/session/actions';

import {ProfileImageFormContainer} from './containers';

const deleteButtonStyle = {
  marginRight: '-1rem',
};

const profileImageIconStyle = {
  width: '7.5rem',
  height: '7.5rem',
};

const ProfileImage = () => {
  const profileImage = useSelector((state) => state.session?.user?.profile_pic);

  const [edit, setEdit] = useState(false);
  const editImage = useCallback(() => {
    setEdit(true);
  }, []);
  const cancelEdit = useCallback(() => {
    setEdit(false);
  }, []);

  const updateUser = useFetcher(UserResource.updateShape());
  const dispatch = useDispatch();
  const handleDelete = useCallback(
    async (e) => {
      e.stopPropagation();
      await updateUser({}, {profile_pic_id: null});
      dispatch(getSession());
    },
    [dispatch, updateUser]
  );

  const profileImageStyle = useMemo(() => {
    return {
      ...profileImageIconStyle,
      backgroundImage: profileImage
        ? `url("${ImagesUtils.getCroppedImageUrl(profileImage)}")`
        : '',
      borderRadius: '100%',
    };
  }, [profileImage]);

  return (
    <div className="flex justify-center">
      {edit ? (
        <ProfileImageFormContainer
          onDidSaveProfileImage={cancelEdit}
          onCancel={cancelEdit}
        />
      ) : (
        <div className="relative pointer" onClick={editImage}>
          {profileImage ? (
            <>
              <div className="relative cover" style={profileImageStyle} />
              <FaTimesCircle
                className="absolute pointer right-0 tint top-0"
                onClick={handleDelete}
                style={deleteButtonStyle}
              />
            </>
          ) : (
            <ProfileImageIcon
              className="profile-image-fill-color"
              style={profileImageIconStyle}
            />
          )}
        </div>
      )}
    </div>
  );
};

const EnhancedProfilePicture = React.memo(ProfileImage);

export default EnhancedProfilePicture;
