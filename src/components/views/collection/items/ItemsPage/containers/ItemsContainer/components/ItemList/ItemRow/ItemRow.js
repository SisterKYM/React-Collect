import {Form, Formik, Field} from 'formik';
import {generatePath, Link} from 'react-router-dom';
import {IoMdEyeOff} from 'react-icons/io';
import {useFetcher} from 'rest-hooks';
import _ from 'lodash';
import cx from 'classnames';
import React from 'react';

import {currency} from 'helpers/numbers';
import checkDifferentRetailPricesOrAmounts from 'helpers/ItemViewPrice';
import {DragHandle} from 'elements';
import {ReactComponent as TagIcon} from 'theme/images/tag.svg';
import config from 'config';
import ImagesUtils from 'helpers/ImagesUtils';
import ItemResource from 'resources/ItemResource';
import normalizeAmount from 'helpers/normalizeAmount';

import ItemControls from './ItemControls';

const ItemRow = React.forwardRef(({itemCount, item, collection}, ref) => {
  const updateItem = useFetcher(ItemResource.partialUpdateShape());

  const nameFieldRef = React.useRef(null);

  const [retailPriceFormVisible, setRetailPriceFormVisible] = React.useState(
    false
  );
  const [amountFormVisible, setAmountFormVisible] = React.useState(false);

  const thumbnailUrl = ImagesUtils.getItemMainThumbnailUrl(item.images || [], {
    width: 164,
  });

  const lowestAmountListing = _.minBy(
    (item.options.variants &&
      item.options.variants.enabled &&
      item.options.variants.listings) ||
      [],
    'amount'
  );

  const withVariantListings = React.useMemo(
    () =>
      item.options.variants &&
      item.options.variants.enabled &&
      item.options.variants.listings &&
      item.options.variants.listings.length > 1,
    [item]
  );

  const [withDifferentRetailPrices, withDifferentAmounts] = React.useMemo(
    () => checkDifferentRetailPricesOrAmounts(item),
    [item]
  );

  const totalQuantity =
    item.options.variants &&
    item.options.variants.enabled &&
    item.options.variants.listings &&
    item.options.variants.listings.length !== 0
      ? _.sumBy(item.options.variants.listings, 'available_quantity')
      : item.available_quantity;
  const quantityElement = typeof totalQuantity === 'number' && (
    <>
      {totalQuantity > 0 ? (
        <div>{totalQuantity} Remaining</div>
      ) : (
        <div className="flamingo">Sold Out</div>
      )}
    </>
  );

  return (
    <div ref={ref} className="flex items-center br2 bg-white">
      <DragHandle className="dn db-ns" iconClassName="f3" />
      <div className="flex items-center w-100 ml2-ns ba br2 b--gray-300">
        <Link
          className="flex"
          to={
            collection && item
              ? `/collection/${collection.user_id}/${collection.id}/items/item/${item.id}/edit`
              : '/'
          }
        >
          <div className="image-wrapper relative flex justify-center items-center">
            {thumbnailUrl ? (
              <div
                className="absolute top-0 left-0 w-100 h-100 br1 br--left bg-center cover"
                style={{
                  backgroundImage: `url('${thumbnailUrl}')`,
                }}
              />
            ) : item.hidden ? (
              ''
            ) : (
              <TagIcon fill={config.colors.lightTint} />
            )}
            {item.hidden && (
              <>
                <div className="absolute top-0 left-0 w-100 h-100 0-50 bg-gray-500" />
                <div className="relative flex h-100 justify-center items-center z-1">
                  <div className="tc white">
                    <IoMdEyeOff size={35} />
                    <p>Hidden</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </Link>
        <div className="flex w-100 items-center mr3">
          <div className="item-name-container flex-basis-0 flex-auto flex flex-column pl2 pl3-ns justify-between open-sans lh-copy">
            <Formik
              enableReinitialize
              initialValues={{name: item.name}}
              onSubmit={(values) => {
                nameFieldRef.current.blur();

                updateItem({id: item.id, collectionId: collection.id}, values);
              }}
            >
              {({handleBlur, submitForm}) => (
                <Form>
                  <Field
                    innerRef={nameFieldRef}
                    name="name"
                    className="item-row-active-field-name item-row-active-field input-reset w-90 f5 truncate ws-normal-ns avenir-roman tint bn"
                    onBlur={(event) => {
                      handleBlur(event);
                      submitForm();
                    }}
                  />
                </Form>
              )}
            </Formik>
            <div className="f6 avenir-light gray-600">
              {!lowestAmountListing && item.amount_type === 'open' ? (
                'Any Amount'
              ) : (
                <>
                  {amountFormVisible ? (
                    <Formik
                      enableReinitialize
                      initialValues={{amount: item.amount}}
                      onSubmit={async ({amount}) => {
                        nameFieldRef.current.blur();

                        await updateItem(
                          {id: item.id, collectionId: collection.id},
                          {amount}
                        );

                        setAmountFormVisible(false);
                      }}
                    >
                      {({handleChange, handleBlur, submitForm}) => (
                        <Form className="di">
                          <Field
                            autoFocus
                            name="amount"
                            className="item-row-active-field input-reset bn"
                            onChange={(event) => {
                              handleChange({
                                ...event,
                                target: {
                                  ...event.target,
                                  name: 'amount',
                                  value: normalizeAmount(event.target.value),
                                },
                              });
                            }}
                            onBlur={(event) => {
                              handleBlur(event);
                              submitForm();
                            }}
                          />
                        </Form>
                      )}
                    </Formik>
                  ) : (
                    <span
                      className={lowestAmountListing ? '' : 'pointer'}
                      onClick={
                        lowestAmountListing
                          ? undefined
                          : () => {
                              setAmountFormVisible(true);
                            }
                      }
                    >
                      {currency(
                        lowestAmountListing
                          ? lowestAmountListing.amount
                          : item.amount
                      )}
                      {withDifferentAmounts && '+'}
                    </span>
                  )}
                </>
              )}
              {((Boolean(item.options) &&
                typeof item.options.retailPrice === 'number') ||
                collection?.alwaysShowRetailPrice ||
                (lowestAmountListing && lowestAmountListing.retailPrice)) && (
                <>
                  {' '}
                  {retailPriceFormVisible ? (
                    <Formik
                      enableReinitialize
                      initialValues={{
                        options: {
                          retailPrice:
                            item.options &&
                            typeof item.options.retailPrice === 'number'
                              ? item.options.retailPrice
                              : 0,
                        },
                      }}
                      onSubmit={async ({options: {retailPrice}}) => {
                        setRetailPriceFormVisible(false);

                        await updateItem(
                          {id: item.id, collectionId: collection.id},
                          {
                            options: {
                              retailPrice: Number.parseFloat(retailPrice),
                            },
                          }
                        );
                      }}
                    >
                      {({handleChange, handleBlur, submitForm}) => (
                        <Form className="di">
                          <Field
                            autoFocus
                            name="options.retailPrice"
                            className="item-row-active-field input-reset gray-400 bn"
                            onChange={(event) => {
                              handleChange({
                                ...event,
                                target: {
                                  ...event.target,
                                  name: 'options.retailPrice',
                                  value: normalizeAmount(event.target.value),
                                },
                              });
                            }}
                            onBlur={(event) => {
                              handleBlur(event);
                              submitForm();
                            }}
                          />
                        </Form>
                      )}
                    </Formik>
                  ) : (
                    <span
                      className={cx(
                        'gray-400',
                        !lowestAmountListing && 'pointer'
                      )}
                      onClick={() => {
                        setRetailPriceFormVisible(true);
                      }}
                    >
                      (Retail:{' '}
                      {currency(
                        lowestAmountListing
                          ? lowestAmountListing.retailPrice
                          : item.options.retailPrice || 0
                      )}
                      {withDifferentRetailPrices && '+'})
                    </span>
                  )}
                </>
              )}
            </div>
            {quantityElement && (
              <>
                <div className="dn-ns f8 avenir-light gray-600">
                  <div className="lh-copy">{quantityElement}</div>
                  {withVariantListings && (
                    <div className="gray-400">
                      Across {item.options.variants.listings.length} variants
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="dn db-ns flex-basis-0 flex-auto f6 avenir-light gray-600">
            {typeof totalQuantity === 'number' && quantityElement && (
              <>
                <div className="lh-copy">{quantityElement}</div>
                {withVariantListings && (
                  <div className="gray-400">
                    Across {item.options.variants.listings.length} variants
                  </div>
                )}
              </>
            )}
          </div>
          <div className="dn db-ns flex-basis-0 flex-auto f6 truncate avenir-light gray-600">
            Collected:{' '}
            <Link
              to={generatePath(
                '/collection/:owner/:collection/items/item/:item',
                {
                  owner: collection.user_id,
                  collection: collection.id,
                  item: item.id,
                }
              )}
            >
              {currency(item.amount_sold)}
            </Link>
          </div>
          <div className="w2 w-auto-ns flex justify-end">
            <ItemControls
              collection={collection}
              itemCount={itemCount}
              item={item}
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        .flex-basis-0 {
          flex-basis: 0;
        }
        .image-wrapper {
          width: 5.125rem;
          height: 5.125rem;
        }
        .background-image-placeholder {
          background-size: 70%;
        }
        :global(.item-row-active-field) {
          padding-left: 0rem;
          padding-right: 0rem;
        }
        :global(.item-row-active-field:focus) {
          background-color: #f2f2f2;
        }
        :global(.item-row-active-field-name:focus) {
          padding-top: 0.2rem;
          padding-bottom: 0.2rem;
          font-size: 1rem;
        }

        @media (min-width: 76em) {
          .item-name-container {
            min-width: 12rem;
          }
        }
        @media (min-width: 100em) {
          .item-name-container {
            min-width: 18rem;
          }
        }
      `}</style>
    </div>
  );
});

const EnhancedItemRow = React.memo(ItemRow);

export default EnhancedItemRow;
