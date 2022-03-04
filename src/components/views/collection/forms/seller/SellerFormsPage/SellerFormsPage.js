import {Link} from 'react-router-dom';
import {compose} from 'recompose';
import {useSelector} from 'react-redux';
import React from 'react';
import _ from 'lodash';

import {GET_SELLERS_FORMS} from 'redux/modules/sellersForms/constants';
import {Modal, ModalCloseButton} from 'elements';
import {asyncConnect, collectionsPathHelper} from 'helpers';
import {getSellersForms} from 'redux/modules/sellersForms/actions';
import config from 'config';

import {SellerFormRow} from './components';

const SellerFormsPage = ({history, match}) => {
  const sellerForms = useSelector((state) =>
    state.sellersForms.forms.filter(
      (form) => String(form.user.id) === match.params.seller
    )
  );
  const seller = useSelector((state) =>
    state.sellersForms.sellers.find(
      (seller) => String(seller.id) === match.params.seller
    )
  );
  const collection = useSelector((state) => state.collections.collection);

  const handleDismiss = React.useCallback(() => {
    history.push(collectionsPathHelper(collection, 'forms'));
  }, [collection, history]);

  const renderSellerForm = React.useCallback(
    (form) => (
      <Link
        key={form.id}
        className="db mb3"
        to={collectionsPathHelper(
          collection,
          `forms/seller/${match.params.seller}/forms/form/${form.id}`
        )}
      >
        <SellerFormRow form={form} />
      </Link>
    ),
    [collection, match]
  );

  return (
    <Modal onDismiss={handleDismiss}>
      <ModalCloseButton onClick={handleDismiss} />
      <div className="pt3 ph3 ph4-ns pb5">
        <h2 className="mt3 mt4-ns mb3 dark-grey">
          {_.get(seller, 'name', '')}
        </h2>
        <div className="mb4 text-16 dark-grey">
          Click to view and add a form to your {config.strings.collection}
        </div>
        <div>
          {_.orderBy(
            sellerForms,
            ['display_order', 'id'],
            ['asc', 'desc']
          ).map((x) => renderSellerForm(x))}
        </div>
      </div>
    </Modal>
  );
};

const enhance = compose(
  asyncConnect(() => [
    {
      key: GET_SELLERS_FORMS,
      promise: getSellersForms,
    },
  ]),
  React.memo
);

const EnhancedSellerFormsPage = enhance(SellerFormsPage);

export default EnhancedSellerFormsPage;
