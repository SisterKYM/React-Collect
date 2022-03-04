import {Link} from 'react-router-dom';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import React from 'react';
import _ from 'lodash';

import {Button, Modal, ModalCloseButton, Status} from 'elements';
import {
  GET_SELLER_FORM,
  ADD_SELLER_FORM_TO_COLLECTION,
} from 'redux/modules/sellersForms/constants';
import {asyncConnect, collectionsPathHelper} from 'helpers';
import {
  getSellerForm,
  addSellerFormToCollection,
} from 'redux/modules/sellersForms/actions';

import {SellerFormField} from './components';

const renderSubformField = (field) => (
  <SellerFormField key={field.id} field={field} />
);

const AddSellerFormPage = ({
  history,
  location,
  form,
  seller,
  collectionFormsLength,
  collection,
  status,
  onAddSellerFormToCollection,
}) => {
  React.useEffect(() => {
    if (status === 'success') {
      history.push(collectionsPathHelper(collection, 'forms'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleDismiss = React.useCallback(() => {
    history.push(collectionsPathHelper(collection, 'forms'));
  }, [collection, history]);

  const handleAddForm = React.useCallback(() => {
    if (!collection.is_pro && collectionFormsLength >= 1) {
      history.push(`${location.pathname}/i/plans/upgrade-required`);
    } else {
      onAddSellerFormToCollection({
        collection: collection.id,
        form: form.id,
        subform: _.get(form, 'active_forms[0].id'),
      });
    }
  }, [
    collectionFormsLength,
    history,
    location,
    onAddSellerFormToCollection,
    collection,
    form,
  ]);

  return (
    <Modal
      footer={
        <div className="flex ph4 pt3 pb5 pb3-ns justify-end items-center bg-white bt b--gray-300">
          <div className="mr3">
            <Status status={status} />
          </div>
          <Link
            to={collectionsPathHelper(
              collection,
              `forms/seller/${_.get(seller, 'id')}/forms`
            )}
          >
            <Button
              colorSet
              backgroundColorSet
              className="gray-600 bg-gray-250"
            >
              Back
            </Button>
          </Link>
          <Button
            backgroundColorSet
            className="seller-form-page-add-button ml3 bg-brand"
            onClick={handleAddForm}
          >
            Add Form
          </Button>
          <style jsx>{`
            :global(.seller-form-page-add-button) {
              width: 150px;
            }
          `}</style>
        </div>
      }
      onDismiss={handleDismiss}
    >
      <ModalCloseButton onClick={handleDismiss} />
      <div className="ph4 pv4">
        <h1
          className="mv3 dark-grey"
          style={{margin: '4px 0', fontSize: '24px'}}
        >
          {_.get(form, 'name', '')}
        </h1>
      </div>
      <div className="ph4 pv3 text-16 avenir-light dark-grey bg-gray-200 bt b--gray-300">
        This is a preview only. You can edit and add to these fields after
        adding this form.
      </div>
      <div className="ph4 pt4 dark-grey">
        {_.get(form, 'active_forms[0].fields', []).map((x) =>
          renderSubformField(x)
        )}
      </div>
    </Modal>
  );
};

const enhance = compose(
  asyncConnect((props) => [
    {
      key: GET_SELLER_FORM,
      promise: getSellerForm,
      payload: {
        form: props.match.params.form,
      },
    },
  ]),
  connect(
    (state) => ({
      form: state.sellersForms.form,
      seller: state.sellersForms.seller,
      collection: state.collections.collection,
      collectionFormsLength: (state.forms.forms || []).length,
      status: state.async.statuses[ADD_SELLER_FORM_TO_COLLECTION],
    }),
    (dispatch) => ({
      onAddSellerFormToCollection: (payload) =>
        dispatch(addSellerFormToCollection(payload)),
    })
  )
);

const EnhancedAddSellerFormPage = enhance(AddSellerFormPage);

export default EnhancedAddSellerFormPage;
