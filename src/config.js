import _ from 'lodash';

import CategoryPlusIconCheddarUp from 'theme/images/category-plus-icon-cheddar-up.svg';
import CategoryPlusIconDefault from 'theme/images/category-plus-icon-default.svg';
import LogoHorizontalCoreNaturals from 'theme/images/logo-horizontal-core-naturals.png';
import LogoHorizontalPixieLane from 'theme/images/logo-horizontal-pixie-lane.svg';
import SetTimingLargeCheddarUp from 'theme/images/set-timing-large-cheddar-up.jpg';
import SetTimingLargeDefault from 'theme/images/set-timing-large-default.jpg';

const SITE_NAME = process.env.REACT_APP_SITE_NAME;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

const configSettings = {
  enabledFeatures: {
    subscriptions: {
      CHEDDAR_UP: true,
      DEFAULT: false,
    },
    sellersSidebarSubnav: {
      DEFAULT: false,
      PIXIE_LANE: true,
    },
    addItem: {
      DEFAULT: true,
      PIXIE_LANE: false,
    },
    videoTutorial: {
      CHEDDAR_UP: true,
      DEFAULT: false,
    },
    helpPageFAQ: {
      DEFAULT: true,
      PIXIE_LANE: false,
    },
    helpPageCollection: {
      CHEDDAR_UP: false,
      PIXIE_LANE: false,
      DEFAULT: true,
    },
    whitelabelFooter: {
      DEFAULT: false,
      PIXIE_LANE: true,
    },
    waivers: {
      CHEDDAR_UP: true,
      DEFAULT: false,
    },
    collectionAttachments: {
      CHEDDAR_UP: true,
      DEFAULT: false,
    },
    managers: {
      CHEDDAR_UP: true,
      DEFAULT: false,
    },
    displayMemberList: {
      CHEDDAR_UP: true,
      DEFAULT: false,
    },
    displayTotalCollected: {
      CHEDDAR_UP: true,
      DEFAULT: false,
    },
    siteButtons: {
      CHEDDAR_UP: true,
      DEFAULT: false,
    },
    makeItemRequired: {
      CHEDDAR_UP: true,
      DEFAULT: false,
    },
    countrySelectable: {
      PIXIE_LANE: false,
      DEFAULT: true,
    },
  },
  behaviors: {
    openProductCatalogOnBuilderCTAIfNoItems: {
      PIXIE_LANE: true,
      DEFAULT: false,
    },
  },
  strings: {
    headTitle: {
      CORE_NATURALS: 'Natural Products - BRAND Demo Platform',
      PIXIE_LANE: 'Shop the PixieLane Marketplace',
      DEFAULT:
        'Collect Money Online. Collect from a Group for Free. Get Started Now.',
    },
    collection: {
      CHEDDAR_UP: 'collection',
      DEFAULT: 'sale',
    },
    collect: {
      CHEDDAR_UP: 'collect',
      DEFAULT: 'sell',
    },
    signUpHeading: {
      CHEDDAR_UP: 'Start Collecting',
      PIXIE_LANE: 'Welcome to the PixieLane Marketplace',
      DEFAULT: 'Make Selling On-Hand Product Easy',
    },
    signUpSubheading: {
      PIXIE_LANE: 'Easily manage, showcase and sell your PixieLane inventory',
    },
    addLibraryItemsHeading: {
      CHEDDAR_UP: 'Click on a library to add items',
      DEFAULT: 'Click on a product catalog below to add items to your sale',
    },
    itemCatalogsHeading: {
      CHEDDAR_UP: 'My Item Libraries',
      DEFAULT: 'Product Catalogs',
    },
    formTemplatesHeading: {
      CHEDDAR_UP: 'My Form Libraries',
      DEFAULT: 'Book a Show Forms',
    },
    name: {
      CHEDDAR_UP: 'Cheddar Up',
      PIXIE_LANE: 'PixieLane',
    },
    supportEmail: {
      CHEDDAR_UP: 'friendlysupport@cheddarup.com',
      PIXIE_LANE: 'marketplace@pixielane.com',
    },
  },
  validations: {
    maxItemNameLength: {
      DEFAULT: 75,
      PIXIE_LANE: 200,
    },
  },
  links: {
    mobileAppStore: {
      DEFAULT: {
        ios:
          'https://itunes.apple.com/us/app/cheddar-up/id1141129202?ls=1&mt=8',
        android:
          'https://play.google.com/store/apps/details?id=com.cheddarup.CheddarUp',
      },
    },
    supportPage: {
      DEFAULT: 'https://support.cheddarup.com/',
      PIXIE_LANE: 'https://marketplacesupport.pixielane.com/',
      CORE_NATURALS: 'http://support.corenaturals.io/',
    },
    withdraw: {
      CHEDDAR_UP:
        'https://support.cheddarup.com/hc/en-us/articles/360035226192-Withdraw-funds',
      PIXIE_LANE:
        'https://marketplacesupport.pixielane.com/article/629-how-do-i-receive-money-from-my-sale',
    },
    homePageRedirect: {
      DEFAULT: '/login',
      CHEDDAR_UP:
        process.env.NODE_ENV === 'development'
          ? '/login'
          : 'https://www.cheddarup.com',
    },
    payerPage: {
      CORE_NATURALS: 'https://corenaturals.io/c/',
      PIXIE_LANE: 'https://marketplace.pixielane.com/c/',
    },
    privacyPolicy: {
      DEFAULT: 'https://www.cheddarup.com/privacypolicy/',
      PIXIE_LANE: 'https://www.cheddarup.com/brandprivacypolicy/',
    },
    terms: {
      DEFAULT: 'https://www.cheddarup.com/termsofuse/',
    },
    achTerms: {
      DEFAULT: 'https://www.cheddarup.com/achpaymentterms/',
    },
    videoTutorials: {
      DEFAULT:
        'https://support.cheddarup.com/hc/en-us/categories/360002241391-Videos',
    },
    disputesSupport: {
      DEFAULT:
        'https://support.cheddarup.com/hc/en-us/articles/360035587011-Prevent-and-manage-disputes',
    },
    shareCollection: {
      DEFAULT:
        'https://support.cheddarup.com/hc/en-us/articles/360035226152-Share-your-collection-',
    },
  },
  colors: {
    brand: {
      CHEDDAR_UP: '#f36d36',
      PIXIE_LANE: '#ff46a3',
      DEFAULT: '#f27070',
    },
    accent: {
      CHEDDAR_UP: '#257a91',
      PIXIE_LANE: '#46a3ff',
      DEFAULT: '#c85b5d',
    },
    alert: {
      CHEDDAR_UP: '#6194a4',
      PIXIE_LANE: '#1F8FFF',
      DEFAULT: '#f27070',
    },
    tint: {
      CHEDDAR_UP: '#2c7b91',
      PIXIE_LANE: '#46a3ff',
      DEFAULT: '#2c7b91',
    },
    lightTint: {
      CHEDDAR_UP: '#d7eef1',
      PIXIE_LANE: 'rgba(68, 162, 255, 0.35294117647058826)',
      DEFAULT: '#d7eff2',
    },
    secondarySidebarNavItem: {
      CHEDDAR_UP: 'rgb(196, 230, 234)',
      PIXIE_LANE: 'transparent',
      DEFAULT: 'rgb(196, 230, 234)',
    },
  },
  icons: {
    logo: {
      CORE_NATURALS: LogoHorizontalCoreNaturals,
      PIXIE_LANE: LogoHorizontalPixieLane,
    },
    addItemCategory: {
      CHEDDAR_UP: CategoryPlusIconCheddarUp,
      DEFAULT: CategoryPlusIconDefault,
    },
  },
  images: {
    setTiming: {
      CHEDDAR_UP: SetTimingLargeCheddarUp,
      DEFAULT: SetTimingLargeDefault,
    },
  },
};

const getConfigFromSettings = (settings) =>
  _.fromPairs(
    _.toPairs(settings).map(([key, value]) => [
      key,
      value[SITE_NAME] !== undefined ? value[SITE_NAME] : value.DEFAULT,
    ])
  );

const config = {
  siteName: SITE_NAME,
  isCheddarUp: SITE_NAME === 'CHEDDAR_UP',
  clientId: CLIENT_ID,
  enabledFeatures: getConfigFromSettings(configSettings.enabledFeatures),
  behaviors: getConfigFromSettings(configSettings.behaviors),
  strings: getConfigFromSettings(configSettings.strings),
  links: getConfigFromSettings(configSettings.links),
  validations: getConfigFromSettings(configSettings.validations),
  colors: getConfigFromSettings(configSettings.colors),
  icons: getConfigFromSettings(configSettings.icons),
  images: getConfigFromSettings(configSettings.images),
};

const generateHelpers = () => ({
  shareUrl: (slug) =>
    config.isCheddarUp
      ? `https://${slug}.cheddarup.com`
      : `${config.links.payerPage}${slug}`,
});

config.helpers = generateHelpers();

export default config;
