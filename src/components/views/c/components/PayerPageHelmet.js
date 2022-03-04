import {Helmet} from 'react-helmet';
import React from 'react';
import config from 'config';
import {payCollectionSD} from 'helpers/structuredData';
import ImagesUtils from 'helpers/ImagesUtils';

const PayerPageHelmet = ({collection, collectionSlug, path}) => {
  const headerImageUrl = collection.headerImage
    ? ImagesUtils.getImageUrl(collection.headerImage, {
        width: 1024,
        height: 360,
      })
    : null;

  return (
    <Helmet defer={false}>
      {collection.doNotIndex && <meta name="robots" content="noindex" />}
      <meta
        property="description"
        content={collection.description || ' ‏‏‎ '}
      />
      <meta
        property="og:description"
        content={collection.description || ' ‏‏‎ '}
      />
      <meta
        property="twitter:description"
        content={collection.description || ' ‏‏‎ '}
      />
      {headerImageUrl && <meta property="og:image" content={headerImageUrl} />}
      {headerImageUrl && <meta property="image" content={headerImageUrl} />}
      {headerImageUrl && (
        <meta property="twitter:image:src" content={headerImageUrl} />
      )}
      <meta
        property="og:url"
        content={`${process.env.REACT_APP_SITE_URL}/c/${collectionSlug}`}
      />
      <meta itemProp="name" content={collection.name} />
      <title>{collection.name}</title>
      <meta property="og:title" content={collection.name} />
      <meta property="twitter:title" content={collection.name} />
      <meta property="twitter:card" content="summary" />
      {config.isCheddarUp && (
        <meta property="twitter:site" content="@cheddarup" />
      )}
      {config.isCheddarUp && (
        <meta property="twitter:creator" content="@cheddarup" />
      )}
      <meta property="og:site_name" content={config.strings.name} />
      <meta property="og:locale" content="en_US" />
      {config.isCheddarUp && (
        <meta property="fb:app_id" content="413118622200717" />
      )}
      <meta property="og:type" content="product.group" />
      {path === '/c/:collection' && (
        <script type="application/ld+json">
          {payCollectionSD(collection)}
        </script>
      )}
    </Helmet>
  );
};

const EnhancedPayerPageHelmet = React.memo(PayerPageHelmet);

export default EnhancedPayerPageHelmet;
