import React, {useCallback, useState} from 'react';
import cx from 'classnames';

import {CommonButton} from 'elements';
import {fontSizes} from 'theme/constants';
import {ReactComponent as Checkmark} from 'theme/images/Checkmark.svg';

const renderFeature = ({check, ...feature}, key) => (
  <li
    key={key}
    {...feature}
    className={cx(
      'flex mb3 items-baseline f6 feature-bullet',
      feature.className
    )}
  >
    {check && (
      <i className="pr2" style={{color: '#287991'}}>
        <Checkmark size={fontSizes[6]} />
      </i>
    )}
    {feature.children}
  </li>
);

const SubscriptionPlanPanel = ({
  isPause,
  extraSmall,
  current,
  title,
  subtitle,
  monthlyCost,
  monthlyCostLabel,
  ctaBtn,
  features,
}) => {
  const [featuresVisible, setFeaturesVisible] = useState(false);

  const handleToggleFeaturesVisible = useCallback(() => {
    setFeaturesVisible((prevFeaturesVisible) => !prevFeaturesVisible);
  }, []);

  return (
    <div
      className={cx(
        'br2 shadow-6 b-gray-200 bg-white',
        !extraSmall && 'subscription-plan-panel',
        extraSmall && 'ph3 pv3'
      )}
    >
      <div className={!extraSmall ? 'tc' : ''}>
        <div
          {...title}
          className={cx(
            'title avenir-roman pt2-ns',
            !extraSmall && 'f2',
            title.className
          )}
        >
          {title.children}
          {extraSmall && <span className="gray-600"> {monthlyCost}</span>}
        </div>
        <p className="description avenir-roman text-16 dark-grey mb3">
          {!extraSmall
            ? subtitle
            : Number(monthlyCost.slice(1)) === 0
            ? ''
            : '/ month with annual plan'}
        </p>
        {!extraSmall && (
          <div className="flex justify-center items-center">
            <div className="cost pr2 avenir-light gray-600">{monthlyCost}</div>
            <div className="pl2 tl monthly-cost-label dark-grey avenir-roman">
              {monthlyCostLabel}
            </div>
          </div>
        )}
        {ctaBtn && (
          <div className="mt3">
            <CommonButton
              {...ctaBtn}
              className={cx(
                'w-100 pt-16',
                current || isPause
                  ? 'gray-600 bg-gray-250'
                  : title.children === 'Pro'
                  ? 'white bg-brand'
                  : 'white bg-tint'
              )}
            />
          </div>
        )}
        {title.children === 'Pro' && isPause && (
          <div className="mt3">
            <CommonButton
              onClick={ctaBtn.onClick}
              className="w-100 pt-16 white bg-brand"
            >
              Reactivate Pro
            </CommonButton>
          </div>
        )}
      </div>
      <hr className={!extraSmall ? 'mv4' : 'mv3'} />
      {extraSmall && (
        <div className="flex justify-between f6 avenir-roman">
          <div>{subtitle}</div>
          <div className="tint pointer" onClick={handleToggleFeaturesVisible}>
            {featuresVisible ? 'Hide Features' : 'View Features'}
          </div>
        </div>
      )}
      {(!extraSmall || featuresVisible) && (
        <ul className={extraSmall ? 'mt4 dark-grey' : 'dark-grey'}>
          {features.map(renderFeature)}
        </ul>
      )}
      <style jsx>{`
        .subscription-plan-panel {
          min-height: 720px;
          padding: 20px;
        }
        .title {
          font-size: 2.25rem;
        }
        .description {
          margin-top: 8px;
        }
        .shadow-6 {
          box-shadow: 0px 1px 5px #00000029;
        }
        .cost {
          font-size: 45px;
        }
        .monthly-cost-label {
          font-size: 12px;
          line-height: 16px;
        }
      `}</style>
    </div>
  );
};

export default SubscriptionPlanPanel;
