import {generatePath, Link} from 'react-router-dom';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Button, CollectionShare, Logo} from 'elements';
import {FullOverlayLayout} from 'layout';
import config from 'config';
import * as cx from 'redux/modules/payments/constants';
import {getShippablePayments} from 'redux/modules/payments/actions';

const CheckoutThankYouPage = ({match, location, publicCollection}) => {
  const collectionSlug = match.params.collection;
  const addPayment = location.state && location.state.addPayment;
  const payerEmail = location.state && location.state.payerEmail;

  const collectionUrl = config.helpers.shareUrl(collectionSlug);
  const closePath = addPayment
    ? publicCollection.userManagesCollection
      ? generatePath('/collection/:owner/:collection/manage', {
          owner: publicCollection.organizer.id,
          collection: publicCollection.id,
        })
      : generatePath('/c/:collection', {collection: collectionSlug})
    : generatePath('/logout');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getShippablePayments({
        collection: publicCollection.id,
        query: {
          shippable: true,
          page: 1,
          perPage: cx.PAYMENTS_PER_PAGE,
          sort: 'created_at',
          direction: 'desc',
        },
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicCollection.id]);

  return (
    <FullOverlayLayout close={{color: 'darkGray', to: closePath}}>
      <div className="relative min-vh-100 flex">
        <div className="absolute top-0 left-0 pa3 pa4-ns">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="checkout-thank-you-page-content-container absolute ph3 pv4 tc">
          <h1 className="mb4 f2 merriweather i gray-600">Thank you!</h1>
          <div className="mb3 f5 avenir-light gray-600">
            {publicCollection.userManagesCollection || !payerEmail ? (
              'An email confirmation will be sent shortly.'
            ) : (
              <>
                You will receive an email confirmation shortly at{' '}
                <span className="avenir-heavy">{payerEmail}</span>
              </>
            )}
          </div>
          <div className="separator dib bt b--gray-300" />
          {publicCollection.userManagesCollection && (
            <>
              <div className="mt2">
                <Link to={closePath}>
                  <Button small>Back To Collection Manager</Button>
                </Link>
              </div>
              <div className="separator dib bt b--gray-300" />
            </>
          )}
          <div className="mt3">
            <div className="f6 avenir-light ttu gray-600">
              Share with friends
            </div>
            <div className="flex justify-center mt3">
              <CollectionShare
                shareUrls={{
                  facebook: `https://www.facebook.com/dialog/feed?app_id=413118622200717&link=${collectionUrl}`,
                  twitter: `http://twitter.com/share?text=Check+it+out:&url=${collectionUrl}&hashtags=`,
                  mail: `mailto:?&subject=You're invited to ${publicCollection.name}!&body=${collectionUrl}`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .checkout-thank-you-page-content-container {
          width: 800px;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
        }
        .separator {
          width: 400px;
        }
        @media (max-width: 30em) {
          .checkout-thank-you-page-content-container {
            width: 100%;
          }
          .separator {
            width: 100%;
          }
        }
      `}</style>
    </FullOverlayLayout>
  );
};

const EnhancedCheckoutThankYouPage = React.memo(CheckoutThankYouPage);

export default EnhancedCheckoutThankYouPage;
