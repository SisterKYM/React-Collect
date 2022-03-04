import * as yup from 'yup';
import {useFetcher} from 'rest-hooks';
import _ from 'lodash';
import React from 'react';

import PublicCollectionResource from 'resources/PublicCollectionResource';
import useForm from 'hooks/useForm';

import {PrePayerVisitorReport} from './components';

const initialValue = {
  name: '',
  email: '',
  accessCode: '',
};

const PrePayerVisitorReportContainer = ({
  className,
  collectionSlug,
  addPayment,
  visibleFields,
  requiredFields,
  publicCollection,
  onSaveVisitorValue,
}) => {
  const updatePublicCollection = useFetcher(
    PublicCollectionResource.partialUpdateShape()
  );

  const [submitErrorMessage, setSubmitErrorMessage] = React.useState(null);

  const validationSchema = React.useMemo(
    () =>
      yup.object().shape(
        _.fromPairs(
          visibleFields.map(field => {
            let schema = yup.string();

            if (requiredFields.includes(field)) {
              schema = schema.required('Required');
            }
            if (field === 'email') {
              schema = schema.email('Incorrect format');
            }

            return [field, schema];
          })
        )
      ),
    [visibleFields, requiredFields]
  );

  const {
    submitting,
    value,
    errorMessages: validationErrorMessages,
    handleChangeValue,
    handleSubmit,
  } = useForm({
    initialValue,
    validationSchema,
    submit: async () => {
      try {
        if (!addPayment) {
          const nextPublicCollection = await updatePublicCollection(
            {slug: collectionSlug},
            {
              name: value.name,
              email: value.email,
              access_code: value.accessCode,
            }
          );

          if (nextPublicCollection.fields_required) {
            throw new Error(
              nextPublicCollection.fields_required.includes('access_code')
                ? 'Sorry, that code is incorrect. Please try again.'
                : 'Something went wrong... Please recheck your info and try again.'
            );
          }
        }

        onSaveVisitorValue(value);
      } catch (err) {
        setSubmitErrorMessage(err.message);
      }
    },
  });

  return (
    <PrePayerVisitorReport
      className={className}
      submitting={submitting}
      visibleFields={visibleFields}
      validationErrorMessages={validationErrorMessages}
      submitErrorMessage={submitErrorMessage}
      publicCollection={publicCollection}
      value={value}
      onChangeValue={handleChangeValue}
      onSubmit={handleSubmit}
    />
  );
};

const EnhancedPrePayerVisitorReportContainer = React.memo(
  PrePayerVisitorReportContainer
);

export default EnhancedPrePayerVisitorReportContainer;
