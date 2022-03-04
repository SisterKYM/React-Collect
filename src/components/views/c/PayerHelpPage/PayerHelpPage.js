import {generatePath, Link} from 'react-router-dom';
import React from 'react';
import config from 'config';

import {Modal, ModalCloseButton} from 'elements';

import {OrganizerContactFormContainer} from './containers';

const FAQ_LINKS = [
  {
    title: 'How can I confirm my payment was successful?',
    to:
      'https://support.cheddarup.com/hc/en-us/articles/360035586711-What-payers-need-to-know#commonquestions',
  },
  {
    title: 'I need a refund - how do I request one?',
    to:
      'https://support.cheddarup.com/hc/en-us/articles/360035586711-What-payers-need-to-know#commonquestions',
  },
  {
    title: 'Where can I see payments I have made?',
    to:
      'https://support.cheddarup.com/hc/en-us/articles/360035586711-What-payers-need-to-know#commonquestions',
  },
  {
    title: 'What are the fees?',
    to:
      'https://support.cheddarup.com/hc/en-us/articles/360035586711-What-payers-need-to-know#payerguidefees',
  },
];

const PayerHelpPage = ({match, location, history}) => {
  const collectionSlug = match.params.collection;
  const sectionTitleClassName = 'mb4 f4 merriweather gray-600';
  const payerPagePath = collectionSlug
    ? generatePath('/c/:collection', {
        collection: collectionSlug,
      })
    : '';

  const handleDismiss = () => {
    history.push(location.pathname.split('help')[0], {
      keepGrowls: true,
    });
  };

  return (
    <Modal
      flexibleHeight
      className="br2-ns"
      size="SMALL"
      onDismiss={handleDismiss}
    >
      <ModalCloseButton iconClassName="gray-400" onClick={handleDismiss} />
      <header className="mh3 mh4-ns pt4">
        <h1 className="f6 avenir-roman gray-600 ttu">Help</h1>
      </header>
      <main className="ph3 ph4-ns pv4">
        {config.enabledFeatures.helpPageFAQ && (
          <section className="mb4">
            <h3 className={sectionTitleClassName}>
              Frequently asked questions:
            </h3>
            <ul>
              {FAQ_LINKS.map((link, idx) => (
                <li key={link.title} className={idx === 0 ? '' : 'mt3'}>
                  <a href={link.to} target="_blank" rel="noopener noreferrer">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
        <section>
          <h3 className={sectionTitleClassName}>
            {config.enabledFeatures.helpPageFAQ
              ? 'Have a question for the organizer?'
              : 'Have a question?'}
          </h3>
          {config.enabledFeatures.helpPageCollection && (
            <p className="mb4 lh-copy f5 avenir-roman gray-600">
              Check the <Link to={payerPagePath}>collection page</Link> for more
              information or send them an email:
            </p>
          )}
          <OrganizerContactFormContainer
            collectionSlug={collectionSlug}
            onDidContactOrganizer={handleDismiss}
          />
        </section>
      </main>
    </Modal>
  );
};

const EnhancedPayerHelpPage = React.memo(PayerHelpPage);

export default EnhancedPayerHelpPage;
