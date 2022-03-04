import {destroy} from 'redux-form';
import {generatePath} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Div100vh from 'react-div-100vh';
import React from 'react';

import {Modal} from 'elements';

import {
  ITEM_FORM_ADVANCED_SETTINGS_NAME,
  ITEM_FORM_DETAILS_NAME,
  ITEM_FORM_IMAGES_AND_DESCRIPTION_NAME,
} from './components';
import {ItemFormContainer} from './containers';

const ItemFormPage = ({history, location, match}) => {
  const formValues = useSelector((state) =>
    state.form[ITEM_FORM_DETAILS_NAME]
      ? state.form[ITEM_FORM_DETAILS_NAME].values
      : {}
  );
  const imagesAndDescriptionFormValues = useSelector((state) =>
    state.form[ITEM_FORM_IMAGES_AND_DESCRIPTION_NAME]
      ? state.form[ITEM_FORM_IMAGES_AND_DESCRIPTION_NAME].values
      : {}
  );

  const dispatch = useDispatch();

  React.useEffect(
    () => () => {
      dispatch(
        destroy(
          ITEM_FORM_DETAILS_NAME,
          ITEM_FORM_ADVANCED_SETTINGS_NAME,
          ITEM_FORM_IMAGES_AND_DESCRIPTION_NAME
        )
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleDismiss = () => {
    if (match.params.isFrom === 'manage') {
      history.push(
        `/collection/${match.params.owner}/${match.params.collection}/manage/items`
      );
    } else {
      history.push(
        `/collection/${match.params.owner}/${match.params.collection}/items`
      );
    }
  };

  return (
    <Div100vh>
      <Modal onDismiss={handleDismiss}>
        <ItemFormContainer
          collectionId={Number(match.params.collection)}
          itemId={Number(match.params.item)}
          locationState={location.state || {}}
          onDismiss={handleDismiss}
          onUpgradePlan={() => {
            history.push(
              generatePath(
                '/collection/:owner/:collection/items/i/plans/upgrade-required',
                {
                  owner: match.params.owner,
                  collection: match.params.collection,
                }
              )
            );
          }}
          onDeclineAddImage={() => {
            history.push({
              pathname: `${location.pathname}/i/item-multiple-images-upgrade`,
              state: {
                formValues,
                imagesAndDescriptionFormValues,
              },
            });
          }}
        />
      </Modal>
    </Div100vh>
  );
};

const EnhancedItemFormPage = React.memo(ItemFormPage);

export default EnhancedItemFormPage;
