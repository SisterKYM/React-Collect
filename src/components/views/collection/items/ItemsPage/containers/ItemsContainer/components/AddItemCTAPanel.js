import {Link} from 'react-router-dom';
import React from 'react';

import {ReactComponent as TagPlusSolidIcon} from 'theme/images/tag-plus-solid-icon.svg';
import config from 'config';

const AddItemCTAPanel = ({openPath}) => (
  <div className="mw7 w-100">
    <Link to={openPath}>
      <div className="bg-white pa3 br2 shadow-6">
        <div className="pa3 pa4-ns tc dark-grey">
          <h2 className="mb3 mb4-ns avenir-light lh-copy">
            Add items to your {config.strings.collection} page
          </h2>
          <TagPlusSolidIcon className="w3" fill={config.colors.brand} />
        </div>
      </div>
    </Link>
  </div>
);

const EnhancedAddItemCTAPanel = React.memo(AddItemCTAPanel);

export default EnhancedAddItemCTAPanel;
