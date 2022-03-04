import cx from 'classnames';
import React from 'react';

import {FooterBig} from 'layout/components';
import ImagesUtils from 'helpers/ImagesUtils';
import useMedia from 'hooks/useMedia';
import config from 'config';
import PayerPageHelmet from '../../../../components/PayerPageHelmet';
import {PayerFlowNavigationBar} from '../../../../components';
import BlurredImageBackground from './BlurredImageBackground';
import OrganizerInfo from './OrganizerInfo';
import CollectionBannerImage from './CollectionBannerImage';
import CollectionUnavailableBanner from './CollectionUnavailableBanner';

const PayerPageBase = ({
  prePayerPage,
  collectionSlug,
  publicCollection,
  user,
  onChangeCategoryPath,
  header,
  navigationBarRightElementMobile,
  children,
}) => {
  const {notSmall} = useMedia();

  const imageUrl =
    (publicCollection.headerImage &&
      ImagesUtils.getCroppedImageUrl(publicCollection.headerImage)) ||
    null;

  return (
    <div
      className={cx(
        'relative flex flex-column min-vh-100 h-100',
        prePayerPage ? 'bg-gray-200-ns' : 'bg-gray-200'
      )}
    >
      <PayerPageHelmet
        collection={publicCollection}
        collectionSlug={collectionSlug}
      />
      <header className="sticky top-0 z-2">
        <PayerFlowNavigationBar
          collectionSlug={collectionSlug}
          user={user}
          categories={(publicCollection.categories || []).filter(
            (category) => category.anchor
          )}
          onChangeCategoryPath={onChangeCategoryPath}
          rightElementMobile={navigationBarRightElementMobile}
          publicCollection={publicCollection}
        />
        {header}
      </header>
      <CollectionUnavailableBanner
        userManagesCollection={publicCollection.userManagesCollection}
        allowPayments={publicCollection.allowPayments}
        unavailable={publicCollection.unavailable}
      />
      {Boolean(imageUrl && (!prePayerPage || notSmall)) && (
        <div>
          <CollectionBannerImage imageUrl={imageUrl} />
        </div>
      )}
      {Boolean(prePayerPage && !notSmall) && (
        <div className="blurred-image-background-wrapper fixed">
          <BlurredImageBackground imageUrl={imageUrl} />
        </div>
      )}
      <main className="content-container db flex-auto">
        {!publicCollection.allowPayments
          ? publicCollection.userManagesCollection
            ? children
            : null
          : children}
        <OrganizerInfo
          className={cx(
            'w-80 w-100-ns mv4 center',
            prePayerPage &&
              'bg-white bg-transparent-ns br2 br0-ns shadow-6 shadow-none-ns'
          )}
          collectionSlug={collectionSlug}
          organizer={publicCollection.organizer}
        />
      </main>

      <FooterBig whitelabelFooter={config.enabledFeatures.whitelabelFooter} />
      <style jsx global>{`
        body {
          background-color: transparent;
        }
        .blurred-image-background-wrapper {
          z-index: -1;
        }
      `}</style>
    </div>
  );
};

const EnhancedPayerPageBase = React.memo(PayerPageBase);

export default EnhancedPayerPageBase;
