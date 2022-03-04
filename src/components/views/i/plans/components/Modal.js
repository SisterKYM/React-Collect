import {Link} from 'react-router-dom';
import {FaCheck} from 'react-icons/fa';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import {Button, Modal, ModalCloseButton, Status} from 'elements';

const PlanModal = ({
  browser,
  collectionItems,
  buttons,
  handleDismiss,
  heading,
  message,
  panelClassName,
  status,
}) => (
  <Modal flexibleHeight size="SMALL" zIndex={100} onDismiss={handleDismiss}>
    <ModalCloseButton onClick={handleDismiss} />
    <div className={cx('w-100 h-auto gray-600')}>
      <div
        className={cx(
          'w-100 text-16 avenir-heavy bb b--gray-300 ph4 ph3-nl pv3'
        )}
      >
        {heading}
      </div>
      <div className={panelClassName || 'pa3'}>
        <div className="mb3 text-16 avenir-light">{message}</div>
        <ul className="mb3">
          {(Array.isArray(collectionItems) ? collectionItems : []).map(
            (collectionItem) => (
              <li key={collectionItem.id} className="mb1">
                <FaCheck size={14} className="mr2" color="#287991" />
                <Link
                  className="text-16 avenir-light gray-600"
                  to={collectionItem.url}
                >
                  {collectionItem.name}
                </Link>
              </li>
            )
          )}
        </ul>
        {Boolean(buttons) && buttons.length !== 0 && (
          <div className="flex flex-wrap items-center">
            {buttons.map((button, i) => (
              <Button
                small
                colorSet
                backgroundColorSet
                key={i}
                className={cx(
                  button.className,
                  browser.lessThan.small && 'w-100 mb3',
                  browser.greaterThan.extraSmall && 'mr2'
                )}
                disabled={status === 'pending'}
                onClick={button.onClick}
              >
                {button.text}
              </Button>
            ))}
            {status === 'pending' && (
              <div
                className={cx(
                  'flex justify-center',
                  browser.lessThan.small && 'w-100'
                )}
              >
                <Status status={status} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </Modal>
);

const EnhancedPlanModal = Object.assign(React.memo(PlanModal), {
  propTypes: {
    browser: PropTypes.object,
    buttons: PropTypes.arrayOf(
      PropTypes.shape({
        backgroundColor: PropTypes.string,
        color: PropTypes.string,
        onClick: PropTypes.func,
        text: PropTypes.string,
      })
    ),
    collectionItems: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    handleDismiss: PropTypes.func,
    heading: PropTypes.string,
    message: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    panelClassName: PropTypes.string,
    status: PropTypes.string,
  },
});

export default EnhancedPlanModal;
