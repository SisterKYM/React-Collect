import React from 'react';

import config from 'config';
import {Tooltip} from 'elements';

const AdditionalInfoWarning = ({
  disclaimer,
  justification,
  editDisabled,
  onTransferAccount,
}) => (
  <div className="f6">
    {editDisabled ? (
      <>
        Your account has been verified. For changes please&nbsp;
        <span className="f6 tint pointer" onClick={onTransferAccount}>
          contact {config.strings.name} Support.
        </span>
      </>
    ) : (
      <>
        {disclaimer}
        <br />
        <Tooltip
          style={{
            maxWidth: 300,
            top: -120,
          }}
          text={justification}
        >
          <span className="tint pointer">Why do I need to provide this?</span>
        </Tooltip>
      </>
    )}
  </div>
);

const EnhancedAdditionalInfoWarning = React.memo(AdditionalInfoWarning);

export default EnhancedAdditionalInfoWarning;
