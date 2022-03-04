import React from 'react';

import AshleyWalkerCircleImage from 'theme/images/Ashley_Walker_Circle.png';
import CreateIcon from 'theme/images/CreateIcon.png';
import DevicesSwooshImage from 'theme/images/Devices_Swoosh.v3.jpg';
import ManageIcon from 'theme/images/ManageIcon.png';
import ShareIcon from 'theme/images/ShareIcon.png';

import OrgLandingBasePage from './OrgLandingBasePage';

const FEATURES = [
  {
    title: 'CREATE',
    subtitle:
      'Create unlimited pages that collect both payments and information.',
    iconSrc: CreateIcon,
  },
  {
    title: 'SHARE',
    subtitle:
      'Share a link with your community or have Cheddar Up send invites for you.',
    iconSrc: ShareIcon,
  },
  {
    title: 'MANAGE',
    subtitle:
      'Instant payment tracking and free withdrawals directly to your bank account.',
    iconSrc: ManageIcon,
  },
];

const PtaOnlinePaymentsPage = ({history, location}) => (
  <OrgLandingBasePage
    metaDescriptionNoun="PTA or PTO"
    history={history}
    location={location}
    backgroundColor="#d7eff2B3"
    heading="The easiest way to move payments and forms online for your PTA or PTO."
    subheading="Save hours and delight parents with a seamless online payment option."
    features={FEATURES}
    devicesImageSrc={DevicesSwooshImage}
    feedback={{
      heading: 'Trusted by thousands of PTAs and School Organizations',
      text: (
        <span>
          &quot;Cheddar Up has made my role as enrichment program coordinator SO
          much simpler and more efficient.
          <br />
          From registration to exportable class rosters, waivers and easy
          refunds—it’s been life changing!&quot;
        </span>
      ),
      avatarSrc: AshleyWalkerCircleImage,
      author:
        'Ashley Walker, Enrichment Program Coordinator, Bromwell Elementary',
    }}
  />
);

const EnhancedPtaOnlinePaymentsPage = React.memo(PtaOnlinePaymentsPage);

export default EnhancedPtaOnlinePaymentsPage;
