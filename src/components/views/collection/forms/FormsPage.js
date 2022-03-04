import {useSelector} from 'react-redux';
import React from 'react';

import {BottomBarWithButton, StatefulView} from 'elements';
import {CollectionBuilderLayout} from 'layout';
import {GET_COLLECTION} from 'redux/modules/collections/constants';
import {GET_FORMS} from 'redux/modules/forms/constants';
import {GET_SELLERS_FORMS} from 'redux/modules/sellersForms/constants';
import {PageTitle, SecondarySidebarMobile} from 'layout/components';
import {asyncConnect, collectionsPathHelper} from 'helpers';
import {getCollection} from 'redux/modules/collections/actions';
import {getForms} from 'redux/modules/forms/actions';
import {getSellersForms} from 'redux/modules/sellersForms/actions';

import {AddFormCTAPanel, FormList, FormsNav} from './components';

const renderEmptyStateView = () => (
  <div className="flex mt4">
    <AddFormCTAPanel />
  </div>
);

const FormsPage = ({history}) => {
  const formsCount = useSelector((state) => state.forms.forms.length);
  const collection = useSelector((state) => state.collections.collection);
  const status = useSelector((state) => state.async.statuses[GET_FORMS]);

  const handleSaveClick = React.useCallback(() => {
    const collectionSettingsPath = collectionsPathHelper(
      collection,
      'settings'
    );

    history.push(collectionSettingsPath);
  }, [collection, history]);

  const formsNavElement = (
    <FormsNav
      className="h-100 bg-gray-200 bg-light-tint-l"
      collection={collection}
    />
  );

  return (
    <CollectionBuilderLayout
      collection={collection}
      footer={
        <BottomBarWithButton
          className="shadow-4"
          buttonTitle="Save"
          onButtonClick={handleSaveClick}
        />
      }
    >
      <div className="relative flex h-100">
        <div className="dn db-l">{formsNavElement}</div>
        <SecondarySidebarMobile
          className="db dn-l"
          contentContainerClassName="absolute top-0 left-0 h-100 bg-gray-200"
        >
          {formsNavElement}
        </SecondarySidebarMobile>
        <StatefulView
          className="content-container pt3 ph3"
          status={status}
          resultCount={formsCount}
          title="Forms"
          renderEmptyStateView={renderEmptyStateView}
        >
          <PageTitle className="ttc dark-grey">Forms</PageTitle>
          <div className="nl4 nr4 ml0-ns mr0-ns">
            <FormList />
          </div>
        </StatefulView>
      </div>
    </CollectionBuilderLayout>
  );
};

const enhance = asyncConnect((props) => {
  const {collection: collectionId} = props.match.params;
  const state = props.store.getState();

  const promises = [
    {
      key: GET_FORMS,
      promise: getForms,
      payload: {collection: collectionId},
    },
    {
      key: GET_SELLERS_FORMS,
      promise: getSellersForms,
    },
  ];

  if (
    !state.collections.collection ||
    collectionId !== state.collections.collection.id
  ) {
    promises.push({
      key: GET_COLLECTION,
      promise: getCollection,
      payload: {collection: collectionId},
    });
  }

  return promises;
});

const EnhancedFormsPage = enhance(FormsPage);

export default EnhancedFormsPage;
