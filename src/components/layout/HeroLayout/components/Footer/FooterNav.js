import React from 'react';
import moment from 'moment';
import config from 'config';

import {NavItem} from 'elements';

const items = [
  {children: `© ${moment().format('YYYY')} ${config.strings.name}`},
  {children: 'Home', to: '/'},
  {children: 'FAQ', href: config.links.supportPage, target: '_blank'},
  {
    children: 'Terms',
    href: config.links.terms,
  },
  {children: 'Support', href: config.links.supportPage, target: '_blank'},
];

const FooterNav = () => (
  <nav className="flex items-center">
    {items.map((item, key) => (
      <NavItem light key={key} {...item} className="mh3" />
    ))}
  </nav>
);

const EnhancedFooterNav = React.memo(FooterNav);

export default EnhancedFooterNav;
