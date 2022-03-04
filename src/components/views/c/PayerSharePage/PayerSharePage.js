import CopyToClipboard from 'react-copy-to-clipboard';
import React from 'react';

import {Modal, ModalCloseButton} from 'elements';
import SocialFacebookIcon from 'theme/images/social-facebook-icon.svg';
import SocialMailIcon from 'theme/images/social-mail-icon.svg';
import SocialTwitterIcon from 'theme/images/social-twitter-icon.svg';
import useMedia from 'hooks/useMedia';
import useToggle from 'hooks/useToggle';
import config from 'config';

const PayerSharePage = ({match, location, history, publicCollection}) => {
  const collectionSlug = match.params.collection;
  const userSlug = match.params.user;

  const [collectionUrlCopied, toggleCollectionUrlCopied] = useToggle();
  const {notSmall} = useMedia();

  const handleDismiss = () => {
    history.push(location.pathname.split('share')[0]);
  };

  const collectionUrl = userSlug
    ? `https://${userSlug}.mycheddarup.com`
    : config.helpers.shareUrl(collectionSlug);

  return (
    <Modal
      flexibleHeight={notSmall}
      className="br2-ns"
      size="SMALL"
      onDismiss={handleDismiss}
    >
      <ModalCloseButton iconClassName="gray-400" onClick={handleDismiss} />
      <header className="mh3 mh4-ns pt4">
        <h1 className="f6 avenir-roman gray-600 ttu">Share</h1>
      </header>
      <main className="ph3 ph4-ns pt3 pb4">
        <section className="cf pv2">
          <a
            className="fl dim mr3"
            href={`https://www.facebook.com/dialog/feed?app_id=413118622200717&link=${collectionUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img alt="facebook" src={SocialFacebookIcon} />
          </a>
          <a
            className="fl dim mr3"
            href={`http://twitter.com/share?text=Check+it+out:&url=${collectionUrl}&hashtags=`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img alt="facebook" src={SocialTwitterIcon} />
          </a>
          <a
            className="fl dim"
            href={`mailto:?&subject=You're invited to ${
              publicCollection || userSlug
            }!&body=${collectionUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img alt="facebook" src={SocialMailIcon} />
          </a>
        </section>
        <section className="flex-ns items-center pv3">
          <CopyToClipboard
            text={collectionUrl}
            onCopy={toggleCollectionUrlCopied.on}
          >
            <div className="flex-auto ph3 pv2 ba b--gray-300 br2">
              {collectionUrl}
            </div>
          </CopyToClipboard>
          {collectionUrlCopied && (
            <span className="ml2 f6 avenir-roman tint mt3 mt0-ns">
              Copied to clipboard!
            </span>
          )}
        </section>
      </main>
    </Modal>
  );
};

export default PayerSharePage;
