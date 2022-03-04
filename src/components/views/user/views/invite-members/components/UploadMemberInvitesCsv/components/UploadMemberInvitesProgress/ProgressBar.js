import React from 'react';
import cx from 'classnames';

const HEIGHT = 36;

const ProgressBar = ({className, progress}) => (
  <div
    className={cx('progress-bar-container ba b--gray-300 bg-white', className)}
  >
    <div className="progress bg-tint" style={{width: `${progress}%`}} />
    <style jsx>{`
      .progress-bar-container {
        height: ${HEIGHT}px;
      }
      .progress {
        height: ${HEIGHT}px;
      }
    `}</style>
  </div>
);

const EnhancedProgressBar = React.memo(ProgressBar);

export default EnhancedProgressBar;
