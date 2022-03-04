import React from 'react';

const CollectionBannerImage = ({imageUrl}) => (
  <div className="relative flex w-100">
    <div className="absolute absolute--fill overflow-hidden">
      <svg width="100%" height="100%">
        <filter id="blurMe">
          <feGaussianBlur in="SourceGraphic" stdDeviation={16} />
        </filter>
        <image
          filter="url(#blurMe)"
          href={imageUrl}
          x="-10%"
          y="-10%"
          height="120%"
          width="120%"
          preserveAspectRatio="xMidYMid slice"
        />
      </svg>
    </div>
    <img
      className="content-container db z-1"
      alt="Collection banner"
      src={imageUrl}
    />
    <style jsx>{`
      img {
        height: intrinsic;
        object-fit: cover;
        object-position: center;
      }
      @media (min-width: 30em) {
        img {
          height: 20rem;
        }
      }
    `}</style>
  </div>
);

const EnhancedCollectionBannerImage = React.memo(CollectionBannerImage);

export default EnhancedCollectionBannerImage;
