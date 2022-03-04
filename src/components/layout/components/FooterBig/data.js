import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoPinterest,
  IoLogoTwitter,
} from 'react-icons/io';
import React from 'react';
import moment from 'moment';
import config from 'config';

import AppStoreBadgeRevIcon from 'theme/images/AppStoreBadge.Rev.svg';
import GooglePlayBadgeRevIcon from 'theme/images/GooglePlayBadge.Rev.svg';

const bottomLinks = [
  {
    label: `© ${moment().format('YYYY')} ${config.strings.name}, Inc.`,
  },
  {
    label: 'Terms',
    url: config.links.terms,
  },
  {
    label: 'Privacy',
    url: config.links.privacyPolicy,
  },
];

const links = [
  {
    heading: 'Learn',
    ul: [
      {
        label: 'How It Works',
        target: '_blank',
        url: 'https://www.cheddarup.com/how-it-works/',
      },
      {
        label: 'Pricing',
        target: '_blank',
        url: 'https://www.cheddarup.com/pricing/',
      },
    ],
  },
  {
    heading: 'Connect',
    ul: [
      {
        label: 'Blog',
        target: '_blank',
        url: 'https://www.cheddarup.com/blog/',
      },
      {
        link: true,
        label: 'Contact Us',
        target: '_blank',
        url: '/contact',
      },
    ],
  },
  {
    heading: 'Ways to use',
    ul: [
      {
        label: 'PTAs',
        target: '_blank',
        url: 'https://www.cheddarup.com/pta/',
      },
      {
        label: 'Girl Scouts',
        target: '_blank',
        url: 'https://www.cheddarup.com/girlscouts/',
      },
      {
        label: 'Boy Scouts',
        target: '_blank',
        url: 'https://www.cheddarup.com/boyscouts/',
      },
      {
        label: 'Teams',
        target: '_blank',
        url: 'https://www.cheddarup.com/team/',
      },
      {
        label: 'Teacher Gifts',
        target: '_blank',
        url: 'https://www.cheddarup.com/teacher-gift/',
      },
      {
        label: 'Group Gifts',
        target: '_blank',
        url: 'https://www.cheddarup.com/group-gift/',
      },
      {
        label: 'Schools',
        target: '_blank',
        url: 'https://www.cheddarup.com/school/',
      },
      {
        label: 'Clubs',
        target: '_blank',
        url: 'https://www.cheddarup.com/clubs/',
      },
      {
        label: 'Reunions',
        target: '_blank',
        url: 'https://www.cheddarup.com/reunions/',
      },
      {
        label: 'Bands',
        target: '_blank',
        url: 'https://www.cheddarup.com/band/',
      },
      {
        label: 'HOAs',
        target: '_blank',
        url: 'https://www.cheddarup.com/hoa/',
      },
      {
        label: 'Sample Sales',
        target: '_blank',
        url: 'https://www.cheddarup.com/samplesales/',
      },
    ],
  },
  {
    heading: 'Mobile app',
    ul: [
      {
        label: (
          <img
            className="w4"
            alt="AppStore badge reversed"
            src={AppStoreBadgeRevIcon}
          />
        ),
        target: '_blank',
        url:
          'https://itunes.apple.com/us/app/cheddar-up/id1141129202?ls=1&mt=8',
      },
      {
        label: (
          <img
            className="w4"
            alt="Google Play badge reversed"
            src={GooglePlayBadgeRevIcon}
          />
        ),
        target: '_blank',
        url:
          'https://play.google.com/store/apps/details?id=com.cheddarup.CheddarUp',
      },
    ],
  },
];

const social = [
  {
    icon: IoLogoFacebook,
    target: '_blank',
    url: 'https://www.facebook.com/CheddarUp',
  },
  {
    icon: IoLogoTwitter,
    target: '_blank',
    url: 'https://twitter.com/cheddarup',
  },
  {
    icon: IoLogoInstagram,
    target: '_blank',
    url: 'https://www.instagram.com/cheddarup/',
  },
  {
    icon: IoLogoPinterest,
    target: '_blank',
    url: 'https://www.pinterest.com/cheddarup/',
  },
];

export {bottomLinks, links, social};
