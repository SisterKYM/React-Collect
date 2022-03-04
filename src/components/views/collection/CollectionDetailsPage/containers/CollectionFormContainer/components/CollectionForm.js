import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {MdClose} from 'react-icons/md';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import {AddImageIconText, Input, RichTextMarkdown} from 'elements';
import ImagesUtils from 'helpers/ImagesUtils';
import config from 'config';

const FORM_NAME = 'CollectionForm';
const imgHeight = 231;

const CollectionForm = ({
  localUploadedLogoSrc,
  logoUploadPath,
  isOrg,
  collection,
  browser,
  onSubmit,
  handleSubmit,
  handleDeleteLogo,
}) => {
  const logoSrc =
    localUploadedLogoSrc ||
    (collection && collection.logo
      ? ImagesUtils.getCroppedImageUrl(collection.logo)
      : null);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field
        border
        type="text"
        name="name"
        component={Input}
        className="mb3"
        placeholder={`Give your ${config.strings.collection} a name (required)`}
      />
      <div className="flex flex-wrap">
        <div
          className={cx(
            'collection-form-rte mb2 mb0-l lh-copy',
            isOrg ? 'w-100 w-two-thirds-l' : 'w-100'
          )}
        >
          <Field
            editorClassName="collection-form-rte mb2-ns"
            name="description"
            component={RichTextMarkdown}
            placeholder="Add a description"
            hideControls={browser.lessThan.medium}
          />
        </div>
        {isOrg && (
          <div className="dn db-ns w-100 w-third-l pl3-ns">
            <div className="collection-form-panel ba b--gray-300 br2">
              <Link to={logoUploadPath}>
                <div className="collection-form-image-wrapper relative flex w-100 flex-column justify-center items-center">
                  {logoSrc ? (
                    <>
                      <img alt="Org logo" className="mw-100" src={logoSrc} />
                      <MdClose
                        className="absolute top-1 right-1 gray pointer"
                        onClick={handleDeleteLogo}
                      />
                    </>
                  ) : (
                    <AddImageIconText text="Add Logo" />
                  )}
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        :global(.collection-form-rte) {
          min-height: 132px;
        }
        .collection-form-panel {
          height: ${imgHeight}px;
        }
        .collection-form-image-wrapper {
          height: ${imgHeight}px;
        }
        img {
          max-height: ${imgHeight}px;
        }
        @media (max-width: 60em) {
          :global(.collection-form-rte) {
            min-height: 100px;
          }
        }
      `}</style>
    </form>
  );
};

const enhance = reduxForm({
  form: FORM_NAME,
  enableReinitialize: true,
  validate: (values = {}) => {
    const err = {};

    if (!values.name) {
      err.name = '* required';
    }

    return err;
  },
});

const EnhancedCollectionForm = Object.assign(enhance(CollectionForm), {
  propTypes: {
    onSubmit: PropTypes.func,
    collection: PropTypes.object,
  },
});

export default EnhancedCollectionForm;
