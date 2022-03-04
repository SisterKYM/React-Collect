import React from 'react';
import {Link} from 'react-router-dom';

import AppStore from 'theme/images/AppStore.png';
import GooglePlay from 'theme/images/GooglePlay.png';
import {CreateCollectionButton, PartnerBenefits} from '.';

const appleStoreLink =
  'https://apps.apple.com/us/app/cheddar-up/id1141129202?ls=1';
const googlePlayLink =
  'https://play.google.com/store/apps/details?id=com.cheddarup.CheddarUp';

const GetStarted = () => (
  <>
    <div className="get-started border bg-white black pa4">
      <p className="text-18 dark-grey">
        Let&apos;s get started!{' '}
        <Link to="/collection/434/details">Create a collection</Link> here or by
        downloading our app on the{' '}
        <a href={appleStoreLink} rel="noopener noreferrer" target="_blank">
          App Store
        </a>{' '}
        or{' '}
        <a href={googlePlayLink} rel="noopener noreferrer" target="_blank">
          Google Play.
        </a>
      </p>
      <div className="mt3">
        <CreateCollectionButton />
      </div>
      <div className="mt4">
        <a
          href={appleStoreLink}
          rel="noopener noreferrer"
          target="_blank"
          className="mr4"
        >
          <img src={AppStore} alt="App Store" />
        </a>
        <a href={googlePlayLink} rel="noopener noreferrer" target="_blank">
          <img src={GooglePlay} alt="Google Play" />
        </a>
      </div>
    </div>

    <PartnerBenefits className="pa4 mt3" />

    <style jsx global>{`
      .border {
        border-top: 1px solid #eaedf3;
        border-bottom: 1px solid #eaedf3;
      }
      .get-started p {
        line-height: 24px;
      }
    `}</style>
  </>
);

export default React.memo(GetStarted);
