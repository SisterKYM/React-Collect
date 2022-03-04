import CopyToClipboard from 'react-copy-to-clipboard';
import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FaCheck} from 'react-icons/fa';
import {useFetcher} from 'rest-hooks';

import {CommonButton, Input, Modal, ModalCloseButton} from 'elements';
import {errorAlert, successAlert} from 'redux/modules/growl/actions';
import GroupPageResource from 'resources/GroupPageResource';
import SocialFacebookIcon from 'theme/images/social-facebook-icon.svg';
import SocialMailIcon from 'theme/images/social-mail-icon.svg';
import SocialTwitterIcon from 'theme/images/social-twitter-icon.svg';

const ShareLinkModal = ({onDismiss}) => {
  const handleCloseModal = useCallback(() => {
    onDismiss();
  }, [onDismiss]);

  const [editMode, setEditMode] = useState(false);

  const session = useSelector((state) => state.session);
  const [slug, setSlug] = useState(session.user.slug);

  const fullUrl = `https://${slug}.mycheddarup.com`;

  const onToggleMode = useCallback(() => {
    setEditMode(true);
  }, []);

  const onInputChange = useCallback((e) => {
    setSlug(e.target.value);
  }, []);

  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  const updateSlug = useFetcher(GroupPageResource.updateSlugShape());
  const dispatch = useDispatch();
  const updateShareLink = useCallback(async () => {
    const SLUG_REGEX = /^[\da-z]+(?:-[\da-z]+)*$/i;

    if (!slug) {
      setError('Required');
    } else if (slug.length > 63) {
      setError('Must be 63 characters or less');
    } else if (!SLUG_REGEX.test(slug)) {
      setError('Invalid format');
    } else {
      try {
        setUpdating(true);
        const {
          user: {slug: updatedSlug},
        } = await updateSlug(null, {slug});
        setSlug(updatedSlug);
        setEditMode(false);
      } catch (e) {
        dispatch(
          errorAlert({
            title: 'Sorry',
            body: 'The slug was already taken. Please try another one.',
          })
        );
      }
    }
    setUpdating(false);
  }, [dispatch, slug, updateSlug]);

  const onCopy = useCallback(() => {
    dispatch(
      successAlert({
        icon: FaCheck,
        title: 'Success',
        body: 'Link copied',
      })
    );
  }, [dispatch]);

  return (
    <Modal
      flexibleHeight
      onDismiss={handleCloseModal}
      className="vertical-flex pa3-5"
      size="SMALL"
    >
      <div className="avenir-roman text-18 dark-grey mb3-25">
        Share Your Link
      </div>
      <div className="avenir-light text-16 dark-grey mb3-5">
        Copy and share your Group Page URL
      </div>
      <ModalCloseButton className="ma3" onClick={handleCloseModal} />
      <div className="flex-ns">
        <div className="flex-fill mb3">
          {editMode ? (
            <div className="flex justify-center text-16">
              <div className="flex justify-center items-center dark-grey flex-auto tc bg-light-aqua br2 mr1">
                https://
              </div>
              <div className="flex-auto tc mr1">
                <Input
                  border
                  className="tc br0 text-14"
                  style={{height: '36px'}}
                  value={slug}
                  onChange={onInputChange}
                />
              </div>
              <div className="flex justify-center items-center dark-grey flex-auto tc bg-light-aqua br2 mr2">
                .mycheddarup.com
              </div>
            </div>
          ) : (
            <Input
              id="name"
              className="br2 category-name mr3"
              name="name"
              small
              border
              placeholder="Required"
              maxLength={44}
              value={fullUrl}
              readOnly
              onClick={onToggleMode}
            />
          )}
        </div>
        {editMode ? (
          <CommonButton
            className="pt-14 bg-tint white mb3"
            onClick={updateShareLink}
            disabled={updating}
          >
            Save
          </CommonButton>
        ) : (
          <CopyToClipboard text={fullUrl} onCopy={onCopy}>
            <CommonButton className="pt-14 bg-tint white mb3">
              Copy
            </CommonButton>
          </CopyToClipboard>
        )}
      </div>
      {error && <div className="flex justify-center">{error}</div>}
      {!editMode && (
        <div>
          <a
            className="fl dim mr3 round-social-icon"
            href={`https://www.facebook.com/dialog/feed?app_id=413118622200717&link=${fullUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img alt="facebook" src={SocialFacebookIcon} />
          </a>
          <a
            className="fl dim mr3 round-social-icon"
            href={`http://twitter.com/share?text=Check+it+out:&url=${fullUrl}&hashtags=`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img alt="facebook" src={SocialTwitterIcon} />
          </a>
          <a
            className="fl dim round-social-icon"
            href={`mailto:?&subject=You're invited to Cheddar Up!&body=This Group Page allows you to find all collections in one spot: ${fullUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img alt="facebook" src={SocialMailIcon} />
          </a>
        </div>
      )}
    </Modal>
  );
};

const EnhancedShareLinkModal = React.memo(ShareLinkModal);

export default EnhancedShareLinkModal;
