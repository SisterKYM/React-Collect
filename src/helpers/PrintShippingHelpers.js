const FIRST_CLASS_PARCEL_PACKAGE_TYPES = [
  {
    value: 'Parcel',
    children: 'Package / Thick Envelope',
  },
  {
    value: 'LargeParcel',
    children: 'Large Package',
  },
];
const PRIORITY_MAIL_EXPRESS_PACKAGE_TYPES = [
  {
    value: 'FlatRateEnvelope',
    children: 'Flat Rate Envelope',
  },
  {
    value: 'Parcel',
    children: 'Package / Thick Envelope',
  },
  {
    value: 'LargeParcel',
    children: 'Large Package',
  },
  {
    value: 'FlatRatePaddedEnvelope',
    children: 'Padded Flat Rate Envelope',
  },
];
const PRIORITY_MAIL_PACKAGE_TYPES = [
  {
    value: 'FlatRateEnvelope',
    children: 'Flat Rate Envelope',
  },
  {
    value: 'SmallFlatRateBox',
    children: 'Flat Rate Box Small',
  },
  {
    value: 'MediumFlatRateBox',
    children: 'Flat Rate Box Medium',
  },
  {
    value: 'LargeFlatRateBox',
    children: 'Flat Rate Box Large',
  },
  {
    value: 'Parcel',
    children: 'Package / Thick Envelope',
  },
  {
    value: 'FlatRatePaddedEnvelope',
    children: 'Padded Flat Rate Envelope',
  },
];
const SERVICE_TYPES = [
  {
    value: 'First',
    children: 'First-Class Package service (2-5 days)',
    packageTypes: FIRST_CLASS_PARCEL_PACKAGE_TYPES,
  },
  {
    value: 'Express',
    children: 'Priority Mail Express service (1-3 days)',
    packageTypes: PRIORITY_MAIL_EXPRESS_PACKAGE_TYPES,
  },
  {
    value: 'Priority',
    children: 'Priority Mail service (1-3 days)',
    packageTypes: PRIORITY_MAIL_PACKAGE_TYPES,
  },
];
const SERVICE_MAP = {
  First: ['First', 'FirstClassPackageInternationalService'],
  Express: ['Express', 'ExpressMailInternational'],
  Priority: ['Priority', 'PriorityMailInternational'],
};

const PrintShippingHelpers = {
  SERVICE_TYPES,
  getSelectedShipmentRate: ({rates, service}) =>
    rates.find(rate => SERVICE_MAP[service].includes(rate.service)),
  getParcelMaxWeightForService: service =>
    service === 'First'
      ? {weight: 15.99, unit: 'oz'}
      : {weight: 70, unit: 'lbs'},
  getSignatureConfirmationAmountForService: service =>
    service === 'Express' ? 0 : 2.55,
  getNeedsParcelWeight: ({packageType, service}) => {
    const {
      unit: maxWeightUnit,
    } = PrintShippingHelpers.getParcelMaxWeightForService(service);
    const bothNeeded =
      (packageType === 'Parcel' || packageType === 'LargeParcel') &&
      SERVICE_MAP.Express.includes(service);
    const isFlat = packageType.includes('Flat');

    return isFlat
      ? {
          lbs: false,
          oz: false,
        }
      : {
          lbs: bothNeeded || maxWeightUnit === 'lbs',
          oz:
            bothNeeded ||
            packageType === 'Parcel' ||
            service === 'First' ||
            maxWeightUnit === 'oz',
        };
  },
  getServiceName: serviceTypeValue => {
    const service = SERVICE_TYPES.find(({value}) => value === serviceTypeValue);

    return service ? service.children : 'Unknown';
  },
};

export default PrintShippingHelpers;
