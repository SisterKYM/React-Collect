import React, {useCallback, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useFetcher} from 'rest-hooks';
import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';

import S3ImageUploader from 'helpers/S3ImageUploader';
import {CommonButton, FormikInput, Modal, ModalCloseButton} from 'elements';
import GroupPageResource from 'resources/GroupPageResource';

import {BannerImageField} from './components';

const urlValidationRegex = /^(http(s?)\:\/\/)?[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/;
// referred https://docs.microsoft.com/en-us/previous-versions/msp-n-p/ff650303(v=pandp.10)?redirectedfrom=MSDN
const urlValidationErrorMsg = 'Please check the link and try again.';

const validationSchema = Yup.object().shape({
  organizationName: Yup.string().required('Required'),
  // logo: initialValues.logo || {},
  // tagline: initialValues.tagline,
  website: Yup.string()
    .matches(urlValidationRegex, urlValidationErrorMsg)
    .optional(),
  facebook: Yup.string()
    .matches(urlValidationRegex, urlValidationErrorMsg)
    .optional(),
  twitter: Yup.string()
    .matches(urlValidationRegex, urlValidationErrorMsg)
    .optional(),
  instagram: Yup.string()
    .matches(urlValidationRegex, urlValidationErrorMsg)
    .optional(),
  linkedin: Yup.string()
    .matches(urlValidationRegex, urlValidationErrorMsg)
    .optional(),
});

const EditBannerPage = () => {
  const session = useSelector((state) => state.session);
  const initialValues = useMemo(
    () => session?.user?.profile?.uiClientFlags?.groupPage,
    [session]
  );

  const history = useHistory();
  const goToGroupPage = useCallback(
    (refresh) => {
      history.push({
        pathname: '/collections/group',
        state: {refresh},
      });
    },
    [history]
  );
  const handleCloseModal = useCallback(() => {
    goToGroupPage(false);
  }, [goToGroupPage]);

  const saveBanner = useCallback(() => {}, []);

  const updateGroupPageSettings = useFetcher(
    GroupPageResource.updateSettingsShape()
  );
  const updateGroupPageLogo = useFetcher(
    GroupPageResource.updateGroupPageLogo()
  );

  const handleSubmit = useCallback(
    async (values) => {
      try {
        await updateGroupPageSettings(null, {
          ...values,
          logo: undefined,
        });

        if (values.logo.image && values.logo.thumbnail) {
          const logo = await S3ImageUploader.uploadBannerImage(values.logo);

          if (logo) {
            await updateGroupPageLogo(null, logo);
          }
        } else {
          await updateGroupPageLogo(null, {
            id: null,
          });
        }
      } catch (e) {
        console.log('e', e);
      }

      goToGroupPage(true);
    },
    [goToGroupPage, updateGroupPageLogo, updateGroupPageSettings]
  );

  return (
    <Modal onDismiss={handleCloseModal}>
      <Formik
        initialValues={{
          logo: session?.user?.group_page_logo || {},
          organizationName:
            initialValues?.organizationName || session?.organization || '',
          tagline: initialValues?.tagline || '',
          website: initialValues?.website || '',
          facebook: initialValues?.facebook || '',
          twitter: initialValues?.twitter || '',
          instagram: initialValues?.instagram || '',
          linkedin: initialValues?.linkedin || '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({isSubmitting}) => (
          <Form className="h-100 vertical-flex dark-grey">
            <header className="bb b-standard">
              <div className="text-capitalize avenir-roman text-24">
                Edit banner
              </div>
              <ModalCloseButton className="ma4" onClick={handleCloseModal} />
            </header>
            <div className="flex-fill">
              <div className="relative h-100">
                <div className="absolute absolute--fill overflow-y--auto">
                  <div className="section">
                    <div className="section-title avenir-roman gray-700">
                      Image
                    </div>
                    <div className="section-description avenir-light dark-grey">
                      A simple graphic or logo that represents your
                      organization.
                    </div>
                    <div className="section-field mt3">
                      <Field name="logo" component={BannerImageField} />
                    </div>
                  </div>
                  <div className="section">
                    <div className="section-title avenir-roman gray-700">
                      Name and tagline
                    </div>
                    <div className="section-description avenir-light dark-grey">
                      This will be the main header on your page.
                    </div>
                    <div className="section-field mt3">
                      <div className="input-group">
                        <label
                          htmlFor="organizationName"
                          className="text-12 mb2"
                        >
                          Organization Name
                          <span className="brand">*</span>
                        </label>
                        <Field
                          id="organizationName"
                          className="br2 mb3-5"
                          name="organizationName"
                          small
                          component={FormikInput}
                          border
                          placeholder="Required"
                        />
                      </div>
                      <div className="input-group">
                        <label htmlFor="tagline" className="text-12 mb2">
                          Tagline
                        </label>
                        <Field
                          id="tagline"
                          className="br2 mb3-5"
                          name="tagline"
                          small
                          component={FormikInput}
                          border
                          placeholder="Your group’s tagline or mission"
                          maxLength={95}
                        />
                      </div>
                      <div className="input-group">
                        <label htmlFor="website" className="text-12 mb2">
                          Website Link
                        </label>
                        <Field
                          id="website"
                          className="br2"
                          name="website"
                          small
                          component={FormikInput}
                          border
                          placeholder="e.g. https://yourgroup.com"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="section">
                    <div className="section-title avenir-roman gray-700">
                      Social Links
                    </div>
                    <div className="section-description avenir-light dark-grey">
                      Show links to your main website and/or social pages
                    </div>
                    <div className="section-field mt3">
                      <div className="input-group inline-block mr4 mb3">
                        <label htmlFor="facebook" className="text-12 mb2">
                          Facebook
                        </label>
                        <Field
                          id="facebook"
                          className="br2"
                          name="facebook"
                          small
                          component={FormikInput}
                          border
                          placeholder="e.g. https://www.facebook.com/example"
                        />
                      </div>
                      <div className="input-group inline-block mr4 mb3">
                        <label htmlFor="twitter" className="text-12 mb2">
                          Twitter
                        </label>
                        <Field
                          id="twitter"
                          className="br2"
                          name="twitter"
                          small
                          component={FormikInput}
                          border
                          placeholder="e.g. https://www.twitter.com/example"
                        />
                      </div>
                      <div className="input-group inline-block mr4 mb3">
                        <label htmlFor="instagram" className="text-12 mb2">
                          Instagram
                        </label>
                        <Field
                          id="instagram"
                          className="br2"
                          name="instagram"
                          small
                          component={FormikInput}
                          border
                          placeholder="e.g. https://www.instagram.com/example"
                        />
                      </div>
                      <div className="input-group inline-block mr4 mb3">
                        <label htmlFor="linkedin" className="text-12 mb2">
                          Linked In
                        </label>
                        <Field
                          id="linkedin"
                          className="br2"
                          name="linkedin"
                          small
                          component={FormikInput}
                          border
                          placeholder="e.g. https://www.linkedin.com/example"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className="bt b-standard">
              <CommonButton
                className="avenir-light bg-brand ml-auto pt-18 white"
                onClick={saveBanner}
                type="submit"
                disabled={isSubmitting}
              >
                Save
              </CommonButton>
            </footer>
          </Form>
        )}
      </Formik>
      <style jsx>{`
        header {
          padding: 2rem;
        }
        .section {
          padding: 2.25rem;
        }
        .section-title {
          font-size: 18px;
          line-height: 32px;
          margin-top: -7px;
        }
        .section-description {
          font-size: 14px;
          line-height: 21px;
        }
        .input-group {
          max-width: 432px;
        }
        .inline-block {
          display: inline-block;
        }
        .input-group.inline-block {
          width: 412px;
        }
        @media screen and (max-width: 30rem) {
          .input-group.inline-block {
            width: 100%;
          }
        }
        footer {
          padding: 1rem;
        }
      `}</style>
    </Modal>
  );
};

const EnhancedEditBannerPage = React.memo(EditBannerPage);

export default EnhancedEditBannerPage;
