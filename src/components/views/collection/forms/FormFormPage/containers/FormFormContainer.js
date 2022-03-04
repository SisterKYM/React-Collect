import {formValueSelector} from 'redux-form';
import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import _ from 'lodash';

import {
  CREATE_FORM,
  GET_FORM,
  UPDATE_FORM,
} from 'redux/modules/forms/constants';
import {CollectionObjectFieldListContainer} from 'containers';
import {StatefulView, VerificationPrompt} from 'elements';
import {asyncConnect} from 'helpers';
import {createForm, getForm, updateForm} from 'redux/modules/forms/actions';
import useMedia from 'hooks/useMedia';
import usePrevious from 'hooks/usePrevious';

import {FormForm} from '../components';

const formSelector = formValueSelector(FormForm.formName);

const FormFormContainer = ({
  innerRef,
  className,
  formId,
  onUpgradePlan,
  onChangeSaveStatus,
  onChangeDismissable,
  onDidSave,
}) => {
  const formFormRef = React.useRef(null);

  const dispatch = useDispatch();

  const media = useMedia();

  const collection = useSelector((state) => state.collections.collection);
  const forms = useSelector((state) => state.forms.forms || []);
  const form = useSelector((state) =>
    state.forms.form && state.forms.form.id === formId ? state.forms.form : null
  );
  const savedFields = useSelector((state) =>
    (state.forms.fields || []).filter((field) => field.tab_object_id === formId)
  );
  const getFormStatus = useSelector(
    (state) => state.async.statuses[GET_FORM] || 'pending'
  );
  const saveStatus = useSelector((state) =>
    formId
      ? state.async.statuses[UPDATE_FORM]
      : state.async.statuses[CREATE_FORM]
  );
  const addFormName = useSelector((state) => formSelector(state, 'name'));

  const prevSavedFields = usePrevious(savedFields);

  const [fields, setFields] = React.useState(savedFields);
  const [
    saveWithoutQuestionsConfirmVisible,
    setSaveWithoutQuestionsConfirmVisible,
  ] = React.useState(false);
  const [
    saveWithUnsavedQuestionsConfirmVisible,
    setSaveWithUnsavedQuestionsConfirmVisible,
  ] = React.useState(false);

  React.useEffect(() => {
    if (saveStatus === 'success') {
      onDidSave();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveStatus]);

  React.useEffect(() => {
    if (!formId && !collection?.is_pro && forms.length >= 1) {
      onUpgradePlan();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    onChangeSaveStatus(saveStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveStatus]);

  React.useEffect(() => {
    if (!_.isEqual(prevSavedFields, savedFields)) {
      setFields(savedFields);
    }
  }, [prevSavedFields, savedFields]);

  React.useEffect(() => {
    if (!formId && Boolean(addFormName)) {
      const dismissable = !addFormName && fields.length === 0;

      onChangeDismissable(dismissable);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addFormName, fields.length, formId]);

  const captureFormFormRef = React.useCallback(
    (ref) => {
      formFormRef.current = ref;

      innerRef(ref);
    },
    [innerRef]
  );

  const submitFormForm = React.useCallback(() => {
    if (formFormRef.current) {
      formFormRef.current.submit();
    }
  }, []);

  const handleSaveWithoutQuestionsDismiss = React.useCallback(() => {
    setSaveWithoutQuestionsConfirmVisible(false);
  }, []);

  const handleSaveWithUnsavedQuestionsDismiss = React.useCallback(() => {
    setSaveWithUnsavedQuestionsConfirmVisible(false);
  }, []);

  const handleSave = React.useCallback(
    (values) => {
      setSaveWithUnsavedQuestionsConfirmVisible(false);
      setSaveWithoutQuestionsConfirmVisible(false);

      const saveFormActionCreator = formId ? updateForm : createForm;

      dispatch(
        saveFormActionCreator({
          form: {
            id: formId,
            ...values,
          },
          collection: collection.id,
          fields: fields.map(({edit, ...field}) => field),
        })
      );
    },
    [collection, dispatch, fields, formId]
  );

  const handleSubmit = React.useCallback(
    (values) => {
      const ignoreConfirms =
        saveWithoutQuestionsConfirmVisible ||
        saveWithUnsavedQuestionsConfirmVisible;

      if (!ignoreConfirms && fields.length === 0) {
        setSaveWithoutQuestionsConfirmVisible(true);
      } else if (
        !ignoreConfirms &&
        fields.filter((field) => field.edit).length !== 0
      ) {
        setSaveWithUnsavedQuestionsConfirmVisible(true);
      } else {
        handleSave(values);
      }
    },
    [
      fields,
      handleSave,
      saveWithUnsavedQuestionsConfirmVisible,
      saveWithoutQuestionsConfirmVisible,
    ]
  );

  return (
    <StatefulView
      className={className}
      status={formId ? getFormStatus : 'success'}
      resultCount={1}
    >
      <FormForm
        ref={captureFormFormRef}
        descriptionInputControlsHidden={!media.notSmall}
        initialValues={form}
        onSubmit={handleSubmit}
      />
      <CollectionObjectFieldListContainer
        className="mh4"
        collectionObjectType="FORM"
        fields={fields}
        onChangeFields={setFields}
      />
      {saveWithoutQuestionsConfirmVisible && (
        <VerificationPrompt
          flexibleHeight
          onDismiss={handleSaveWithoutQuestionsDismiss}
          title="You haven't added questions"
          description="Are you sure you'd like to save this form without any questions?"
          okButtonLabel="Save Form"
          onOkButtonClick={submitFormForm}
          cancelButtonLabel="Cancel"
          onCancelButtonClick={handleSaveWithoutQuestionsDismiss}
        />
      )}
      {saveWithUnsavedQuestionsConfirmVisible && (
        <VerificationPrompt
          flexibleHeight
          onDismiss={handleSaveWithUnsavedQuestionsDismiss}
          title="You haven't saved all of your questions"
          description="Are you sure you want to continue? Unsaved questions will be lost."
          okButtonLabel="Continue"
          onOkButtonClick={submitFormForm}
          cancelButtonLabel="Cancel"
          onCancelButtonClick={handleSaveWithUnsavedQuestionsDismiss}
        />
      )}
    </StatefulView>
  );
};

const enhance = asyncConnect((props) =>
  props.formId
    ? [
        {
          key: GET_FORM,
          promise: getForm,
          payload: {
            collection: props.collectionId,
            form: props.formId,
          },
        },
      ]
    : []
);

const EnhancedFormFormContainer = enhance(FormFormContainer);

export default EnhancedFormFormContainer;
