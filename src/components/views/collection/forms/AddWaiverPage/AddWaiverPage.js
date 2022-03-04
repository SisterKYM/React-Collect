import {submit as submitForm} from 'redux-form';
import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import _ from 'lodash';

import {BottomBarWithButton, Modal, ModalCloseButton} from 'elements';
import {CREATE_WAIVER, UPDATE_FORM} from 'redux/modules/forms/constants';
import {collectionsPathHelper} from 'helpers';
import {createWaiver, updateForm} from 'redux/modules/forms/actions';

import {WaiverForm} from './components';

const AddWaiverPage = ({history, waiver}) => {
  const dispatch = useDispatch();

  const browser = useSelector(state => state.browser);
  const status = useSelector(state =>
    waiver
      ? state.async.statuses[UPDATE_FORM]
      : state.async.statuses[CREATE_WAIVER]
  );
  const collection = useSelector(state => state.collections.collection);
  const forms = useSelector(state => state.forms.forms);

  const pushCollectionForms = React.useCallback(() => {
    const collectionFormsPath = collectionsPathHelper(collection, 'forms');

    history.push(collectionFormsPath);
  }, [collection, history]);

  React.useEffect(() => {
    if (
      !waiver &&
      !_.get(collection, 'is_pro', false) &&
      forms.length !== 0 &&
      status !== 'success' &&
      status !== 'pending'
    ) {
      history.push(
        collectionsPathHelper(collection, 'forms/i/plans/upgrade-required')
      );
    }
  }, [collection, forms, history, status, waiver]);

  React.useEffect(() => {
    if (status === 'success') {
      pushCollectionForms();
    }
  }, [pushCollectionForms, status]);

  const handleSubmit = React.useCallback(
    values => {
      if (waiver) {
        dispatch(
          updateForm({
            form: {
              ...waiver,
              ...values,
            },
            collection: collection.id,
          })
        );
      } else {
        dispatch(
          createWaiver({
            collection: collection.id,
            required: true,
            ...values,
          })
        );
      }
    },
    [collection, dispatch, waiver]
  );

  const handleClickBottomBarButton = React.useCallback(() => {
    dispatch(submitForm('WaiverForm'));
  }, [dispatch]);

  return (
    <Modal
      onDismiss={pushCollectionForms}
      footer={
        <BottomBarWithButton
          className="bt b--gray-300"
          status={status}
          buttonTitle="Save Waiver"
          onButtonClick={handleClickBottomBarButton}
        />
      }
    >
      <ModalCloseButton onClick={pushCollectionForms} />
      <div className="ph3 ph4-ns pb3" style={{paddingTop: '45px'}}>
        <h2 className="f3 avenir-roman dark-grey mb3">Add Waiver</h2>
        <div className="avenir-light dark-grey text-16 mb3">
          When you add a waiver to your collection page, four required fields
          (first name, last name, date and e-signature) will be added below your
          waiver text.
        </div>
        <div className="mb4" style={{borderBottom: '1px solid #e2e3e4'}} />
        <WaiverForm
          initialValues={{
            name: waiver ? waiver.name : '',
            description: waiver ? waiver.description : '',
          }}
          browser={browser}
          onSubmit={handleSubmit}
        />
      </div>
    </Modal>
  );
};

const EnhancedAddWaiverPage = React.memo(AddWaiverPage);

export default EnhancedAddWaiverPage;
