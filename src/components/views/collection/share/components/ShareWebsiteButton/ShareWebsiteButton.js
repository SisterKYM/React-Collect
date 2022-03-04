import React from 'react';

import {Panel} from 'elements';
import config from 'config';

import SiteButton from './SiteButton';

const ShareWebsiteButton = ({collectionSlug}) => (
  <Panel heading="Share with a button">
    <p className="f5 avenir-light gray-350">
      Embed a &quot;Pay with Cheddar Up&quot; button on your website that links to your
      collection.
    </p>
    {config.enabledFeatures.siteButtons && (
      <div className="mt3">
        <SiteButton collectionSlug={collectionSlug} />
      </div>
    )}
  </Panel>
);

export default ShareWebsiteButton;
