import {formValueSelector} from 'redux-form';
import {FaPaperclip} from 'react-icons/fa';
import {useResource} from 'rest-hooks';
import React from 'react';
import {connect} from 'react-redux';
import {BottomBarWithButton, Button, Status} from 'elements';
import {CollectionBuilderLayout} from 'layout';
import {PageTitle} from 'layout/components';
import CollectionResource from 'resources/CollectionResource';
import HeaderResource from 'resources/HeaderResource';
import useToggle from 'hooks/useToggle';
import config from 'config';
import {addAttachment} from 'redux/modules/collections/actions';
import {
  AttachmentListContainer,
  CollectionFormContainer,
  ImagePanelContainer,
} from './containers';

const CollectionDetailsPageOG = ({
  match,
  location,
  history,
  name,
  onAddAttachment,
}) => {
  const LazyAddAttachmentPage = React.lazy(() =>
    import('../settings/AddAttachmentPage')
  );
  const collection = useResource(
    CollectionResource.detailShape(),
    match.params.collection ? {id: Number(match.params.collection)} : null
  );
  const headers = useResource(
    HeaderResource.listShape(),
    location.state && location.state.headerId ? {} : null
  );

  const collectionFormRef = React.useRef();
  const [saveCollectionLoading, toggleSaveCollectionLoading] = useToggle();
  const [showAttachmentPage, toggleAttachmentPage] = React.useState(false);
  const [savingAttachment, toggleSavingAttachment] = React.useState(false);
  const localUploadedImage = (location.state && location.state.image) || null;
  const selectedHeader =
    location.state && location.state.headerId
      ? headers.find(({id}) => id === Number(location.state.headerId))
      : null;

  return (
    <CollectionBuilderLayout
      collection={collection}
      footer={
        <BottomBarWithButton
          className="shadow-4"
          buttonTitle="Save"
          loading={saveCollectionLoading}
          onButtonClick={() => {
            collectionFormRef.current.submit();
          }}
        />
      }
    >
      <div className="mw7 pt3 pt0-ns ph3 ph0-ns pb5 center">
        <PageTitle className="ttc dark-grey">Details</PageTitle>
        <ImagePanelContainer
          className="shadow-light"
          ownerId={Number(match.params.owner)}
          collection={collection}
          header={selectedHeader}
          localUploadedImage={localUploadedImage}
        />
        <div className="bg-white ba br2 b--gray-300 ph3 collection-form-container shadow-light">
          <CollectionFormContainer
            ref={collectionFormRef}
            ownerId={Number(match.params.owner)}
            collection={collection}
            localUploadedImage={localUploadedImage}
            header={selectedHeader}
            onStartSave={toggleSaveCollectionLoading.on}
            onEndSave={toggleSaveCollectionLoading.off}
            onDidSave={(savedCollection) => {
              if (!showAttachmentPage) {
                history.push(
                  `/collection/${match.params.owner}/${savedCollection.id}/items`
                );
              } else {
                onAddAttachment({
                  file: match.file,
                  collection: savedCollection.id,
                });
                history.push(
                  `/collection/${match.params.owner}/${savedCollection.id}/details`
                );
                toggleSavingAttachment(false);
              }
            }}
          />
          {config.enabledFeatures.collectionAttachments && (
            <Button
              className="bg-white ba b--gray-300 ph2 mt3 flex justify-center items-center at-btn"
              style={{paddingTop: '5px', paddingBottom: '5px'}}
              disabled={name === undefined}
              small
              backgroundColorSet
              colorSet
              heightSet
              borderRadius
              onClick={() => toggleAttachmentPage(true)}
            >
              <div className="paperclip-wrapper pl1 flex">
                <FaPaperclip fill="#CECFD2" size={18} />
              </div>
              <span className="ph2 dark-grey f7 avenir-light add-attachment-span lh-normal">
                Add Attachment
              </span>
            </Button>
          )}
          {collection && (
            <AttachmentListContainer
              version="chip"
              collectionId={collection.id}
            />
          )}
          {showAttachmentPage && (
            <LazyAddAttachmentPage
              from="details"
              match={match}
              submitFirst={(file) => {
                match.file = file;
                collectionFormRef.current.submit();
                toggleAttachmentPage(false);
                toggleSavingAttachment(true);
              }}
              onDismiss={() => toggleAttachmentPage(false)}
              history={history}
            />
          )}
          <Status
            className="justify-center"
            status={savingAttachment ? 'pending' : undefined}
            messages={{pending: 'Uploading...'}}
          />
        </div>
      </div>
      <style jsx>{`
        :global(.save-collection-button) {
          min-width: 10.375rem;
        }
        :global(.at-btn:disabled) {
          opacity: 0.5;
        }
        .collection-form-container {
          padding-top: 25px;
          padding-bottom: 25px;
        }
      `}</style>
    </CollectionBuilderLayout>
  );
};

const selector = formValueSelector('CollectionForm');

const enchance = connect(
  (state) => ({
    name: selector(state, 'name'),
  }),
  (dispatch) => ({
    onAddAttachment: (payload) => dispatch(addAttachment(payload)),
  })
);

const CollectionDetailsPage = enchance(CollectionDetailsPageOG);

export default CollectionDetailsPage;
