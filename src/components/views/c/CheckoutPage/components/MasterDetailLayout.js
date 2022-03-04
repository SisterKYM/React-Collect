import cx from 'classnames';
import React from 'react';

import {BigCheckbox} from 'elements';

const MasterDetailLayout = ({
  className,
  heading,
  masterStates,
  selectedMasterStateKey,
  onChangeSelectedMasterStateKey,
  renderDetail,
}) => (
  <div className={className}>
    <h3 className="f-regular avenir-roman gray-600">{heading}</h3>
    <div className="cf mt3">
      <div
        className={cx(
          'fl w-100 w-third-ns',
          masterStates.length <= 1 && 'dn db-ns'
        )}
      >
        {masterStates.map(masterState => {
          const handleChange = () => {
            onChangeSelectedMasterStateKey(masterState.key);
          };

          return (
            <BigCheckbox
              labelFontSizeSet
              key={masterState.key}
              className="pv2"
              labelClassName="f5"
              size="1.375rem"
              type="radio"
              label={masterState.title}
              checked={selectedMasterStateKey === masterState.key}
              onChange={handleChange}
            />
          );
        })}
      </div>
      <div className="fl w-100 w-two-thirds-ns pv2 pv0-ns">
        {renderDetail(selectedMasterStateKey)}
      </div>
    </div>
  </div>
);

const EnhancedMasterDetailLayout = React.memo(MasterDetailLayout);

export default EnhancedMasterDetailLayout;
