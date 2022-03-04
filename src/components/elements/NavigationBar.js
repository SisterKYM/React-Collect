import React from 'react';

const CONTAINER_HEIGHT = 64;

const NavigationBar = ({zIndex = 2, title, left, right}) => (
  <nav className="fixed top-0 left-0 right-0">
    <div className="navigation-bar-content-container relative flex bb b--gray-100 bg-white">
      <div className="absolute top-0 left-0 bottom-0 flex ph3 justify-start items-center">
        {left}
      </div>
      <div className="title-wrapper absolute top-0 bottom-0 flex justify-center items-center">
        {title}
      </div>
      <div className="absolute top-0 right-0 bottom-0 flex justify-end ph3">
        {right}
      </div>
    </div>
    <style jsx>{`
      nav {
        z-index: ${zIndex};
      }
      .navigation-bar-content-container {
        height: ${CONTAINER_HEIGHT}px;
      }
      .title-wrapper {
        left: 50%;
        transform: translateX(-50%);
      }
    `}</style>
  </nav>
);

const EnhancedNavigationBar = Object.assign(React.memo(NavigationBar), {
  height: CONTAINER_HEIGHT,
});

export default EnhancedNavigationBar;
