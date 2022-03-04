import {IoMdAlert} from 'react-icons/io';
import React from 'react';

import {Tooltip} from 'elements';
import {scale} from 'theme/constants';

const WIDTH = 250;

const CollectionListItemStatusTooltip = ({text, tooltipText}) => (
  <>
    <Tooltip
      contentContainerClassName="collection-status-tooltip"
      text={tooltipText}
    >
      <div className="flex items-center brand">
        <IoMdAlert />
        <span className="dib" style={{width: scale[0]}} />
        {text}
      </div>
    </Tooltip>
    <style jsx global>{`
      .collection-status-tooltip {
        bottom: 25px;
        left: 50%;
        margin-left: ${-WIDTH / 2}px;
        width: ${WIDTH}px;
      }
    `}</style>
  </>
);

const EnhancedCollectionListItemStatusTooltip = React.memo(
  CollectionListItemStatusTooltip
);

export default EnhancedCollectionListItemStatusTooltip;
