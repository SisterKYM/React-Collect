import React, {useMemo} from 'react';

const ProgressBar = ({width, ratio}) => {
  const progressBarStyle = useMemo(
    () => ({
      width: `${width}px`,
    }),
    [width]
  );

  const progress = ratio * width;
  const progressStyle = useMemo(
    () => ({
      width: `${progress}px`,
    }),
    [progress]
  );

  return (
    <>
      <div className="progress-div" style={progressBarStyle}>
        <div style={progressStyle} className="progress" />
      </div>
      <style>{`
        .progress-div {
          background-color: #F0F0F0;
          border-radius: .5rem;
          height: 0.625rem;
          display: flex;
          align-items: center;
         }
        
        .progress {
          background: linear-gradient(270deg, #2FB2D6, #257A91);
          height: 1rem;
          border-radius: 1rem;
        }
      `}</style>
    </>
  );
};

export default React.memo(ProgressBar);
