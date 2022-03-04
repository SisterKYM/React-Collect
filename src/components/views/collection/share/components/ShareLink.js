import {compose} from 'recompose';
import {connect, useDispatch} from 'react-redux';
import {FaCheck} from 'react-icons/fa';
import CopyToClipboard from 'react-copy-to-clipboard';
import React from 'react';

import {asyncConnect} from 'helpers';
import {
  CommonButton,
  CollectionShare,
  Input,
  InputPrompt,
  Panel,
  TextInput,
} from 'elements';
import {errorAlert, successAlert} from 'redux/modules/growl/actions';
import {GET_COLLECTIONS} from 'redux/modules/collections/constants';
import {
  getCollections,
  updateCollection,
} from 'redux/modules/collections/actions';
import config from 'config';

const ShareLink = ({
  collection,
  link,
  facebookUrl,
  mailUrl,
  twitterUrl,
  collections,
}) => {
  const [linkModal, setLinkModal] = React.useState(false);

  const showLinkModal = React.useCallback(() => {
    setLinkModal(true);
  }, []);

  const hideLinkModal = React.useCallback(() => {
    setLinkModal(false);
  }, []);

  const [newSlug, setSlug] = React.useState(collection.slug);

  const updateSlug = React.useCallback((e) => {
    setSlug(e.target.value);
  }, []);

  React.useEffect(() => {
    setSlug(collection?.slug || '');
  }, [collection]);

  const [error, setError] = React.useState('');

  const dispatch = useDispatch();

  const updateShareLink = React.useCallback(() => {
    const SLUG_REGEX = /^[\da-z]+(?:-[\da-z]+)*$/i;

    if (!newSlug) {
      setError('Required');
    } else if (newSlug.length > 63) {
      setError('Musts be 63 characters or less');
    } else if (!SLUG_REGEX.test(newSlug)) {
      setError('Invalid format');
    } else if (collection.slug === newSlug) {
      setLinkModal(false);
    } else {
      const collectionIndex = collections.findIndex(
        (collection) => collection.slug === newSlug
      );

      if (collectionIndex < 0) {
        dispatch(
          updateCollection({
            id: collection?.id || 0,
            slug: newSlug,
          })
        );
        setLinkModal(false);
      } else {
        dispatch(
          errorAlert({
            title: 'Please try again',
            body: 'This URL is already taken. Please try an alternative.',
          })
        );
      }
    }
  }, [collection.id, collection.slug, collections, dispatch, newSlug]);

  const handleDidCopy = React.useCallback(() => {
    dispatch(
      successAlert({
        icon: FaCheck,
        title: 'Success',
        body: 'Link copied',
      })
    );
  }, [dispatch]);

  return (
    <Panel heading="Share with a URL">
      <p className="f5 lh-copy avenir-light gray-350">
        Copy and share your URL so your group can find your collection.{' '}
        <a
          href={config.links.shareCollection}
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more.
        </a>
      </p>
      <div className="mt2 flex items-center flex-wrap">
        <TextInput
          readOnly
          className="flex-auto"
          inputClassName="link-input"
          value={link}
        />
        <CopyToClipboard text={link} onCopy={handleDidCopy}>
          <CommonButton className="copy-button ml3 white bg-tint">
            Copy
          </CommonButton>
        </CopyToClipboard>
        <CollectionShare
          className="mw4 ml3-ns mt3 mt0-ns"
          shareUrls={{
            facebook: facebookUrl,
            twitter: twitterUrl,
            mail: mailUrl,
          }}
        />
      </div>
      <div className="mt4">
        <span className="f-small tint pointer" onClick={showLinkModal}>
          Edit Link
        </span>
      </div>
      {linkModal && (
        <InputPrompt
          flexibleHeight
          size="SMALL"
          title="Edit Link:"
          onDismiss={hideLinkModal}
          okButtonLabel="Save"
          cancelButtonLabel="Cancel"
          okButtonClassName="bg-tint white"
          onOkButtonClick={updateShareLink}
          onCancelButtonClick={hideLinkModal}
        >
          <div className="flex justify-center items-center text-16">
            <div className="url-part dark-grey flex-auto tc bg-light-aqua br2 mr1">
              {config.isCheddarUp ? 'https://' : config.links.payerPage}
            </div>
            <div className="flex-auto tc mr1">
              <Input
                border
                className="tc br0 text-14"
                style={{height: '2.375rem'}}
                value={newSlug}
                onChange={(e) => updateSlug(e)}
              />
              <div>{error}</div>
            </div>
            {config.isCheddarUp && (
              <div className="url-part dark-grey flex-auto tc bg-light-aqua br2">
                .cheddarup.com
              </div>
            )}
          </div>
        </InputPrompt>
      )}
      <style jsx>{`
        .url-part {
          padding: 10px 20px;
          font-size: 14px;
          line-height: 20px;
        }
        :global(.link-input) {
          height: 2.25rem !important;
          font-size: 0.875rem !important;
        }
        :global(.copy-button) {
          height: 2.25rem !important;
        }
      `}</style>
    </Panel>
  );
};

const enhance = compose(
  asyncConnect([
    {
      key: GET_COLLECTIONS,
      promise: getCollections,
    },
  ]),
  connect((state) => {
    const {collections = []} = state.collections;

    return {
      collections,
    };
  })
);

const EnhancedShareLink = enhance(ShareLink);

export default EnhancedShareLink;
