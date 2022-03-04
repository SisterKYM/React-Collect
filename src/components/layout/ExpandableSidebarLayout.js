import {MdClose} from 'react-icons/md';
import {connect} from 'react-redux';
import React from 'react';
import posed, {PoseGroup} from 'react-pose';

import {ModalCloseButton} from 'elements';

const AnimatedContentWrapper = posed.div({
  shrinked: {
    width: ({lessThanMedium}) => (lessThanMedium ? 0 : `${(8 / 12) * 100}%`),
  },
  expanded: {
    width: '100%',
  },
});
const AnimatedSidebarWrapper = posed.div({
  enter: {
    width: ({lessThanMedium}) =>
      lessThanMedium ? '100%' : `${(4 / 12) * 100}%`,
    x: 0,
  },
  exit: {
    width: '0%',
    x: '100%',
    transition: {
      type: 'tween',
      ease: 'easeOut',
    },
  },
});

const ExpandableSidebarLayout = ({
  sidebarVisible,
  title,
  heading,
  headingSubtitle,
  sidebarTitle,
  sidebar,
  children,
  headerButtons,
  onClickClose,
  onClickCloseSidebar,
  lessThanMedium,
}) => (
  <div className="min-h-100 flex">
    <AnimatedContentWrapper
      className="absolute top-0 left-0 h-100 overflow-y-scroll"
      poseKey={lessThanMedium}
      lessThanMedium={lessThanMedium}
      pose={sidebarVisible ? 'shrinked' : 'expanded'}
    >
      <div className="relative w-100 gray-600">
        <ModalCloseButton
          className="mt4"
          color="medium-grey"
          onClick={onClickClose}
        />
        <div className="pa3 pa4-ns bb b--gray-300">
          {title && <h2 className="ph2 f5 mb3">{title}</h2>}
          <div className="flex justify-between items-center">
            <h3 className="text-24 avenir-roman gray-600">{heading}</h3>
          </div>
          {headingSubtitle && (
            <div className="mt2 lh-copy">{headingSubtitle}</div>
          )}
          {headerButtons && <div className="mt3">{headerButtons}</div>}
        </div>
        <div className="pa3 pa4-ns">{children}</div>
      </div>
    </AnimatedContentWrapper>
    <PoseGroup>
      {sidebarVisible && (
        <AnimatedSidebarWrapper
          key="paymentObjectViewContainerWrapper"
          className="absolute top-0 right-0 h-100 flex overflow-y-scroll bg-gray-200"
          withParent={false}
          poseKey={lessThanMedium}
          lessThanMedium={lessThanMedium}
        >
          <div className="relative flex w-100 flex-column">
            <div className="flex-auto pa3 pa4-ns">
              <div className="absolute top-0 right-2 ma3 z-999">
                <div className="fixed pointer" onClick={onClickCloseSidebar}>
                  <MdClose className="medium-grey" size={24} />
                </div>
              </div>
              <h2 className="mt3 f5 lh-copy dark-grey avenir-roman">
                {sidebarTitle}
              </h2>
              {sidebar}
            </div>
          </div>
        </AnimatedSidebarWrapper>
      )}
    </PoseGroup>
  </div>
);

const enhance = connect(state => ({
  lessThanMedium: state.browser.lessThan.medium,
}));

const EnhancedExpandableSidebarLayout = enhance(ExpandableSidebarLayout);

export default EnhancedExpandableSidebarLayout;
