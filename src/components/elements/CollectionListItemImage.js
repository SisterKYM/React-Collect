import React from 'react';
import cx from 'classnames';

import {ReactComponent as CollectionEmptyImage} from 'theme/images/CollectionEmptyImage.svg';
import ImagesUtils from 'helpers/ImagesUtils';

const CollectionListItemImage = ({className, image, onClick}) =>
  image ? (
    <div
      className={cx('br2 cover bg-center', className)}
      style={{
        backgroundImage: `url("${ImagesUtils.getCroppedImageUrl(image)}")`,
      }}
      onClick={onClick}
    />
  ) : (
    <div
      className={cx('empty br2 flex items-center justify-center', className)}
      onClick={onClick}
    >
      <CollectionEmptyImage />
    </div>
  );

const EnhancedCollectionListItemImage = React.memo(CollectionListItemImage);

export default EnhancedCollectionListItemImage;
