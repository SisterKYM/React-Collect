import {FaTrashAlt} from 'react-icons/fa';
import React from 'react';

import {
  IMG_PREVIEW_PANEL_HEIGHT,
  IMG_PREVIEW_PANEL_WIDTH,
} from 'views/media/config';
import BigCheckbox from 'elements/BigCheckbox';
import Button from 'elements/Button';

const SelectImageList = ({images, input, onDelete}) => (
  <div className="pv4">
    {images.map((image) => (
      <label key={image.id} className="flex mb4 items-center">
        <div className="w-10 flex justify-center items-center">
          <BigCheckbox
            onChange={() => {
              input.onChange(image);
            }}
            name="select-image"
          />
        </div>
        <div className="w-80 w-40-m w-third-l">
          <div
            className="image-holder w-100 cover bg-center"
            style={{
              backgroundImage:
                (image && image.image && `url("${image.image.url}")`) ||
                undefined,
            }}
          />
        </div>
        {image.editable && (
          <div className="dn db-ns w-10 pl3 truncate overflow-hidden">
            <Button
              small
              backgroundColorSet
              className="bg-white flex ba b--gray-300 items-center ph2 pv2 ml4"
              onClick={() => {
                onDelete(image);
              }}
              type="button"
            >
              <FaTrashAlt size={15} className="f3 gray-500" />
            </Button>
          </div>
        )}
        <style jsx>{`
          .image-holder {
            padding-bottom: ${(IMG_PREVIEW_PANEL_HEIGHT /
              IMG_PREVIEW_PANEL_WIDTH) *
            100}%;
          }
        `}</style>
      </label>
    ))}
  </div>
);

const EnhancedSelectImageList = React.memo(SelectImageList);

export default EnhancedSelectImageList;
