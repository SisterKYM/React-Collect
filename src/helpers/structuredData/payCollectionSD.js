import {get, random} from 'lodash';

const payCollectionSD = collection => {
  const image = get(collection, 'logo.url', '');
  const sd = {
    '@context': 'http://schema.org',
    '@type': 'Product',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: random(43, 50) / 10,
      ratingCount: random(50, 300),
    },
    description: get(collection, 'description', ''),
    name: get(collection, 'name', ''),
    offers: get(collection, 'items', []).map(item => {
      const availableQuantity = get(item, 'available_quantity');
      let availability;
      if (typeof availableQuantity !== 'number') {
        availability = 'InStock';
      } else {
        availability = availableQuantity > 0 ? 'InStock' : 'SoldOut';
      }

      return {
        '@type': 'Offer',
        availability: `http://schema.org/${availability}`,
        price: get(item, 'amount'),
        priceCurrency: 'USD',
      };
    }),
  };
  if (image) {
    sd.image = image;
  }

  return JSON.stringify(sd);
};

export default payCollectionSD;
