import posed, {PoseGroup} from 'react-pose';
import React from 'react';

const AnimatedOverlay = posed.div({
  enter: {
    opacity: 0.4,
    transition: {
      duration: 200,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 200,
    },
  },
});
const AnimatedContent = posed.div({
  enter: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      duration: 200,
    },
  },
  exit: {
    x: '100%',
    transition: {
      duration: 150,
    },
  },
});

const PoseContainer = posed.div();

const AnimatedSlide = ({visible, children, onDismiss}) => (
  <PoseGroup>
    {visible && (
      <PoseContainer key="animated-slide" withParent={false}>
        <div className="container fixed absolute--fill z-4">
          <AnimatedOverlay
            className="fixed absolute--fill bg-dark-gray z-4"
            onClick={onDismiss}
          />
          <AnimatedContent className="animated-content absolute top-0 bottom-0 right-0 w-70 h-100 bg-white overflow-y-scroll z-5">
            {children}
          </AnimatedContent>
          <style jsx>{`
            :global(.animated-content) {
              -webkit-overflow-scrolling: touch;
            }
          `}</style>
        </div>
      </PoseContainer>
    )}
  </PoseGroup>
);

const EnhancedAnimatedSlide = React.memo(AnimatedSlide);

export default EnhancedAnimatedSlide;
