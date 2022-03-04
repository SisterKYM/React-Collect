import {generatePath, Link} from 'react-router-dom';
import React from 'react';

import {ReactComponent as DisplayOptionsIcon} from 'theme/images/display-options.svg';

import {ItemsToolbarButton} from './components';

const DisplayOptionsButtonContainer = ({className, ownerId, collectionId}) => (
  <Link
    to={generatePath('/collection/:owner/:collection/items/display-options', {
      owner: ownerId,
      collection: collectionId,
    })}
  >
    <ItemsToolbarButton className={className}>
      <DisplayOptionsIcon className="dib v-mid" />{' '}
      <span className="dn di-ns ml2 v-mid">Display Options</span>
    </ItemsToolbarButton>
  </Link>
);

const EnhancedDisplayOptionsButtonContainer = React.memo(
  DisplayOptionsButtonContainer
);

export default EnhancedDisplayOptionsButtonContainer;
