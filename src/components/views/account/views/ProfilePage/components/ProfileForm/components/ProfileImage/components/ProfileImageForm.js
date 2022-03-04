import React from 'react';

import {CommonButton, ImageEditor, Status} from 'elements';

class ProfileImageForm extends React.PureComponent {
  state = {
    image: this.props.image ? this.props.image.image : null,
    crop: this.props.image ? this.props.image.thumbnailCrop : null,
  };

  componentDidMount() {
    this.setUpState();
  }

  componentWillUnmount() {
    if (this.state.image && this.state.image.preview) {
      URL.revokeObjectURL(this.state.image.preview);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.image !== this.props.image) {
      this.setUpState();
    }
  }

  setUpState = () => {
    const {image} = this.props;

    this.setState({
      image: image ? image.image : null,
      crop: image ? image.thumbnailCrop : null,
    });
  };

  handleChangeImage = (image) => {
    if (image) {
      image.preview = URL.createObjectURL(image);
    }

    this.setState({
      image: image || null,
      crop: null,
    });
  };

  handleApplyCrop = (crop) => {
    this.setState({crop});
  };

  handleSubmit = () => {
    this.props.onSubmit({
      image: this.state.image,
      crop: this.state.crop,
    });
  };

  handleDismiss = (e) => {
    e.preventDefault();
    this.props.onCancel();
  };

  render() {
    return (
      <div className={this.props.className}>
        <h2 className="f3 mb3 avenir-roman">{this.props.heading}</h2>
        <ImageEditor
          className="image-upload-modal-image-editor center"
          subtitle={<div className="mv2">Crop your profile image</div>}
          image={this.state.image}
          thumbnailCrop={this.state.crop}
          onAddImage={this.handleChangeImage}
          onChangeImage={this.handleChangeImage}
          onApplyCrop={this.handleApplyCrop}
        />
        {this.state.image && (
          <div>
            {this.props.loading ? (
              <div className="ma4 flex justify-center">
                <Status status="pending" />
              </div>
            ) : (
              <div className="mt3-5 flex justify-between">
                <CommonButton
                  className="pt-14 bg-tint white"
                  onClick={this.handleSubmit}
                >
                  Save Profile Picture
                </CommonButton>
                <CommonButton
                  className="pt-14 bg-transparent tint"
                  onClick={this.handleDismiss}
                >
                  Cancel
                </CommonButton>
              </div>
            )}
          </div>
        )}
        <style jsx>{`
          :global(.image-upload-modal-image-editor) {
            width: 25rem;
          }
        `}</style>
      </div>
    );
  }
}

export default ProfileImageForm;
