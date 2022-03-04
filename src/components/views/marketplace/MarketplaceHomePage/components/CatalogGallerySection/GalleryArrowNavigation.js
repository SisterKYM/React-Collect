import React from 'react';
import _ from 'lodash';
import cx from 'classnames';

import BackCircleArrowActive from 'theme/images/BackCircleArrow.Active.svg';
import BackCircleArrowInactive from 'theme/images/BackCircleArrow.Inactive.svg';
import ForwardCircleArrowActive from 'theme/images/ForwardCircleArrow.Active.svg';
import ForwardCircleArrowInactive from 'theme/images/ForwardCircleArrow.InActive.svg';

const GalleryArrowNavigation = ({
  className,
  forwardActive,
  backActive,
  onGoForward,
  onGoBack,
}) => {
  const handleClickBack = React.useCallback(
    _.debounce(() => {
      if (backActive) {
        onGoBack();
      }
    }, 200),
    [backActive, onGoBack]
  );

  const handleClickForward = React.useCallback(
    _.debounce(() => {
      if (forwardActive) {
        onGoForward();
      }
    }, 200),
    [forwardActive, onGoForward]
  );

  return (
    <div className={cx('nowrap', className)}>
      <img
        className={cx('mr3', backActive ? 'pointer' : 'not-allowed')}
        alt="Arrow back"
        src={backActive ? BackCircleArrowActive : BackCircleArrowInactive}
        onClick={handleClickBack}
      />
      <img
        className={forwardActive ? 'pointer' : 'not-allowed'}
        alt="Arrow forward"
        src={
          forwardActive ? ForwardCircleArrowActive : ForwardCircleArrowInactive
        }
        onClick={handleClickForward}
      />
      <style jsx>{`
        img {
          height: 1.75rem;
        }
      `}</style>
    </div>
  );
};

const EnhancedGalleryArrowNavigation = React.memo(GalleryArrowNavigation);

export default EnhancedGalleryArrowNavigation;
