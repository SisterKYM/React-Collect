import React from 'react';

import {CommonButton} from 'elements';

const CollectionReportCard = ({showGenerateReportModal}) => (
  <div className="card pa3-5 mb3-5">
    <div className="card-title text-14 avenir-roman gray-350">
      COLLECTION REPORT
    </div>
    <div className="mt2-5">
      <span className="card-description text-14 avenir-light dark-grey">
        Generate and download a spreadsheet or pdf report for specific
        collections.
      </span>
    </div>
    <div className="mt3">
      <CommonButton
        className="bg-tint white pt-14"
        onClick={showGenerateReportModal}
      >
        Generate a Report
      </CommonButton>
    </div>
  </div>
);

const EnhancedCollectionReportCard = React.memo(CollectionReportCard);

export default EnhancedCollectionReportCard;
