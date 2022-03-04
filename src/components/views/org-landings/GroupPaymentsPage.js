import React from 'react';

import CreateIcon from 'theme/images/CreateIcon.png';
import ManageIcon from 'theme/images/ManageIcon.png';
import MyCollectionsSwooshImage from 'theme/images/MyCollections_Swoosh_03.jpg';
import ShareIcon from 'theme/images/ShareIcon.png';
import TestimonialCircleBrianDonnellyImage from 'theme/images/TestimonialCircle.BrianDonnelly.jpg';

import OrgLandingBasePage from './OrgLandingBasePage';

const FEATURES = [
  {
    title: 'CREATE A COLLECTION',
    subtitle:
      'Create unlimited pages that collect payments, information and waivers.',
    iconSrc: CreateIcon,
  },
  {
    title: 'SHARE YOUR LINK',
    subtitle:
      'Share a link with your community or have Cheddar Up send invites for you.',
    iconSrc: ShareIcon,
  },
  {
    title: 'WATCH PAYMENTS ROLL IN',
    subtitle:
      'Enjoy instant tracking, easy reporting and free withdrawals directly to your bank account.',
    iconSrc: ManageIcon,
  },
];

const GroupOnlinePaymentsPage = ({history, location}) => (
  <OrgLandingBasePage
    howItWorksVisible
    history={history}
    location={location}
    backgroundColor="#f2efdcb3"
    heading="The easiest way to collect money from your group"
    subheading="Create a collection page in minutes—anyone can pay online without needing an account. Save time and delight your community."
    features={FEATURES}
    devicesImageSrc={MyCollectionsSwooshImage}
    feedback={{
      heading: 'Trusted by thousands of organizations and groups',
      text: `"Our Scout families now pay for everything online from camping trips to annual dues. It's so flexible... we can create a payment page for anything! It's been a gamechanger for us."`,
      avatarSrc: TestimonialCircleBrianDonnellyImage,
      author: 'Brian Donnely, Committee member, Verona Pack 32, Boy Scouts',
    }}
  />
);

const EnhancedGroupOnlinePaymentsPage = React.memo(GroupOnlinePaymentsPage);

export default EnhancedGroupOnlinePaymentsPage;
