import posed, {PoseGroup} from 'react-pose';
import React from 'react';

import {VerificationPrompt} from 'elements';
import collectionsPathHelper from 'helpers/collectionsPathHelper';

const PoseContainer = posed.div();

const NoItemsConfirmOverlay = ({history, visible, collection, onDismiss}) => (
  <PoseGroup>
    <PoseContainer key={`no-items-confirm-overlay-wrapper-${visible}`}>
      {visible && (
        <VerificationPrompt
          onDismiss={onDismiss}
          flexibleHeight
          title="Are you sure?"
          description="You haven't added any items for your payers to select. Items are required to receive payments. Are you sure you'd like to continue?"
          okButtonLabel="Add Item"
          onOkButtonClick={() => {
            onDismiss();
            history.push(
              `${collectionsPathHelper(collection, 'items/add-item')}`
            );
          }}
          cancelButtonLabel="Continue"
          onCancelButtonClick={() => {
            history.push(`${collectionsPathHelper(collection, 'forms')}`);
          }}
        />
      )}
    </PoseContainer>
  </PoseGroup>
);

const EnhancedNoItemsConfirmOverlay = React.memo(NoItemsConfirmOverlay);

export default EnhancedNoItemsConfirmOverlay;
