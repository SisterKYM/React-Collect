const getDisputedCollection = collections => {
  const disputedCollections = collections.filter(
    collection =>
      collection.access.owner && collection.withdrawal_balance_available < 0
  );

  return disputedCollections.length === 0
    ? null
    : disputedCollections.reduce(
        (currentDisputedCollection, collection) =>
          collection.withdrawal_balance_available >
          currentDisputedCollection.withdrawal_balance_available
            ? collection
            : currentDisputedCollection,
        disputedCollections[0]
      );
};

export default getDisputedCollection;
