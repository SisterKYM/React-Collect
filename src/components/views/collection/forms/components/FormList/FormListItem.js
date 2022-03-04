import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import {DragHandle} from 'elements';
import {ReactComponent as FormAquaSmallIcon} from 'theme/images/FormAquaSmall.svg';
import {ReactComponent as WaiverLtBlueIcon} from 'theme/images/Waiver.LtBlue.svg';
import {collectionsPathHelper} from 'helpers';
import config from 'config';

import FormListItemControls from './FormListItemControls';

const SIZE = 65;

const FormListItem = ({form, collection}) => {
  const iconClassName = 'form-list-item-icon';

  return (
    <div className="flex items-center">
      <DragHandle className="pr2" />
      <div className="flex-auto ba b--gray-300 br2 bg-white">
        <div className="form-list-item-content-container relative flex pa3 flex-wrap justify-between items-center">
          <div className="icon-wrapper absolute top-0 left-0 flex h-100 justify-center items-center br b--gray-300">
            {form.options && form.options.isWaiver ? (
              <WaiverLtBlueIcon
                style={{fontSize: 45}}
                className={iconClassName}
                fill={config.colors.lightTint}
              />
            ) : (
              <FormAquaSmallIcon
                className={iconClassName}
                fill={config.colors.lightTint}
              />
            )}
          </div>
          <div className="w-90 f5 avenir-roman truncate tint">
            <Link
              to={collectionsPathHelper(collection, `forms/${form.id}/edit`)}
            >
              {form.name}
            </Link>
          </div>
          <div className="w-10 flex justify-end">
            <FormListItemControls collection={collection} form={form} />
          </div>
        </div>
      </div>
      <style jsx>{`
        .form-list-item-content-container {
          padding-left: ${SIZE + 9}px;
          min-height: ${SIZE}px;
        }
        .icon-wrapper {
          width: ${SIZE}px;
          border-right: 0;
        }
        :global(.form-list-item-icon) {
          width: 2.1rem;
        }
      `}</style>
    </div>
  );
};

const EnhancedFormListItem = Object.assign(React.memo(FormListItem), {
  propTypes: {
    collection: PropTypes.object,
    form: PropTypes.object.isRequired,
  },
});

export default EnhancedFormListItem;
