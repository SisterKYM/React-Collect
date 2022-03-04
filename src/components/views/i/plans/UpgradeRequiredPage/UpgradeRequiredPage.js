import React from 'react';
import {IoMdClose} from 'react-icons/io';

import {Button, Modal} from 'elements';

const UpgradeRequiredPage = ({history, location}) => {
  const handleDismiss = () => {
    history.push(location.pathname.split('i/plans')[0], {
      keepGrowls: false,
    });
  };

  return (
    <Modal
      flexibleHeight
      size="SMALL"
      onDismiss={handleDismiss}
      className="br2"
    >
      <div className="flex flex-column justify-center">
        <div className="absolute ic-close gray-600">
          <IoMdClose size={20} onClick={handleDismiss} />
        </div>
        <h3 className="header-title pv0 avenir-heavy gray-600">
          You&apos;ve got a good thing going!
        </h3>
        <div className="popup-content gray-600">
          <p className="popup-content-description lh-copy">
            Upgrade to add unlimited items, forms and waivers.
          </p>
          <Button
            small
            backgroundColorSet
            className="mr3 bg-brand"
            style={{height: '36px', width: '120px'}}
            onClick={() => {
              history.push(`${location.pathName}/i/plans`, location.state);
            }}
          >
            Learn More
          </Button>
          <Button
            small
            colorSet
            backgroundColorSet
            className="gray-600 bg-gray-200"
            style={{height: '36px', width: '100px'}}
            onClick={handleDismiss}
          >
            No Thanks
          </Button>
        </div>
      </div>
      <style jsx>{`
        .header-title {
          width: 100%;
          border-bottom: 2px solid #eeeeee;
          padding: 1.5rem 1.5rem 1.25rem;
          font-size: 1em;
        }
        .ic-close {
          top: 1.5rem;
          right: 1.5rem;
        }
        .popup-content {
          padding: 1.5rem;
          font-size: 1rem;
        }
        .popup-content-description {
          padding-bottom: 1.5rem;
        }
      `}</style>
    </Modal>
  );
};

export default UpgradeRequiredPage;
