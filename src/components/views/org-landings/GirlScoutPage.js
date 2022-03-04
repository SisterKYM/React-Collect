import React from 'react';

import CreateIcon from 'theme/images/CreateIcon.png';
import GSSwooshImage from 'theme/images/GS.Swoosh.jpg';
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

const GirlScoutPage = ({history, location}) => (
  <>
    <OrgLandingBasePage
      heroTextColorWhite
      howItWorksVisible
      metaDescriptionNoun="Girl Scout Troop"
      history={history}
      location={location}
      backgroundColor="#00ae58b3"
      howItWorksButtonClassName="bg-green-gray"
      heading="The easiest way to move payments and forms online for your Troop."
      subheading="Create a collection page in minutes—anyone can pay online without needing an account. Save time and delight your Scout families."
      features={FEATURES}
      devicesImageSrc={GSSwooshImage}
      feedback={{
        heading: 'Trusted by thousands of organizations and groups',
        text: `"Our Scout families now pay for everything online from camping trips to annual dues. It's so flexible... we can create a payment page for anything! It's been a gamechanger for us."`,
        avatarSrc: TestimonialCircleBrianDonnellyImage,
        author: 'Brian Donnely, Committee member, Verona Pack 32, Boy Scouts',
      }}
    />
    <style jsx>{`
      :global(.bg-green-gray) {
        background-color: #b9c4c5;
      }
    `}</style>
  </>
);

const EnhancedGirlScoutPage = React.memo(GirlScoutPage);

export default EnhancedGirlScoutPage;
