import {generatePath} from 'react-router-dom';
import {scroller, Element as ScrollAnchor} from 'react-scroll';
import {useResource} from 'rest-hooks';
import _ from 'lodash';
import React from 'react';

import {
  Checkbox,
  CommonDropdownSelect,
  Modal,
  ModalCloseButton,
  SearchBox,
} from 'elements';
import CollectionResource from 'resources/CollectionResource';
import ItemCatalogResource from 'resources/ItemCatalogResource';
import ItemResource from 'resources/ItemResource';
import config from 'config';

import {CatalogItemsFooterContainer} from './containers';
import {Category, Item} from './components';

const search = (items, value) => {
  const valueLower = value.toLowerCase();

  return items.filter(i => i.name.toLowerCase().includes(valueLower));
};

const CatalogItemsPage = ({history, location, match}) => {
  const collectionId = Number(match.params.collection);
  const catalogId = Number(match.params.catalog);

  const [collection, collectionItems, {catalog}] = useResource(
    [CollectionResource.detailShape(), {id: collectionId}],
    [ItemResource.listShape(), {collectionId}],
    [ItemCatalogResource.detailShape(), {id: catalogId}]
  );

  const categories = React.useMemo(
    () =>
      _.sortBy(
        _.uniqBy(
          (catalog.active_items || [])
            .map(({category}) => category)
            .filter(Boolean),
          'id'
        ),
        category => category.position
      ),
    [catalog.active_items]
  );
  const items = React.useMemo(
    () => _.sortBy(catalog.active_items || [], item => item.position),
    [catalog.active_items]
  );

  const [selectedItems, setSelectedItems] = React.useState(
    (location.state && location.state.selectedItems) || []
  );
  const [searchValue, setSearchValue] = React.useState('');
  const [title, setTitle] = React.useState('ALL');

  const allItemsSelected =
    selectedItems.length === items.length && selectedItems.length !== 0;

  const searchItemsNoCategory = React.useMemo(() => {
    const itemsNoCategory = items.filter(item => !item.category);

    return searchValue.length !== 0
      ? search(itemsNoCategory, searchValue)
      : itemsNoCategory;
  }, [items, searchValue]);
  const searchitemsWithCategory = React.useMemo(() => {
    const itemsWithCategory = items.filter(item => item.category);

    return searchValue.length !== 0
      ? search(itemsWithCategory, searchValue)
      : itemsWithCategory;
  }, [items, searchValue]);

  const itemAdded = itemId =>
    Boolean(collectionItems.find(ci => ci.catalog_object_id === itemId));

  const itemSelected = React.useCallback(
    itemId => selectedItems.includes(itemId),
    [selectedItems]
  );

  const handleDismiss = React.useCallback(() => {
    const path = generatePath('/collection/:owner/:collection/items', {
      owner: match.params.owner,
      collection: match.params.collection,
    });

    history.push(path);
  }, [match, history]);

  const handleItemSelectedToggle = React.useCallback(
    itemId => {
      setSelectedItems(prevSelectedItems =>
        allItemsSelected || itemSelected(itemId)
          ? prevSelectedItems.filter(id => id !== itemId)
          : [...prevSelectedItems, itemId]
      );
    },
    [allItemsSelected, itemSelected, setSelectedItems]
  );

  return (
    <Modal
      className="catalog-items-page-modal flex flex-column"
      contentContainerClassName="br2-ns"
      footer={
        <CatalogItemsFooterContainer
          collection={collection}
          collectionItems={collectionItems}
          selectedItems={selectedItems}
        />
      }
      onDismiss={handleDismiss}
    >
      <div className="bg-white">
        <ModalCloseButton className="z-999" onClick={handleDismiss} />
        <header className="pa4 bb b--gray-300">
          <h3 className="mt3 mb2 f3 dark-grey">{catalog.name}</h3>
          <p className="dn db-ns f5 lh1 dark-grey avenir-light">
            Select items to add to your {config.strings.collection}.
          </p>
        </header>
        <div className="flex justify-between items-center pv3 ph3 ph4-ns bb b--gray-300">
          <Checkbox
            checked={allItemsSelected}
            label="Select all"
            labelClassName="f5"
            onChange={() => {
              setSelectedItems(allItemsSelected ? [] : items.map(i => i.id));
            }}
          />
          <div className="flex items-center mw-60 relative">
            <div>
              {categories.length !== 0 && (
                <CommonDropdownSelect
                  className="w4 mr3-ns"
                  selectClassName="ba br2"
                  style={{border: '1px solid #D8DCE6'}}
                  title={title}
                  options={[
                    ...categories.map(c => ({
                      title: c.name,
                      value: String(c.id),
                      onClick: () => {
                        scroller.scrollTo(c.id, {
                          containerId: 'catalog-items-list-container',
                          smooth: true,
                          duration: 300,
                          offset: -240,
                        });
                        setTitle(c.name);
                      },
                    })),
                  ]}
                />
              )}
            </div>
            <SearchBox onChange={setSearchValue} />
          </div>
        </div>
      </div>
      <div
        id="catalog-items-list-container"
        className="flex-auto overflow-y-auto"
      >
        <ScrollAnchor name="all" />
        {searchItemsNoCategory.map(item => (
          <Item
            key={item.id}
            added={itemAdded(item.id)}
            item={item}
            selected={allItemsSelected || itemSelected(item.id)}
            onToggleSelected={() => handleItemSelectedToggle(item.id)}
          />
        ))}
        {categories.map(category => {
          const categoryItems = searchitemsWithCategory.filter(
            i => i.category.id === category.id
          );

          return categoryItems.length === 0 ? null : (
            <div key={category.id} name={`category-${category.id}`}>
              <ScrollAnchor name={String(category.id)}>
                <Category category={category}>
                  {categoryItems.map(item => (
                    <Item
                      key={item.id}
                      added={itemAdded(item.id)}
                      item={item}
                      selected={allItemsSelected || itemSelected(item.id)}
                      onToggleSelected={() => {
                        handleItemSelectedToggle(item.id);
                      }}
                    />
                  ))}
                </Category>
              </ScrollAnchor>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .mw-60 {
          max-width: 60%;
        }
        :global(.catalog-items-page-modal) {
          overflow-y: hidden !important;
        }
      `}</style>
    </Modal>
  );
};

const EnhancedCatalogItemsPage = React.memo(CatalogItemsPage);

export default EnhancedCatalogItemsPage;
