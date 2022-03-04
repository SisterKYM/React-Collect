import cx from 'classnames';
import React from 'react';

import {MarkdownParagraph} from 'elements';
import {ReactComponent as PayerDownloadIcon} from 'theme/images/Payer.Download.svg';
import getFileNameFromUrl from 'helpers/getFileNameFromUrl';
import PayerPageHelmet from './PayerPageHelmet';

const CollectionOverview = ({
  className,
  publicCollection,
  collectionSlug,
  path,
}) => (
  <div
    className={cx(
      'ph3 ph4-ns pv4 br2-ns br--bottom-ns bg-white shadow-6',
      className
    )}
  >
    <PayerPageHelmet
      collection={publicCollection}
      collectionSlug={collectionSlug}
      path={path}
    />
    <h2 className="f2 lh-copy merriweather gray-600">
      {publicCollection.name}
    </h2>
    {publicCollection.description && (
      <MarkdownParagraph
        className="markdown-paragraph mt2 f-regular avenir-light gray-600"
        markdown={publicCollection.description}
      />
    )}
    {publicCollection.attachments.length !== 0 && (
      <ul className="ph2 mt4">
        {publicCollection.attachments.map(({file_name: {url}}, idx) => (
          <li key={url} className={idx === 0 ? '' : 'mt3'}>
            <a
              className="flex items-center dim f8 avenir-roman gray-600"
              href={url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <PayerDownloadIcon className="payer-download-icon mr3" />
              {getFileNameFromUrl(url)}
            </a>
          </li>
        ))}
      </ul>
    )}
    <style jsx>{`
      :global(.markdown-paragraph) {
        line-height: 1.5rem !important;
      }
      :global(.payer-download-icon) {
        height: 1.125rem;
      }
    `}</style>
  </div>
);

const EnhancedCollectionOverview = React.memo(CollectionOverview);

export default EnhancedCollectionOverview;
