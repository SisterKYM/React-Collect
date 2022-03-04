import {CopyToClipboard} from 'react-copy-to-clipboard';
import {useDispatch} from 'react-redux'
import posed, {PoseGroup} from 'react-pose';
import React from 'react';
import ReactDOM from 'react-dom/server';

import {CommonButton, InputPrompt, Textarea} from 'elements';
import {successAlert} from 'redux/modules/growl/actions';
import CheddarUpPay from 'theme/images/CheddarUpPay.svg';
import config from 'config';

const PoseContainer = posed.div();

const SiteButton = ({collectionSlug}) => {
  const [modal, setModal] = React.useState(false);

  const dispatch = useDispatch();

  const websiteButton = React.useMemo(
    () => (
      <a
        href={`${process.env.REACT_APP_SITE_URL}/c/${collectionSlug}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <img
          alt={`Pay with ${config.strings.name}`}
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '218px',
          }}
          width="auto"
          height="auto"
          src={CheddarUpPay}
        />
      </a>
    ),
    [collectionSlug]
  );

  const code = React.useMemo(() => ReactDOM.renderToString(websiteButton), [
    websiteButton,
  ]);

  const handleClickGetCode = React.useCallback(() => {
    setModal(true);
  }, []);

  const handleDismissOverlay = React.useCallback(() => {
    setModal(false);
  }, []);

  const handleDidCopy = React.useCallback(() => {
    dispatch(
      successAlert({
        title: 'Success!',
        body: 'Code copied',
      })
    );
  }, [dispatch])

  return (
    <>
      {websiteButton}
      <CommonButton
        className="mt3 pt-14 bg-tint white"
        onClick={handleClickGetCode}
      >
        Get Code
      </CommonButton>
      <PoseGroup>
        <PoseContainer key={`site-button-modal-${modal}`}>
          {modal && (
            <InputPrompt
              size="SMALL"
              flexibleHeight
              title="Copy and paste this code"
              description="Because each webpage is different, you may need to work with your site’s administrator or developer to embed the HTML button code onto your blog or website."
              onDismiss={handleDismissOverlay}
              showOkButton={false}
              showCancelButton={false}
            >
              <Textarea
                border
                readOnly
                className="mb3 avenir-light gray-600 text-14"
                value={code}
                rows={5}
              />
              <CopyToClipboard text={code} onCopy={handleDidCopy}>
                <CommonButton className="pt-14 bg-tint white">
                  Copy
                </CommonButton>
              </CopyToClipboard>
            </InputPrompt>
          )}
        </PoseContainer>
      </PoseGroup>
    </>
  );
};

export default SiteButton;
