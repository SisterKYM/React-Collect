import {connect} from 'react-redux';
import React from 'react';
import _ from 'lodash';

import {ImageUploadModal} from 'elements';
import {UPDATE_PROFILE_IMAGE} from 'redux/modules/session/constants';
import {updateProfileImage} from 'redux/modules/session/actions';
import ImagesUtils from 'helpers/ImagesUtils';

class ProfileImageFormContainer extends React.PureComponent {
  state = {
    profileImage: null,
  };

  didMount = false;

  componentDidMount() {
    this.setUpInitialImage();

    this.didMount = true;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.profileImage !== this.props.profileImage) {
      this.setUpInitialImage();
    }

    if (
      prevProps.updateProfileImageStatus !== 'success' &&
      this.props.updateProfileImageStatus === 'success'
    ) {
      this.props.onDidSaveProfileImage();
    }
  }

  componentWillUnmount() {
    this.didMount = false;
  }

  setUpInitialImage = async () => {
    const {profileImage} = this.props;

    if (!profileImage) {
      return;
    }

    const fetchImageResponse = await fetch(
      ImagesUtils.getImageUrl(profileImage)
    );
    const blob = await fetchImageResponse.blob();

    if (!blob || !this.didMount) {
      return;
    }

    const file = new Blob([blob], {
      type: profileImage.metadata.contentType || 'image/jpeg',
    });
    file.preview = URL.createObjectURL(file);

    const thumbnailCrop =
      !profileImage.metadata.thumbnail ||
      Object.keys(profileImage.metadata.thumbnail.cropDetails || {}).length ===
        0
        ? null
        : profileImage.metadata.thumbnail.cropDetails;

    this.setState({
      profileImage: {
        thumbnailCrop,
        id: profileImage.id,
        image: file,
      },
    });
  };

  handleSubmit = profileImage => {
    this.props.onUpdateProfileImage(profileImage);
  };

  render() {
    return (
      <ImageUploadModal
        className={this.props.className}
        loading={this.props.updateProfileImageStatus === 'pending'}
        heading="Add Profile Image"
        image={this.state.profileImage}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

const enhance = connect(
  state => ({
    profileImage: _.get(state.session, 'user.profile_pic'),
    updateProfileImageStatus: state.async.statuses[UPDATE_PROFILE_IMAGE],
  }),
  dispatch => ({
    onUpdateProfileImage: payload => dispatch(updateProfileImage(payload)),
  })
);

const EnhancedProfileImageFormContainer = enhance(ProfileImageFormContainer);

export default EnhancedProfileImageFormContainer;
