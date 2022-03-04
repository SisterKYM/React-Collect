import React from 'react';

import AshleyCircleImage from 'theme/images/AshleyCircle.jpg';
import CameraIcon from 'theme/images/CreateIcon.png';
import IphoneMyCollectionsReunionsImage from 'theme/images/Iphone.MyCollections.Reunions.jpg';
import ManageIcon from 'theme/images/ManageIcon.png';
import ShareIcon from 'theme/images/ShareIcon.png';

import OrgLandingBasePage from './OrgLandingBasePage';

const FEATURES = [
  {
    title: 'CREATE A COLLECTION',
    subtitle:
      'Create unlimited pages that collect payments, information and waivers.',
    iconSrc: CameraIcon,
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

const ReunionPage = ({history, location}) => (
  <OrgLandingBasePage
    howItWorksVisible
    metaDescriptionNoun="Group"
    history={history}
    location={location}
    backgroundColor="#f2efdcb3"
    heading="The easiest way to collect money for a reunion"
    subheading="Create a collection page in minutes—anyone can pay online without needing an account. Save time and delight your community."
    features={FEATURES}
    devicesImageSrc={IphoneMyCollectionsReunionsImage}
    feedback={{
      heading: 'Trusted by thousands of organizations and groups',
      text: `"Cheddar Up has made my role as program coordinator SO much simpler and more efficient. From registration to exportable class rosters and easy refunds—it’s been life changing!"`,
      avatarSrc: AshleyCircleImage,
      author:
        'Ashley Walker, Enrichment Program Coordinator, Bromwell Elementary',
    }}
  />
);

const EnhancedReunionPage = React.memo(ReunionPage);

export default EnhancedReunionPage;
