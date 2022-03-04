import {Field} from 'formik';

import {IoMdHelpCircle} from 'react-icons/io';
import React, {useCallback, useState} from 'react';
import cx from 'classnames';

import {Tooltip} from './components';

const ProfileFormField = ({
  title,
  onClickDescriptionSet = false,
  description,
  showResetPassword,
  style,
  tooltip,
  tooltipArrowPosition,
  tooltipStyle,
  className,
  ...props
}) => {
  const [descriptionVisible, setDescriptionVisible] = useState(false);

  const showDescription = useCallback(() => {
    setDescriptionVisible(true);
  }, []);
  const hideDescription = useCallback(() => {
    setDescriptionVisible(false);
  }, []);

  return (
    <>
      <p className="avenir-roman text-14 mb2">{title}</p>
      <div className="input-wrapper">
        <div
          className="relative"
          onClick={onClickDescriptionSet ? showDescription : null}
          onBlur={onClickDescriptionSet ? hideDescription : null}
        >
          <Field
            className={cx(className, 'ba avenir-light')}
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
                <IoMdHelpCircle className="medium-grey" size={20} />
              </Tooltip>
            </div>
          )}
          {props.name === 'password' && (
            <div
              className="reset-wrapper absolute pointer tint text-12"
              onClick={showResetPassword}
            >
              Reset
            </div>
          )}
        </div>
        {onClickDescriptionSet && descriptionVisible && description && (
          <span className="text-12">{description}</span>
        )}
      </div>
      <style>{`
        .tooltip-wrapper {
          top: 50%;
          right: 14px;
          margin-top: -10px;
        }
        .reset-wrapper {
          top: 50%;
          right: 14px;
          margin-top: -10px;
        }
        .tooltip-tip {
          background-color: white !important;
          color: #373737;
          border-radius: 4px;
          border: solid 1px #dfdedf;
          text-align: left;
          box-shadow: 0px 0px 8px #0000004d;
        }
        .tooltip-arrow {
          border-top: 6px solid #fff !important;
          bottom: -5px !important;
        }
        .input-wrapper {
          margin-bottom: 18px;
        }
    `}</style>
    </>
  );
};

const EnhancedProfileFormField = React.memo(ProfileFormField);

export default EnhancedProfileFormField;
