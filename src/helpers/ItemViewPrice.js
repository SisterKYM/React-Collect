const checkDifferentRetailPricesOrAmounts = (item) => {
  if (item.options.variants?.listings?.length > 1) {
    return item.options.variants.listings.reduce(
      (acc, listing, idx, listings) => [
        acc[0] || listing.retailPrice - listings[0].retailPrice !== 0,
        acc[1] || listing.amount - listings[0].amount !== 0,
      ],
      []
    );
  }

  return [];
};

export default checkDifferentRetailPricesOrAmounts;
