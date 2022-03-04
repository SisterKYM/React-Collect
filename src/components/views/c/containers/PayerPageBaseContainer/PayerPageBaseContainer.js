import {useSelector} from 'react-redux';
import React from 'react';

import {GrowlAlertsContainer} from 'containers';

import {PayerPageBase} from './components';

const PayerPageBaseContainer = ({
  prePayerPage,
  collectionSlug,
  publicCollection,
  onChangeCategoryPath,
  navigationBarRightElementMobile,
  header,
  children,
}) => {
  const user = useSelector(state => state.session && state.session.user);

  return (
    <>
      <GrowlAlertsContainer />
      <PayerPageBase
        prePayerPage={prePayerPage}
        collectionSlug={collectionSlug}
        publicCollection={publicCollection}
        user={user}
        onChangeCategoryPath={onChangeCategoryPath}
        navigationBarRightElementMobile={navigationBarRightElementMobile}
        header={header}
      >
        {children}
      </PayerPageBase>
    </>
  );
};

const EnhancedPayerPageBaseContainer = React.memo(PayerPageBaseContainer);

export default EnhancedPayerPageBaseContainer;
