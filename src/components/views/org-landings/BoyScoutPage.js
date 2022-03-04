import React from 'react';

import BSSwooshImage from 'theme/images/BS.Swoosh.jpg';
import CreateIcon from 'theme/images/CreateIcon.png';
import ManageIcon from 'theme/images/ManageIcon.png';
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
      'Share a link with Scout families or have Cheddar Up send invites for you.',
    iconSrc: ShareIcon,
  },
  {
    title: 'WATCH PAYMENTS ROLL IN',
    subtitle:
      'Enjoy instant tracking, easy reporting and free withdrawals directly to your bank account.',
    iconSrc: ManageIcon,
  },
];

const BoyScoutPage = ({history, location}) => (
  <OrgLandingBasePage
    howItWorksVisible
    metaDescriptionNoun="Boy Scout Troop"
    history={history}
    location={location}
    backgroundColor="#f2efdcb3"
    heading="The easiest way to move payments and forms online for your Troop."
    subheading="Create a collection page in minutes—anyone can pay online without needing an account. Save time and delight your Scout families."
    features={FEATURES}
    devicesImageSrc={BSSwooshImage}
    feedback={{
      heading: 'Trusted by thousands of organizations and groups',
      text: `"Our Scout families now pay for everything online from camping trips to annual dues. It's so flexible... we can create a payment page for anything! It's been a gamechanger for us."`,
      avatarSrc: TestimonialCircleBrianDonnellyImage,
      author: 'Brian Donnely, Committee member, Verona Pack 32, Boy Scouts',
    }}
  />
);

const EnhancedBoyScoutPage = React.memo(BoyScoutPage);

export default EnhancedBoyScoutPage;
