import {generatePath, Link} from 'react-router-dom';
import {useResource} from 'rest-hooks';
import _ from 'lodash';
import React from 'react';

import {Modal, ModalCloseButton} from 'elements';
import config from 'config';
import ItemCatalogResource from 'resources/ItemCatalogResource';

import {CatalogRow} from './components';

const ItemCatalogsPage = ({history, match}) => {
  const sellerId = Number(match.params.seller);

  const itemCatalogs = useResource(ItemCatalogResource.listShape(), {});

  const sellerName = React.useMemo(() => {
    const seller = itemCatalogs
      .map(({user}) => user)
      .find(({id}) => id === sellerId);

    return seller ? seller.name : '';
  }, [itemCatalogs, sellerId]);

  const handleDismiss = () => {
    const path = generatePath('/collection/:owner/:collection/items', {
      owner: match.params.owner,
      collection: match.params.collection,
    });

    history.push(path);
  };

  return (
    <Modal className="br2-ns" onDismiss={handleDismiss}>
      <ModalCloseButton onClick={handleDismiss} />
      <div className="pt3 ph3 ph4-ns pb5">
        <h2 className="mt3 mt4-ns mb2 dark-grey">{sellerName}</h2>
        <p className="mb4 f5 avenir-light dark-grey lh1">
          {config.strings.addLibraryItemsHeading}
        </p>
        <div>
          {_.orderBy(
            itemCatalogs.filter(({user}) => user.id === sellerId),
            ['display_order', 'id'],
            ['asc', 'desc']
          ).map((catalog) => {
            const catalogPath = generatePath(
              '/collection/:owner/:collection/items/seller/:seller/catalogs/catalog/:catalog',
              {
                owner: match.params.owner,
                collection: match.params.collection,
                seller: match.params.seller,
                catalog: catalog.id,
              }
            );

            return (
              <Link key={catalog.id} className="db mb3" to={catalogPath}>
                <CatalogRow catalog={catalog} />
              </Link>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

const EnhancedItemCatalogsPage = React.memo(ItemCatalogsPage);

export default EnhancedItemCatalogsPage;
