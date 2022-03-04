import * as React from 'react';

import yupErrorsToMap from 'helpers/yupErrorsToMap';

const useForm = ({initialValue, validationSchema, submit}) => {
  const [submitting, setSubmitting] = React.useState(false);
  const [errorMessages, setErrorMessages] = React.useState({});
  const [value, setValue] = React.useState(initialValue);

  const validateForm = React.useCallback(async () => {
    if (!validationSchema) {
      return;
    }

    try {
      await validationSchema.validate(value, {
        abortEarly: false,
      });

      setErrorMessages({});
    } catch (err) {
      const nextErrorMessages = yupErrorsToMap(err);

      setErrorMessages(nextErrorMessages);

      throw err;
    }
  }, [validationSchema, value]);

  React.useEffect(() => {
    if (
      Object.values(errorMessages).some(
        errorMessage => errorMessage.length !== 0
      )
    ) {
      validateForm();
    }
  }, [value, validateForm]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChangeValue = fieldName => event => {
    if (event.persist) {
      event.persist();
    }

    setValue(prevValue => ({
      ...prevValue,
      [fieldName]: event.target.value,
    }));
  };

  const handleSubmit = async event => {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }

    try {
      await validateForm();

      setSubmitting(true);

      await submit(value);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    submitting,
    errorMessages,
    setErrorMessages,
    value,
    handleChangeValue,
    handleSubmit,
  };
};

export default useForm;
