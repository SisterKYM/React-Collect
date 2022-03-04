import {IoMdClose} from 'react-icons/io';
import {get} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import {Status, Tooltip} from 'elements';

const SettingItem = ({
  browser,
  clickDelete,
  clickLabel,
  deleting,
  description,
  label,
}) => {
  const isMedium = get(browser, 'greaterThan.small', false);
  const isSmall = get(browser, 'greaterThan.extraSmall', false);

  return (
    <div className="setting-item-container relative w-75">
      <div className="flex justify-between flex-wrap ph3 pv2 items-center ba b--gray-300">
        <div className={isSmall ? 'w-25' : 'w-100'}>
          <span className="tint pointer" onClick={clickLabel}>
            {label}
          </span>
        </div>
        <div className={cx(isSmall ? 'w-50' : 'w-75', !isMedium && 'f6')}>
          {description}
        </div>
        <div className={cx('flex items-center')}>
          {deleting ? (
            <Status messages={{pending: 'Deleting'}} status="pending" />
          ) : (
            <>
              <Tooltip
                style={{
                  bottom: 30,
                  left: -30,
                }}
                text="Delete"
              >
                <IoMdClose
                  className="pointer dark-grey"
                  onClick={clickDelete}
                />
              </Tooltip>
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        .setting-item-container {
          padding-right: 60px;
        }
        .setting-item-container > div {
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

const EnhancedSettingItem = Object.assign(React.memo(SettingItem), {
  propTypes: {
    browser: PropTypes.shape({
      greaterThan: PropTypes.object,
    }),
    clickDelete: PropTypes.func,
    clickEdit: PropTypes.func,
    clickLabel: PropTypes.func,
    deleting: PropTypes.bool,
    description: PropTypes.string,
    isEditing: PropTypes.bool,
    label: PropTypes.string,
  },
});

export default EnhancedSettingItem;
