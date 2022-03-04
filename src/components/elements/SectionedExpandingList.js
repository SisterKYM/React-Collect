import {FaChevronDown, FaChevronUp} from 'react-icons/fa';
import React from 'react';

import useToggle from 'hooks/useToggle';

const SectionItem = ({
  initialExpanded = false,
  section,
  onClick,
  renderItem,
}) => {
  const [expanded, toggleExpanded] = useToggle(initialExpanded);

  return (
    <li className="pv2 f6 avenir-heavy">
      <div className="flex items-center pointer dim gray-600">
        <div className="flex-auto" onClick={onClick || toggleExpanded.switch}>
          {section.title}
        </div>
        {section.items && section.items.length !== 0 && (
          <div className="ph3">
            {expanded ? (
              <FaChevronUp onClick={toggleExpanded.off} />
            ) : (
              <FaChevronDown onClick={toggleExpanded.on} />
            )}
          </div>
        )}
      </div>
      {expanded && (
        <ul className="pt3 ph4">
          {section.items.map((item, idx) => renderItem(item, idx, section))}
        </ul>
      )}
    </li>
  );
};

const SectionedExpandingList = ({
  className,
  sections,
  onClickSection,
  renderItem,
}) => (
  <ul className={className}>
    {sections.map(section => {
      const handleClick = () => {
        onClickSection(section);
      };

      return (
        <SectionItem
          key={section.id}
          initialExpanded={section.initialExpanded}
          section={section}
          onClick={onClickSection ? handleClick : undefined}
          renderItem={renderItem}
        />
      );
    })}
  </ul>
);

const EnhancedSectionedExpandingList = React.memo(SectionedExpandingList);

export default EnhancedSectionedExpandingList;
