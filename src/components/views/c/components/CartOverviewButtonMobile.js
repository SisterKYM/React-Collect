import React from 'react';
import {Button} from 'elements';

import AnimatedSlide from './AnimatedSlide';

const CartOverviewButtonMobile = ({
  cartOverviewElement,
  toggleOverviewVisible,
  overviewVisible,
}) => (
  <>
    <Button
      small
      colorSet
      backgroundColorSet
      className="gray-600 bg-gray-200 br2"
      onClick={toggleOverviewVisible && toggleOverviewVisible.on}
    >
      Order Summary
    </Button>
    <AnimatedSlide
      visible={overviewVisible}
      onDismiss={toggleOverviewVisible && toggleOverviewVisible.off}
    >
      {cartOverviewElement}
    </AnimatedSlide>
  </>
);

export default CartOverviewButtonMobile;
