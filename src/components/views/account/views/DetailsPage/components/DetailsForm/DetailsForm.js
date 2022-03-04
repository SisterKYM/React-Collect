import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFetcher} from 'rest-hooks';
import {useFormikContext, Field, Form, Formik} from 'formik';
import cx from 'classnames';
import provinces from 'provinces';
import * as Yup from 'yup';

import {FormikInput, CommonButton} from 'elements';
import accountTypes from 'helpers/accountTypes';
import UserDobHelpers from 'helpers/UserDobHelpers';
import {setFormStatus} from 'redux/modules/account/actions';
import UserResource from 'resources/UserResource';

import {SelectWithHtmlDropdown, TransferAccount} from './components';

const dropDownStyle = {
  padding: '0.5rem 2.5rem 0.5rem 0.75rem',
  borderWidth: '1px',
  borderStyle: 'solid',
  width: '100%',
  height: '40px',
  overflow: 'hidden',
};

const entityTypeOptions = [
  {
    title: "I'm collecting payments as an individual",
    value: accountTypes.INDIVIDUAL,
  },
  {
    title: "I'm collecting payments on behalf of an organization",
    comment: (
      <div className="text-12">
        You will be prompted to provide an associated tax ID later
        <a
          className="ml1"
          target="_blank"
          rel="noopener noreferrer"
          href="https://support.cheddarup.com/hc/en-us/articles/360035226132-information-needed-from-collections#accounttype"
        >
          Learn more
        </a>
      </div>
    ),
    value: accountTypes.ORGANIZATION,
  },
];

const SetFormStatus = () => {
  const dispatch = useDispatch();
  const updateFormStatus = useCallback(
    (status) => {
      dispatch(setFormStatus(status));
    },
    [dispatch]
  );

  const {errors} = useFormikContext();
  useEffect(() => {
    updateFormStatus({errors});
  }, [errors, updateFormStatus]);

  return null;
};

