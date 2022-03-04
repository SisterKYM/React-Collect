import {useDispatch, useSelector} from 'react-redux';
import React from 'react';

import {useInvalidator} from 'rest-hooks';
import FormResource from 'resources/FormResource';

import {BottomBarWithButton, Modal, ModalCloseButton} from 'elements';
import {DISMISS_GROWL_ERROR} from 'theme/constants';
import {collectionsPathHelper} from 'helpers';
import {errorAlert} from 'redux/modules/growl/actions';

import {FormFormContainer} from './containers';
import AddWaiverPage from '../AddWaiverPage';

const FormFormPage = ({history, match}) => {
  const dispatch = useDispatch();

  const invlidateForms = useInvalidator(FormResource.listShape());
  const collection = useSelector((state) => state.collections.collection);
  const form = useSelector((state) => state.forms.form);

  const dismissable = React.useRef(true);
  const formFormRef = React.useRef(null);

  const [saveStatus, setSaveStatus] = React.useState(undefined);

  const captureFormFormRef = React.useCallback((ref) => {
    formFormRef.current = ref;
  }, []);

  const handleDismiss = React.useCallback(() => {
    if (dismissable.current) {
      if (match.params.from === 'manage') {
        const formsPath = collectionsPathHelper(collection, 'manage/forms');
        history.push(formsPath);
      } else {
        const formsPath = collectionsPathHelper(collection, 'forms');
        history.push(formsPath);
      }
    } else {
      dispatch(
        errorAlert({
          body: DISMISS_GROWL_ERROR.BODY,
          title: DISMISS_GROWL_ERROR.TITLE,
        })
      );

      dismissable.current = true;
    }
  }, [collection, dispatch, history, match.params.from]);

  const handleClickSaveForm = React.useCallback(() => {
    formFormRef.current.submit();
  }, []);

  return form && form.options && form.options.isWaiver ? (
    <AddWaiverPage waiver={form} history={history} />
  ) : (
    <Modal
      footer={
        <BottomBarWithButton
          className="bt b--gray-300"
          buttonTitle="Save Form"
          status={saveStatus}
          onButtonClick={handleClickSaveForm}
        />
      }
      onDismiss={handleDismiss}
    >
      <ModalCloseButton onClick={handleDismiss} />
      <FormFormContainer
        className="pb5"
        innerRef={captureFormFormRef}
        collectionId={Number(match.params.collection)}
        formId={match.params.form ? Number(match.params.form) : null}
        onUpgradePlan={() => {
          const planUpgradePath = collectionsPathHelper(
            collection,
            'forms/i/plans/upgrade-required'
          );

          history.push(planUpgradePath);
        }}
        onChangeDismissable={(nextDismissable) => {
          dismissable.current = nextDismissable;
        }}
        onChangeSaveStatus={setSaveStatus}
        onDidSave={() => {
          if (match.params.from === 'manage') {
            const formsPath = collectionsPathHelper(collection, 'manage/forms');
            history.push(formsPath);
            invlidateForms({
              collectionId: match.params.collection,
            });
          } else {
            const formsPath = collectionsPathHelper(collection, 'forms');
            history.push(formsPath);
          }
        }}
      />
    </Modal>
  );
};

const EnhancedAddFormPage = React.memo(FormFormPage);

export default EnhancedAddFormPage;
