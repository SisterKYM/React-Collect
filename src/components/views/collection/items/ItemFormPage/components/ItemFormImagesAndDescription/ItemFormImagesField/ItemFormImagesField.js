import {compact, times, uniqueId} from 'lodash';
import React from 'react';
import ReactSortable from 'react-sortablejs';

import {ImageEditor} from 'elements';
import {sortableOptions} from 'theme/sortable';
import pureInsert from 'helpers/pureInsert';

import ItemImageThumbnail from './ItemImageThumbnail';

const getValueItemId = () => uniqueId('itemFormImagesField-value-');
const getSelectedImageIdx = (value) =>
  (value || []).findIndex((value) => Boolean(value));

class ItemFormImagesField extends React.PureComponent {
  state = {
    selectedImageIdx: getSelectedImageIdx(this.props.input.value),
  };

  componentDidUpdate(prevProps) {
    const prevValue = prevProps.input.value || [];
    const nextValue = this.props.input.value || [];

    if (compact(prevValue).length !== compact(nextValue).length) {
      this.setState({selectedImageIdx: getSelectedImageIdx(nextValue)});
    }
  }

  handleClickContainer = () => {
    if (!this.props.input.value) {
      this.setState({selectedImageIdx: -1});
    }
  };

  handleChangeImage = (image) => {
    if (image) {
      image.preview = URL.createObjectURL(image);
    }

    const value = [...(this.props.input.value || [])];
    const nextValue = pureInsert(
      value,
      this.state.selectedImageIdx,
      image
        ? {
            ...(value[this.state.selectedImageIdx] || {}),
            image,
          }
        : null
    ).filter((img) => Boolean(img));

    this.props.input.onChange(nextValue);
  };

  handleWillAddImage = () => {
    const imageAddDenied =
      compact(this.props.input.value).length === 1 && this.props.userIsBasic;

    if (imageAddDenied) {
      this.props.onDeclineAddImage();
    }

    return !imageAddDenied;
  };

  handleAddImage = (image) => {
    if (image) {
      image.preview = URL.createObjectURL(image);
    }

    const value = [...(this.props.input.value || [])];

    const firstNullIdx = value.findIndex((valueItem) => !valueItem);
    const newImageIdx = firstNullIdx === -1 ? value.length : firstNullIdx;
    const nextValue = pureInsert(value, newImageIdx, {
      image,
      id: getValueItemId(),
      thumbnailCrop: null,
    });

    this.props.input.onChange(nextValue);
    this.setState({selectedImageIdx: newImageIdx});
  };

  handleApplyCrop = (thumbnailCrop) => {
    const value = [...(this.props.input.value || [])];
    const nextValue = pureInsert(value, this.state.selectedImageIdx, {
      ...(value[this.state.selectedImageIdx] || {}),
      thumbnailCrop,
    });

    this.props.input.onChange(nextValue);
  };

  handleChangeOrder = (order) => {
    const value = this.props.input.value || [];
    const nextValue = order.map((orderId) => {
      const valueItem = value.find(
        (valueItem) => valueItem && String(valueItem.id) === orderId
      );

      return valueItem || undefined;
    });

    this.setState((prevState) => ({
      selectedImageIdx:
        this.props.input.value &&
        this.props.input.value[prevState.selectedImageIdx]
          ? nextValue.findIndex(
              (valueItem) =>
                valueItem &&
                valueItem.id ===
                  this.props.input.value[prevState.selectedImageIdx].id
            )
          : -1,
    }));
    this.props.input.onChange(nextValue);
  };

  renderImageThumbnail = (idx) => {
    const handleClick = (event) => {
      if (this.props.input.value && this.props.input.value[idx]) {
        event.stopPropagation();

        this.setState({
          selectedImageIdx:
            this.props.input.value && this.props.input.value[idx] ? idx : -1,
        });
      }
    };
    const handleChangeImage = (image) => {
      if (image) {
        image.preview = URL.createObjectURL(image);
      }

      const value = [...(this.props.input.value || [])];

      const nextValue = pureInsert(value, idx, {
        ...(value[idx] || {}),
        image,
        id: getValueItemId(),
        thumbnailCrop: null,
      });

      this.props.input.onChange(nextValue);

      if (compact(nextValue).length !== 1) {
        this.setState({selectedImageIdx: idx});
      }
    };

    const {value} = this.props.input;

    return (
      <div
        key={idx}
        data-id={value && value[idx] ? value[idx].id : idx}
        className="fl w-third pa2"
      >
        <ItemImageThumbnail
          main={idx === 0}
          selected={idx === this.state.selectedImageIdx}
          crop={value && value[idx] && value[idx].thumbnailCrop}
          imageSrc={
            value && value[idx] && value[idx].image && value[idx].image.preview
          }
          onClick={handleClick}
          onChangeImage={handleChangeImage}
          onWillChangeImage={this.handleWillAddImage}
        />
      </div>
    );
  };

  render() {
    const {
      input: {value},
    } = this.props;
    const {selectedImageIdx} = this.state;

    return (
      <div onClick={this.handleClickContainer}>
        <ImageEditor
          subtitle={
            <>
              Shows initial thumbnail view.
              <br />
              Payers can click to see full image.
            </>
          }
          image={
            selectedImageIdx !== -1 && value && value[selectedImageIdx]
              ? value[selectedImageIdx].image
              : undefined
          }
          thumbnailCrop={
            selectedImageIdx !== -1 && value && value[selectedImageIdx]
              ? value[selectedImageIdx].thumbnailCrop
              : null
          }
          onWillAddImage={this.handleWillAddImage}
          onAddImage={this.handleAddImage}
          onApplyCrop={this.handleApplyCrop}
          onChangeImage={this.handleChangeImage}
        />
        <ReactSortable
          className="image-thumbnails-container pt3"
          options={sortableOptions}
          onChange={this.handleChangeOrder}
        >
          {times(this.props.input.value.length, this.renderImageThumbnail)}
        </ReactSortable>
        <div className="image-thumbnails-container">
          {this.renderImageThumbnail(this.props.input.value.length)}
        </div>
        <style jsx>{`
          :global(.image-thumbnails-container) {
            max-width: 25.5rem;
          }
        `}</style>
      </div>
    );
  }
}

export default ItemFormImagesField;
