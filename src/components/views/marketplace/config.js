const getNavigationLinks = ({marketplaceName}) => [
  {
    title: 'Just In',
    to: '/marketplace',
  },
  {
    title: 'Shop Items',
    to: '/marketplace/shop-items',
  },
  {
    title: `${marketplaceName} Sales`,
    to: '/marketplace/sales',
  },
];

const profileLinks = [
  {
    title: 'My Sales',
    to: '/marketplace/my-sales',
  },
  {
    title: 'Support',
    to: '/contact',
  },
  {
    mobileOnly: true,
    classic: true,
    title: 'Create a Sale',
    to: '/collections',
  },
];

export {getNavigationLinks, profileLinks};
