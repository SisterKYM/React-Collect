import {generatePath} from 'react-router-dom';
import React from 'react';

import {Modal, ModalCloseButton} from 'elements';

const CollectionPayerListPage = ({history, match, publicCollection}) => {
  const dismissPath = generatePath('/c/:collection', {
    collection: match.params.collection,
  });
  const payers = React.useMemo(() => publicCollection.payers || [], [
    publicCollection.payers,
  ]);

  const handleDismiss = React.useCallback(() => {
    history.push(dismissPath);
  }, [dismissPath, history]);

  return (
    <Modal className="br2" onDismiss={handleDismiss}>
      <ModalCloseButton onClick={handleDismiss} />
      <div className="ph3 ph4-ns pv4">
        <header>
          <h1 className="f-small avenir-roman gray-600 ttu">Payers</h1>
        </header>
        <main>
          <ul className="cf mv3">
            {payers.map((payer, idx) => (
              <li
                className="fl w-50 w-third-m w-25-l mb2 f-small merriweather gray-600"
                key={idx}
              >
                {payer}
              </li>
            ))}
          </ul>
        </main>
      </div>
    </Modal>
  );
};

const EnhancedCollectionPayerListPage = React.memo(CollectionPayerListPage);

export default EnhancedCollectionPayerListPage;
