import React from 'react';

import {CollectionFormListContainer} from './containers';

const CollectionManageFormsTable = ({
  collection,
  collectionId,
  history,
  forms,
  getFormsStatus,
}) => (
  <div>
    {forms?.length ? (
      <>
        <div className="db flex-ns pv3 ph4 justify-between bb b--gray-300">
          <div className="db flex-ns items-center">
            <span className="text-14 gray-600 mr4 avenir-roman">
              Forms: {forms.length}
            </span>
          </div>
        </div>
        <div className="collection-payment-row-container relative-ns pv2 bb b--gray-300 pl4 flex gray-600 text-12 pr3">
          <div className="w-30 tl">Name</div>
          <div className="w-30 tl">Type</div>
          <div className="w-20 tl">Respondents</div>
        </div>
      </>
    ) : (
      ''
    )}
    <CollectionFormListContainer
      forms={forms}
      collection={collection}
      getFormsStatus={getFormsStatus}
      collectionId={collectionId}
      history={history}
    />
  </div>
);

export default CollectionManageFormsTable;
