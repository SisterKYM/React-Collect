import PropTypes from 'prop-types';
import React from 'react';

const ProgressBar = ({percent = 0, ...props}) => (
  <div className="flex items-center" {...props}>
    <div className="bar-container w-100 ml2 bw1 b--solid b--gray-300">
      <div
        className="bar bg-brand"
        style={{
          width: `${percent}%`,
        }}
      />
    </div>
    <style jsx>{`
      .bar {
        height: 34px;
      }
      .bar-container {
        height: 40px;
      }
    `}</style>
  </div>
);

const EnhancedProgressBar = Object.assign(React.memo(ProgressBar), {
  propTypes: {
    percent: PropTypes.number,
  },
});

export default EnhancedProgressBar;