const DetailsForm = () => {
  const user = useSelector((state) => state.session?.user);
  const [entityType, setEntityType] = useState(user?.entity_type);
  const country = useMemo(() => (user?.currency === 'usd' ? 'US' : 'CA'), [
    user,
  ]);
  const editable = useMemo(() => user?.editable, [user]);

  const stateOptions = useMemo(
    () => [
      ...provinces
        .filter((p) => p.country === country)
        .map((s) => ({
          title: s.short,
          value: s.short,
        })),
    ],
    [country]
  );

  const [userState, setUserState] = useState(
    user?.personal_address?.state || ''
  );
  const [orgState, setOrgState] = useState(user?.business_address?.state || '');

  const initialValues = useMemo(() => {
    let values = {
      firstName: user.first_name,
      lastName: user.last_name,
      userStreet: user?.personal_address?.line1 || '',
      userCity: user?.personal_address?.city || '',
      userZip: user?.personal_address?.postal_code || '',
      last4SSN: user?.ssn_last_4 || '',
      dateOfBirth: UserDobHelpers.toString(user?.date_of_birth || ''),
    };
    if (entityType === accountTypes.ORGANIZATION) {
      values = {
        ...values,
        orgName: user?.display_name,
        orgCity: user?.business_address.city || '',
        orgStreet: user?.business_address.line1 || '',
        orgZip: user?.business_address.postal_code || '',
        einTaxID: user?.tax_id_provided || '',
      };
    }

    return values;
  }, [entityType, user]);

  const validationSchema = useMemo(() => {
    let schema = {
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      userStreet: Yup.string().required('Required'),
      userCity: Yup.string().required('Required'),
      userZip: Yup.string().required('Required'),
      last4SSN: Yup.string().required('Required'),
      dateOfBirth: Yup.string().required('Required'),
    };
    if (entityType === accountTypes.ORGANIZATION) {
      schema = {
        ...schema,
        orgName: Yup.string().required('Required'),
        orgCity: Yup.string().required('Required'),
        orgStreet: Yup.string().required('Required'),
        orgZip: Yup.string().required('Required'),
        einTaxID: Yup.string().required('Required'),
      };
    }

    return Yup.object().shape(schema);
  }, [entityType]);

  const updateUser = useFetcher(UserResource.updateShape());
  const handleSubmit = async (values) => {
    const payload = {
      email: values.email,
      display_name: values.display_name,
      first_name: values.firstName,
      last_name: values.lastName,
      personal_address: {
        city: values.userCity,
        country,
        line1: values.userStreet,
        line2: null,
        state: values.userState,
        postal_code: values.userZip,
      },
      entity_type: entityType,
    };

    if (
      values.orgCity ||
      values.orgState ||
      values.orgStreet ||
      values.orgZip
    ) {
      payload.business_address = {
        city: values.orgCity,
        country,
        line1: values.orgStreet,
        line2: null,
        state: values.orgState,
        postal_code: values.orgZip,
      };
    }
    if (values.einTaxID) {
      payload.business_tax_id = values.einTaxID;
    }
    if (values.dateOfBirth) {
      payload.dob = UserDobHelpers.parse(values.dateOfBirth);
    }
    if (values.last4SSN) {
      payload.ssn_last_4 = values.last4SSN;
    }
    await updateUser({}, payload);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({isSubmitting}) => (
        <Form>
          <SetFormStatus />
          <div className="input-group">
            <label className="db mb1 text-14">Account Type</label>
            <SelectWithHtmlDropdown
              className={`text-16 ba ${
                editable ? 'bg-white' : 'bg-gray-250'
              } br2 b--gray-300 mb3`}
              disabled={!editable}
              name="entityType"
              onInput={setEntityType}
              options={entityTypeOptions}
              style={dropDownStyle}
              value={entityType}
            />
          </div>

          <div className="horizontal-flex relative">
            <div className="input-group flex-fill mr3">
              <label htmlFor="firstName" className="db mb1 text-14">
                First Name
              </label>
              <Field
                component={FormikInput}
                id="firstName"
                className={`br2 mb3 text-16 ${editable ? '' : 'bg-gray-250'}`}
                name="firstName"
                border
                disabled={!editable}
              />
            </div>

            <div
              className={cx(
                'input-group',
                editable ? 'flex-fill' : 'flex-fill-2'
              )}
            >
              <label htmlFor="lastName" className="db mb1 text-14">
                Last Name
              </label>
              <Field
                component={FormikInput}
                id="lastName"
                className="br2 mb3 text-16"
                name="lastName"
                border
                disabled={!editable}
              />
              {!editable && <TransferAccount />}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="userStreet" className="db mb1 text-14">
              Street Address
            </label>
            <Field
              component={FormikInput}
              id="userStreet"
              className="br2 mb3 text-16"
              name="userStreet"
              border
              disabled={!editable}
            />
          </div>

          <div className="flex justify-between">
            <div className="flex-fill mr3">
              <div className="input-group">
                <label htmlFor="userCity" className="db mb1 text-14">
                  City
                </label>
                <Field
                  id="userCity"
                  className="br2 mb3 text-16"
                  name="userCity"
                  border
                  component={FormikInput}
                  disabled={!editable}
                />
              </div>
            </div>
            <div className="flex-fill mr3">
              <div className="input-group">
                <label className="db mb1 text-14">
                  {country === 'US' ? 'State' : 'Province'}
                </label>
                <SelectWithHtmlDropdown
                  className="text-16 ba bg-white br2 b--gray-300 mb3"
                  style={dropDownStyle}
                  options={stateOptions}
                  value={userState}
                  onInput={setUserState}
                  disabled={!editable}
                />
              </div>
            </div>
            <div className="flex-fill">
              <div className="input-group">
                <label htmlFor="userZip" className="db mb1 text-14">
                  Zip
                </label>
                <Field
                  id="userZip"
                  className="br2 mb3 text-16"
                  name="userZip"
                  border
                  placeholder="Zip Code"
                  component={FormikInput}
                  disabled={!editable}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex-fill mr3">
              <div className="input-group">
                <label htmlFor="dateOfBirth" className="db mb1 text-14">
                  Date of Birth
                </label>
                <Field
                  id="dateOfBirth"
                  className="br2 mb3 text-16"
                  name="dateOfBirth"
                  border
                  placeholder="MM/DD/YYYY"
                  component={FormikInput}
                  disabled={!editable}
                />
              </div>
            </div>
            <div className="flex-fill">
              <div className="input-group">
                <label htmlFor="last4SSN" className="db mb1 text-14">
                  Last 4 of SSN
                </label>
                <Field
                  id="last4SSN"
                  className="br2 mb3 text-16"
                  name="last4SSN"
                  border
                  placeholder="####"
                  component={FormikInput}
                  disabled={!editable}
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <label className="db mb1 text-14">Currency</label>
            <CommonButton className="bg-gray-250 dark-grey pt-16" disabled>
              {country === 'US'
                ? 'US Dollar'
                : country === 'CA'
                ? 'Canadian Dollar'
                : ''}
            </CommonButton>
          </div>

          <hr className="mt4 mb3-5" />

          {entityType === accountTypes.ORGANIZATION && (
            <>
              <div className="input-group">
                <label htmlFor="orgName" className="db mb1 text-14">
                  Organization Name
                </label>
                <Field
                  id="orgName"
                  className="br2 mb3 text-16"
                  name="orgName"
                  border
                  component={FormikInput}
                  disabled={!editable}
                />
              </div>

              <div className="input-group">
                <label htmlFor="orgStreet" className="db mb1 text-14">
                  Organization Address
                </label>
                <Field
                  id="orgStreet"
                  className="br2 mb3 text-16"
                  name="orgStreet"
                  border
                  component={FormikInput}
                  disabled={!editable}
                />
              </div>

              <div className="flex justify-between">
                <div className="flex-fill mr3">
                  <div className="input-group">
                    <label htmlFor="orgCity" className="db mb1 text-14">
                      City
                    </label>
                    <Field
                      id="orgCity"
                      className="br2 mb3 text-16"
                      name="orgCity"
                      border
                      component={FormikInput}
                      disabled={!editable}
                    />
                  </div>
                </div>
                <div className="flex-fill mr3">
                  <div className="input-group">
                    <label className="db mb1 text-14">
                      {country === 'US' ? 'State' : 'Province'}
                    </label>
                    <SelectWithHtmlDropdown
                      className="text-16 ba bg-white br2 b--gray-300 mb3"
                      style={dropDownStyle}
                      options={stateOptions}
                      value={orgState}
                      onInput={setOrgState}
                      disabled={!editable}
                    />
                  </div>
                </div>
                <div className="flex-fill">
                  <div className="input-group">
                    <label htmlFor="orgZip" className="db mb1 text-14">
                      Zip
                    </label>
                    <Field
                      id="orgZip"
                      className="br2 mb3 text-16"
                      name="orgZip"
                      border
                      component={FormikInput}
                      disabled={!editable}
                    />
                  </div>
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="einTaxID" className="db mb1 text-14">
                  EIN/Tax ID
                </label>
                <Field
                  id="einTaxID"
                  className="br2 mb3 text-16"
                  name="einTaxID"
                  border
                  component={FormikInput}
                  disabled={!editable}
                />
              </div>

              <hr className="mt4 mb3-5" />
            </>
          )}

          <div className="mt3 flex justify-end">
            <CommonButton
              className="bg-brand white pt-16 w-30"
              type="submit"
              disabled={isSubmitting}
            >
              Save
            </CommonButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const EnhancedDetailsForm = React.memo(DetailsForm);

export default EnhancedDetailsForm;
