import React from 'react';
import {useSelector} from 'react-redux';

import config from 'config';
import accountTypes from 'helpers/accountTypes';

const style = {
  position: 'absolute',
  top: '35px',
  right: '1rem',
};

const TransferAccount = () => {
  const session = useSelector((state) => state.session);

  let transferAccountRequest = `mailto:${config.strings.supportEmail}?subject=Account%20Transfer%20Request&body=We%20are%20happy%20to%20help%20you%20transfer%20your%20account%20to%20a%20new%20owner.%20Please%20note%2C%20this%20will%20not%20modify%20the%20organization%20information%2C%20and%20will%20only%20update%20the%20individual%20details.%20%0A%0ATo%20proceed%2C%20please%20send%20us%20the%20following%20information%3A%0ACurrent%20Account%20Holder%3A%0A%20-%20Name%0A%20-%20Email%20address%20on%20account%0A%0AIncoming%20Account%20Holder%3A%0A%20-%20Legal%20Name%0A%20-%20Address%0A%20-%20Phone%0A%20-%20DOB%0A%20-%20Email%20address%20(if%20changing)%0A%0AOnce%20you've%20provided%20this%20information%2C%20we%20will%20be%20in%20touch%20confirming%20the%20successful%20transfer%20of%20your%20account.`;
  if (session?.user?.entity_type === accountTypes.ORGANIZATION) {
    transferAccountRequest = `mailto:${config.strings.supportEmail}?subject=Account%20Transfer%20Request%3A%20Organization&body=We%20are%20happy%20to%20help%20you%20transfer%20your%20account%20to%20a%20new%20owner.%20Please%20note%20that%20this%20will%20not%20modify%20the%20organization%20information%20and%20will%20only%20update%20the%20individual%20details.%0A%0ATo%20proceed%2C%20please%20send%20us%20the%20following%20information%3A%0A%0ACurrent%20Account%20Holder%3A%0A%0AName%3A%0AEmail%20address%20on%20account%3A%0A%0A%0ANew%20Account%20Holder%3A%0A%0ALegal%20Name%3A%0AAddress%3A%0ADOB%3A%0A%0A%0APlease%20note%20that%20Cheddar%20Up%20uses%20two-factor%20authentication%20for%20your%20security.%20You%20will%20need%20access%20to%20the%20current%20mobile%20phone%20number%20on%20this%20account%20in%20order%20to%20change%20the%20email%20address%2C%20password%20or%20bank%20account%20on%20file.`;
  }

  return (
    <a
      href={transferAccountRequest}
      target="_blank"
      rel="noopener noreferrer"
      style={style}
    >
      Transfer Account
    </a>
  );
};

export default React.memo(TransferAccount);
