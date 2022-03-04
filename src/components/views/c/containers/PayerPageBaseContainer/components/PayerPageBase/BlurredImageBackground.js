import React from 'react';

const BlurredImageBackground = ({imageUrl}) => (
  <div className="fixed absolute--fill">
    <svg width="100%" height="100%">
      <filter id="blurMe">
        <feGaussianBlur in="SourceGraphic" stdDeviation={16} />
      </filter>
      <image
        filter="url(#blurMe)"
        href={imageUrl}
        x="0%"
        y="0%"
        height="100%"
        width="100%"
        preserveAspectRatio="xMidYMid slice"
      />
    </svg>
  </div>
);

export default BlurredImageBackground;
