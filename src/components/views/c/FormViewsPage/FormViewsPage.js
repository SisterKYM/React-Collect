import {generatePath} from 'react-router-dom';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import cx from 'classnames';
import React from 'react';

import {Logo} from 'elements';
import ImagesUtils from 'helpers/ImagesUtils';
import CartHelpers from 'helpers/CartHelpers';
import useMedia from 'hooks/useMedia';
import {GrowlAlertsContainer} from 'containers';

import CollectionBannerImage from '../containers/PayerPageBaseContainer/components/PayerPageBase/CollectionBannerImage';

import {
  CartOverview,
  CartOverviewButtonMobile,
  CollectionOverview,
  PayerFlowBreadcrumbs,
  PayerFlowNavigationBar,
} from '../components';
import {FormView} from './components';
import {FormViewsPageFooterContainer} from './containers';

const getInitialFieldViewsValue = ({cart, formViews}) => {
  const cartFormFieldViews = _.flatMap(
    cart ? cart.forms : [],
    ({cart_field_views}) => cart_field_views
  );
  const fieldViews = _.flatMap(formViews, ({fields}) => fields);

  return _.fromPairs(
    fieldViews.map(({id, field_type, metadata}) => {
      const cartFormFieldView = cartFormFieldViews.find(
        ({item_field_id}) => item_field_id === id
      );
      const value =
        metadata.waiverFieldType === 'signed_date'
          ? new Date()
          : (cartFormFieldView && cartFormFieldView.value) || null;

      return [id, field_type === 'date' ? value : value || ''];
    })
  );
};

const FormViewsPage = ({match, location, history, publicCollection, cart}) => {
  const collectionSlug = match.params.collection;

  const imageUrl =
    (publicCollection.headerImage &&
      ImagesUtils.getCroppedImageUrl(publicCollection.headerImage)) ||
    null;

  const user = useSelector((state) => state.session && state.session.user);

  const userLoggedIn = Boolean(user);

  const [errorMessages, setErrorMessages] = React.useState({});

  const collectionHasFormsOnly =
    publicCollection.forms.length !== 0 && publicCollection.items.length === 0;
  const filteredFormViews = React.useMemo(
    () => publicCollection.forms.filter(({fields}) => fields.length !== 0),
    [publicCollection.forms]
  );
  const shippingEnabled = Boolean(
    publicCollection?.shippingOptions?.shipToEnabled
  );

  const [fieldViewsValue, setFieldViewsValue] = React.useState(() =>
    getInitialFieldViewsValue({cart, formViews: filteredFormViews})
  );

  React.useEffect(() => {
    setFieldViewsValue(
      getInitialFieldViewsValue({cart, formViews: filteredFormViews})
    );
  }, [cart, filteredFormViews]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cartOverviewElement = cart ? (
    <CartOverview
      className="w-100 min-h-100 bg-white"
      collectionName={publicCollection.name}
      collectionSlug={publicCollection.slug}
      smallLandscape={smallLandscape}
      cart={cart}
    />
  ) : null;

  const payerFlowNavigationBar = (
    <PayerFlowNavigationBar
      collectionSlug={collectionSlug}
      user={user}
      smallLandscape={smallLandscape}
      rightElementMobile={
        <CartOverviewButtonMobile cartOverviewElement={cartOverviewElement} />
      }
      collectionHasFormsOnly={collectionHasFormsOnly}
    />
  );
  const formViewsPageFooterContainer = cart ? (
    <FormViewsPageFooterContainer
      collectionSlug={collectionSlug}
      cartUuid={cart.uuid}
      shippingEnabled={shippingEnabled}
      collectionHasFormsOnly={collectionHasFormsOnly}
      formViews={filteredFormViews}
      fieldViewsValue={fieldViewsValue}
      onChangeErrorMessages={setErrorMessages}
      onReturnToCart={() => {
        const pathname = generatePath('/c/:collection', {
          collection: collectionSlug,
        });

        history.push(pathname, {cartVisible: true});
      }}
      onProceedToPayment={() => {
        const getStep = () => {
          if (shippingEnabled) {
            return 'shipping';
          }

          return userLoggedIn ? 'payment' : 'details';
        };

        const pathname = generatePath('/c/:collection/checkout', {
          collection: collectionSlug,
        });
        const step = getStep();

        history.push({
          pathname,
          search: `?step=${step}`,
        });
      }}
    />
  ) : null;

  const {smallLandscape, notSmall} = useMedia();

  return (
    <div
      className={cx('relative flex flex-column min-vh-100 h-100 bg-gray-200')}
    >
      <header className="sticky top-0 z-2">
        <div
          className={collectionHasFormsOnly || smallLandscape ? '' : 'dn-ns'}
        >
          {payerFlowNavigationBar}
        </div>
      </header>

      {collectionHasFormsOnly && Boolean(imageUrl) && notSmall && (
        <CollectionBannerImage imageUrl={imageUrl} />
      )}
      <div
        className={cx(
          'flex flex-auto',
          collectionHasFormsOnly && 'pt3 overflow-y-auto'
        )}
      >
        <div
          className={cx(
            'flex w-100 justify-center',
            !collectionHasFormsOnly && !smallLandscape && 'w-two-thirds-ns'
          )}
        >
          <div
            className={
              collectionHasFormsOnly
                ? 'content-container'
                : 'w-100 w-80-ns pv5-ns'
            }
          >
            {!collectionHasFormsOnly && (
              <header className="dn flex-ns w-100 justify-center items-center mb4">
                <Logo />
              </header>
            )}
            {collectionHasFormsOnly ? (
              <CollectionOverview
                className="mb3"
                publicCollection={publicCollection}
                collectionSlug={collectionSlug}
                path={match.path}
              />
            ) : (
              <PayerFlowBreadcrumbs
                className="mb3 br2-ns shadow-6-ns"
                collectionSlug={collectionSlug}
                missingRequiredFormViewFields={CartHelpers.isRequiredFormFieldViewMissing(
                  {
                    formViews: filteredFormViews,
                    cart,
                  }
                )}
                userLoggedIn={userLoggedIn}
                publicCollection={publicCollection}
                location={location}
              />
            )}
            <main className={collectionHasFormsOnly ? 'pb4' : ''}>
              {filteredFormViews.map((formView, idx) => (
                <FormView
                  key={formView.id}
                  className={cx('br2-ns', idx !== 0 && 'mt3')}
                  errorMessages={errorMessages}
                  formView={formView}
                  fieldViewsValue={fieldViewsValue}
                  onChangeErrorMessages={setErrorMessages}
                  onChangeFieldViewsValue={setFieldViewsValue}
                />
              ))}
            </main>
            {!collectionHasFormsOnly && formViewsPageFooterContainer}
          </div>
        </div>
        {!collectionHasFormsOnly && !smallLandscape && (
          <div className="dn db-ns w-third">{cartOverviewElement}</div>
        )}
      </div>
      <div>{collectionHasFormsOnly && formViewsPageFooterContainer}</div>
      <GrowlAlertsContainer />
    </div>
  );
};

const EnhancedFormViewsPage = React.memo(FormViewsPage);

export default EnhancedFormViewsPage;
