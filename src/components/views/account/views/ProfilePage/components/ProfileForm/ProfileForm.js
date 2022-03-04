import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {useFetcher} from 'rest-hooks';
import cx from 'classnames';
import {Form, Formik} from 'formik';
import _ from 'lodash';
import * as Yup from 'yup';

import {FormikInput, CommonButton} from 'elements';
import UserResource from 'resources/UserResource';

import {ProfileImage, ProfileFormField} from './components';

const statementDescriptorTooltipStyle = {
  right: -15,
  textAlign: 'left',
  top: -200,
  width: 200,
};

const ProfileForm = ({disable, showResetPassword}) => {
  const session = useSelector((state) => state.session);
  const user = session?.user;

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Required'),
    display_name: Yup.string().required('Required'),
    statement_descriptor: Yup.string(),
  });

  const updateUser = useFetcher(UserResource.updateShape());
  const handleSubmit = useCallback(
    async (values) => {
      try {
        await updateUser({}, values);
      } catch (e) {
        console.log('e', e);
      }
    },
    [updateUser]
  );

  const phoneVerified =
    session?.phoneJustReset &&
    (session?.user?.profile?.phone?.verified || session?.phoneJustVerified);

  return (
    <div className={cx(disable && 'o-50 pointer-events-none')}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          email: _.get(user, 'email', ''),
          display_name: _.get(user, 'display_name', ''),
          statement_descriptor: _.get(user, 'organization', ''),
        }}
        validationSchema={validationSchema}
      >
        {({isSubmitting}) => (
          <Form>
            <div className="mb3">
              <ProfileImage />
            </div>
            <ProfileFormField
              title="Display Name"
              component={FormikInput}
              name="display_name"
              placeholder="Display Name"
              onClickDescriptionSet
              description="This is the public-facing name that will appear at the bottom of your collection pages."
            />
            <ProfileFormField
              title="Statement Descriptor"
              component={FormikInput}
              name="statement_descriptor"
              placeholder="Statement Descriptor"
              onClickDescriptionSet
              description="You are limited to 17 characters and numbers and special characters are not allowed."
              tooltip="You can customize what payers see on their credit card statements. We recommend choosing something that your community will recognize to avoid disputes."
              tooltipArrowPosition="87%"
              tooltipStyle={statementDescriptorTooltipStyle}
            />
            <ProfileFormField
              title="Email"
              component={FormikInput}
              name="email"
              placeholder="E-mail"
              disabled={
                !process.env.REACT_APP_TWO_FACTOR_DISABLED && phoneVerified
              }
            />
            {!disable && (
              <div className="mt3">
                <CommonButton
                  className="pt-14 bg-gray-250 dark-grey"
                  onClick={showResetPassword}
                >
                  Reset Password
                </CommonButton>
              </div>
            )}
            {!disable && (
              <div className="flex justify-end pt3">
                <CommonButton
                  className="pt-16 bg-brand white w-30"
                  disabled={isSubmitting}
                  type="submit"
                >
                  Save
                </CommonButton>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

const EnhancedProfileForm = React.memo(ProfileForm);

export default EnhancedProfileForm;
