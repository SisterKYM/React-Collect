import _ from 'lodash';

import apiClient from 'helpers/apiClient';

const allEqual = arr =>
  arr.length === 0 || arr.every(element => element === arr[0]);

const isAddressAutocorrectted = ({originAddress, easypostAddress}) => {
  const cities = [originAddress.city, easypostAddress.city].map(_.toLower);
  const streets = [originAddress.street1, easypostAddress.street1].map(
    _.toLower
  );
  const zips = [originAddress.zip, easypostAddress.zip].map(_.toLower);

  return !allEqual(cities) || !allEqual(streets) || !allEqual(zips);
};

const EasypostAddressHelpers = {
  createEasyPostAddress: async ({collectionId, paymentId, payload}) => {
    const {
      data: {address},
    } = await apiClient.post(
      `users/tabs/${collectionId}/payments/${paymentId}/shipment/address`,
      payload
    );

    const errors = _.fromPairs(
      _.flatMap(
        Object.values(
          address.country === 'US'
            ? address.verifications
            : {delivery: address.verifications.delivery}
        ),
        ({errors: verificationErrors}) => verificationErrors
      ).map(({field, message}) => [field, message])
    );

    if (Object.keys(errors).length !== 0) {
      throw errors;
    }

    const autocorrected = isAddressAutocorrectted({
      originAddress: payload,
      easypostAddress: address,
    });

    return {
      ...address,
      autocorrected,
    };
  },
  getAddressFromEasypostAddress: easypostAddress => ({
    country: easypostAddress.country,
    name: easypostAddress.name,
    street1: easypostAddress.street1,
    city: easypostAddress.city,
    state: easypostAddress.state,
    zip: easypostAddress.zip,
  }),
};

export default EasypostAddressHelpers;
