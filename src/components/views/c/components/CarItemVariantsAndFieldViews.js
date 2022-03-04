import _ from 'lodash';
import posed, {PoseGroup} from 'react-pose';
import React from 'react';

import getCollectionFieldValueFormatted from 'helpers/getCollectionFieldValueFormatted';
import useToggle from 'hooks/useToggle';

const COLLAPSED_VIEW_COUNT = 3;

const AnimatedDefinitionListWrapper = posed.div({
  enter: {
    x: '0%',
    opacity: 1,
    delay: ({idx}) => idx * 50,
  },
  exit: {
    opacity: 0,
    x: '-100%',
  },
});
const AnimatedExpandToggle = posed.div({});

const DefinitionList = ({title, children}) => (
  <dl className="mv2 f6 lh-title avenir-light">
    <dt className="dib gray-400">{title}:</dt>
    <dd className="dib ml1 gray-550">{children}</dd>
  </dl>
);

const CarItemVariantsAndFieldViews = ({
  className,
  variantOptionValues = [],
  cartFieldViews,
}) => {
  const [expanded, toggleExpanded] = useToggle();

  const visibleVariantOptionValues = React.useMemo(
    () =>
      _.take(variantOptionValues, expanded ? Infinity : COLLAPSED_VIEW_COUNT),
    [expanded, variantOptionValues]
  );
  const visibleCartFieldViews = React.useMemo(
    () =>
      _.take(
        cartFieldViews,
        expanded
          ? Infinity
          : COLLAPSED_VIEW_COUNT - visibleVariantOptionValues.length
      ),
    [expanded, cartFieldViews, visibleVariantOptionValues.length]
  );

  return (
    <div className={className}>
      <PoseGroup>
        {visibleVariantOptionValues.map((variantOptionValue, idx) => (
          <AnimatedDefinitionListWrapper key={variantOptionValue.key} idx={idx}>
            <DefinitionList title={variantOptionValue.key}>
              {variantOptionValue.value}
            </DefinitionList>
          </AnimatedDefinitionListWrapper>
        ))}
        {visibleCartFieldViews.map((cartFieldView, idx) => (
          <AnimatedDefinitionListWrapper
            key={cartFieldView.item_field_id}
            idx={idx}
          >
            <DefinitionList title={cartFieldView.name}>
              {cartFieldView.field_type === 'signature' ||
              cartFieldView.field_type === 'image' ? (
                <img
                  className="h3"
                  alt={cartFieldView.name}
                  src={cartFieldView.value}
                />
              ) : (
                getCollectionFieldValueFormatted(cartFieldView)
              )}
            </DefinitionList>
          </AnimatedDefinitionListWrapper>
        ))}
        {variantOptionValues.length + cartFieldViews.length >
          COLLAPSED_VIEW_COUNT && (
          <AnimatedExpandToggle
            key="expand"
            className="mt2 f-small avenir-roman dim tint pointer"
            onClick={toggleExpanded.switch}
          >
            {expanded ? 'Less' : 'More'}
          </AnimatedExpandToggle>
        )}
      </PoseGroup>
    </div>
  );
};

const EnhancedCarItemVariantsAndFieldViews = React.memo(
  CarItemVariantsAndFieldViews
);

export default EnhancedCarItemVariantsAndFieldViews;
