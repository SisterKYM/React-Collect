import {compose, mapProps, withHandlers} from 'recompose';
import {connect} from 'react-redux';
import {get} from 'lodash';
import React from 'react';

import config from 'config';
import {VerificationPrompt, Status} from 'elements';
import {Link} from 'react-router-dom';
import {FaCheck} from 'react-icons/fa';
import {collectionsPathHelper} from 'helpers';
import {currency} from 'helpers/numbers';
import {handleDismiss} from 'views/i/helpers';

const PlansBasicErrorPage = ({collectionItems, handleDismiss, history}) => (
  <VerificationPrompt
    flexibleHeight
    onDismiss={handleDismiss}
    title="Withdraw funds to downgrade"
    description={`The following ${config.strings.collection}s have funds remaining. Once the funds are withdrawn, you will be able to downgrade:</span>`}
    okButtonLabel="Withdraw Funds"
    onOkButtonClick={() => history.push('/withdraw')}
    cancelButtonLabel="Cancel"
    onCancelButtonClick={() => handleDismiss()}
  >
    {Array.isArray(collectionItems) && collectionItems.length > 0 ? (
      <ul className="mb3">
        {collectionItems.map((collectionItem) => (
          <li key={collectionItem.id} className="mb1">
            <FaCheck size={14} className="mr2" color="#287991" />
            <Link
              className="text-16 avenir-light gray-600"
              to={collectionItem.url}
            >
              {collectionItem.name}
            </Link>
          </li>
        ))}
      </ul>
    ) : (
      <div className="flex justify-center items-center">
        <Status status="pending" />
      </div>
    )}
  </VerificationPrompt>
);

const enhance = compose(
  connect(({browser, stripe: {checkResults}}) => ({
    checkResults,
    browser,
  })),
  mapProps((props) => {
    const proCollections = get(
      get(props.checkResults, 'results', []).filter(
        (result) => result.error === 'tabs_have_balances'
      )[0],
      'tabs',
      []
    );
    const collectionItems = proCollections.map((collection) => {
      const balance = currency(
        Number(collection.online_pending_total) +
          Number(collection.withdrawal_balance_available)
      );

      return {
        id: collection.id,
        name: `${collection.name} (${balance})`,
        url: collectionsPathHelper(collection),
      };
    });

    return {
      ...props,
      collectionItems,
    };
  }),
  withHandlers({
    handleDismiss,
  })
);

const EnhancedPlansBasicErrorPage = enhance(PlansBasicErrorPage);

export default EnhancedPlansBasicErrorPage;
