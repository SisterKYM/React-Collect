import React from 'react';
import posed from 'react-pose';

import {inputHeight, inputHeightSmall} from 'theme/constants';

const AnimatedMessage = posed.div({
  visible: {
    x: '0%',
    scaleX: 1,
    scaleY: 1,
  },
  hidden: {
    x: '100%',
    scaleX: 0,
    scaleY: 0,
    transition: {
      duration: 200,
    },
  },
});

const InputErrorMessage = ({show, small, message, onClick}) => (
  <AnimatedMessage
    pose={show ? 'visible' : 'hidden'}
    className="absolute top-0 right-0 flex items-center bg-white"
    style={{height: small ? inputHeightSmall : inputHeight}}
    onClick={onClick}
  >
    <pre className="avenir-light pr2 f7 brand">{message}</pre>
  </AnimatedMessage>
);

const EnhancedInputErrorMessage = React.memo(InputErrorMessage);

export default EnhancedInputErrorMessage;
