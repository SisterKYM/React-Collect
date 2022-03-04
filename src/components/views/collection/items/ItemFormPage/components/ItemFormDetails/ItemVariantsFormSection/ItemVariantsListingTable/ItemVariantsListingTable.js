import {change} from 'redux-form';
import {useDispatch} from 'react-redux';
import React from 'react';
import ReactSortable from 'react-sortablejs';
import _ from 'lodash';
import shortid from 'shortid';

import {Checkbox, StyledTable} from 'elements';
import {sortableOptions} from 'theme/sortable';
import useToggle from 'hooks/useToggle';

import {ITEM_FORM_DETAILS_NAME} from '../../ItemFormDetails';
import ItemVariantsListingModalWrapper from './ItemVariantsListingModalWrapper';
import ItemVariantsListingModals from './ItemVariantsListingModals';
import ItemVariantsListingTableActionDropdown from './ItemVariantsListingTableActionDropdown';
import ItemVariantsListingTableRow from './ItemVariantsListingTableRow';

const sortClassName = shortid.generate();

const ItemVariantsListingTable = ({className, item, fields}) => {
  const dispatch = useDispatch();

  const [selectedFieldNames, setSelectedFieldNames] = React.useState([]);
  const [imageEditingFieldName, setImageEditingFieldName] = React.useState(
    null
  );
  const [priceModalVisible, togglePriceModalVisible] = useToggle();
  const [quantityModalVisible, toggleQuantityModalVisible] = useToggle();
  const [skuModalVisible, toggleSkuModalVisible] = useToggle();
  const [
    markAsSoldOutModalVisible,
    toggleMarkAsSoldOutModalVisible,
  ] = useToggle();
  const [deleteModalVisible, toggleDeleteModalVisible] = useToggle();

  const listings = fields.getAll();
  const itemImages = (item && item.images) || [];

  const visibleCols = {
    retailPrice: _.some(listings, ({retailPrice}) => Boolean(retailPrice)),
    sku: _.some(listings, ({sku}) => Boolean(sku) && sku.length !== 0),
  };

  const allFieldsSelected = React.useMemo(() => {
    const allFieldNames = fields.map((fieldName) => fieldName);

    return _.difference(allFieldNames, selectedFieldNames).length === 0;
  }, [fields, selectedFieldNames]);

  const optionNames =
    listings.map(({optionValues}) => Object.keys(optionValues))[0] || [];

  return (
    <div className={className}>
      <h4 className="f-regular mt4 gray-600 avenir-roman">
        Customize Variants
      </h4>
      <p className="mt2 f-small avenir-roman gray-600">
        Enter pricing and available quantities for your variants.
      </p>
      <div className="flex mt4 mb3 items-center">
        <Checkbox
          checkedOnValue
          input={{value: allFieldsSelected}}
          onChange={({target: {value}}) => {
            setSelectedFieldNames(
              value === 'false' ? fields.map((fieldName) => fieldName) : []
            );
          }}
        />
        <ItemVariantsListingTableActionDropdown
          className="ml3"
          variantsSelected={selectedFieldNames.length !== 0}
          onEnterPrice={togglePriceModalVisible.on}
          onEnterQuantity={toggleQuantityModalVisible.on}
          onEnterSku={toggleSkuModalVisible.on}
          onMarkAsSoldOut={toggleMarkAsSoldOutModalVisible.on}
          onDelete={toggleDeleteModalVisible.on}
        />
      </div>
      <StyledTable.Table className="pv3">
        <StyledTable.Head>
          <StyledTable.Row head>
            <StyledTable.HeadCell />
            <StyledTable.HeadCell />
            <StyledTable.HeadCell />
            {optionNames.map((optionName, idx) => (
              <StyledTable.HeadCell key={idx}>
                {optionName}
              </StyledTable.HeadCell>
            ))}
            <StyledTable.HeadCell>Price</StyledTable.HeadCell>
            {visibleCols.retailPrice && (
              <StyledTable.HeadCell>Retail Price</StyledTable.HeadCell>
            )}
            <StyledTable.HeadCell>Qty Avail</StyledTable.HeadCell>
            {visibleCols.sku && (
              <StyledTable.HeadCell>SKU</StyledTable.HeadCell>
            )}
          </StyledTable.Row>
        </StyledTable.Head>
        <ReactSortable
          tag="tbody"
          options={{
            ...sortableOptions,
            handle: `.${sortClassName}`,
          }}
          onChange={(order) => {
            dispatch(
              change(
                ITEM_FORM_DETAILS_NAME,
                'options.variants.listings',
                order.map(fields.get)
              )
            );
          }}
        >
          {fields.map((fieldName, idx) => (
            <ItemVariantsListingTableRow
              key={fields.get(idx)?.uuid}
              data-id={idx}
              sortingHandleClassName={sortClassName}
              fieldName={fieldName}
              visibleCols={visibleCols}
              listing={fields.get(idx)}
              images={itemImages}
              checked={selectedFieldNames.includes(fieldName)}
              onClickImage={() => {
                setImageEditingFieldName(fieldName);
              }}
              onChangeChecked={(checked) => {
                setSelectedFieldNames((prevSelectedFieldNames) =>
                  checked
                    ? [...prevSelectedFieldNames, fieldName]
                    : prevSelectedFieldNames.filter(
                        (prevSelectedFieldName) =>
                          prevSelectedFieldName !== fieldName
                      )
                );
              }}
            />
          ))}
        </ReactSortable>
      </StyledTable.Table>
      {priceModalVisible && (
        <ItemVariantsListingModalWrapper>
          <ItemVariantsListingModals.Price
            fieldNames={selectedFieldNames}
            onDismiss={() => {
              togglePriceModalVisible.off();
              setSelectedFieldNames([]);
            }}
          />
        </ItemVariantsListingModalWrapper>
      )}
      {quantityModalVisible && (
        <ItemVariantsListingModalWrapper>
          <ItemVariantsListingModals.Quantity
            fieldNames={selectedFieldNames}
            onDismiss={() => {
              toggleQuantityModalVisible.off();
              setSelectedFieldNames([]);
            }}
          />
        </ItemVariantsListingModalWrapper>
      )}
      {skuModalVisible && (
        <ItemVariantsListingModalWrapper>
          <ItemVariantsListingModals.Sku
            fieldNames={selectedFieldNames}
            onDismiss={() => {
              toggleSkuModalVisible.off();
              setSelectedFieldNames([]);
            }}
          />
        </ItemVariantsListingModalWrapper>
      )}
      {markAsSoldOutModalVisible && (
        <ItemVariantsListingModalWrapper>
          <ItemVariantsListingModals.MarkAsSold
            fieldNames={selectedFieldNames}
            onDismiss={() => {
              toggleMarkAsSoldOutModalVisible.off();
              setSelectedFieldNames([]);
            }}
          />
        </ItemVariantsListingModalWrapper>
      )}
      {deleteModalVisible && (
        <ItemVariantsListingModalWrapper>
          <ItemVariantsListingModals.Delete
            arrayFieldName="options.variants.listings"
            fieldIndexes={selectedFieldNames.map((fieldName) =>
              Number(
                fieldName.slice(
                  fieldName.lastIndexOf('[') + 1,
                  fieldName.lastIndexOf(']')
                )
              )
            )}
            onDismiss={() => {
              toggleDeleteModalVisible.off();
              setSelectedFieldNames([]);
            }}
          />
        </ItemVariantsListingModalWrapper>
      )}
      {imageEditingFieldName && (
        <ItemVariantsListingModalWrapper>
          <ItemVariantsListingModals.Image
            item={item}
            fieldName={imageEditingFieldName}
            onDismiss={() => {
              setImageEditingFieldName(null);
            }}
          />
        </ItemVariantsListingModalWrapper>
      )}
    </div>
  );
};

const EnhancedItemVariantsListingTable = React.memo(ItemVariantsListingTable);

export default EnhancedItemVariantsListingTable;
