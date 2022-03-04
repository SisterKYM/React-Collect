import React, {useCallback, useState} from 'react';
import {IoMdEyeOff, IoMdEye} from 'react-icons/io';
import {useFetcher} from 'rest-hooks';
import {Field, Form, Formik} from 'formik';
import {CommonButton, FormikInput} from 'elements';
import * as Yup from 'yup';
import UserResource from 'resources/UserResource';

const PasswordReset = ({hideResetPassword}) => {
  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Required'),
    newPassword: Yup.string().required('Required'),
    passwordConfirm: Yup.string().required('Required'),
  });

  const resetPassword = useFetcher(UserResource.resetPasswordShape());
  const handleSubmit = useCallback(
    async (values) => {
      try {
        console.log('password reset', values);

        // await resetPassword(values)

        // payloadRef.current = {
        //   ...values,
        // };
        //
        // dispatch(resetPasswordAction(payloadRef.current));
      } catch (e) {
        console.log('e', e);
      }
      console.log('handle submitting...');
    },
    [resetPassword]
  );

  const [passwordVisible, setPasswordVisible] = useState(false);
  const showPassword = useCallback(() => {
    setPasswordVisible(true);
  }, []);
  const hidePassword = useCallback(() => {
    setPasswordVisible(false);
  }, []);

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          currentPassword: '',
          newPassword: '',
          passwordConfirm: '',
        }}
        validationSchema={validationSchema}
      >
        {({isSubmitting}) => (
          <Form>
            <div className="section-field mt3">
              <div className="input-group">
                <label htmlFor="currentPassword" className="text-12 mb2">
                  Current Password
                </label>
                <Field
                  id="currentPassword"
                  className="br2 mb3-5"
                  name="currentPassword"
                  type="password"
                  small
                  component={FormikInput}
                  border
                  placeholder="Required"
                />
              </div>
              <div className="input-group">
                <label htmlFor="newPassword" className="text-12 mb2">
                  New Password
                </label>
                <div className="relative">
                  <Field
                    id="newPassword"
                    className="br2 mb3-5"
                    type={passwordVisible ? 'text' : 'password'}
                    small
                    component={FormikInput}
                    name="newPassword"
                    border
                    placeholder="Required"
                  />
                  <div className="icon-wrapper absolute pointer">
                    {passwordVisible ? (
                      <IoMdEyeOff
                        className="pointer medium-grey"
                        onClick={hidePassword}
                        size={20}
                      />
                    ) : (
                      <IoMdEye
                        className="pointer medium-grey"
                        onClick={showPassword}
                        size={20}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="passwordConfirm" className="text-12 mb2">
                  Password Confirm
                </label>
                <Field
                  id="passwordConfirm"
                  className="br2 mb3-5"
                  name="passwordConfirm"
                  type="password"
                  small
                  component={FormikInput}
                  border
                  placeholder="Required"
                />
              </div>
            </div>
            <div className="flex mt4 items-center text-14">
              <CommonButton
                className="bg-tint mr3 pt-14 white"
                disabled={isSubmitting}
                small
                type="submit"
              >
                Change Password
              </CommonButton>
              <div className="tint pointer" onClick={hideResetPassword}>
                Cancel
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <style>{`
        .icon-wrapper {
          top: 50%;
          right: 20px;
          margin-top: -10px;
        }
      `}</style>
    </>
  );
};

export default PasswordReset;
