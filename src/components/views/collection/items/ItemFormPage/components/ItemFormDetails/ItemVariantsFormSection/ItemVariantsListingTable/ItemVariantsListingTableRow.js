import {Field} from 'redux-form';
import {IoMdMore} from 'react-icons/io';
import {useSelector} from 'react-redux';
import cx from 'classnames';
import _ from 'lodash';
import React from 'react';

import {Checkbox, Input, StyledTable} from 'elements';
import {ReactComponent as CameraPlus} from 'theme/images/CameraPlus.svg';
import ImagesUtils from 'helpers/ImagesUtils';
import useCroppedImage from 'hooks/useCroppedImage';
import {ITEM_FORM_DETAILS_NAME} from '../../ItemFormDetails';

const validateRequiredNumberField = (value) => {
  const num = Number.parseFloat(value);

  return Number.isNaN(num) || num < 0 ? '* Required' : undefined;
};

const parseNumberField = (value) => {
  const int = Number.parseInt(value, 10);

  return Number.isNaN(int) ? null : int;
};

const ItemVariantsListingTableRow = ({
  'data-id': dataId,
  sortingHandleClassName,
  fieldName,
  visibleCols,
  checked,
  listing,
  images,
  onClickImage,
  onChangeChecked,
}) => {
  const localImageWithCrop = React.useMemo(
    () =>
      listing.localImage
        ? {
            image: listing.localImage.image,
            crop: listing.localImage.thumbnail.cropDetails,
          }
        : null,
    [listing.localImage]
  );

  const formValues = useSelector((state) =>
    _.get(
      state.form[ITEM_FORM_DETAILS_NAME],
      'values.options.variants.listings',
      []
    )
  );

  const isSoldOut = (dataId) => {
    const listing = _.get(formValues, dataId, {});
    return listing.available_quantity === 0;
  };

  const croppedLocalImageUrl = useCroppedImage(localImageWithCrop);

  const croppedImageUrl = React.useMemo(() => {
    if (croppedLocalImageUrl) {
      return croppedLocalImageUrl;
    }

    const listingImage = images.find(({id}) => id === listing.imageId);

    return listingImage
      ? ImagesUtils.getCroppedImageUrl(listingImage, {
          width: 112,
          height: 112,
        })
      : null;
  }, [croppedLocalImageUrl, images, listing.imageId]);

  return (
    <StyledTable.Row data-id={dataId}>
      <StyledTable.Cell className="reset-padding-cell">
        <Checkbox
          checkedOnValue
          input={{value: checked}}
          onChange={({target: {value}}) => {
            onChangeChecked(value === 'false');
          }}
        />
      </StyledTable.Cell>
      <StyledTable.Cell className={cx('reset-padding-cell more-cell')}>
        <div className={cx('tc', sortingHandleClassName)}>
          <IoMdMore className="gray-400 move" size={26} />
        </div>
      </StyledTable.Cell>
      <StyledTable.Cell className="pa0">
        <div
          className="image-wrapper flex items-center justify-center bg-gray-200 pointer"
          onClick={onClickImage}
        >
          {croppedImageUrl ? (
            <img className="w-100 h-100" alt="Preview" src={croppedImageUrl} />
          ) : (
            <CameraPlus className="camera-plus-icon" />
          )}
        </div>
      </StyledTable.Cell>
      {Object.values(listing.optionValues).map((optionValue, idx) => (
        <StyledTable.Cell key={idx} className="f6">
          <span className="gray-700">{optionValue}</span>
        </StyledTable.Cell>
      ))}
      <StyledTable.Cell>
        {isSoldOut(dataId) ? (
          <span className="f6 flamingo">Sold Out</span>
        ) : (
          <Field
            small
            name={`${fieldName}.amount`}
            className="input ba"
            placeholder="required"
            component={Input}
            validate={validateRequiredNumberField}
          />
        )}
      </StyledTable.Cell>
      {visibleCols.retailPrice && (
        <StyledTable.Cell>
          <Field
            small
            name={`${fieldName}.retailPrice`}
            className="input ba"
            component={Input}
          />
        </StyledTable.Cell>
      )}
      <StyledTable.Cell>
        <Field
          small
          name={`${fieldName}.available_quantity`}
          className="input ba"
          placeholder="required"
          component={Input}
          validate={validateRequiredNumberField}
          parse={parseNumberField}
        />
      </StyledTable.Cell>
      {visibleCols.sku && (
        <StyledTable.Cell>
          <Field
            small
            name={`${fieldName}.sku`}
            className="input ba"
            component={Input}
          />
        </StyledTable.Cell>
      )}
      <style jsx>{`
        .image-wrapper {
          width: 3.5rem;
          height: 3.5rem;
        }
        :global(.reset-padding-cell) {
          padding: 0;
        }
        :global(.more-cell) {
          line-height: 0;
        }
        :global(.camera-plus-icon) {
          width: 2.5rem;
        }
        :global(.input) {
          min-width: 3rem;
        }
      `}</style>
    </StyledTable.Row>
  );
};

const EnhancedItemVariantsListingTableRow = React.memo(
  ItemVariantsListingTableRow
);

export default EnhancedItemVariantsListingTableRow;
