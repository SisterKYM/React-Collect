import React from 'react';

const CollectionSettingsField = ({title, beta, content}) => (
  <div className="mt3 bg-white ba b--gray-300 br2-ns shadow-light mb3">
    <div className="collection-setting-field-title avenir-roman text-14 dark-grey">
      {title}
      {beta && <span className="ml1 avenir-heavy text-14 accent">BETA</span>}
    </div>
    {content}
    <style jsx>{`
      .collection-setting-field-title {
        padding: 1.25rem 1.5rem;
        border-bottom: 1px solid #eaedf3;
      }
    `}</style>
  </div>
);

export default CollectionSettingsField;
