import {Field} from 'redux-form';
import {IoMdHelpCircle} from 'react-icons/io';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import {Tooltip} from 'elements';

const ProfileFormField = ({
  style,
  tooltip,
  tooltipArrowPosition,
  tooltipStyle,
  className,
  ...props
}) => (
  <div className="relative">
    <Field
      className={cx(className, 'ba')}
      {...props}
      autoComplete="new-password"
    />
    {Boolean(tooltip) && (
      <div className="tooltip-wrapper absolute pointer">
        <Tooltip
          arrowPosition={tooltipArrowPosition}
          style={tooltipStyle}
          text={tooltip}
        >
          <IoMdHelpCircle color="lightGray" size={26} />
        </Tooltip>
      </div>
    )}
    <style jsx>{`
      .tooltip-wrapper {
        top: 50%;
        right: -35px;
        margin-top: -14px;
      }
    `}</style>
  </div>
);

const EnhancedProfileFormField = Object.assign(React.memo(ProfileFormField), {
  propTypes: {
    component: PropTypes.elementType,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    tooltip: PropTypes.string,
    tooltipStyle: PropTypes.object,
  },
});

export default EnhancedProfileFormField;
